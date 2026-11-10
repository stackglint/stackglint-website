"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { PROJECTS, type ProjectKind } from "@/lib/content";
import { BASE_PATH } from "@/lib/site";
import { SectionHead, TechChip, WindowDots } from "./ui";

const FILTERS: { key: "all" | ProjectKind; label: string }[] = [
  { key: "all", label: "All" }, { key: "web", label: "Web apps" }, { key: "site", label: "Websites" }, { key: "odoo", label: "Odoo ERP" },
];

const ease = [0.2, 0.8, 0.2, 1] as const;

export default function Work() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["key"]>("all");
  const shown = PROJECTS.filter(p => filter === "all" || p.kind === filter);

  return (
    <section id="work" className="scroll-mt-20 border-t border-line py-[clamp(56px,6.5vw,96px)]">
      <div className="container-x">
        <SectionHead cmd="ls ./work"
          title={<>Things we&apos;ve <span className="text-accent">built</span>.</>}
          lead="Demo projects we built end to end, with sample data, to show how we work. Two are live, so you can click around yourself." />

        <div role="tablist" aria-label="Filter projects" className="mb-7 flex flex-wrap gap-2">
          {FILTERS.map(f => {
            const count = f.key === "all" ? PROJECTS.length : PROJECTS.filter(p => p.kind === f.key).length;
            const on = filter === f.key;
            return (
              <button key={f.key} role="tab" aria-selected={on} onClick={() => setFilter(f.key)}
                className={`inline-flex min-h-[42px] items-center gap-2 rounded-full border-[1.5px] px-4 font-mono text-[0.86rem] transition ${on ? "border-accent bg-accent text-ink" : "border-line text-muted hover:border-accent hover:text-fg"}`}>
                {f.label}<span className={`text-[0.75rem] ${on ? "text-ink/70" : "text-muted/70"}`}>{count}</span>
              </button>
            );
          })}
        </div>

        <motion.div layout className="grid gap-5 min-[901px]:grid-cols-2">
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((p, i) => (
              <motion.article key={p.slug} layout
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
                exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.5, ease, delay: (i % 2) * 0.08 }}
                className={`spot group flex flex-col overflow-hidden rounded-[22px] border border-line bg-surface ${i === 0 && filter === "all" ? "min-[901px]:col-span-2 min-[901px]:grid min-[901px]:grid-cols-[1.35fr_1fr]" : ""}`}>
                <div className="relative flex flex-col border-b border-line bg-surface-2 min-[901px]:border-b-0">
                  <div className="flex items-center gap-3 border-b border-line px-4 py-2.5">
                    <WindowDots />
                    <span className="truncate font-mono text-[0.75rem] text-muted">{p.live ? p.live.replace("https://", "") : `${p.slug} · demo`}</span>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <img src={`${BASE_PATH}/${p.image}`} alt={`${p.name}: ${p.type}`} width={1200} height={750} loading="lazy"
                      className="block aspect-[16/10] h-full w-full object-cover object-left-top transition duration-700 group-hover:scale-[1.03]" />
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-4 p-[22px] sm:p-7">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[0.78rem] uppercase tracking-[0.12em] text-accent">{p.type}</span>
                    <span className="rounded-full border border-line px-2 py-0.5 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">Demo</span>
                  </div>
                  <div>
                    <h3 className="font-display text-[clamp(1.5rem,1.2rem+1vw,2rem)] font-extrabold leading-tight tracking-[-0.02em]">{p.name}</h3>
                    <p className="mt-2 text-muted">{p.text}</p>
                  </div>
                  <ul className="grid gap-2 text-[0.95rem]">
                    {p.points.map(pt => (
                      <li key={pt} className="flex gap-2.5"><span aria-hidden="true" className="mt-[9px] size-1.5 shrink-0 rounded-full bg-accent" />{pt}</li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">{p.tech.map(t => <TechChip key={t} name={t} />)}</div>
                  <div className="mt-auto flex flex-wrap gap-3 pt-2">
                    {p.live ? (
                      <a href={p.live} target="_blank" rel="noopener noreferrer"
                        className="inline-flex min-h-[46px] items-center gap-2 rounded-full border-[1.5px] border-accent bg-accent px-5 text-[0.95rem] font-bold text-ink transition hover:-translate-y-0.5">
                        Open live demo <span aria-hidden="true">↗</span>
                      </a>
                    ) : null}
                    <a href="#contact"
                      className="inline-flex min-h-[46px] items-center gap-2 rounded-full border-[1.5px] border-line px-5 text-[0.95rem] font-bold transition hover:border-accent hover:text-accent">
                      {p.live ? "Want one like this?" : "Ask for a walkthrough"}
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
