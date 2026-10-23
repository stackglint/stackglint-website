"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import Globe from "./Globe";
import { Button, Cmd, WindowDots } from "./ui";

const LOG = [
  { t: 0, html: <><span className="text-accent">$</span> <span className="text-fg">git push origin main</span></> },
  { t: 500, html: <><span className="text-ok">✓</span> lint · passed</> },
  { t: 850, html: <><span className="text-ok">✓</span> test · passed</> },
  { t: 1200, html: <><span className="text-ok">✓</span> build · done</> },
  { t: 1650, html: <><span className="text-ok">✓</span> deploy · eu-west, us-east, ap-south</> },
  { t: 2150, html: <><span className="text-accent">→</span> <span className="text-fg">status: 200 OK · live</span></> },
];

function DeployLog() {
  const [n, setN] = useState(LOG.length);
  const [run, setRun] = useState(0);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setN(0);
    const timers = LOG.map((l, i) => setTimeout(() => setN(i + 1), l.t));
    const loop = setTimeout(() => setRun(r => r + 1), 9000);
    return () => { timers.forEach(clearTimeout); clearTimeout(loop); };
  }, [run]);
  return (
    <div aria-label="Example deployment log"
      className="z-[5] mt-2 w-full rounded-[14px] border border-line bg-surface/90 px-3.5 py-3 font-mono text-[0.76rem] leading-[1.75] text-muted shadow-[0_20px_50px_rgba(0,0,0,.5)] backdrop-blur-md min-[521px]:absolute min-[521px]:bottom-[2%] min-[521px]:left-[2%] min-[521px]:mt-0 min-[521px]:w-[min(360px,78%)]">
      <div className="mb-1.5"><WindowDots /></div>
      <AnimatePresence initial={false}>
        {LOG.slice(0, n).map((l, i) => (
          <motion.div key={`${run}-${i}`} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} className="truncate">{l.html}</motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

const fade = (d: number) => ({ initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: d, ease: [0.2, 0.8, 0.2, 1] as const } });

export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-[clamp(36px,4.5vw,64px)] pt-[clamp(24px,3.5vw,52px)]">
      <div aria-hidden="true" className="grid-bg pointer-events-none absolute inset-0 opacity-35 [mask-image:radial-gradient(ellipse_at_50%_30%,#000_0%,transparent_70%)]" />
      <div className="container-x relative grid items-center gap-[clamp(24px,4vw,56px)] min-[981px]:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)]">
        <div className="grid min-w-0 gap-6">
          <motion.span {...fade(0)} className="inline-flex w-fit max-w-full items-center gap-2.5 rounded-full border border-line bg-surface py-[7px] pl-2.5 pr-3.5 font-mono text-[0.82rem] text-muted">
            <span className="size-[9px] shrink-0 animate-pulse-ring rounded-full bg-ok" aria-hidden="true" />
            7+ years shipping production software · taking new projects
          </motion.span>
          <motion.h1 {...fade(0.08)} className="text-[clamp(2.9rem,1.5rem+5.6vw,6.1rem)] font-black leading-[0.95] tracking-[-0.04em]">
            We ship software <span className="text-accent">from code to&nbsp;cloud.</span>
          </motion.h1>
          <motion.p {...fade(0.16)} className="max-w-[58ch] text-[clamp(1.1rem,1.04rem+0.4vw,1.35rem)] leading-relaxed text-muted">
            StackGlint is a team of engineers with 7+ years of hands-on industry experience. Bring us an idea or an existing system. We advise,
            design, build, deploy and support it across the entire software life cycle, as your long-term technology partner.
          </motion.p>
          <motion.div {...fade(0.24)} className="flex flex-wrap gap-3">
            <Button href="#contact">Start a project <span aria-hidden="true">→</span></Button>
            <Button href="#stack" variant="ghost">Explore the stack</Button>
          </motion.div>
          <motion.div {...fade(0.32)}><Cmd>--services websites, e-commerce, full-stack, odoo-erp, cloud, devops, ai</Cmd></motion.div>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.1 }} className="relative min-w-0">
          <Globe />
          <DeployLog />
        </motion.div>
      </div>
    </section>
  );
}
