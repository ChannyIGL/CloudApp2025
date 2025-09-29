"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header style={{ background: "#f4f4f4", padding: "10px 20px" }}>
      <button onClick={() => setOpen(!open)} style={{ fontSize: "20px", color: "black" }}>
        ☰
      </button>
      {open && (
        <nav>
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
