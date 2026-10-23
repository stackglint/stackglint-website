"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { NAV } from "@/lib/content";
import { EMAIL } from "@/lib/site";
import { Logo } from "./ui";

export default function Header() {
  const [menu, setMenu] = useState(false);
  const [pal, setPal] = useState(false);
  const [mac, setMac] = useState(false);

  useEffect(() => {
    setMac(/Mac|iPhone|iPad/.test(navigator.userAgent));
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setPal(p => !p); }
      if (e.key === "Escape") { setMenu(false); setPal(false); }
    };
    const onResize = () => innerWidth > 940 && setMenu(false);
    addEventListener("keydown", onKey);
    addEventListener("resize", onResize);
    return () => { removeEventListener("keydown", onKey); removeEventListener("resize", onResize); };
  }, []);

  return (
    <>
      <header className="sticky top-[env(safe-area-inset-top,0px)] z-30 border-b border-line bg-bg/80 backdrop-blur-xl">
        <div className="container-x flex min-h-[70px] items-center justify-between gap-3.5">
          <a href="#top" aria-label="StackGlint home"><Logo className="h-[26px] sm:h-[30px]" /></a>
          <nav aria-label="Main" className="flex items-center gap-6">
            {NAV.map(n => (
              <a key={n.href} href={n.href} className="hidden text-[0.94rem] font-semibold text-muted no-underline transition hover:text-fg min-[941px]:inline">
                {n.label}
              </a>
            ))}
            <button onClick={() => setPal(true)} aria-label="Open command palette"
              className="hidden min-h-10 cursor-pointer items-center gap-2 rounded-[10px] border border-line bg-surface px-3 font-mono text-[0.82rem] text-muted transition hover:border-accent hover:text-fg sm:inline-flex">
              <kbd className="rounded-md border border-line bg-bg px-1.5 text-fg">{mac ? "⌘K" : "Ctrl K"}</kbd>
              <span className="hidden min-[1101px]:inline">Commands</span>
            </button>
            <a href="#contact" className="hidden min-h-[42px] items-center whitespace-nowrap rounded-full bg-accent px-[18px] text-[0.9rem] font-bold text-ink no-underline transition hover:-translate-y-0.5 min-[441px]:inline-flex">
              Start a project
            </a>
            <button onClick={() => setMenu(m => !m)} aria-label={menu ? "Close menu" : "Open menu"} aria-expanded={menu} aria-controls="mnav"
              className="inline-grid size-11 cursor-pointer place-items-center rounded-xl border border-line bg-surface min-[941px]:hidden">
              <span className="relative block h-3.5 w-[18px]" aria-hidden="true">
                <span className={`absolute left-0 h-0.5 w-full rounded bg-fg transition ${menu ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 top-1.5 h-0.5 w-full rounded bg-fg transition ${menu ? "opacity-0" : ""}`} />
                <span className={`absolute left-0 h-0.5 w-full rounded bg-fg transition ${menu ? "top-1.5 -rotate-45" : "top-3"}`} />
              </span>
            </button>
          </nav>
        </div>
        <AnimatePresence>
          {menu && (
            <motion.nav id="mnav" aria-label="Mobile" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }} className="overflow-hidden border-t border-line bg-bg min-[941px]:hidden">
              <div className="container-x grid pb-5 pt-2">
                {NAV.map((n, i) => (
                  <motion.a key={n.href} href={n.href} onClick={() => setMenu(false)} initial={{ x: -12, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.04 * i }}
                    className="flex min-h-[54px] items-center justify-between border-b border-line font-display text-xl font-bold no-underline">
                    {n.label}<span className="font-mono text-[0.8rem] font-normal text-accent">0{i + 1}</span>
                  </motion.a>
                ))}
                <a href="#contact" onClick={() => setMenu(false)} className="mt-4 inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full bg-accent font-bold text-ink no-underline">
                  Start a project <span aria-hidden="true">→</span>
                </a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
      <Palette open={pal} onClose={() => setPal(false)} />
    </>
  );
}

function Palette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const go = (id: string) => () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const cmds = useMemo(() => [
    { label: "Start a project", hint: "contact", run: () => { go("contact")(); setTimeout(() => document.getElementById("f-name")?.focus({ preventScroll: true }), 500); } },
    { label: "Plan your project", hint: "idea", run: go("idea") },
    { label: "Explore the stack", hint: "stack", run: go("stack") },
    { label: "Browse the elements", hint: "tech", run: go("elements") },
    { label: "View the life cycle", hint: "pipeline", run: go("lifecycle") },
    { label: "How we work", hint: "process", run: go("how") },
    { label: "Copy email address", hint: "email", run: () => navigator.clipboard?.writeText(EMAIL).catch(() => {}) },
    { label: "Back to top", hint: "home", run: go("top") },
  ], []);
  const items = cmds.filter(c => (c.label + " " + c.hint).toLowerCase().includes(q.toLowerCase()));

  useEffect(() => { if (open) { setQ(""); setSel(0); setTimeout(() => input.current?.focus(), 20); } }, [open]);
  const run = (i: number) => { const c = items[i]; if (!c) return; onClose(); c.run(); };

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[60] grid place-items-start justify-items-center bg-black/60 px-4 pt-[12vh] backdrop-blur-sm"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={e => e.target === e.currentTarget && onClose()}>
          <motion.div role="dialog" aria-modal="true" aria-label="Command palette" initial={{ y: -12, scale: 0.98 }} animate={{ y: 0, scale: 1 }} exit={{ y: -8, scale: 0.98 }}
            className="w-full max-w-[560px] overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_30px_80px_rgba(0,0,0,.6)]">
            <label htmlFor="palIn" className="sr-only">Search commands</label>
            <input id="palIn" ref={input} value={q} autoComplete="off" placeholder="Type a command…"
              onChange={e => { setQ(e.target.value); setSel(0); }}
              onKeyDown={e => {
                if (e.key === "ArrowDown") { e.preventDefault(); setSel(s => Math.min(items.length - 1, s + 1)); }
                if (e.key === "ArrowUp") { e.preventDefault(); setSel(s => Math.max(0, s - 1)); }
                if (e.key === "Enter") { e.preventDefault(); run(sel); }
              }}
              className="w-full border-b border-line bg-transparent px-5 py-4 font-mono text-base text-fg outline-none placeholder:text-muted" />
            <ul role="listbox" className="m-0 max-h-[50vh] list-none overflow-auto p-2">
              {items.length === 0 && <li className="p-3 text-muted">No matching command</li>}
              {items.map((c, i) => (
                <li key={c.label} role="option" aria-selected={i === sel} onMouseEnter={() => setSel(i)} onClick={() => run(i)}
                  className={`flex cursor-pointer justify-between gap-3 rounded-[10px] px-3.5 py-3 font-semibold ${i === sel ? "bg-accent/15 text-accent" : ""}`}>
                  {c.label}<span className="font-mono text-[0.78rem] font-normal text-muted">{c.hint}</span>
                </li>
              ))}
            </ul>
            <div className="border-t border-line px-4 py-2.5 font-mono text-[0.74rem] text-muted">↑↓ to move · Enter to run · Esc to close</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
