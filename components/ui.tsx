import { ICONS, LOGO_FOOT, LOGO_NAV } from "@/lib/brand";
import { SYMBOL } from "@/lib/content";

export function Logo({ variant = "nav", className = "" }: { variant?: "nav" | "foot"; className?: string }) {
  return (
    <span
      role="img"
      aria-label="StackGlint"
      className={`block [&>svg]:block [&>svg]:h-full [&>svg]:w-auto ${className}`}
      dangerouslySetInnerHTML={{ __html: variant === "nav" ? LOGO_NAV : LOGO_FOOT }}
    />
  );
}

export function Icon({ name, className = "" }: { name: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      className={`fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:6.5] ${className}`}
      dangerouslySetInnerHTML={{ __html: ICONS[name] ?? "" }}
    />
  );
}

export function Cmd({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[0.82rem] text-muted">
      $ <b className="font-medium text-accent">stackglint</b> {children}
    </span>
  );
}

export function SectionHead({ cmd, title, lead, small = false }: { cmd: string; title: React.ReactNode; lead?: string; small?: boolean }) {
  return (
    <div className={`grid max-w-[860px] gap-3.5 ${small ? "mb-6 md:mb-8" : "mb-7 md:mb-11"}`}>
      <Cmd>{cmd}</Cmd>
      <h2 className={`font-extrabold tracking-[-0.025em] leading-[1.04] ${small ? "text-[clamp(1.7rem,1.25rem+1.6vw,2.5rem)]" : "text-[clamp(2.1rem,1.4rem+2.8vw,3.8rem)]"}`}>
        {title}
      </h2>
      {lead && <p className={`max-w-[58ch] text-muted ${small ? "text-base" : "text-[clamp(1.1rem,1.04rem+0.4vw,1.35rem)] leading-relaxed"}`}>{lead}</p>}
    </div>
  );
}

export function TechChip({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-accent/60 bg-accent/5 py-1 pl-1 pr-3 font-mono text-[0.84rem]">
      <b className="grid h-[26px] min-w-[30px] place-items-center rounded-full bg-accent px-1.5 font-display text-[0.85rem] font-extrabold text-ink">
        {SYMBOL[name] ?? name.slice(0, 2)}
      </b>
      {name}
    </span>
  );
}

export function WindowDots() {
  return (
    <span className="flex gap-2" aria-hidden="true">
      <i className="size-[11px] rounded-full bg-[#FF5F57]" />
      <i className="size-[11px] rounded-full bg-[#FEBC2E]" />
      <i className="size-[11px] rounded-full bg-[#28C840]" />
    </span>
  );
}

export function Button({ href, children, variant = "primary", className = "", ...rest }:
  { href?: string; children: React.ReactNode; variant?: "primary" | "ghost"; className?: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const cls = `inline-flex min-h-[50px] cursor-pointer items-center justify-center gap-2.5 whitespace-nowrap rounded-full border-[1.5px] px-6 text-[0.98rem] font-bold no-underline transition duration-150 ${
    variant === "primary"
      ? "border-accent bg-accent text-ink hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-10px_var(--color-accent)]"
      : "border-line text-fg hover:border-accent hover:text-accent"
  } ${className}`;
  return href ? <a href={href} className={cls}>{children}</a> : <button className={cls} {...rest}>{children}</button>;
}
