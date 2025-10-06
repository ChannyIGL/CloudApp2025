"use client";

import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "./theme";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header style={
      { background: "var(--background)", 
      color: "var(--foreground)",
      padding: "10px 20px", 
      position: "relative",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      transition: "background 0.5s ease, color 0.5s ease"
      }}>
      <button onClick={() => setOpen(!open)} style={{ fontSize: "20px", color: "var(--foreground)", transition: "transform 0.3s ease", transform: open ? "rotate(90deg)" : "rotate(0deg)",}}>
        ☰
      </button>

      <div>
        <ThemeToggle />
      </div>

      {open && (
        <nav style={{
          position: "absolute",
          top: "50px",
          left: open ? "0" : "-200px",
          width: "200px",
          background: "var(--background)",
          color: "var(--foreground)",
          transition: "transform 0.5s ease, background 0.5s ease, color 0.5s ease",
          transform: open ? "translateX(0)" : "translateX(-220px)",
          padding: "10px",
          border: "1px solid #ccc",
        }}>
          <ul style={{ listStyle: "none", padding: 0, color: "var(--foreground)" }}>
            <li><Link href="/" onClick={() => setOpen(false)}>Home</Link></li>
            <li><Link href="/about" onClick={() => setOpen(false)}>About</Link></li>
            <li><Link href="" onClick={() => setOpen(false)}>Escape Room</Link></li>
            <li><Link href="" onClick={() => setOpen(false)}>Coding Races</Link></li>
            <li><Link href="" onClick={() => setOpen(false)}>Court Room</Link></li>
          </ul>
        </nav>
      )}
    </header>
  );
}
