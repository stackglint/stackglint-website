"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { PROJECTS } from "@/lib/content";
import { BASE_PATH } from "@/lib/site";
import { SectionHead, TechChip } from "./ui";

const ease = [0.2, 0.8, 0.2, 1] as const;

/** Compact project slider: swipe on phones, arrows or drag on desktop. */
export default function Work() {
  const track = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false, progress: 0 });

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft > max - 8, progress: max > 0 ? el.scrollLeft / max : 1 });
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update);
    return () => { el.removeEventListener("scroll", update); removeEventListener("resize", update); };
  }, []);

  // Drag to scroll with a mouse (touch already swipes natively).
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let down = false, startX = 0, startLeft = 0, moved = false;
    const onDown = (e: PointerEvent) => { if (e.pointerType !== "mouse") return; down = true; moved = false; startX = e.clientX; startLeft = el.scrollLeft; };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 5) { moved = true; el.style.scrollSnapType = "none"; el.scrollLeft = startLeft - dx; }
    };
    const onUp = () => { if (!down) return; down = false; el.style.scrollSnapType = ""; };
    const onClick = (e: MouseEvent) => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } };
    el.addEventListener("pointerdown", onDown);
    addEventListener("pointermove", onMove);
    addEventListener("pointerup", onUp);
    el.addEventListener("click", onClick, true);
    return () => { el.removeEventListener("pointerdown", onDown); removeEventListener("pointermove", onMove); removeEventListener("pointerup", onUp); el.removeEventListener("click", onClick, true); };
  }, []);

  const slide = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("article");
    const step = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const arrow = "grid size-12 place-items-center rounded-full border-[1.5px] border-line text-fg transition hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-30";

  return (
    <section id="work" className="scroll-mt-20 border-t border-line py-[clamp(56px,6.5vw,96px)]">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHead small cmd="ls ./work"
            title={<>Things we&apos;ve <span className="text-accent">built</span>.</>}
            lead="Demo projects with sample data, built end to end. Two are live, so you can click around yourself." />
          <div className="mb-6 hidden gap-2.5 sm:flex md:mb-8">
            <button className={arrow} onClick={() => slide(-1)} disabled={edge.start} aria-label="Previous project">
              <svg viewBox="0 0 24 24" className="size-5 fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2.4]"><path d="M15 5l-7 7 7 7" /></svg>
            </button>
            <button className={arrow} onClick={() => slide(1)} disabled={edge.end} aria-label="Next project">
              <svg viewBox="0 0 24 24" className="size-5 fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2.4]"><path d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </div>

      {/* The track bleeds to the screen edge but starts aligned with the page content. */}
      <div ref={track} aria-label="Projects" tabIndex={0}
        className="flex cursor-grab snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain pb-2 [scrollbar-width:none] active:cursor-grabbing [&::-webkit-scrollbar]:hidden
                   px-[max(20px,calc((100vw-1240px)/2+20px))] scroll-px-[max(20px,calc((100vw-1240px)/2+20px))]">
        {PROJECTS.map((p, i) => (
          <motion.article key={p.slug}
            initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, ease, delay: Math.min(i, 3) * 0.08 }}
            className="spot group flex w-[min(82vw,360px)] shrink-0 snap-start flex-col overflow-hidden rounded-[20px] border border-line bg-surface">
            <div className="relative overflow-hidden border-b border-line bg-surface-2">
              <img src={`${BASE_PATH}/${p.image}`} alt={`${p.name}: ${p.type}`} width={1200} height={750} loading="lazy" draggable={false}
                className="block aspect-[16/10] w-full select-none object-cover object-left-top transition duration-700 group-hover:scale-[1.04]" />
              <span className="absolute left-3 top-3 rounded-full bg-bg/80 px-2.5 py-1 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-accent backdrop-blur">
                {p.live ? "● Live demo" : "Demo"}
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-3 p-5">
              <div>
                <div className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-muted">{p.type}</div>
                <h3 className="mt-1 font-display text-[1.45rem] font-extrabold leading-tight tracking-[-0.02em]">{p.name}</h3>
                <p className="mt-1.5 text-[0.95rem] leading-relaxed text-muted">{p.text}</p>
              </div>
              <div className="flex flex-wrap gap-1.5 [&>span]:scale-[0.92] [&>span]:origin-left">{p.tech.slice(0, 3).map(t => <TechChip key={t} name={t} />)}</div>
              <div className="mt-auto pt-1">
                {p.live ? (
                  <a href={p.live} target="_blank" rel="noopener noreferrer" draggable={false}
                    className="inline-flex items-center gap-1.5 font-bold text-accent hover:underline">Open live demo <span aria-hidden="true">↗</span></a>
                ) : (
                  <a href="#contact" draggable={false} className="inline-flex items-center gap-1.5 font-bold text-fg hover:text-accent">Ask for a walkthrough <span aria-hidden="true">→</span></a>
                )}
              </div>
            </div>
          </motion.article>
        ))}
        <div aria-hidden="true" className="w-px shrink-0" />
      </div>

      <div className="container-x mt-5">
        <div className="h-[3px] overflow-hidden rounded-full bg-line" aria-hidden="true">
          <div className="h-full rounded-full bg-accent transition-[width] duration-200" style={{ width: `${Math.max(12, edge.progress * 100)}%` }} />
        </div>
      </div>
    </section>
  );
}
