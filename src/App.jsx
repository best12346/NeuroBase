import React, { useState } from "react";

const TABS = [
  { key: "home", icon: "🏠", label: "Home" },
  { key: "checkin", icon: "📝", label: "Check-in" },
  { key: "activity", icon: "🏃", label: "Activity" },
  { key: "insights", icon: "📊", label: "Insights" },
  { key: "report", icon: "📄", label: "Report" },
];

function Metric({ icon, label, value }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-3">
      <div className="text-base">{icon}</div>
      <div className="text-[11px] text-slate-500 font-semibold mt-1.5">{label}</div>
      <div className="text-lg font-bold text-slate-900">{value}</div>
    </div>
  );
}

function ActivityRow({ icon, label, value }) {
  return (
    <div className="flex justify-between items-center py-2.5 border-b border-slate-100 last:border-none text-sm">
      <div className="flex items-center gap-2 font-medium text-slate-900">
        <span>{icon}</span>
        {label}
      </div>
      <div className="text-slate-500 font-semibold">{value}</div>
    </div>
  );
}

function Slider({ label, value, onChange }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between text-xs font-semibold text-slate-900 mb-1.5">
        <span>{label}</span>
        <span className="text-blue-500">{value}/10</span>
      </div>
      <input
        type="range"
        min="0"
        max="10"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-blue-500"
      />
    </div>
  );
}

function Chip({ icon, label, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={
        "rounded-2xl py-3 px-1 text-center border transition-colors " +
        (selected
          ? "bg-slate-900 border-slate-900 text-white"
          : "bg-white border-slate-200 text-slate-700")
      }
    >
      <div className="text-lg mb-1.5">{icon}</div>
      <div className="text-[10px] font-semibold">{label}</div>
    </button>
  );
}

function LineGraph({ points, color = "#3B82F6" }) {
  return (
    <svg viewBox="0 0 300 110" preserveAspectRatio="none" className="w-full h-28">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChatBubble({ from, text }) {
  const isUser = from === "user";
  return (
    <div
      className={
        "max-w-[82%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed mb-2.5 " +
        (isUser
          ? "bg-slate-900 text-white ml-auto rounded-br-md"
          : "bg-slate-100 text-slate-900 rounded-bl-md")
      }
    >
      {text}
    </div>
  );
}

function ReportRow({ label, trend }) {
  const color =
    trend === "up" ? "text-emerald-500" : trend === "down" ? "text-blue-500" : "text-slate-400";
  const symbol = trend === "up" ? "↑" : trend === "down" ? "↓" : "→";
  return (
    <div className="flex justify-between py-2 border-b border-slate-100 last:border-none text-xs">
      <span className="text-slate-700">{label}</span>
      <span className={`font-bold ${color}`}>{symbol}</span>
    </div>
  );
}

// ---------- Screens ----------

function HomeScreen({ goTo, userName }) {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="text-xs text-slate-400">
          Good morning, <b className="text-slate-900 font-semibold">{userName}</b> 👋
          <br />
          Let's check in with your recovery.
        </div>
        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-sm">
          🔔
        </div>
      </div>

      <button
        onClick={() => goTo("insights")}
        className="w-full text-left rounded-3xl p-4 mb-3.5 text-white bg-gradient-to-br from-slate-900 to-slate-700"
      >
        <div className="text-[11px] font-bold uppercase tracking-wide opacity-75">
          🧠 Recovery Overview
        </div>
        <div className="inline-block mt-2.5 text-sm font-bold bg-emerald-400/20 text-emerald-300 px-3 py-1 rounded-full">
          Looking steady
        </div>
        <p className="text-xs opacity-85 mt-2 leading-relaxed">
          Your recent symptoms have remained relatively stable. Tap for the full pattern →
        </p>
      </button>

      <div className="grid grid-cols-2 gap-2.5 mb-3.5">
        <Metric icon="🧠" label="Symptoms" value="3.2/10" />
        <Metric icon="⚡" label="Energy" value="6/10" />
        <Metric icon="🎯" label="Focus" value="7/10" />
        <Metric icon="😴" label="Sleep" value="7h" />
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-4">
        <div className="text-xs font-bold text-slate-900 mb-1.5">Today's Activities</div>
        <ActivityRow icon="📚" label="Study" value="30 min" />
        <ActivityRow icon="🚶" label="Walk" value="20 min" />
        <ActivityRow icon="📱" label="Screen" value="45 min" />
      </div>

      <button
        onClick={() => goTo("checkin")}
        className="mt-3.5 w-full py-3.5 rounded-2xl bg-slate-900 text-white font-bold text-sm"
      >
        Start today's check-in →
      </button>
    </>
  );
}

function CheckinScreen({ goTo }) {
  const [headache, setHeadache] = useState(7);
  const [dizziness, setDizziness] = useState(3);
  const [fatigue, setFatigue] = useState(5);
  const [concentration, setConcentration] = useState(7);
  const [light, setLight] = useState(2);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <div className="text-4xl mb-4">✅</div>
        <div className="text-base font-bold text-slate-900 mb-1.5">Check-in submitted</div>
        <p className="text-xs text-slate-500 mb-6">
          Thanks — your logs have been added to today's recovery pattern.
        </p>
        <button
          onClick={() => goTo("insights")}
          className="px-5 py-3 rounded-2xl bg-slate-900 text-white font-bold text-xs"
        >
          See my pattern →
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="text-base font-bold text-slate-900 mb-5">How are you feeling today?</div>

      <Slider label="Headache" value={headache} onChange={setHeadache} />
      <Slider label="Dizziness" value={dizziness} onChange={setDizziness} />
      <Slider label="Fatigue" value={fatigue} onChange={setFatigue} />
      <Slider label="Concentration" value={concentration} onChange={setConcentration} />
      <Slider label="Light sensitivity" value={light} onChange={setLight} />

      <div className="bg-white border border-slate-200 rounded-3xl p-4 mt-1">
        <ActivityRow icon="" label="Sleep last night" value="7h 20m" />
        <ActivityRow icon="" label="Energy" value="6/10" />
        <ActivityRow icon="" label="Screen exposure" value="___" />
      </div>

      <button
        onClick={() => setSubmitted(true)}
        className="mt-3 w-full py-3.5 rounded-2xl bg-slate-900 text-white font-bold text-sm"
      >
        Submit Check-In →
      </button>
    </>
  );
}

