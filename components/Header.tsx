"use client";

import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "./theme";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header style={
      { background: "#ffffffff", 
      padding: "10px 20px", 
      position: "relative",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
      }}>
      <button onClick={() => setOpen(!open)} style={{ fontSize: "20px", color: "black", transition: "transform 0.3s ease", transform: open ? "rotate(90deg)" : "rotate(0deg)",}}>
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
          backgroundColor: "#ffffffff",
          transition: "transform 0.3s ease",
          transform: open ? "translateX(0)" : "translateX(-220px)",
          padding: "10px",
          border: "1px solid #ccc",
        }}>
          <ul style={{ listStyle: "none", padding: 0, color: "black" }}>
            <li><Link href="">Home</Link></li>
            <li><Link href="">About</Link></li>
            <li><Link href="">Escape Room</Link></li>
            <li><Link href="">Coding Races</Link></li>
            <li><Link href="">Court Room</Link></li>
          </ul>
        </nav>
      )}
    </header>
  );
}
