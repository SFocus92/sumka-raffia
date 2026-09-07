"use client";

import { useEffect, useState } from "react";
import { bags } from "@/data";

/* ---------- header ---------- */

const links = [
  { href: "#collection", label: "Коллекция" },
  { href: "#craft", label: "О мастерской" },
  { href: "#care", label: "Уход" },
  { href: "#order", label: "Заказ" },
];

function Header({ onOrder }: { onOrder: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={`header${scrolled ? " scrolled" : ""}`}>
        <div className="container header-inner">
          <a href="#top" className="logo">
            Raffia <span>atelier</span>
          </a>
          <nav className="nav">
            {links.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>
          <button className="btn btn-primary header-cta" onClick={onOrder}>
            Заказать сумку
          </button>
          <button
            className={`burger${open ? " open" : ""}`}
            aria-label="Меню"
            onClick={() => setOpen(!open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>
      <div className={`mobile-nav${open ? " open" : ""}`}>
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
        <a href="#order" onClick={() => setOpen(false)}>
          Заказать сумку
        </a>
      </div>
    </>
  );
}

/* ---------- hero ---------- */

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-bg">
        {/* Photo by Mohamed Nuzrath on Unsplash */}
        <img src="/hero-main.jpg" alt="" />
      </div>
      <div className="container hero-inner">
        <div className="hero-text">
          <div className="section-tag">Вязаные сумки ручной работы</div>
          <h1>
            Сумки из рафии, <em>связанные</em> с любовью к лету
          </h1>
          <p className="hero-sub">
            Натуральное пальмовое волокно, плотная вязка крючком и желание
            сделать вашу летнюю историю завершенной. Каждая сумка создается
            вручную, в единственном экземпляре.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#collection">
              Смотреть коллекцию
            </a>
            <a className="btn btn-outline" href="#order">
              Заказать свою
            </a>
          </div>
          <div className="hero-stats">
            <div>
              <div className="stat-value">100%</div>
              <div className="stat-label">натуральная рафия</div>
            </div>
            <div>
              <div className="stat-value">12+</div>
              <div className="stat-label">часов вязки на сумку</div>
            </div>
            <div>
              <div className="stat-value">1 из 1</div>
              <div className="stat-label">каждая модель уникальна</div>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <img className="hero-photo" src="/bag-light.jpg" alt="Светлая сумка из рафии" />
          <div className="hero-badge">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2C9 2 7.5 4.5 7.5 7v1H7a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-7a3 3 0 0 0-3-3h-.5V7c0-2.5-1.5-5-4.5-5Zm2.5 6v1h-5V7c0-1.6.7-3 2.5-3s2.5 1.4 2.5 3Z"
                fill="#b09468"
              />
            </svg>
            <div>
              <div className="hero-badge-title">Ручная работа</div>
              <div className="hero-badge-text">вязка крючком, без станков</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- marquee ---------- */

function Marquee() {
  const items = [
    "Натуральная рафия",
    "Вязка крючком",
    "Единственный экземпляр",
    "Лето и море",
    "С любовью к деталям",
  ];
  const row = (
    <span>
      {items.map((t, i) => (
        <span key={i}>
          {t} <i>✦</i>
        </span>
      ))}
    </span>
  );
  return (
    <div className="marquee-section">
      <div className="marquee-track">
        {row}
        {row}
      </div>
    </div>
  );
}

/* ---------- collection ---------- */

function Collection({ onOrder }: { onOrder: (bag?: string) => void }) {
  return (
    <section className="section container" id="collection">
      <div className="reveal">
        <div className="section-tag">Коллекция</div>
        <h2 className="section-title">
          Модели, которые <em>хочется</em> взять с собой
        </h2>
      </div>
      <div className="collection-grid">
        {bags.map((bag, i) => (
          <article key={bag.id} className="bag-card reveal" style={{ transitionDelay: `${i * 120}ms` }}>
            <div className="bag-media">
              <div className={`bag-status${bag.available ? " available" : ""}`}>
                {bag.available ? "В наличии" : "Под заказ"}
              </div>
              <img src={bag.image} alt={bag.name} />
            </div>
            <div className="bag-body">
              <h3 className="bag-name">{bag.name}</h3>
              <div className="bag-price">{bag.price}</div>
              <p className="bag-desc">{bag.description}</p>
              <ul className="bag-features">
                {bag.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <div className="bag-actions">
                <button className="btn btn-primary" onClick={() => onOrder(bag.name)}>
                  Заказать
                </button>
                <a
                  className="btn-icon"
                  href={`https://t.me/share/url?url=${encodeURIComponent("https://sumka-raffia.vercel.app")}&text=${encodeURIComponent(`Привет! Интересует сумка "${bag.name}"`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Поделиться в Telegram"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#3d2f24">
                    <path d="M21.9 4.6c.3-1.2-.9-2.1-2-1.7L2.7 9.6c-1.2.5-1.2 2.2.1 2.6l4.4 1.4 1.7 5.3c.3 1 1.6 1.3 2.3.5l2.4-2.5 4.4 3.2c.9.7 2.2.2 2.5-.9l3.4-13.6ZM9.4 13.6l8.6-5.4c.4-.2.8.3.5.6l-7.1 6.6-.3 3-1.7-4.8Z" />
                  </svg>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------- craft ---------- */

const craftPoints = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6b5744" strokeWidth="1.6">
        <path d="M12 3c2.5 2 3.5 4.5 3.5 7 0 3-2 5.5-3.5 7-1.5-1.5-3.5-4-3.5-7 0-2.5 1-5 3.5-7Z" />
        <path d="M12 3c-2 1.5-4.5 2-6.5 1.5C5 7 6 10 8 12M12 3c2 1.5 4.5 2 6.5 1.5C19 7 18 10 16 12" />
        <path d="M12 17v4" />
      </svg>
    ),
    title: "Натуральное волокно",
    text: "Рафия — это листья пальмы рапидии. Прочное, легкое и дышащее волокно с теплым натуральным оттенком.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6b5744" strokeWidth="1.6">
        <path d="M5 3v7c0 4 3 7 7 7s7-3 7-7V3" />
        <path d="M5 3c1.5 0 3 1 3 3M19 3c-1.5 0-3 1-3 3M12 17v4M8 21h8" />
      </svg>
    ),
    title: "Вязка крючком",
    text: "Каждая сумка вяжется вручную, петля за петлей. Плотная вязка держит форму, ажурная дарит легкость.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6b5744" strokeWidth="1.6">
        <path d="m12 3 2.4 5.4 5.6.6-4.2 3.9 1.1 5.6-4.9-2.9-4.9 2.9 1.1-5.6L4 9l5.6-.6L12 3Z" />
      </svg>
    ),
    title: "Мастерица, не фабрика",
    text: "Сумки создает мастер вручную: подбирает оттенок, следит за плотностью петель и отделывает каждую деталь.",
  },
];

function Craft() {
  return (
    <section className="section craft" id="craft">
      <div className="container craft-inner">
        <div className="craft-media reveal">
          <img className="craft-photo" src="/bag-brown.jpg" alt="Коричневая сумка из рафии" />
          <img className="craft-photo-small" src="/craft.jpg" alt="Процесс вязки" />
        </div>
        <div className="craft-text reveal">
          <div className="section-tag">О мастерской</div>
          <h2 className="section-title">
            Вязаные руками, а не <em>штампованные</em> на фабрике
          </h2>
          <p>
            Мы работаем с рафией — классическим материалом летних и пляжных
            аксессуаров. Сумка вяжется крючком в несколько этапов: сначала
            дно и корпус, потом фурнитура и ремешок. На одну модель уходит
            больше 12 часов работы.
          </p>
          <div className="craft-points">
            {craftPoints.map((p) => (
              <div key={p.title} className="craft-point">
                <div className="craft-point-icon">{p.icon}</div>
                <div>
                  <div className="craft-point-title">{p.title}</div>
                  <div className="craft-point-text">{p.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- steps ---------- */

const steps = [
  {
    num: "01",
    title: "Выбираете модель",
    text: "Готовая сумка из коллекции или своя идея: размер, оттенок, длина ремешка.",
  },
  {
    num: "02",
    title: "Обсуждаем детали",
    text: "Созваниваемся или переписываемся, уточняем сроки и стоимость.",
  },
  {
    num: "03",
    title: "Ждете вязку",
    text: "Сумка вяжется вручную. Показываем процесс и промежуточные фото.",
  },
  {
    num: "04",
    title: "Получаете сумку",
    text: "Отправляем почтой или курьером. Бережно пакуем в крафт-бумагу.",
  },
];

function Steps() {
  return (
    <section className="section container">
      <div className="reveal">
        <div className="section-tag">Как заказать</div>
        <h2 className="section-title">
          Четыре шага до <em>летней</em> сумки
        </h2>
      </div>
      <div className="steps-grid">
        {steps.map((s, i) => (
          <div key={s.num} className="step-card reveal" style={{ transitionDelay: `${i * 100}ms` }}>
            <div className="step-num">{s.num}</div>
            <div className="step-title">{s.title}</div>
            <div className="step-text">{s.text}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- care ---------- */

const careCards = [
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#d4a373" strokeWidth="1.6">
        <path d="M12 3s6 7.5 6 12a6 6 0 0 1-12 0c0-4.5 6-12 6-12Z" />
      </svg>
    ),
    title: "Берегите от влаги",
    text: "Пальмовое волокно может деформироваться при намокании. Дождь и морская вода — главные враги рафии.",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#d4a373" strokeWidth="1.6">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
    title: "Сухое хранение",
    text: "Храните сумку в сухом проветриваемом месте, в тканевом мешке. Так рафия сохранит форму и оттенок.",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#d4a373" strokeWidth="1.6">
        <path d="M4 5h16M6 5c0 4 2.5 8 6 8s6-4 6-8M12 13v7M9 20h6" />
      </svg>
    ),
    title: "Мягкая чистка",
    text: "Пыль убирайте мягкой щеткой или сухой тканью. Не стирайте и не гладьте — волокно не любит агрессии.",
  },
];

function Care() {
  return (
    <section className="section care" id="care">
      <div className="container">
        <div className="reveal">
          <div className="section-tag">Уход за рафией</div>
          <h2 className="section-title">
            Немного заботы, и сумка <em>живет</em> годами
          </h2>
        </div>
        <div className="care-grid">
          {careCards.map((c, i) => (
            <div key={c.title} className="care-card reveal" style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="care-icon">{c.icon}</div>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- gallery ---------- */

function Gallery() {
  const photos = ["/beach.jpg", "/sunset.jpg", "/woman.jpg", "/bag-light.jpg", "/bag-brown.jpg", "/hero-bg.jpg"];
  return (
    <section className="section container">
      <div className="reveal">
        <div className="section-tag">Атмосфера</div>
        <h2 className="section-title">
          Сумка, которая <em>просится</em> в отпуск
        </h2>
      </div>
      <div className="gallery-grid">
        {photos.map((src, i) => (
          <img key={src} className="reveal" style={{ transitionDelay: `${i * 70}ms` }} src={src} alt="" />
        ))}
      </div>
    </section>
  );
}

/* ---------- order ---------- */

function Order({ preselect, formKey }: { preselect?: string; formKey: number }) {
  const [sent, setSent] = useState(false);

  return (
    <section className="section order" id="order">
      <div className="container order-inner">
        <div className="reveal">
          <div className="section-tag">Заказ</div>
          <h2 className="section-title">
            Давайте свяжем сумку <em>для вас</em>
          </h2>
          <ul className="order-list">
            <li>Ответим в течение дня в Telegram или WhatsApp</li>
            <li>Подскажем с выбором модели и оттенка</li>
            <li>Срок вязки под заказ: 5–10 дней</li>
            <li>Отправка по всей стране, доставка обсудим заранее</li>
          </ul>
        </div>
        <form
          key={formKey}
          className="order-form reveal"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <h3 className="form-title">Оставить заявку</h3>
          <p className="form-sub">Расскажите, какая сумка вам нужна, и мы все согласуем.</p>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="name">Имя</label>
              <input id="name" name="name" required placeholder="Как к вам обращаться" />
            </div>
            <div className="form-field">
              <label htmlFor="contact">Telegram или телефон</label>
              <input id="contact" name="contact" required placeholder="@username или +7..." />
            </div>
            <div className="form-field">
              <label htmlFor="model">Модель</label>
              <select id="model" name="model" defaultValue={preselect ?? "Не знаю, нужна консультация"}>
                {bags.map((b) => (
                  <option key={b.id} value={b.name}>
                    {b.name}
                  </option>
                ))}
                <option value="Не знаю, нужна консультация">Не знаю, нужна консультация</option>
                <option value="Свой дизайн">Свой дизайн</option>
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="comment">Комментарий</label>
              <textarea id="comment" name="comment" placeholder="Оттенок, размер, длина ремешка..." />
            </div>
          </div>
          <button className="btn btn-primary" type="submit" style={{ width: "100%", marginTop: 22 }}>
            Отправить заявку
          </button>
          <div className={`form-success${sent ? " show" : ""}`}>
            Заявка отправлена! Мы свяжемся с вами в течение дня.
          </div>
        </form>
      </div>
    </section>
  );
}

/* ---------- footer ---------- */

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <div className="footer-logo">
              Raffia <span>atelier</span>
            </div>
            <p className="footer-desc">
              Вязаные сумки из натуральной рафии. Ручная работа, летние
              истории и внимание к деталям.
            </p>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Навигация</div>
            {links.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Связаться</div>
            <a href="https://t.me/username" target="_blank" rel="noopener noreferrer">
              Telegram
            </a>
            <a href="https://wa.me/70000000000" target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
            <p>Пишите в любое время</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Raffia Atelier. Сумки ручной работы.</span>
          <span>Сделано с любовью к лету</span>
        </div>
      </div>
    </footer>
  );
}

/* ---------- modal ---------- */

function OrderModal({ open, bag, onClose }: { open: boolean; bag?: string; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className={`modal-overlay${open ? " open" : ""}`} onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Закрыть">
          ✕
        </button>
        <h3>{bag ? `Сумка «${bag}»` : "Заказать сумку"}</h3>
        <p className="modal-sub">
          Оставьте контакт, вернемся с деталями и точной стоимостью в течение дня.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onClose();
          }}
        >
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="m-name">Имя</label>
              <input id="m-name" required placeholder="Как к вам обращаться" />
            </div>
            <div className="form-field">
              <label htmlFor="m-contact">Telegram или телефон</label>
              <input id="m-contact" required placeholder="@username или +7..." />
            </div>
          </div>
          <button className="btn btn-primary" type="submit">
            Отправить заявку
          </button>
        </form>
      </div>
    </div>
  );
}

/* ---------- page ---------- */

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalBag, setModalBag] = useState<string | undefined>();
  const [preselect, setPreselect] = useState<string | undefined>();
  const [formKey, setFormKey] = useState(0);

  const openModal = (bag?: string) => {
    setModalBag(bag);
    setModalOpen(true);
  };

  const scrollToOrder = (bag?: string) => {
    if (bag) {
      setPreselect(bag);
      setFormKey((k) => k + 1);
    }
    document.getElementById("order")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleOrder = (bag?: string) => {
    if (window.innerWidth < 900) {
      scrollToOrder(bag);
    } else {
      openModal(bag);
    }
  };

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("visible");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <Header onOrder={() => handleOrder()} />
      <main>
        <Hero />
        <Marquee />
        <Collection onOrder={handleOrder} />
        <Craft />
        <Steps />
        <Care />
        <Gallery />
        <Order preselect={preselect} formKey={formKey} />
      </main>
      <Footer />
      <OrderModal open={modalOpen} bag={modalBag} onClose={() => setModalOpen(false)} />
    </>
  );
}
