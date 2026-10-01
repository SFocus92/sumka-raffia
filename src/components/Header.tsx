"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { contacts, navLinks } from "@/data";
import { Btn } from "./ui";
import { useOrder } from "./OrderProvider";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#top" className={`logo ${className}`} aria-label="Raffia atelier — на главную">
      <svg width="26" height="26" viewBox="0 0 32 32" fill="none" aria-hidden>
        <circle cx="16" cy="16" r="14.500" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" />
        <path d="M11 15c0-3 2-6 5-6s5 3 5 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <rect x="8.500" y="15" width="15" height="9" rx="2.500" fill="currentColor" />
      </svg>
      <span className="logo-word">
        Raffia <em>atelier</em>
      </span>
    </a>
  );
}

export function Header() {
  const { openOrder } = useOrder();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (y > 400 && y > last + 6) setHidden(true);
      else if (y < last - 6 || y < 400) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = [...navLinks.map((l) => l.href.slice(1)), "order"];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) setActive(`#${en.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className={`header${scrolled ? " scrolled" : ""}${hidden && !open ? " hidden" : ""}`}>
        <div className="container header-inner">
          <Logo />
          <nav className="nav" aria-label="Основная навигация">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className={active === l.href ? "on" : ""}>
                {l.label}
              </a>
            ))}
          </nav>
          <div className="header-right">
            <Btn className="header-cta" onClick={() => openOrder()}>
              Заказать
            </Btn>
            <button
              className={`burger${open ? " open" : ""}`}
              aria-label={open ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div className={`mnav${open ? " open" : ""}`} aria-hidden={!open} inert={!open}>
        <div className="mnav-links">
          {navLinks.map((l, i) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} style={{ "--i": i } as CSSProperties}>
              <small>0{i + 1}</small>
              {l.label}
            </a>
          ))}
          <a
            href="#order"
            onClick={() => setOpen(false)}
            style={{ "--i": navLinks.length } as CSSProperties}
          >
            <small>06</small>
            Заказ
          </a>
        </div>
        <div className="mnav-foot">
          <a href={contacts.telegram} target="_blank" rel="noopener noreferrer">
            Telegram
          </a>
          {contacts.whatsapp && (
            <a href={contacts.whatsapp} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          )}
        </div>
      </div>
    </>
  );
}
