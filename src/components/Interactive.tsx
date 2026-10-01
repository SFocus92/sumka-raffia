"use client";

import Image from "next/image";
import { withBase } from "@/lib/site";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { faq, lookbook } from "@/data";
import { Reveal } from "./ui";

/* ------------------------------------------------------------ thread */

/** Нить, которая «вяжется» по мере прокрутки секции */
export function Thread({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.62 - r.top) / r.height));
      el.style.setProperty("--p", p.toFixed(4));
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
    <div className="thread" ref={ref}>
      <div className="thread-track" aria-hidden>
        <div className="thread-fill" />
        <div className="thread-needle" />
      </div>
      {children}
    </div>
  );
}

/* --------------------------------------------------------------- faq */

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="faq-list">
      {faq.map((item, i) => {
        const isOpen = open === i;
        return (
          <Reveal key={item.q} delay={i * 60}>
            <div className={`faq-item${isOpen ? " open" : ""}`}>
              <button
                className="faq-q"
                aria-expanded={isOpen}
                aria-controls={`faq-a-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className="faq-n">0{i + 1}</span>
                <span className="faq-t">{item.q}</span>
                <span className="faq-ic" aria-hidden />
              </button>
              <div className="faq-a" id={`faq-a-${i}`} role="region">
                <div>
                  <p>{item.a}</p>
                </div>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

/* ----------------------------------------------------------- lookbook */

export function Lookbook() {
  const rail = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, x: 0, left: 0, moved: false });
  const [lb, setLb] = useState<number | null>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const updateEdge = useCallback(() => {
    const el = rail.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 });
  }, []);

  useEffect(() => {
    updateEdge();
    const el = rail.current;
    el?.addEventListener("scroll", updateEdge, { passive: true });
    window.addEventListener("resize", updateEdge);
    return () => {
      el?.removeEventListener("scroll", updateEdge);
      window.removeEventListener("resize", updateEdge);
    };
  }, [updateEdge]);

  const scrollBy = (dir: 1 | -1) =>
    rail.current?.scrollBy({ left: dir * Math.min(720, window.innerWidth * 0.7), behavior: "smooth" });

  const onDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = rail.current;
    if (!el) return;
    drag.current = { down: true, x: e.clientX, left: el.scrollLeft, moved: false };
    el.classList.add("dragging");
  };
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    const el = rail.current;
    if (!d.down || !el) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 4) d.moved = true;
    el.scrollLeft = d.left - dx;
  };
  const onUp = () => {
    drag.current.down = false;
    rail.current?.classList.remove("dragging");
  };

  /* lightbox */
  useEffect(() => {
    if (lb === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLb(null);
      if (e.key === "ArrowRight") setLb((i) => (i === null ? i : (i + 1) % lookbook.length));
      if (e.key === "ArrowLeft") setLb((i) => (i === null ? i : (i - 1 + lookbook.length) % lookbook.length));
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lb]);

  const cur = lb !== null ? lookbook[lb] : null;

  return (
    <>
      <div className="look-bar container">
        <div className="look-count">
          <b>{String(lookbook.length).padStart(2, "0")}</b> кадров
        </div>
        <div className="look-arrows">
          <button onClick={() => scrollBy(-1)} disabled={edge.start} aria-label="Назад">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5m6-6-6 6 6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button onClick={() => scrollBy(1)} disabled={edge.end} aria-label="Вперёд">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <div
        className="look-rail"
        ref={rail}
        data-cursor="Тяните"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
      >
        {lookbook.map((it, i) => (
          <figure
            key={it.src}
            className="look-item"
            style={{ aspectRatio: `${it.w} / ${it.h}` } as CSSProperties}
            onClick={() => !drag.current.moved && setLb(i)}
          >
            <Image
              src={withBase(it.src)}
              alt={it.alt}
              fill
              sizes="(max-width: 700px) 70vw, 520px"
              className="look-img"
              draggable={false}
            />
            <figcaption>
              <span>{String(i + 1).padStart(2, "0")}</span>
              {it.caption}
            </figcaption>
          </figure>
        ))}
        <div className="look-end" />
      </div>

      {cur && lb !== null && (
        <div className="lb" onClick={() => setLb(null)} role="dialog" aria-modal="true" aria-label="Просмотр фото">
          <button className="lb-x" onClick={() => setLb(null)} aria-label="Закрыть">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
          <button
            className="lb-nav lb-prev"
            onClick={(e) => {
              e.stopPropagation();
              setLb((lb - 1 + lookbook.length) % lookbook.length);
            }}
            aria-label="Предыдущее"
          >
            ←
          </button>
          <div className="lb-stage" onClick={(e) => e.stopPropagation()}>
            <Image key={cur.src} src={withBase(cur.src)} alt={cur.alt} fill sizes="100vw" className="lb-img" priority />
          </div>
          <button
            className="lb-nav lb-next"
            onClick={(e) => {
              e.stopPropagation();
              setLb((lb + 1) % lookbook.length);
            }}
            aria-label="Следующее"
          >
            →
          </button>
          <div className="lb-cap">
            {String(lb + 1).padStart(2, "0")} / {String(lookbook.length).padStart(2, "0")} — {cur.caption}
          </div>
        </div>
      )}
    </>
  );
}
