"use client";

import React, { useEffect, useMemo, useState } from "react";

type Tab = {
  id: string;
  title: string;
  content: string;
};

const STORAGE_KEY = "cloudweb_tabs_v1";
const MAX_TABS = 15;

export default function HomePage() {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      setTabs(JSON.parse(raw));
    } else {
      setTabs([{ id: cryptoRandomId(), title: "Tab 1", content: "This is Tab 1 content." }]);
    }
    setMounted(true);
  }, []);


  const [activeIndex, setActiveIndex] = useState<number>(0);

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tabs));
    setActiveIndex((idx) => Math.max(0, Math.min(idx, tabs.length - 1)));
  }, [tabs]);

  const generatedHTML = useMemo(() => generateHTML(tabs), [tabs]);

  function addTab() {
    if (tabs.length >= MAX_TABS) {
      alert(`Maximum of ${MAX_TABS} tabs reached.`);
      return;
    }
    const newTab: Tab = {
      id: cryptoRandomId(),
      title: `Tab ${tabs.length + 1}`,
      content: `This is content for Tab ${tabs.length + 1}.`,
    };
    setTabs((prev) => {
      const next = [...prev, newTab];
      return next;
    });
    setActiveIndex(tabs.length);
  }

  function deleteTab(index: number) {
    if (!confirm("Delete this tab?")) return;
    setTabs((prev) => {
      const next = prev.filter((_, i) => i !== index);
      return next.length ? next : [{ id: cryptoRandomId(), title: "Tab 1", content: "This is Tab 1 content." }];
    });
  }

  function renameTab(index: number, newTitle: string) {
    setTabs((prev) => {
      const next = prev.map((t, i) => (i === index ? { ...t, title: newTitle } : t));
      return next;
    });
  }

  function updateContent(index: number, newContent: string) {
    setTabs((prev) => {
      const next = prev.map((t, i) => (i === index ? { ...t, content: newContent } : t));
      return next;
    });
  }

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(generatedHTML);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (e) {
      alert("Copy failed. Please select and copy manually.");
    }
  }

  return (
    <div style={{ padding: 20, maxWidth: 1100, margin: "0 auto" }}>
      <h2
        style={{
          fontSize: "1.5rem",
          textAlign: "center",
          fontWeight: "700",
          marginTop: "-20px",
          marginBottom: "20px",
          textTransform: "uppercase",
                letterSpacing: "1px",
        }}
      >
        Home
      </h2>

      <h1
        style={{
          fontSize: "2.5rem",
          textAlign: "center",
          fontWeight: "800",
          marginBottom: "8px",
        }}
      >
        Tabs Website Generator
      </h1>

      <p
        style={{
          textAlign: "center",
          fontSize: "1.1rem",
          maxWidth: "800px",
          margin: "0 auto 25px",
          fontWeight: "500",
          lineHeight: "1.4",
        }}
      >
        Generate tab, add content to each tab, and generate a HTML + JS ouput file code with just one click. The output updates instantly from each modification done to the tabs nor content, so no need to worry about clicking an output button for when user changes the content of the tabs.
      </p>


      <section style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {tabs.map((tab, i) => (
              <div
                key={tab.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  borderRadius: 6,
                  padding: "6px 8px",
                  background: i === activeIndex ? "var(--foreground)" : "transparent",
                  color: i === activeIndex ? "var(--background)" : "var(--foreground)",
                  border: "1px solid var(--foreground)",
                  cursor: "pointer",
                }}
                onClick={() => setActiveIndex(i)}
              >
                <input
                  value={tab.title}
                  onChange={(e) => renameTab(i, e.target.value)}
                  style={{
                    border: "none",
                    background: "transparent",
                    color: "inherit",
                    fontWeight: 600,
                    width: Math.max(60, Math.min(140, tab.title.length * 8)),
                  }}
                />
                <button
                  title="Delete tab"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteTab(i);
                  }}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: "inherit",
                    fontSize: 14,
                  }}
                >
                  ✖
                </button>
              </div>
            ))}
          </div>

          <div style={{ marginLeft: "auto" }}>
            <button
              onClick={addTab}
              style={{
                padding: "8px 12px",
                borderRadius: 8,
                cursor: "pointer",
                border: "1px solid var(--foreground)",
                background: "transparent",
                color: "var(--foreground)",
              }}
            >
              + Add tab
            </button>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>Editor — {tabs[activeIndex]?.title}</h2>

        <textarea
          value={tabs[activeIndex]?.content ?? ""}
          onChange={(e) => updateContent(activeIndex, e.target.value)}
          rows={10}
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 8,
            border: "1px solid var(--foreground)",
            background: "transparent",
            color: "var(--foreground)",
            resize: "vertical",
          }}
        />
      </section>

      <section>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <h2 style={{ fontSize: 18, margin: 0 }}>Generated HTML (live)</h2>
          <button
            onClick={copyCode}
            style={{
              padding: "8px 12px",
              borderRadius: 8,
              cursor: "pointer",
              border: "1px solid var(--foreground)",
              background: "transparent",
              color: "var(--foreground)",
              marginLeft: "auto",
            }}
          >
            Copy Code
          </button>
        </div>

        {copied && (
          <div
            style={{
              display: "inline-block",
              padding: "6px 10px",
              background: "var(--foreground)",
              color: "var(--background)",
              borderRadius: 6,
              marginBottom: 8,
            }}
          >
            Copied!
          </div>
        )}

        <textarea
          readOnly
          value={generatedHTML}
          rows={18}
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 8,
            border: "1px solid var(--foreground)",
            background: "transparent",
            color: "var(--foreground)",
            whiteSpace: "pre",
            fontFamily: "monospace",
            fontSize: 13,
          }}
        />
      </section>
    </div>
  );
}


