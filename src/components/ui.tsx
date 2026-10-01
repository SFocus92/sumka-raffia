"use client";

import Image from "next/image";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";
import { withBase } from "@/lib/site";

const reduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const finePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/* ---------------------------------------------------------------- in view */

export function useInView<T extends Element>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen] as const;
}

/* ----------------------------------------------------------------- reveal */

export function Reveal({
  children,
  delay = 0,
  className = "",
  style,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const [ref, seen] = useInView<HTMLDivElement>(0.12);
  return (
    <div
      ref={ref}
      className={`rv${seen ? " in" : ""} ${className}`}
      style={{ "--rd": `${delay}ms`, ...style } as CSSProperties}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ photo */

export function Photo({
  src,
  alt,
  ratio = "4 / 5",
  sizes = "(max-width: 900px) 100vw, 50vw",
  priority = false,
  parallax = 0,
  className = "",
  style,
  delay = 0,
  children,
}: {
  src: string;
  alt: string;
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  parallax?: number;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  children?: ReactNode;
}) {
  const [ref, seen] = useInView<HTMLDivElement>(0.08);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!parallax || reduced()) return;
    const box = ref.current;
    const el = inner.current;
    if (!box || !el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = box.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.bottom < -150 || r.top > vh + 150) return;
      const p = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2);
      el.style.transform = `translate3d(0, ${(-p * parallax * r.height).toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [parallax, ref]);

  return (
    <div
      ref={ref}
      className={`photo${seen ? " in" : ""} ${className}`}
      style={{ aspectRatio: ratio, "--rd": `${delay}ms`, ...style } as CSSProperties}
    >
      <div ref={inner} className={`photo-inner${parallax ? " has-px" : ""}`}>
        <Image src={withBase(src)} alt={alt} fill sizes={sizes} priority={priority} className="photo-img" />
      </div>
      {children}
    </div>
  );
}

/* ----------------------------------------------------------------- button */

function useMagnetic<T extends HTMLElement>(enabled: boolean) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled || !finePointer()) return;
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${(x * 0.2).toFixed(1)}px, ${(y * 0.3).toFixed(1)}px)`;
    };
    const leave = () => {
      el.style.transform = "";
    };
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
    };
  }, [enabled]);
  return ref;
}

export function Btn({
  children,
  variant = "primary",
  href,
  onClick,
  type = "button",
  className = "",
  external = false,
  full = false,
  disabled = false,
}: {
  children: ReactNode;
  variant?: "primary" | "ghost" | "light" | "gold";
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  external?: boolean;
  full?: boolean;
  disabled?: boolean;
}) {
  const aRef = useMagnetic<HTMLAnchorElement>(!!href);
  const bRef = useMagnetic<HTMLButtonElement>(!href);
  const cls = `btn btn-${variant}${full ? " btn-full" : ""} ${className}`;
  const inner = (
    <>
      <span className="btn-label">{children}</span>
      <svg className="btn-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </>
  );
  if (href) {
    return (
      <a
        ref={aRef}
        href={href}
        className={cls}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {inner}
      </a>
    );
  }
  return (
    <button ref={bRef} type={type} className={cls} onClick={onClick} disabled={disabled}>
      {inner}
    </button>
  );
}

/* -------------------------------------------------------------- count up */

export function CountUp({
  to,
  suffix = "",
  duration = 1800,
  delay = 0,
}: {
  to: number;
  suffix?: string;
  duration?: number;
  delay?: number;
}) {
  const [ref, seen] = useInView<HTMLSpanElement>(0.5);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!seen) return;
    let raf = 0;
    if (reduced()) {
      raf = requestAnimationFrame(() => setN(to));
      return () => cancelAnimationFrame(raf);
    }
    const timer = setTimeout(() => {
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / duration);
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [seen, to, duration, delay]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------ spot card */

export function SpotCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const onMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  };
  return (
    <div className={`spot ${className}`} onMouseMove={onMove}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------- rotating stamp */

export function Stamp({
  text = "HANDMADE ✦ RAFFIA ✦ CROCHET ✦ ",
  className = "",
}: {
  text?: string;
  className?: string;
}) {
  const id = useId();
  return (
    <svg className={`stamp ${className}`} viewBox="0 0 120 120" aria-hidden>
      <defs>
        <path id={id} d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0" />
      </defs>
      <g className="stamp-spin">
        <text fontSize="9.5" fontWeight="600" fill="currentColor">
          <textPath href={`#${id}`} textLength="276" lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </g>
      <path
        d="M60 44c-8 0-12 6-12 12v2h-1.5A5.5 5.5 0 0 0 41 63.500v8A5.500 5.500 0 0 0 46.500 77h27a5.500 5.500 0 0 0 5.500-5.500v-8a5.500 5.500 0 0 0-5.500-5.500H72v-2c0-6-4-12-12-12Zm6 14H54v-2c0-4 2-8 6-8s6 4 6 8v2Z"
        fill="currentColor"
        opacity=".9"
      />
    </svg>
  );
}

/* ------------------------------------------------------- scroll progress */

export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? Math.min(1, window.scrollY / h) : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return (
    <div className="progress" aria-hidden>
      <div ref={bar} className="progress-bar" />
    </div>
  );
}

/* ---------------------------------------------------------------- cursor */

export function Cursor() {
  const root = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!finePointer() || reduced()) return;
    const el = root.current;
    const lb = label.current;
    if (!el || !lb) return;

    let x = 0;
    let y = 0;
    let cx = 0;
    let cy = 0;
    let raf = 0;
    let started = false;

    const tick = () => {
      cx += (x - cx) * 0.2;
      cy += (y - cy) * 0.2;
      el.style.transform = `translate3d(${cx.toFixed(1)}px, ${cy.toFixed(1)}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    const move = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!started) {
        started = true;
        cx = x;
        cy = y;
        el.classList.add("vis");
        raf = requestAnimationFrame(tick);
      }
    };
    const over = (e: MouseEvent) => {
      const t = e.target as Element | null;
      const withLabel = t?.closest?.("[data-cursor]");
      const interactive = t?.closest?.("a, button, summary, select, input, textarea, label");
      const txt = withLabel?.getAttribute("data-cursor") ?? "";
      lb.textContent = txt;
      el.classList.toggle("big", !!withLabel);
      el.classList.toggle("link", !!interactive && !withLabel);
    };
    const leave = () => el.classList.remove("vis");
    const enter = () => started && el.classList.add("vis");

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    document.documentElement.addEventListener("mouseenter", enter);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.removeEventListener("mouseenter", enter);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={root} className="cursor" aria-hidden>
      <div className="cursor-in">
        <span ref={label} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- preloader */

export function Preloader() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 2800);
    return () => clearTimeout(t);
  }, []);
  if (done) return null;
  return (
    <div className="preloader" aria-hidden>
      <div className="pre-inner">
        <div className="pre-logo">
          <span className="pre-word">Raffia</span>
          <span className="pre-word pre-it">atelier</span>
        </div>
        <svg className="pre-stitch" viewBox="0 0 240 20" fill="none">
          <path d="M2 10h236" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="10 8" />
        </svg>
        <div className="pre-note">вязано вручную</div>
      </div>
    </div>
  );
}
