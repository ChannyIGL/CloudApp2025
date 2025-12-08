"use client";

import { useState } from "react";
import { useEffect } from "react";


export default function EscapeRoomPage() {
    const [stage, setStage] = useState<number>(0);
    const [inventory, setInventory] = useState<string[]>([]);
    const [timeInput, setTimeInput] = useState(3); 
    const [timeLeft, setTimeLeft] = useState(0);
    const [timerRunning, setTimerRunning] = useState(false);
    const [timeUp, setTimeUp] = useState(false);

    useEffect(() => {
    if (!timerRunning || timeLeft <= 0) return;

    const interval = setInterval(() => {
        setTimeLeft((prev) => {
        if (prev <= 1) {
            clearInterval(interval);
            setTimerRunning(false);
            setTimeUp(true);
            return 0;
        }
        return prev - 1;
        });
    }, 1000);

    return () => clearInterval(interval);
    }, [timerRunning, timeLeft]);

  // Stage 1
  const [stage1Input, setStage1Input] = useState("");
  const [stage1Status, setStage1Status] = useState<"idle" | "success" | "error">("idle");
  const [showHint1, setShowHint1] = useState(false);

  const correctStage1Answer = `function test() {
  console.log("hi");
}`;

  const handleStage1Submit = () => {
    if (stage1Input.trim() === correctStage1Answer.trim()) {
      setStage1Status("success");
      if (!inventory.includes("🔑 Golden Key")) {
        setInventory((prev) => [...prev, "🔑 Golden Key"]);
      }
    } else {
      setStage1Status("error");
    }
  };

  // Stage 2
  const [stage2Input, setStage2Input] = useState("");
  const [stage2Status, setStage2Status] = useState<"idle" | "success" | "error">("idle");
  const [showHint2, setShowHint2] = useState(false);

  const correctStage2Answer = `for (let i = 0; i <= 1000; i++) {
  console.log(i);
}`;

  const handleStage2Submit = () => {
    if (stage2Input.trim() === correctStage2Answer.trim()) {
      setStage2Status("success");
      if (!inventory.includes("🔥 Power Core")) {
        setInventory((prev) => [...prev, "🔥 Power Core"]);
      }
    } else {
      setStage2Status("error");
    }
  };

  // Stage 3
  const [stage3Input, setStage3Input] = useState("");
  const [stage3Status, setStage3Status] = useState<"idle" | "success" | "error">("idle");
  const [showHint3, setShowHint3] = useState(false);

  const correctStage3Answer = `<img src="cat.jpg" alt="A cute cat">`;

  const handleStage3Submit = () => {
    if (stage3Input.trim() === correctStage3Answer.trim()) {
      setStage3Status("success");
      if (!inventory.includes("🖼️ Access Badge")) {
        setInventory((prev) => [...prev, "🖼️ Access Badge"]);
      }

      setTimerRunning(false);
    } else {
      setStage3Status("error");
    }
  };


  const hasEscaped =
    inventory.includes("🔑 Golden Key") &&
    inventory.includes("🔥 Power Core") &&
    inventory.includes("🖼️ Access Badge");

  return (
    <div style={{ minHeight: "100vh", padding: "40px 16px", display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>
      
      {/* Title + Instructions */}
      <div style={{ textAlign: "center", maxWidth: "900px" }}>
        <h1 style={{ fontSize: "44px", fontWeight: "bold" }}>🗝️ The Ultimate Escape Room Challenge</h1>
        <p style={{ marginTop: "14px", fontSize: "18px", opacity: 0.9 }}>
          Escape by collecting <strong>three hidden items</strong> through coding puzzles.
          <br />
          Click objects in the room, solve the puzzle, and manually close each stage.
        </p>
        </div>
        {/* Timer Setup */}
        {!timerRunning && !timeUp && inventory.length === 0 && (
            <div style={{textAlign: "center", padding: "16px 24px", borderRadius: "14px", background: "linear-gradient(135deg, #d46000ff, #6500b8ff)", color: "white", boxShadow: "0 0 20px rgba(0,0,0,0.5)"}}>
                <p style={{ fontSize: "18px", marginBottom: "8px" }}>
                    ⏳ <strong>Set your escape time (minutes)</strong>
                </p>
                <input
                type="number"
                min={1}
                max={10}
                value={timeInput}
                onChange={(e) => setTimeInput(Number(e.target.value))}
                style={{ padding: "6px", marginRight: "10px", width: "60px", textAlign: "center" }}
                />
                <button
                onClick={() => {
                    setTimeLeft(timeInput * 60);
                    setTimerRunning(true);
                }}
                >
                Start Escape
                </button>
            </div>
            )}

            {/*Live Countdown */}
            {timerRunning && (
            <div style={{ fontSize: "20px", fontWeight: "bold" }}>
                ⏳ Time Left: {Math.floor(timeLeft / 60)}:
                {(timeLeft % 60).toString().padStart(2, "0")}
            </div>
        )}


      {/* Inventory */}
      <div style={{
        padding: "12px 20px",
        borderRadius: "12px",
        background: "var(--background)",
        border: "1px solid rgba(255,255,255,0.1)",
        minWidth: "340px",
        textAlign: "center"
      }}>
        <strong>🎒 Items Collected:</strong>
        <div style={{ marginTop: "8px", fontSize: "16px" }}>
          {inventory.length === 0 ? "None yet" : inventory.join("  •  ")}
        </div>
      </div>

      {/* Game Board */}
      <div style={{
        width: "100%",
        maxWidth: "1100px",
        aspectRatio: "16 / 9",
        backgroundImage: "url('/escape-room-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: "16px",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 0 25px rgba(0,0,0,0.4)",
      }}>
        <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.4)" }} />

        {/* Stage Banner */}
        <div style={{
          position: "absolute",
          top: 12,
          left: "50%",
          transform: "translateX(-50%)",
          padding: "10px 20px",
          background: "rgba(0,0,0,0.8)",
          color: "white",
          borderRadius: "10px"
        }}>
          {hasEscaped ? "YOU ESCAPED!" : "Explore the room and solve the puzzles"}
        </div>

        {/* Stage 1 Hotspot */}
        {stage === 0 && timerRunning && (
          <button onClick={() => setStage(1)} aria-label="Piano hotspot"
            style={{ position: "absolute", right: "8%", bottom: "18%", width: "220px", height: "170px", borderRadius: "12px", border: "3px solid #fbff07ff", background: "rgba(202, 212, 57, 0.2)", boxShadow: "0 0 18px #edff47ff"}}
          />
        )}

        {/* Stage 2 Hotspot */}
        {timerRunning && inventory.includes("🔑 Golden Key") && stage !== 2.5 && (
          <button onClick={() => setStage(2.5)} aria-label="Fireplace hotspot"
            style={{ position: "absolute", left: "42%", bottom: "22%", width: "200px", height: "140px", borderRadius: "12px", border: "3px solid #ef4444", background: "rgba(239,68,68,0.2)", boxShadow: "0 0 18px #ef4444"}}
          />
        )}

        {/* Stage 3 Hotspot */}
        {timerRunning && inventory.includes("🔥 Power Core") && stage !== 3.5 && (
          <button onClick={() => setStage(3.5)} aria-label="Painting hotspot"
            style={{ position: "absolute", left: "20%", top: "22%", width: "160px", height: "200px", borderRadius: "12px", border: "3px solid cyan", background: "rgba(0,255,255,0.15)", boxShadow: "0 0 15px cyan" }}
          />
        )}

        {/* Stage 1 Panel */}
        {stage === 1 && (
          <StagePanel title="🔑 Stage 1: Hidden Key" close={() => setStage(0)}>
            <pre style={codeBox}>{`function test(){console.log("hi")}`}</pre>
            <textarea value={stage1Input} onChange={(e) => setStage1Input(e.target.value)} style={inputBox} />
            <ButtonRow>
              <Btn onClick={handleStage1Submit}>Submit</Btn>
              <Btn onClick={() => setShowHint1(!showHint1)}>Hint</Btn>
            </ButtonRow>
            {showHint1 && <Hint>💡 Look at spacing and brackets.</Hint>}
            {stage1Status === "success" && <Success>✅ Golden Key Collected!</Success>}
            {stage1Status === "error" && <Error>❌ Wrong, try again.</Error>}
          </StagePanel>
        )}

        {/* Stage 2 Panel */}
        {stage === 2.5 && (
          <StagePanel title="🔥 Stage 2: Power Generator" close={() => setStage(0)}>
            <p style={{ textAlign: "center", marginBottom: "10px" }}> 
                Write a <strong>for-loop</strong> that prints all numbers from <strong>0 to 1000</strong>.
            </p>
            <textarea value={stage2Input} onChange={(e) => setStage2Input(e.target.value)} style={inputBox} />            <ButtonRow>
              <Btn onClick={handleStage2Submit}>Submit</Btn>
              <Btn onClick={() => setShowHint2(!showHint2)}>Hint</Btn>
            </ButtonRow>
            {showHint2 && <Hint>💡 Loop from 0 to 1000.</Hint>}
            {stage2Status === "success" && <Success>✅ Power Core Collected!</Success>}
            {stage2Status === "error" && <Error>❌ Wrong, try again.</Error>}
          </StagePanel>
        )}

        {/* Stage 3 Panel */}
        {stage === 3.5 && (
          <StagePanel title="🖼️ Stage 3: Accessibility Check" close={() => setStage(0)}>
            <pre style={codeBox}>{`<img src="cat.jpg">`}</pre>
            <textarea value={stage3Input} onChange={(e) => setStage3Input(e.target.value)} style={inputBox} />
            <ButtonRow>
              <Btn onClick={handleStage3Submit}>Submit</Btn>
              <Btn onClick={() => setShowHint3(!showHint3)}>Hint</Btn>
            </ButtonRow>
            {showHint3 && <Hint>💡 Images must describe what they show.</Hint>}
            {stage3Status === "success" && <Success>✅ Access Badge Collected!</Success>}
            {stage3Status === "error" && <Error>❌ Wrong, try again.</Error>}
          </StagePanel>
        )}

        {/* Fail Screen */}
        {timeUp && (
        <div style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.9)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "red",
            fontSize: "32px",
            fontWeight: "bold",
            zIndex: 10
        }}>
            TIME’S UP — YOU FAILED TO ESCAPE
            <button
            style={{ marginTop: "20px", padding: "10px 20px" }}
            onClick={() => {
                setStage(0);
                setInventory([]);
                setTimeUp(false);
                setTimeLeft(0);
                setTimerRunning(false);
            }}
            >
            Restart
            </button>
        </div>
        )}

        {/* Final escape message */}
        {hasEscaped && (
        <div style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.85)",
            color: "white",
            fontSize: "28px",
            fontWeight: "bold",
            zIndex: 10
        }}>
            YOU ESCAPED THE ROOM!

            <p style={{ fontSize: "18px", marginTop: "10px" }}>
            You escaped with{" "}
            <strong>
                {Math.floor(timeLeft / 60)}:
                {(timeLeft % 60).toString().padStart(2, "0")}
            </strong>{" "}
            to spare!
            </p>

            <button
            style={{
                marginTop: "16px",
                padding: "6px 14px",
                fontSize: "14px",
                borderRadius: "6px",
                border: "1px solid #aaa",
                background: "#111",
                color: "white",
                cursor: "pointer"
            }}
            onClick={() => {
                setStage(0);
                setInventory([]);
                setTimeLeft(0);
                setTimerRunning(false);
            }}
            >
            Close
            </button>
        </div>
        )}
      </div>
    </div>
  );
}

