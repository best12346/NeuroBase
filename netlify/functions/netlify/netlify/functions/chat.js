// This function runs on Netlify's servers, never in the visitor's browser.
// Your Hugging Face API key lives only here — as an environment variable —
// and is never sent to the client.

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  const apiKey = process.env.HF_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "No HF_API_KEY set on the server. Add it in Netlify → Project configuration → Environment variables.",
      }),
    };
  }

  try {
    const { message } = JSON.parse(event.body || "{}");
    if (!message) {
      return { statusCode: 400, body: JSON.stringify({ error: "Missing message" }) };
    }

    // Change this if you want a different model available on your Hugging Face account.
    const MODEL = "mistralai/Mistral-7B-Instruct-v0.2";

    const systemPrompt =
      "You are the NeuroBase in-app assistant for a concussion-recovery tracking app. You only discuss the user's logged symptoms, activities, and recovery patterns. You never diagnose, never say someone is medically recovered, and always defer medical judgment to their healthcare professional. Keep answers short (2-3 sentences).";

    const fullPrompt = `<s>[INST] ${systemPrompt}\n\nUser question: ${message} [/INST]`;

    const res = await fetch(`https://api-inference.huggingface.co/models/${MODEL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        inputs: fullPrompt,
        parameters: {
          max_new_tokens: 250,
          temperature: 0.6,
          return_full_text: false,
        },
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      return {
        statusCode: 200,
        body: JSON.stringify({
          text: null,
          debug: `Hugging Face error (${res.status}): ${errText.slice(0, 200)}`,
        }),
      };
    }

    const data = await res.json();
    let text = Array.isArray(data) ? data[0]?.generated_text : data?.generated_text;
    text = (text || "").trim();

    if (!text) {
      return {
        statusCode: 200,
        body: JSON.stringify({ text: null, debug: "Empty response from Hugging Face." }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ text }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server error reaching Hugging Face." }),
    };
  }
}
