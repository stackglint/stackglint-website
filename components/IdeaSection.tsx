"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { PLANNER } from "@/lib/content";
import { SectionHead, TechChip, WindowDots } from "./ui";

/* ---------- idea -> sketch -> code -> product morph ---------- */
type B = [number, number, number, number, number, string, string, number, boolean]; // left, top, w, h, radius, bg, border, rotate, glow
const A = "var(--color-accent)", S2 = "var(--color-surface-2)", M = "var(--color-muted)", T = "transparent";
const UI: number[][] = [[4, 5, 92, 11, 10], [4, 20, 21, 75, 10], [28, 20, 68, 36, 10], [28, 60, 21, 35, 10], [51.5, 60, 21, 35, 10], [75, 60, 21, 35, 10], [78, 8, 15, 5, 99], [7, 8, 5, 5, 99]];
const ring = (i: number): B => { const a = (i / 8) * 2 * Math.PI - Math.PI / 2; return [50 + 15 * Math.cos(a) - 2.2, 50 + 24 * Math.sin(a) - 3.5, 4.4, 7, 99, A, T, 0, true]; };
const STATES: { file: string; stat: string; b: B[] }[] = [
  { file: "~/your-idea/idea.txt", stat: "thinking…", b: UI.map((_, i) => ring(i)) },
  { file: "~/your-idea/sketch.fig", stat: "sketching", b: UI.map((u, i) => [u[0] + (i % 2 ? 1 : -1), u[1] + (i % 3 ? 1.2 : -1), u[2], u[3], 6, T, M, i % 2 ? 1.6 : -1.4, false]) },
  { file: "~/your-idea/src/app.tsx", stat: "building", b: [[6, 10, 30, 6], [10, 22, 52, 6], [10, 34, 40, 6], [14, 46, 62, 6], [14, 58, 34, 6], [10, 70, 46, 6], [6, 82, 22, 6], [40, 10, 22, 6]]
      .map((c, i) => [c[0], c[1], c[2], c[3], 4, ["var(--color-lilac)", "var(--color-ok)", M, A, "var(--color-ok)", M, "var(--color-lilac)", A][i], T, 0, false] as B) },
  { file: "https://your-product.com", stat: "✓ live", b: UI.map((u, i) => [u[0], u[1], u[2], u[3], u[4], i === 2 ? "color-mix(in srgb, var(--color-accent) 22%, var(--color-surface))" : i >= 6 ? A : S2, i === 2 ? A : "var(--color-line)", 0, i === 2]) },
];
const STEPS = ["idea", "sketch", "code", "product"];

function Morph() {
  const [k, setK] = useState(0);
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setK(3); return; }
    let id: ReturnType<typeof setInterval> | undefined;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !id) id = setInterval(() => setK(x => (x + 1) % 4), 2200);
      if (!e.isIntersecting && id) { clearInterval(id); id = undefined; }
    });
    io.observe(box.current!);
    return () => { io.disconnect(); if (id) clearInterval(id); };
  }, []);
  const st = STATES[k];
  return (
    <div className="spot grid gap-3 rounded-[22px] border border-line bg-surface p-3.5" aria-label="Animation: an idea becomes a sketch, then code, then a finished product">
      <div className="flex justify-between gap-2.5 font-mono text-[0.76rem] text-muted">
        <span className="truncate">{st.file}</span><span className="whitespace-nowrap text-accent">{st.stat}</span>
      </div>
      <div ref={box} className="morph-grid relative aspect-[16/10] max-w-full overflow-hidden rounded-[14px] border border-line">
        <motion.div aria-hidden="true" animate={{ opacity: k === 0 ? 1 : 0, scale: k === 0 ? 1 : 0.4 }} transition={{ duration: 1 }}
          className="absolute left-[27%] top-[13%] aspect-square w-[46%] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-accent)_45%,transparent),transparent_65%)]" />
        {st.b.map((v, i) => (
          <i key={i} className="morph-b" style={{
            left: `${v[0]}%`, top: `${v[1]}%`, width: `${v[2]}%`, height: `${v[3]}%`, borderRadius: v[4], backgroundColor: v[5], borderColor: v[6],
            borderStyle: k === 1 ? "dashed" : "solid", transform: `rotate(${v[7]}deg)`,
            boxShadow: v[8] ? "0 0 24px color-mix(in srgb, var(--color-accent) 55%, transparent)" : "none",
          }} />
        ))}
      </div>
      <ol className="grid grid-cols-4 gap-1.5">
        {STEPS.map((s, i) => (
          <li key={s} className={`border-t-2 pt-2 font-mono text-[0.74rem] transition-colors ${i === k ? "border-accent text-accent" : i < k ? "border-accent/45 text-fg" : "border-line text-muted"}`}>
            <span className="opacity-60">0{i + 1} </span>{s}
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ---------- one-question planner ---------- */
function Planner() {
  const [cur, setCur] = useState(PLANNER[0].key);
  const p = PLANNER.find(x => x.key === cur)!;
  const use = () => {
    window.dispatchEvent(new CustomEvent("prefill-brief", { detail: { need: p.need, line: `I'm interested in: ${p.name}` } }));
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="spot overflow-hidden rounded-[22px] border border-line bg-surface">
      <div className="flex items-center gap-2 border-b border-line px-[22px] py-4 font-mono text-[0.82rem] text-muted"><WindowDots /><span className="ml-2">quick suggestion</span></div>
      <div className="grid gap-2.5 border-b border-line p-[22px]">
        <span className="font-mono text-[0.8rem] text-muted">What do you want to build?</span>
        <div className="flex flex-wrap gap-2">
          {PLANNER.map(o => (
            <button key={o.key} type="button" aria-pressed={o.key === cur} onClick={() => setCur(o.key)}
              className={`min-h-10 cursor-pointer rounded-full border px-3.5 text-[0.9rem] font-semibold transition ${o.key === cur ? "border-accent bg-accent text-ink" : "border-line bg-bg hover:border-accent/60"}`}>
              {o.label}
            </button>
          ))}
        </div>
      </div>
      <div className="min-h-[190px] p-[22px]" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div key={cur} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.22 }} className="grid gap-2.5">
            <span className="font-mono text-[0.76rem] uppercase tracking-[0.06em] text-accent">Our suggestion</span>
            <h3 className="text-[clamp(1.4rem,1.15rem+1vw,1.9rem)] font-bold">{p.name}</h3>
            <p className="max-w-[46ch] text-muted">{p.why}</p>
            <div className="mt-1 flex flex-wrap gap-1.5">{p.stack.map(s => <TechChip key={s} name={s} />)}</div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3 px-[22px] pb-[22px]">
        <button type="button" onClick={use} className="inline-flex min-h-[50px] cursor-pointer items-center gap-2.5 rounded-full bg-accent px-6 font-bold text-ink transition hover:-translate-y-0.5">
          Use this in my message <span aria-hidden="true">→</span>
        </button>
        <span className="text-[0.86rem] text-muted">We fine-tune it with you on a call.</span>
      </div>
    </div>
  );
}

export default function IdeaSection() {
  return (
    <section id="idea" className="scroll-mt-20 border-t border-line py-[clamp(48px,5vw,76px)]">
      <div className="container-x">
        <SectionHead small cmd="plan --from idea" title={<>Got an idea? <span className="text-accent">We&apos;ll help you shape it.</span></>}
          lead="Tell us what's on your mind. We'll suggest the right approach and the right tools." />
        <div className="grid items-start gap-[clamp(16px,2.4vw,28px)] min-[961px]:grid-cols-2">
          <Morph />
          <Planner />
        </div>
      </div>
    </section>
  );
}
