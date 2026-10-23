"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { LAYERS } from "@/lib/content";
import { Icon, SectionHead, TechChip } from "./ui";

export default function StackLayers() {
  const [cur, setCur] = useState(0);
  const touched = useRef(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => { if (!touched.current) setCur(c => (c + 1) % LAYERS.length); }, 3800);
    return () => clearInterval(id);
  }, []);
  const choose = (i: number) => { touched.current = true; setCur(i); };
  const L = LAYERS[cur];

  return (
    <section id="stack" className="scroll-mt-20 border-t border-line py-[clamp(56px,6.5vw,96px)]">
      <div className="container-x">
        <SectionHead cmd="describe --stack" title="Our stack, literally." lead="Five layers, one team. Pick a layer to see what we build there." />
        <div className="grid items-center gap-[clamp(20px,4vw,56px)] min-[901px]:grid-cols-2">
          <div aria-hidden="true" className="scene relative min-w-0 h-[calc(var(--pw)*0.95+var(--gap)*4+110px)] min-[901px]:h-[clamp(360px,40vw,500px)]">
            <div className="iso absolute left-1/2 top-[66%] size-0 min-[901px]:top-[56%]">
              {LAYERS.map((l, k) => (
                <button key={l.name} type="button" tabIndex={-1} onClick={() => choose(k)} data-on={k === cur}
                  style={{ "--i": LAYERS.length - 1 - k } as React.CSSProperties}
                  className="plate absolute block cursor-pointer rounded-[26px] border-[1.5px] border-accent/55 p-0 data-[on=true]:border-accent">
                  <span className={`absolute right-5 top-4 font-mono text-[0.8rem] ${k === cur ? "text-accent" : "text-muted"}`}>L0{k + 1}</span>
                  <span className="absolute bottom-[18px] left-[22px] flex items-center gap-2.5 font-mono text-[clamp(0.72rem,0.6rem+0.4vw,0.95rem)] font-bold uppercase tracking-[0.08em] text-fg">
                    <Icon name={l.icon} className="size-[30px] text-accent [stroke-width:7]" />{l.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className="grid min-w-0 gap-5">
            <div role="tablist" aria-label="Stack layers" className="grid gap-1.5">
              {LAYERS.map((l, k) => (
                <button key={l.name} ref={el => { tabs.current[k] = el; }} role="tab" type="button" aria-selected={k === cur} aria-controls="layer-panel" tabIndex={k === cur ? 0 : -1}
                  onClick={() => choose(k)}
                  onKeyDown={e => {
                    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
                    e.preventDefault();
                    const n = (cur + (e.key === "ArrowDown" ? 1 : -1) + LAYERS.length) % LAYERS.length;
                    choose(n); tabs.current[n]?.focus();
                  }}
                  className={`grid cursor-pointer grid-cols-[30px_minmax(0,1fr)] items-center gap-3 rounded-[14px] border px-4 py-3 text-left transition min-[421px]:grid-cols-[40px_minmax(0,1fr)_auto] ${
                    k === cur ? "border-line bg-surface" : "border-transparent hover:bg-surface"}`}>
                  <span className={`font-mono text-[0.8rem] ${k === cur ? "text-accent" : "text-muted"}`}>0{k + 1}</span>
                  <span className="font-display text-[1.12rem] font-bold">{l.name}</span>
                  <span className={`hidden font-mono text-[0.76rem] min-[421px]:inline ${k === cur ? "text-accent" : "text-muted"}`}>{l.tag}</span>
                </button>
              ))}
            </div>
            <div id="layer-panel" role="tabpanel" aria-live="polite" className="spot min-h-[230px] rounded-[20px] border border-line bg-surface p-[clamp(20px,2.6vw,30px)]">
              <AnimatePresence mode="wait">
                <motion.div key={cur} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }} className="grid gap-3.5">
                  <span className="font-mono text-[0.82rem] text-muted"><b className="font-medium text-accent">layer 0{cur + 1}</b> · {L.code}</span>
                  <h3 className="text-[clamp(1.15rem,1.06rem+0.45vw,1.4rem)] font-bold">{L.title}</h3>
                  <p className="text-muted">{L.text}</p>
                  <ul className="grid gap-1.5">
                    {L.items.map(it => <li key={it} className="relative pl-[22px] before:absolute before:left-0 before:font-mono before:text-accent before:content-['→']">{it}</li>)}
                  </ul>
                  <div className="flex flex-wrap gap-2">{L.tech.map(t => <TechChip key={t} name={t} />)}</div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