function ActivityScreen() {
  const chips = [
    ["📚", "Study"],
    ["📖", "Reading"],
    ["🚶", "Walking"],
    ["💻", "Screen"],
    ["🎧", "Music"],
    ["🧘", "Relaxation"],
    ["🎨", "Creative"],
    ["🛋️", "Rest"],
    ["🏃", "Physical"],
  ];
  const [selected, setSelected] = useState("Study");
  const [stage, setStage] = useState("before"); // before, during, after
  const [started, setStarted] = useState(false);

  return (
    <>
      <div className="text-base font-bold text-slate-900 mb-4">Start an activity</div>
      <div className="grid grid-cols-3 gap-2 mb-3.5">
        {chips.map(([icon, label]) => (
          <Chip
            key={label}
            icon={icon}
            label={label}
            selected={selected === label}
            onClick={() => {
              setSelected(label);
              setStarted(false);
              setStage("before");
            }}
          />
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-4">
        <div className="text-xs font-bold text-slate-900 mb-2">
          Activity → Response → Recovery
        </div>
        <div className="flex gap-1.5">
          {["before", "during", "after"].map((s) => (
            <div
              key={s}
              className={
                "flex-1 rounded-xl p-2.5 text-center " +
                (started && stage === s ? "bg-blue-50" : "bg-slate-50")
              }
            >
              <b className="block text-slate-900 text-[11px] mb-0.5 capitalize">{s}</b>
              <span className="text-[10px] text-slate-500">
                {s === "before" && "How do you feel right now?"}
                {s === "during" && "How difficult does this feel?"}
                {s === "after" && "How do you feel now?"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {!started ? (
        <button
          onClick={() => {
            setStarted(true);
            setStage("during");
          }}
          className="mt-3 w-full py-3.5 rounded-2xl bg-slate-900 text-white font-bold text-sm"
        >
          Begin {selected} →
        </button>
      ) : stage === "during" ? (
        <button
          onClick={() => setStage("after")}
          className="mt-3 w-full py-3.5 rounded-2xl bg-blue-500 text-white font-bold text-sm"
        >
          Finish {selected} →
        </button>
      ) : (
        <div className="mt-3 text-center text-xs text-emerald-600 font-semibold bg-emerald-50 rounded-2xl py-3">
          ✓ Logged — added to your recovery pattern
        </div>
      )}
    </>
  );
}

function InsightsScreen() {
  const [showWhy, setShowWhy] = useState(false);
  return (
    <>
      <div className="bg-white border border-slate-200 rounded-3xl p-4 mb-3.5">
        <div className="text-xs font-bold text-slate-900 mb-1.5">Symptom level</div>
        <LineGraph points="10,20 70,45 130,70 190,78 260,92" color="#3B82F6" />
        <div className="flex justify-between text-[10px] text-slate-400 mt-1.5 px-0.5">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-4 mb-3.5">
        <div className="inline-block text-sm font-bold bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full">
          🟢 Your pattern is improving
        </div>
        <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
          Your reported concentration and fatigue have gradually improved over the last 5 days.
        </p>
        <button
          onClick={() => setShowWhy(!showWhy)}
          className="text-xs font-bold text-blue-500 mt-2.5"
        >
          Why am I seeing this? {showWhy ? "︿" : "›"}
        </button>
        {showWhy && (
          <div className="bg-slate-50 rounded-2xl p-3 mt-2.5">
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Your classification is based mainly on the decrease in your fatigue and
              concentration ratings over the past 5 days.
            </p>
          </div>
        )}
      </div>

      <div className="rounded-3xl p-4 mb-3 text-white bg-gradient-to-br from-slate-900 to-slate-700">
        <div className="text-[11px] font-bold uppercase tracking-wide opacity-75">
          💡 Today's insight
        </div>
        <p className="text-xs opacity-85 mt-2 leading-relaxed">
          Your recent logs show that longer study sessions have sometimes been followed by
          increased difficulty concentrating.
        </p>
      </div>

      <div className="bg-slate-50 rounded-3xl p-4">
        <p className="text-xs text-slate-600 leading-relaxed">
          Consider discussing your activity pattern with your healthcare professional.
        </p>
      </div>
    </>
  );
}

function ChatScreen({ onClose }) {
  const suggestions = [
    "How have I been doing this week?",
    "What activities did I do yesterday?",
    "Why did my recovery pattern change?",
  ];
  const [messages, setMessages] = useState([
    { from: "user", text: "Why did my pattern change today?" },
    {
      from: "bot",
      text: "Your fatigue increased from 3/10 yesterday to 6/10 today, while your concentration rating decreased. That's why today's pattern differs from your recent trend.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Local fallback used only if the server function isn't reachable (e.g. running `vite dev`
  // without `netlify dev`, or no ANTHROPIC_API_KEY set yet on the server) — keeps the demo working either way.
  const mockAnswer = (q) => {
    if (q.toLowerCase().includes("week"))
      return "This week your concentration and fatigue ratings have gradually improved, while headache stayed roughly steady.";
    if (q.toLowerCase().includes("yesterday"))
      return "Yesterday you logged Study (30 min), Walk (20 min), and Screen (45 min).";
    if (q.toLowerCase().includes("pattern change"))
      return "Your fatigue increased from 3/10 yesterday to 6/10 today, while your concentration rating decreased. That's why today's pattern differs from your recent trend.";
    return "I can't determine whether you're medically recovered. I can show you your recent patterns, which you can discuss with your healthcare professional.";
  };

  // ---- THIS IS THE SPOT FOR YOUR API ----
  // The key itself lives only on the server (netlify/functions/chat.js), set as the
  // ANTHROPIC_API_KEY environment variable in your Netlify dashboard. It never reaches
  // the browser — this call just hits your own site's /api/chat endpoint.
  const askAI = async (q) => {
    try {
      const res = await fetch("/.netlify/functions/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: q }),
      });
      const data = await res.json();
      if (data?.text) return data.text;
      return mockAnswer(q);
    } catch (e) {
      return mockAnswer(q);
    }
  };

  const ask = async (q) => {
    if (!q.trim()) return;
    setMessages((m) => [...m, { from: "user", text: q }]);
    setInput("");
    setLoading(true);
    const answer = await askAI(q);
    setMessages((m) => [...m, { from: "bot", text: answer }]);
    setLoading(false);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <div className="text-base font-bold text-slate-900">💬 Ask NeuroBase</div>
        {onClose && (
          <button onClick={onClose} className="text-slate-400 text-lg leading-none">
            ✕
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto mb-2">
        {messages.map((m, i) => (
          <ChatBubble key={i} from={m.from} text={m.text} />
        ))}
        {loading && <ChatBubble from="bot" text="…" />}
      </div>

      <div className="flex flex-wrap gap-1.5 mb-2.5">
        {suggestions.map((q) => (
          <button
            key={q}
            onClick={() => ask(q)}
            className="text-[10px] font-semibold text-slate-600 bg-slate-100 rounded-full px-3 py-1.5"
          >
            {q}
          </button>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          ask(input);
        }}
        className="flex items-center gap-2 border border-slate-200 rounded-full pl-4 pr-1.5 py-1.5 w-full"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about your recovery…"
          className="flex-1 text-xs text-slate-700 outline-none"
        />
        <button
          type="submit"
          className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs shrink-0"
        >
          ↑
        </button>
      </form>
    </>
  );
}

function ReportScreen() {
  return (
    <>
      <div className="text-center mb-3">
        <div className="text-sm font-bold text-slate-900">NeuroBase Recovery Report</div>
        <div className="text-[11px] text-slate-500 mt-0.5">Period: Aug 10 → Aug 24</div>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-4 mb-3">
        <div className="text-xs font-bold text-slate-900 mb-1.5">Symptoms</div>
        <ReportRow label="Headache" trend="down" />
        <ReportRow label="Dizziness" trend="down" />
        <ReportRow label="Fatigue" trend="flat" />
        <ReportRow label="Concentration" trend="up" />
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-4 mb-3">
        <div className="text-xs font-bold text-slate-900 mb-1.5">Activity</div>
        <div className="text-xs">
          <div className="flex justify-between py-1.5 border-b border-slate-100">
            <span className="text-slate-700">Study</span>
            <span className="text-slate-500">8 sessions</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-slate-100">
            <span className="text-slate-700">Walking</span>
            <span className="text-slate-500">6 sessions</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-slate-100">
            <span className="text-slate-700">Screen</span>
            <span className="text-slate-500">11 sessions</span>
          </div>
          <div className="flex justify-between py-1.5">
            <span className="text-slate-700">Relaxation</span>
            <span className="text-slate-500">5 sessions</span>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 rounded-3xl p-4 mb-3">
        <div className="text-xs font-bold text-slate-900 mb-1">Notable patterns</div>
        <p className="text-[11px] text-slate-600">
          Concentration ratings improved over the reporting period.
        </p>
      </div>

      <button className="w-full py-3 rounded-2xl border-2 border-slate-900 text-slate-900 font-bold text-xs">
        Export PDF →
      </button>
    </>
  );
}

function AuthScreen({ onDone }) {
  const [mode, setMode] = useState("signup"); // signup | login
  const [name, setName] = useState("");

  return (
    <div className="flex-1 flex flex-col justify-center px-2">
      <div className="text-center mb-6">
        <div className="text-lg font-bold text-slate-900 mb-1">
          {mode === "signup" ? "Create your account" : "Welcome back"}
        </div>
        <p className="text-xs text-slate-500">
          {mode === "signup"
            ? "Let's set up your recovery dashboard."
            : "Log in to see your recovery pattern."}
        </p>
      </div>

      <label className="text-xs font-semibold text-slate-700 mb-1.5 block">
        {mode === "signup" ? "What's your name?" : "Your name"}
      </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="e.g. Alex"
        className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-900 mb-4 outline-none focus:border-blue-400"
      />

      <button
        disabled={!name.trim()}
        onClick={() => onDone(name.trim())}
        className="w-full py-3.5 rounded-2xl bg-slate-900 text-white font-bold text-sm disabled:opacity-40"
      >
        {mode === "signup" ? "Create account →" : "Log in →"}
      </button>

      <button
        onClick={() => setMode(mode === "signup" ? "login" : "signup")}
        className="mt-4 text-xs text-slate-400 font-semibold text-center"
      >
        {mode === "signup" ? "Already have an account? Log in" : "New here? Create an account"}
      </button>
    </div>
  );
}

// ---------- App shell ----------

export default function NeuroBasePrototype() {
  const [active, setActive] = useState("home");
  const [userName, setUserName] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);

  const screens = {
    home: <HomeScreen goTo={setActive} userName={userName} />,
    checkin: <CheckinScreen goTo={setActive} />,
    activity: <ActivityScreen />,
    insights: <InsightsScreen />,
    report: <ReportScreen />,
  };

  return (
    <div
      className="min-h-screen bg-slate-50 flex flex-col items-center px-5 py-10"
      style={{
        backgroundImage:
          "radial-gradient(circle at 8% 8%, rgba(59,130,246,0.06), transparent 40%), radial-gradient(circle at 92% 15%, rgba(16,185,129,0.06), transparent 40%)",
      }}
    >
      <div className="text-center mb-6">
        <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-slate-900 flex items-center justify-center overflow-hidden">
          <svg viewBox="0 0 1024 1024" className="w-9 h-9">
            <g stroke="#FFFFFF" strokeWidth="72" strokeLinecap="round" fill="none">
              <line x1="512" y1="192" x2="512" y2="392" />
              <line x1="832" y1="512" x2="632" y2="512" />
              <line x1="512" y1="832" x2="512" y2="632" />
              <line x1="192" y1="512" x2="392" y2="512" />
            </g>
            <circle cx="512" cy="152" r="46" fill="#3B82F6" />
            <circle cx="872" cy="512" r="46" fill="#10B981" />
            <circle cx="512" cy="872" r="46" fill="#3B82F6" />
            <circle cx="152" cy="512" r="46" fill="#10B981" />
            <circle cx="512" cy="512" r="56" fill="#FFFFFF" />
          </svg>
        </div>
        <h1 className="text-xl font-extrabold text-slate-900">NeuroBase</h1>
        <p className="text-xs text-slate-500 mt-1">
          Tap through the prototype — every tab and button below is live.
        </p>
      </div>

      {/* Phone frame */}
      <div className="relative bg-white border border-slate-200 rounded-[36px] shadow-xl p-5 w-full max-w-sm min-h-[660px] flex flex-col overflow-hidden">
        {!userName ? (
          <AuthScreen onDone={setUserName} />
        ) : (
          <>
            {screens[active]}

            <div className="mt-auto pt-4 flex justify-between bg-slate-50 rounded-2xl px-1.5 py-2">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setActive(t.key)}
                  className={
                    "flex-1 text-center text-[9px] font-semibold rounded-xl py-1.5 transition-colors " +
                    (active === t.key ? "text-slate-900 bg-white shadow-sm" : "text-slate-400")
                  }
                >
                  <div className="text-sm mb-0.5">{t.icon}</div>
                  {t.label}
                </button>
              ))}
            </div>

            {/* Floating button that opens the chat */}
            {!chatOpen && (
              <button
                onClick={() => setChatOpen(true)}
                className="absolute right-5 bottom-24 w-12 h-12 rounded-full bg-slate-900 text-white text-lg shadow-lg flex items-center justify-center"
              >
                💬
              </button>
            )}

            {/* Chat slide-up panel */}
            <div
              className={
                "absolute inset-0 bg-white rounded-[36px] p-5 flex flex-col transition-transform duration-300 ease-out " +
                (chatOpen ? "translate-y-0" : "translate-y-full")
              }
            >
              <ChatScreen onClose={() => setChatOpen(false)} />
            </div>
          </>
        )}
      </div>

      <p className="text-[11px] text-slate-400 mt-5 text-center max-w-xs">
        NeuroBase doesn't diagnose or decide medical readiness — it surfaces patterns for you to
        discuss with your healthcare professional.
      </p>
    </div>
  );
}
