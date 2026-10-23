"use client";

import { useEffect, useRef } from "react";
import geo from "@/lib/geo.json";
import { Icon } from "./ui";

type V = [number, number, number];
const ORBIT = ["web", "server", "db", "erp", "ai", "cloud", "box", "cicd"];
const D = Math.PI / 180;
const TILT = 18 * D;
const toV = (lo: number, la: number): V => [Math.cos(la * D) * Math.cos(lo * D), Math.cos(la * D) * Math.sin(lo * D), Math.sin(la * D)];
const CITIES: [number, number][] = [[151.2, -33.9], [139.7, 35.7], [103.8, 1.35], [55.3, 25.2], [13.4, 52.5], [-0.1, 51.5], [-79.4, 43.7], [-74, 40.7], [-46.6, -23.5], [28, -26.2]];

export default function Globe() {
  const box = useRef<HTMLDivElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);
  const tiles = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const el = box.current!, canvas = cv.current!, ctx = canvas.getContext("2d")!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const g = geo as { d: number[]; b: number[][] };
    const dots: V[] = []; for (let i = 0; i < g.d.length; i += 2) dots.push(toV(g.d[i], g.d[i + 1]));
    const lines: V[][] = g.b.map(a => { const o: V[] = []; for (let i = 0; i < a.length; i += 2) o.push(toV(a[i], a[i + 1])); return o; });
    const HUB = toV(79.9, 6.9), cities = CITIES.map(c => toV(c[0], c[1]));

    let W = 0, dpr = 1;
    const size = () => { dpr = Math.min(2, devicePixelRatio || 1); W = el.clientWidth; canvas.width = W * dpr; canvas.height = W * dpr; };
    size();
    const ro = new ResizeObserver(size); ro.observe(el);

    const proj = (v: V, c: number, cx: number, cy: number, R: number): V => {
      const s = Math.sin(c), k = Math.cos(c), xs = -v[0] * s + v[1] * k, dep = v[0] * k + v[1] * s;
      return [cx + R * xs, cy - R * (v[2] * Math.cos(TILT) - dep * Math.sin(TILT)), v[2] * Math.sin(TILT) + dep * Math.cos(TILT)];
    };
    const slerp = (a: V, b: V, u: number): V => {
      const d = Math.max(-1, Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2])), om = Math.acos(d);
      if (om < 1e-6) return a;
      const s0 = Math.sin((1 - u) * om) / Math.sin(om), s1 = Math.sin(u * om) / Math.sin(om);
      return [s0 * a[0] + s1 * b[0], s0 * a[1] + s1 * b[1], s0 * a[2] + s1 * b[2]];
    };

    // drag to spin, with momentum
    let rot = 95, vel = reduce ? 0 : -7, dragging = false, lastX = 0, lastT = 0;
    const down = (e: PointerEvent) => { dragging = true; lastX = e.clientX; lastT = performance.now(); el.setPointerCapture(e.pointerId); };
    const move = (e: PointerEvent) => { if (!dragging) return; const dx = e.clientX - lastX, now = performance.now(); rot += dx * 0.35; vel = (dx * 0.35) / Math.max(1, now - lastT) * 1000; lastX = e.clientX; lastT = now; };
    const up = () => { dragging = false; };
    el.addEventListener("pointerdown", down); el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up); el.addEventListener("pointercancel", up);

    const ACC = "#D4F53C";
    let prev = performance.now(), t = 0, raf = 0;
    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - prev) / 1000); prev = now; if (!reduce) t += dt;
      if (!dragging) { vel += (-7 - vel) * Math.min(1, dt * 1.5); if (!reduce) rot += vel * dt; }
      const S = W * dpr, cx = S / 2, cy = S / 2, R = S * 0.3, c = rot * D;
      ctx.clearRect(0, 0, S, S);
      let gr = ctx.createRadialGradient(cx, cy, R * 0.9, cx, cy, R * 1.35);
      gr.addColorStop(0, "rgba(212,245,60,0.22)"); gr.addColorStop(1, "rgba(212,245,60,0)");
      ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(cx, cy, R * 1.35, 0, 7); ctx.fill();
      gr = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.35, R * 0.1, cx, cy, R);
      gr.addColorStop(0, "#18210F"); gr.addColorStop(0.6, "#0A0E07"); gr.addColorStop(1, "#040503");
      ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.fill();
      const r = Math.max(1, R / 230); ctx.fillStyle = ACC;
      for (const v of dots) { const p = proj(v, c, cx, cy, R); if (p[2] > 0.02) { ctx.globalAlpha = 0.18 + 0.75 * p[2]; ctx.fillRect(p[0] - r, p[1] - r, 2 * r, 2 * r); } }
      ctx.globalAlpha = 0.5; ctx.strokeStyle = ACC; ctx.lineWidth = Math.max(0.8, R / 330); ctx.beginPath();
      for (const L of lines) { let pen = false; for (const v of L) { const p = proj(v, c, cx, cy, R); if (p[2] > 0) { if (pen) ctx.lineTo(p[0], p[1]); else ctx.moveTo(p[0], p[1]); pen = true; } else pen = false; } }
      ctx.stroke(); ctx.globalAlpha = 1; ctx.lineCap = "round";
      cities.forEach((dst, i) => {
        const ph = (((t + 3 + i * 0.6) % 6) / 6) * 3; if (ph > 1.6) return;
        const head = Math.min(1, ph), tail = Math.max(0, ph - 0.6); ctx.beginPath(); let pen = false;
        for (let j = 0; j <= 36; j++) {
          const u = tail + ((head - tail) * j) / 36, v = slerp(HUB, dst, u), h = 1 + 0.16 * Math.sin(Math.PI * u);
          const p = proj([v[0] * h, v[1] * h, v[2] * h], c, cx, cy, R), vis = p[2] > 0 || (p[0] - cx) ** 2 + (p[1] - cy) ** 2 > R * R;
          if (vis) { if (pen) ctx.lineTo(p[0], p[1]); else ctx.moveTo(p[0], p[1]); pen = true; } else pen = false;
        }
        ctx.strokeStyle = "rgba(255,255,255,.9)"; ctx.lineWidth = Math.max(1.5, R / 150); ctx.stroke();
        if (head >= 1) {
          const p = proj(dst, c, cx, cy, R), q = Math.min(1, (ph - 1) / 0.6);
          if (p[2] > 0) {
            ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(p[0], p[1], R / 80, 0, 7); ctx.fill();
            ctx.globalAlpha = 1 - q; ctx.strokeStyle = "#fff"; ctx.lineWidth = 1.5 * dpr; ctx.beginPath(); ctx.arc(p[0], p[1], R / 80 + (q * R) / 14, 0, 7); ctx.stroke(); ctx.globalAlpha = 1;
          }
        }
      });
      const hp = proj(HUB, c, cx, cy, R);
      if (hp[2] > 0) { ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(hp[0], hp[1], R / 60, 0, 7); ctx.fill(); }
      gr = ctx.createRadialGradient(cx, cy, R * 0.75, cx, cy, R); gr.addColorStop(0, "rgba(0,0,0,0)"); gr.addColorStop(1, "rgba(0,0,0,.55)");
      ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.fill();
      ctx.globalAlpha = 0.5; ctx.strokeStyle = ACC; ctx.lineWidth = 1.5 * dpr; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.stroke(); ctx.globalAlpha = 1;
      // orbiting service tiles
      const Rc = W * 0.3, n = tiles.current.length, base = -t * 0.35 + rot * D * 0.25;
      tiles.current.forEach((tile, i) => {
        if (!tile) return;
        const th = base + (2 * Math.PI * i) / n, d = Math.sin(th);
        const x = W / 2 + Rc * 1.42 * Math.cos(th), y = W / 2 + Rc * 0.44 * d + Rc * 0.12, s = 0.72 + (0.28 * (d + 1)) / 2, tw = tile.offsetWidth;
        tile.style.transform = `translate(${x - tw / 2}px, ${y - tw / 2}px) scale(${s.toFixed(3)})`;
        tile.style.zIndex = d > 0 ? "3" : "1";
        tile.style.opacity = (0.5 + (0.5 * (d + 1)) / 2).toFixed(3);
      });
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf); ro.disconnect();
      el.removeEventListener("pointerdown", down); el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up); el.removeEventListener("pointercancel", up);
    };
  }, []);

  return (
    <div ref={box} role="img" aria-label="Spinning globe with StackGlint's services orbiting it and delivery arcs to cities worldwide. Drag to rotate."
      className="relative mx-auto aspect-square w-full max-w-[640px] cursor-grab touch-pan-y active:cursor-grabbing">
      <canvas ref={cv} className="absolute inset-0 z-[2] size-full" />
      <span className="absolute right-[6%] top-[4%] z-[4] font-mono text-[0.74rem] text-muted" aria-hidden="true">drag to spin ↻</span>
      {ORBIT.map((name, i) => (
        <div key={name} ref={el => { tiles.current[i] = el; }}
          className="pointer-events-none absolute left-0 top-0 grid aspect-square w-[13%] place-items-center rounded-[24%] border-[1.5px] border-accent bg-surface will-change-transform">
          <Icon name={name} className="size-[62%] text-accent" />
        </div>
      ))}
    </div>
  );
}
