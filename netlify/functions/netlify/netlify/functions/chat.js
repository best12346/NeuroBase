// This function runs on Netlify's servers, never in the visitor's browser.
// Your API key lives only here — as an environment variable — and is never sent to the client.

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "No ANTHROPIC_API_KEY set on the server. Add it in Netlify → Site settings → Environment variables.",
      }),
    };
  }

  try {
    const { message } = JSON.parse(event.body || "{}");
    if (!message) {
      return { statusCode: 400, body: JSON.stringify({ error: "Missing message" }) };
    }

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6", // change if your account uses a different model name
        max_tokens: 300,
        system:
          "You are the NeuroBase in-app assistant for a concussion-recovery tracking app. You only discuss the user's logged symptoms, activities, and recovery patterns. You never diagnose, never say someone is medically recovered, and always defer medical judgment to their healthcare professional.",
        messages: [{ role: "user", content: message }],
      }),
    });

    const data = await res.json();
    const text = data?.content?.[0]?.text || "Sorry, I couldn't generate a response just now.";

    return {
      statusCode: 200,
      body: JSON.stringify({ text }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server error reaching the AI." }),
    };
  }
}
