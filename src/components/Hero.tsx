"use client";

import { useRef, type CSSProperties } from "react";
import { Btn, CountUp, Photo, Stamp } from "./ui";
import { OrderButton } from "./OrderProvider";

const k = (n: number, i?: number) => ({ "--k": n, ...(i !== undefined ? { "--i": i } : {}) }) as CSSProperties;

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
    el.style.setProperty("--my", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
  };

  return (
    <section className="hero" id="top" ref={ref} onMouseMove={onMove}>
      <div className="hero-bg weave" aria-hidden />
      <div className="hero-glow" aria-hidden />

      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="eyebrow hero-in" style={k(0, 0)}>
            <i />
            Вязаные сумки ручной работы
          </div>

          <h1 className="hero-title">
            <span className="ln">
              <span style={{ "--i": 1 } as CSSProperties}>Сумки из рафии,</span>
            </span>
            <span className="ln">
              <span style={{ "--i": 2 } as CSSProperties}>
                <em>связанные</em>
              </span>
            </span>
            <span className="ln">
              <span style={{ "--i": 3 } as CSSProperties}>с любовью к лету</span>
            </span>
          </h1>

          <p className="hero-sub hero-in" style={k(0, 4)}>
            Натуральное пальмовое волокно, плотная вязка крючком и желание сделать вашу летнюю историю
            завершённой. Каждая сумка создаётся вручную — в единственном экземпляре.
          </p>

          <div className="hero-actions hero-in" style={k(0, 5)}>
            <Btn href="#collection">Смотреть коллекцию</Btn>
            <OrderButton variant="ghost">Заказать свою</OrderButton>
          </div>

          <dl className="hero-stats hero-in" style={k(0, 6)}>
            <div>
              <dt>
                <CountUp to={100} suffix="%" delay={2300} />
              </dt>
              <dd>натуральная рафия</dd>
            </div>
            <div>
              <dt>
                <CountUp to={12} suffix="+" delay={2400} />
              </dt>
              <dd>часов вязки на сумку</dd>
            </div>
            <div>
              <dt>1 из 1</dt>
              <dd>каждая модель уникальна</dd>
            </div>
          </dl>
        </div>

        <div className="hero-visual">
          <div className="layer" style={k(-12)}>
            <div className="hero-ring" aria-hidden />
          </div>

          <div className="layer layer-main" style={k(14)}>
            <Photo
              className="arch"
              src="/images/bag-light.jpg"
              alt="Светлая мини-сумка из рафии с длинным ремешком"
              ratio="4 / 5.3"
              priority
              parallax={0.05}
              delay={1900}
              sizes="(max-width: 900px) 80vw, 460px"
            />
          </div>

          <div className="layer layer-small" style={k(-24)}>
            <Photo
              className="round"
              src="/images/crochet-closeup.jpg"
              alt="Плетение из натуральных волокон крупным планом"
              ratio="1 / 1"
              delay={2300}
              sizes="220px"
            />
          </div>

          <div className="layer layer-stamp" style={k(10)}>
            <Stamp />
          </div>

          <div className="hangtag" aria-hidden>
            <span className="hangtag-pin" />
            <span className="hangtag-string" />
            <div className="hangtag-card">
              <small>hand-crocheted</small>
              <b>№ 001</b>
              <span>1 из 1</span>
            </div>
          </div>

          <div className="hero-chip">
            <span className="dot" />
            <div>
              <b>Светлая мини</b>
              <small>В наличии · 3 900 ₽</small>
            </div>
          </div>
        </div>
      </div>

      <a className="scroll-cue" href="#collection" aria-label="Прокрутить вниз">
        <span className="scroll-line" />
        Листайте
      </a>
    </section>
  );
}