// Reusable UI Components 
const StagePanel = ({ title, close, children }: any) => (
  <div style={{ position: "absolute", bottom: "6%", left: "50%", transform: "translateX(-50%)", width: "96%", maxWidth: "700px", background: "var(--background)", color: "var(--foreground)", padding: "26px", borderRadius: "16px" }}>
    <h2 style={{ textAlign: "center", fontSize: "28px" }}>{title}</h2>
    {children}
    <div style={{ marginTop: "12px", textAlign: "center" }}>
      <Btn onClick={close}>Close</Btn>
    </div>
  </div>
);

const inputBox = { width: "100%", height: "120px", marginTop: "10px", background: "#111", color: "#0f0", padding: "10px" };
const codeBox = { background: "#111", color: "#0f0", padding: "14px", borderRadius: "8px" };

const ButtonRow = ({ children }: any) => <div style={{ marginTop: "12px", display: "flex", gap: "10px" }}>{children}</div>;

const Btn = ({ children, onClick }: any) => (
  <button onClick={onClick} style={{ padding: "8px 16px", borderRadius: "6px", border: "1px solid #aaa", background: "#2563eb", color: "white", cursor: "pointer", fontWeight: "bold" }}>
    {children}
  </button>
);

const Hint = ({ children }: any) => <div style={{ marginTop: "10px" }}>{children}</div>;
const Success = ({ children }: any) => <div style={{ color: "lightgreen", marginTop: "10px" }}>{children}</div>;
const Error = ({ children }: any) => <div style={{ color: "salmon", marginTop: "10px" }}>{children}</div>;