// Helper functions
function cryptoRandomId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    try {
      return (crypto as any).randomUUID();
    } catch {
      }
  }
  return Math.random().toString(36).slice(2, 9);
}

function generateHTML(tabs: Tab[]) {
  const escapeForJsString = (s: string) =>
    s.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$/g, "\\$");

  const buttons = tabs
    .map((t, i) => {
      const safeTitle = escapeForJsString(t.title || `Tab ${i + 1}`);
      return `<button id="tab-btn-${i}" onclick="showTab(${i})" style="padding:8px 12px;margin-right:6px;border:1px solid #333;border-radius:6px;background:#fff;cursor:pointer;transition:all 0.2s;">${safeTitle}</button>`;
    })
    .join("\n");

  const panels = tabs
    .map((t, i) => {
      const contentHtml = t.content ?? "";
      const display = i === 0 ? "block" : "none";
      return `<div id="tab-panel-${i}" style="display:${display};padding:12px;border:1px solid #ddd;border-radius:6px;margin-top:12px;">${contentHtml}</div>`;
    })
    .join("\n");

  const inlineCss = `
    body { font-family: Arial, sans-serif; padding:20px; background:#f8f9fb; color:#111; }
    header { margin-bottom: 12px; }
    .tabs { margin-bottom: 8px; }
  `;

  const inlineJs = `
    function showTab(n) {
      var i = 0;
      while (document.getElementById('tab-panel-' + i)) {
        var panel = document.getElementById('tab-panel-' + i);
        var button = document.getElementById('tab-btn-' + i);
        if (panel) panel.style.display = (i === n ? 'block' : 'none');
        if (button) {
          if (i === n) {
            button.style.background = '#333';
            button.style.color = '#fff';
          } else {
            button.style.background = '#fff';
            button.style.color = '#000';
          }
        }
        i++;
      }
    }
  `;

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Generated Tabs</title>
<style>${inlineCss}</style>
</head>
<body>
  <header>
    <h1 style="margin:0 0 10px 0">Generated Tabs</h1>
  </header>

  <div class="tabs" style="margin-bottom:6px;">
    ${buttons}
  </div>

  <main>
    ${panels}
  </main>

  <script>
    ${inlineJs}
    // show first tab by default
    showTab(0);
  </script>
</body>
</html>`;

  return html;
}
