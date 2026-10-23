"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { ELEMENTS, GROUP_COLOR, HOW, NAV, NEEDS, PRINCIPLES, STAGES, TECH_STRIP, TRUST } from "@/lib/content";
import { EMAIL } from "@/lib/site";
import { Logo, SectionHead } from "./ui";

const inView = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-60px" }, transition: { duration: 0.55, ease: [0.2, 0.8, 0.2, 1] as const } };

/* cursor spotlight for every .spot card */
export function Spotlight() {
  useEffect(() => {
    const move = (e: PointerEvent) => {
      const el = (e.target as HTMLElement).closest?.(".spot") as HTMLElement | null; if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`); el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    document.addEventListener("pointermove", move);
    return () => document.removeEventListener("pointermove", move);
  }, []);
  return null;
}

export function Marquee() {
  return (
    <div aria-label="Technologies we work with" className="overflow-hidden border-y border-line bg-surface py-[18px]">
      <div className="flex w-max animate-marquee gap-11 whitespace-nowrap font-mono text-[0.95rem] text-muted hover:[animation-play-state:paused] motion-reduce:w-auto motion-reduce:flex-wrap">
        {[...TECH_STRIP, ...TECH_STRIP].map((t, i) => (
          <span key={i} aria-hidden={i >= TECH_STRIP.length} className="after:ml-11 after:text-accent after:content-['/']">{t}</span>
        ))}
      </div>
    </div>
  );
}

export function Trust() {
  return (
    <section aria-label="Why teams trust StackGlint" className="border-t border-line bg-gradient-to-b from-surface to-bg py-[clamp(36px,4vw,56px)]">
      <div className="container-x grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        {TRUST.map((t, i) => (
          <motion.div key={t.label} {...inView} transition={{ ...inView.transition, delay: i * 0.07 }}
            className="spot grid content-start gap-1.5 rounded-[20px] border border-line bg-bg p-[22px]">
            <span className="font-display text-[clamp(2.4rem,1.8rem+2vw,3.4rem)] font-black leading-none tracking-[-0.03em] text-accent">
              {t.big}{t.unit && <small className="ml-1 text-[0.4em] font-bold tracking-normal text-muted">{t.unit}</small>}
            </span>
            <span className="font-mono text-[0.8rem] uppercase tracking-[0.04em]">{t.label}</span>
            <p className="mt-1 text-[0.95rem] text-muted">{t.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

const LEGEND: [string, string][] = [["var(--color-accent)", "frontend"], ["var(--color-ok)", "backend & data"], ["var(--color-gold)", "erp"], ["var(--color-lilac)", "ai"], ["var(--color-sky)", "cloud, devops & ci/cd"]];

export function Elements() {
  return (
    <section id="elements" className="scroll-mt-20 border-t border-line py-[clamp(56px,6.5vw,96px)]">
      <div className="container-x">
        <SectionHead cmd="ls --elements" title="The elements of our stack." lead="Eighteen technologies we use every week, grouped by the layer they live in." />
        <div className="grid grid-cols-2 gap-2 min-[400px]:grid-cols-3 min-[701px]:grid-cols-6 min-[1101px]:grid-cols-9 min-[400px]:gap-2.5">
          {ELEMENTS.map((e, i) => (
            <motion.div key={e.sym} tabIndex={0} {...inView} transition={{ ...inView.transition, delay: (i % 9) * 0.03 }}
              style={{ "--gc": GROUP_COLOR[e.group], "--spot": GROUP_COLOR[e.group] } as React.CSSProperties}
              className="spot group relative grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-2.5 overflow-hidden rounded-2xl border-[1.5px] border-[color-mix(in_srgb,var(--gc)_40%,var(--color-line))] bg-surface px-3 py-2.5 outline-none transition duration-300 before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:bg-[var(--gc)] hover:-translate-y-1 hover:border-[var(--gc)] hover:shadow-[0_14px_40px_-12px_var(--gc)] focus-visible:-translate-y-1 focus-visible:border-[var(--gc)] min-[400px]:aspect-[1/1.08] min-[400px]:grid-cols-1 min-[400px]:grid-rows-[auto_1fr_auto] min-[400px]:items-stretch">
              <span className="col-start-2 font-mono text-[0.72rem] tabular-nums text-muted min-[400px]:col-start-1">{String(i + 1).padStart(2, "0")}</span>
              <span className="absolute right-3 top-2.5 hidden font-mono text-[0.62rem] uppercase tracking-[0.08em] text-[color-mix(in_srgb,var(--gc)_80%,var(--color-muted))] min-[461px]:block">{e.group}</span>
              <span className="row-span-2 row-start-1 self-center font-display text-[1.9rem] font-extrabold leading-none tracking-[-0.03em] text-[var(--gc)] min-[400px]:row-span-1 min-[400px]:row-start-auto min-[400px]:text-[clamp(1.9rem,1.2rem+2.4vw,3.1rem)]">{e.sym}</span>
              <span className="col-start-2 text-[0.8rem] font-semibold leading-tight [overflow-wrap:anywhere] min-[400px]:col-start-1 min-[400px]:text-[clamp(0.66rem,0.6rem+0.3vw,0.86rem)]">{e.name}</span>
            </motion.div>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2.5 font-mono text-[0.8rem] text-muted">
          {LEGEND.map(([c, t]) => <span key={t} className="inline-flex items-center gap-2"><i className="size-2.5 rounded-[3px]" style={{ background: c }} />{t}</span>)}
        </div>
      </div>
    </section>
  );
}

export function Pipeline() {
  const [done, setDone] = useState<boolean[]>(() => STAGES.map(() => false));
  useEffect(() => { if (matchMedia("(prefers-reduced-motion: reduce)").matches) setDone(STAGES.map(() => true)); }, []);
  const n = done.filter(Boolean).length;
  const mark = (i: number) => setTimeout(() => setDone(d => d.map((v, j) => (j === i ? true : v))), 350);
  return (
    <section id="lifecycle" className="scroll-mt-20 border-t border-line py-[clamp(56px,6.5vw,96px)]">
      <div className="container-x">
        <SectionHead cmd="run --pipeline lifecycle" title="One pipeline, idea to production." lead="Every project runs through the same stages. Each one ends with something you can see, review and keep." />
        <div className="overflow-hidden rounded-[26px] border border-line bg-surface">
          <div className="flex flex-wrap items-center gap-2 border-b border-line px-[22px] py-4 font-mono text-[0.82rem] text-muted">
            <span className="flex gap-2" aria-hidden="true"><i className="size-[11px] rounded-full bg-[#FF5F57]" /><i className="size-[11px] rounded-full bg-[#FEBC2E]" /><i className="size-[11px] rounded-full bg-[#28C840]" /></span>
            <span className="ml-2">pipeline · your-project · main</span>
            <span className="ml-auto text-accent">{n} / {STAGES.length} passed</span>
          </div>
          <div className="h-[3px] bg-line"><motion.b className="block h-full bg-accent" animate={{ width: `${(n / STAGES.length) * 100}%` }} transition={{ duration: 0.6 }} /></div>
          {STAGES.map((s, i) => (
            <motion.div key={s.name} onViewportEnter={() => mark(i)} viewport={{ once: true, margin: "0px 0px -25% 0px" }}
              className="grid grid-cols-[44px_minmax(0,1fr)] items-center gap-x-4 gap-y-2 border-b border-line p-[22px] last:border-b-0 min-[861px]:grid-cols-[44px_minmax(0,0.9fr)_minmax(0,1.6fr)_minmax(0,1fr)] min-[861px]:gap-5">
              <span className={`relative grid size-[34px] place-items-center rounded-full border-2 transition-colors duration-300 ${done[i] ? "border-accent bg-accent" : "border-accent/35"}`} aria-hidden="true">
                {!done[i] && <span className="absolute -inset-0.5 animate-spin-fast rounded-full border-2 border-transparent border-t-accent" />}
                <motion.svg viewBox="0 0 24 24" className="size-[18px] fill-none stroke-ink [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:3.2]"
                  initial={false} animate={{ opacity: done[i] ? 1 : 0, scale: done[i] ? 1 : 0.4 }} transition={{ type: "spring", stiffness: 500, damping: 18 }}>
                  <path d="M5 12.5l4.5 4.5L19 7.5" />
                </motion.svg>
              </span>
              <div><span className="block font-mono text-[0.82rem] text-muted">0{i + 1}</span><span className="font-mono text-[1.05rem] font-bold tracking-[0.05em]">{s.name}</span></div>
              <p className="col-start-2 min-w-0 text-muted min-[861px]:col-start-auto">{s.text}</p>
              <span className={`col-start-2 justify-self-start rounded-full border px-3 py-1.5 text-center font-mono text-[0.82rem] transition-colors duration-300 min-[861px]:col-start-auto min-[861px]:justify-self-end ${done[i] ? "border-accent/45 text-accent" : "border-line text-muted"}`}>{s.out}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const HOW_ICON: Record<string, React.ReactNode> = {
  mail: <><rect x="3" y="5.5" width="18" height="13" rx="2.5" /><path d="M3.5 7l8.5 6 8.5-6" /></>,
  doc: <><path d="M7 3h7l4 4v14H7z" /><path d="M14 3v4h4M10 12h5M10 16h5" /></>,
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>,
};

export function How() {
  return (
    <section id="how" className="scroll-mt-20 border-t border-line py-[clamp(56px,6.5vw,96px)]">
      <div className="container-x">
        <SectionHead cmd="--how" title="Clear, documented, on time." lead="Remote work only works when nobody has to chase anybody. This is what you get on every project, in every time zone." />
        <div className="grid items-start gap-4 min-[901px]:grid-cols-2">
          <div className="grid gap-3.5">
            {HOW.map((h, i) => (
              <motion.div key={h.title} {...inView} transition={{ ...inView.transition, delay: i * 0.08 }}
                className="spot grid grid-cols-[56px_minmax(0,1fr)] items-start gap-[18px] rounded-[20px] border border-line bg-surface p-[22px]">
                <span className="grid size-14 place-items-center rounded-full bg-accent" aria-hidden="true">
                  <svg viewBox="0 0 24 24" className="size-[26px] fill-none stroke-ink [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2.4]">{HOW_ICON[h.icon]}</svg>
                </span>
                <div><h3 className="text-[1.25rem] font-bold">{h.title}</h3><p className="mt-1.5 text-muted">{h.text}</p></div>
              </motion.div>
            ))}
          </div>
          <motion.div {...inView} aria-label="Engineering principles" className="spot overflow-x-auto rounded-[20px] border border-line bg-surface p-[22px] font-mono text-[0.8rem] sm:text-[0.86rem]">
            <pre className="m-0 whitespace-pre-wrap leading-[1.85] [word-break:break-word] sm:whitespace-pre">
              <span className="text-muted"># engineering principles, enforced on every pull request</span>{"\n"}
              {PRINCIPLES.map(([k, v]) => <span key={k}><span className="text-lilac">{k}</span>:{" ".repeat(Math.max(1, 14 - k.length))}<span className="text-ok">{v}</span>{"\n"}</span>)}
              {"\n"}<span className="text-accent">✓ all checks passed</span>
            </pre>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null);
  const [note, setNote] = useState("");
  const [need, setNeed] = useState(NEEDS[0]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const onPrefill = (e: Event) => {
      const { need: n, line } = (e as CustomEvent<{ need: string; line: string }>).detail;
      setNeed(n);
      setMessage(m => `${line}\n\n${m.replace(/^I'm interested in: .*\n\n/, "")}`);
      setTimeout(() => document.getElementById("f-msg")?.focus({ preventScroll: true }), 600);
    };
    addEventListener("prefill-brief", onPrefill);
    return () => removeEventListener("prefill-brief", onPrefill);
  }, []);

  const copy = (text: string, ok: () => void, fail: () => void) => {
    try { navigator.clipboard.writeText(text).then(ok, fail); } catch { fail(); }
  };
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") || "").trim(), email = String(f.get("email") || "").trim(), company = String(f.get("company") || "").trim();
    if (!name || !email || !message.trim()) return setStatus({ ok: false, msg: "Add your name, email and a few words about the project." });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setStatus({ ok: false, msg: "That email address looks incomplete." });
    const body = `Project brief\n\nName: ${name}\nEmail: ${email}\nCompany: ${company || "-"}\nNeed: ${need}\n\n${message.trim()}`;
    const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(`Project enquiry: ${need}`)}&body=${encodeURIComponent(body)}`;
    copy(body, () => setStatus({ ok: true, msg: `✓ Brief copied. Your email app is opening; if it doesn't, paste it into an email to ${EMAIL}.` }),
      () => setStatus({ ok: true, msg: `Your email app is opening. If it doesn't, email us at ${EMAIL}.` }));
    window.location.href = mailto;
  };
  const field = "w-full min-w-0 rounded-xl border border-line bg-bg px-3.5 py-[13px] font-medium text-fg outline-none transition focus:border-accent";
  const label = "grid gap-[7px] text-[0.88rem] font-semibold text-muted";

  return (
    <section id="contact" className="scroll-mt-20 border-t border-line py-[clamp(56px,6.5vw,96px)]">
      <div className="container-x grid items-start gap-[clamp(28px,5vw,64px)] min-[901px]:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div className="grid gap-5">
          <SectionHead cmd="new project" title="Have something to build?" lead="Tell us what you need. We reply within one business day with questions or a first plan." />
          <div className="-mt-4 flex flex-wrap items-center gap-2.5">
            <span className="select-all break-all font-mono text-[clamp(1.1rem,1.04rem+0.4vw,1.35rem)] text-accent">{EMAIL}</span>
            <button type="button" onClick={() => copy(EMAIL, () => setNote("Email address copied."), () => setNote("Select the address and copy it."))}
              className="min-h-10 cursor-pointer rounded-[10px] border border-line bg-surface px-3.5 text-[0.88rem] font-semibold transition hover:border-accent">Copy email</button>
          </div>
          <p className="min-h-5 text-[0.86rem] text-muted" aria-live="polite">{note}</p>
        </div>
        <motion.form {...inView} noValidate onSubmit={submit} className="grid gap-4 rounded-[22px] border border-line bg-surface p-[clamp(20px,3vw,32px)]">
          <div className="grid gap-4 sm:grid-cols-2">
            <label htmlFor="f-name" className={label}>Your name<input id="f-name" name="name" autoComplete="name" required className={field} /></label>
            <label htmlFor="f-email" className={label}>Email<input id="f-email" name="email" type="email" autoComplete="email" required className={field} /></label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label htmlFor="f-company" className={label}>Company<input id="f-company" name="company" autoComplete="organization" className={field} /></label>
            <label htmlFor="f-type" className={label}>What do you need?
              <select id="f-type" name="need" value={need} onChange={e => setNeed(e.target.value)} className={field}>
                {NEEDS.map(n => <option key={n}>{n}</option>)}
              </select>
            </label>
          </div>
          <label htmlFor="f-msg" className={label}>About the project
            <textarea id="f-msg" name="message" required value={message} onChange={e => setMessage(e.target.value)} placeholder="What are you building, and by when?" className={`${field} min-h-[130px] resize-y`} />
          </label>
          <button type="submit" className="inline-flex min-h-[50px] cursor-pointer items-center gap-2.5 justify-self-start rounded-full bg-accent px-6 font-bold text-ink transition hover:-translate-y-0.5">
            Send my brief <span aria-hidden="true">→</span>
          </button>
          <p className={`min-h-[1.4em] font-mono text-[0.88rem] ${status?.ok === false ? "text-accent" : "text-ok"}`} aria-live="polite">{status?.msg}</p>
        </motion.form>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="overflow-hidden border-t border-line pb-8 pt-14">
      <div className="container-x">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <Logo variant="foot" className="[&>svg]:h-auto [&>svg]:w-full" />
        </motion.div>
        <div className="mt-7 flex flex-wrap justify-between gap-3.5 font-mono text-[0.82rem] text-muted">
          <span>Intelligent solutions. From code to cloud.</span>
          <span>{NAV.map((n, i) => <span key={n.href}>{i > 0 && " · "}<a href={n.href} className="no-underline hover:text-accent">{n.label.toLowerCase()}</a></span>)}</span>
          <span>© {new Date().getFullYear()} StackGlint</span>
        </div>
      </div>
    </footer>
  );
}
