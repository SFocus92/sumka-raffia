import type { CSSProperties, ReactNode } from "react";
import { bags, contacts, navLinks } from "@/data";
import { Btn, Photo, Reveal, SpotCard, Stamp } from "./ui";
import { OrderButton, OrderForm, OrderTrigger } from "./OrderProvider";
import { Faq, Lookbook, Thread } from "./Interactive";
import { Logo } from "./Header";

const i = (n: number) => ({ "--i": n }) as CSSProperties;

function Head({
  tag,
  children,
  lead,
  light = false,
}: {
  tag: string;
  children: ReactNode;
  lead?: string;
  light?: boolean;
}) {
  return (
    <div className={`sec-head${light ? " light" : ""}`}>
      <Reveal>
        <div className="eyebrow">
          <i />
          {tag}
        </div>
        <h2 className="h2">{children}</h2>
      </Reveal>
      {lead && (
        <Reveal delay={150}>
          <p className="sec-lead">{lead}</p>
        </Reveal>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- marquee */

export function Marquee() {
  const items = ["Натуральная рафия", "Вязка крючком", "Единственный экземпляр", "Лето и море", "С любовью к деталям"];
  const row = (
    <ul className="marquee-row" aria-hidden>
      {items.map((t) => (
        <li key={t}>
          <span>{t}</span>
          <i>✦</i>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee" aria-label="Особенности мастерской">
      <div className="marquee-track">
        {row}
        {row}
        {row}
        {row}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- collection */

export function Collection() {
  return (
    <section className="section" id="collection">
      <div className="container">
        <Head
          tag="Коллекция · 01"
          lead="Каждая модель вяжется вручную, петля за петлей. Готовые сумки в наличии — отправим сразу, остальные свяжем под заказ."
        >
          Модели, которые <em>хочется</em> взять с собой
        </Head>

        <div className="bags">
          {bags.map((bag, idx) => (
            <Reveal key={bag.id} delay={idx * 140} className="bag">
              <OrderTrigger model={bag.name} className="bag-media" cursor="Заказать">
                <Photo
                  src={bag.image}
                  alt={bag.alt}
                  ratio={bag.ratio}
                  parallax={0.05}
                  sizes="(max-width: 800px) 92vw, 560px"
                />
                <span className={`badge${bag.available ? " ok" : ""}`}>
                  <i />
                  {bag.available ? "В наличии" : "Под заказ"}
                </span>
                <span className="bag-no">N° 0{idx + 1}</span>
              </OrderTrigger>

              <div className="bag-info">
                <div className="bag-row">
                  <h3 className="bag-name">{bag.name}</h3>
                  <div className="bag-price">{bag.price}</div>
                </div>
                <p className="bag-desc">{bag.description}</p>
                <ul className="bag-feats">
                  {bag.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <div className="bag-actions">
                  <OrderButton model={bag.name}>Заказать</OrderButton>
                  <a
                    className="icon-btn"
                    href={`https://t.me/share/url?url=${encodeURIComponent(contacts.site)}&text=${encodeURIComponent(`Привет! Интересует сумка «${bag.name}»`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Поделиться в Telegram"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M21.900 4.600c.3-1.200-.9-2.100-2-1.700L2.700 9.600c-1.200.5-1.200 2.200.1 2.600l4.400 1.400 1.700 5.300c.3 1 1.600 1.300 2.300.5l2.400-2.500 4.400 3.200c.9.7 2.200.2 2.500-.9l3.400-13.600ZM9.400 13.600l8.600-5.400c.4-.2.8.3.5.6l-7.100 6.600-.3 3-1.700-4.800Z" />
                    </svg>
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="custom-wrap">
          <div className="custom stitch">
            <div className="custom-text">
              <div className="eyebrow">
                <i />
                Индивидуальный заказ
              </div>
              <h3 className="custom-title">
                Не нашли свою? Свяжем сумку <em>по вашему образу</em>
              </h3>
              <p>
                Размер, оттенок рафии, длина ремешка, фурнитура — подберём вместе. Пришлите референс или просто
                опишите настроение лета, которое вы хотите носить с собой.
              </p>
              <OrderButton model="Свой дизайн" variant="gold">
                Обсудить свою сумку
              </OrderButton>
            </div>
            <div className="custom-photos">
              <Photo
                className="arch-sm"
                src="/images/sundress.jpg"
                alt="Девушка в лёгком сарафане с плетёной сумкой"
                ratio="3 / 4"
                parallax={0.05}
                sizes="(max-width: 800px) 45vw, 260px"
              />
              <Photo
                className="arch-sm lift"
                src="/images/beach-woman.jpg"
                alt="Девушка на пляже с плетёной сумкой"
                ratio="3 / 4"
                parallax={0.05}
                delay={160}
                sizes="(max-width: 800px) 45vw, 260px"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ craft */

const craftPoints = [
  {
    title: "Натуральное волокно",
    text: "Рафия — это листья пальмы рапидии. Прочное, лёгкое и дышащее волокно с тёплым природным оттенком.",
  },
  {
    title: "Вязка крючком",
    text: "Сумка вяжется вручную, петля за петлей. Плотная вязка держит форму, ажурная дарит лёгкость.",
  },
  {
    title: "Мастерица, не фабрика",
    text: "Мастер подбирает оттенок, следит за плотностью петель и отделывает каждую деталь.",
  },
];

export function Craft() {
  return (
    <section className="section craft" id="craft">
      <div className="container craft-grid">
        <div className="craft-media">
          <Photo
            className="craft-main"
            src="/images/boho-woman.jpg"
            alt="Девушка в кружевном платье с соломенной сумкой"
            ratio="4 / 5"
            parallax={0.05}
            sizes="(max-width: 900px) 92vw, 560px"
          />
          <Photo
            className="craft-small"
            src="/images/crochet-closeup.jpg"
            alt="Плетение из натуральных волокон крупным планом"
            ratio="1 / 1.05"
            delay={200}
            sizes="(max-width: 900px) 45vw, 260px"
          />
          <div className="craft-stamp">
            <Stamp text="РУЧНАЯ РАБОТА ✦ БЕЗ СТАНКОВ ✦ " />
          </div>
        </div>

        <div className="craft-text">
          <Reveal>
            <div className="eyebrow">
              <i />О мастерской · 02
            </div>
            <h2 className="h2">
              Вязаные руками, а не <em>штампованные</em> на фабрике
            </h2>
            <p className="lead">
              Мы работаем с рафией — классическим материалом летних и пляжных аксессуаров. Сумка вяжется в
              несколько этапов: сначала дно и корпус, потом фурнитура и ремешок. На одну модель уходит больше
              12 часов работы.
            </p>
          </Reveal>

          <div className="craft-points">
            {craftPoints.map((p, idx) => (
              <Reveal key={p.title} delay={idx * 100}>
                <div className="cpoint">
                  <span className="cpoint-n">0{idx + 1}</span>
                  <div>
                    <h3>{p.title}</h3>
                    <p>{p.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- banner */

export function Banner() {
  return (
    <section className="banner" aria-label="Лето в деталях">
      <Photo
        className="banner-photo"
        src="/images/flatlay-beach.jpg"
        alt="Песчаный пляж и море на закате"
        ratio="21 / 9"
        parallax={0.09}
        sizes="100vw"
      />
      <div className="banner-shade" />
      <div className="banner-in container">
        <Reveal>
          <p className="banner-kicker">Raffia atelier</p>
          <p className="banner-text">
            Каждая петля — <em>немного лета</em>, которое остаётся с вами надолго
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- process */

const steps = [
  { title: "Выбираете модель", text: "Готовая сумка из коллекции или своя идея: размер, оттенок, длина ремешка." },
  { title: "Обсуждаем детали", text: "Созваниваемся или переписываемся, уточняем сроки и стоимость." },
  { title: "Ждёте вязку", text: "Сумка вяжется вручную. Показываем процесс и промежуточные фото." },
  { title: "Получаете сумку", text: "Отправляем почтой или курьером. Бережно пакуем в крафт-бумагу." },
];

export function Process() {
  return (
    <section className="section process" id="process">
      <div className="container">
        <Head tag="Как заказать · 03">
          Четыре шага до <em>летней</em> сумки
        </Head>

        <div className="process-grid">
          <Reveal className="process-side">
            <div className="process-sticky">
              <Photo
                className="arch"
                src="/images/crafting.jpg"
                alt="Мастерица вяжет крючком"
                ratio="4 / 5"
                parallax={0.05}
                sizes="(max-width: 900px) 92vw, 460px"
              />
              <div className="process-cap">
                <span className="dot" />
                Вяжем крючком, без станков
              </div>
            </div>
          </Reveal>

          <Thread>
            <div className="steps">
              {steps.map((s, idx) => (
                <Reveal key={s.title} delay={idx * 80}>
                  <div className="step">
                    <span className="step-n" style={i(idx)}>
                      0{idx + 1}
                    </span>
                    <div>
                      <h3>{s.title}</h3>
                      <p>{s.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Thread>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- care */

const care = [
  {
    title: "Берегите от влаги",
    text: "Пальмовое волокно может деформироваться при намокании. Дождь и морская вода — главные враги рафии.",
    icon: <path d="M12 3s6 7.500 6 12a6 6 0 0 1-12 0c0-4.500 6-12 6-12Z" />,
  },
  {
    title: "Сухое хранение",
    text: "Храните сумку в сухом проветриваемом месте, в тканевом мешке. Так рафия сохранит форму и оттенок.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </>
    ),
  },
  {
    title: "Мягкая чистка",
    text: "Пыль убирайте мягкой щёткой или сухой тканью. Не стирайте и не гладьте — волокно не любит агрессии.",
    icon: <path d="M4 5h16M6 5c0 4 2.500 8 6 8s6-4 6-8M12 13v7M9 20h6" />,
  },
];

export function Care() {
  return (
    <section className="section care" id="care">
      <div className="care-bgword" aria-hidden>
        Care
      </div>
      <div className="container">
        <Head tag="Уход за рафией · 04" light>
          Немного заботы — и сумка <em>живёт</em> годами
        </Head>
        <div className="care-grid">
          {care.map((c, idx) => (
            <Reveal key={c.title} delay={idx * 110}>
              <SpotCard className="care-card">
                <div className="care-ic">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                    {c.icon}
                  </svg>
                </div>
                <span className="care-n">0{idx + 1}</span>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </SpotCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- lookbook */

export function LookbookSection() {
  return (
    <section className="section look" id="lookbook">
      <div className="container">
        <Head tag="Атмосфера · 05" lead="Настроение, ради которого вяжутся наши сумки: море, песок, тёплый свет и дорога в отпуск.">
          Сумка, которая <em>просится</em> в отпуск
        </Head>
      </div>
      <Lookbook />
    </section>
  );
}

/* -------------------------------------------------------------------- faq */

export function FaqSection() {
  return (
    <section className="section faq" id="faq">
      <div className="container faq-grid">
        <div className="faq-side">
          <Reveal>
            <div className="eyebrow">
              <i />
              Вопросы · 06
            </div>
            <h2 className="h2">
              Частые <em>вопросы</em>
            </h2>
            <p className="sec-lead">Не нашли ответ? Напишите нам — отвечаем в течение дня.</p>
            <div className="faq-cta">
              <Btn href={contacts.telegram} external variant="ghost">
                Написать в Telegram
              </Btn>
            </div>
          </Reveal>
        </div>
        <Faq />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ order */

export function OrderSection() {
  return (
    <section className="section order weave" id="order">
      <div className="container order-grid">
        <Reveal>
          <div className="eyebrow">
            <i />
            Заказ · 07
          </div>
          <h2 className="h2">
            Давайте свяжем сумку <em>для вас</em>
          </h2>
          <ul className="order-list">
            <li>Ответим в течение дня в Telegram{contacts.whatsapp ? " или WhatsApp" : ""}</li>
            <li>Подскажем с выбором модели и оттенка</li>
            <li>Срок вязки под заказ: 5–10 дней</li>
            <li>Отправка по всей стране, доставку обсудим заранее</li>
          </ul>
          <div className="order-contacts">
            <a href={contacts.telegram} target="_blank" rel="noopener noreferrer" data-cursor="Telegram">
              <span>Telegram</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
            {contacts.whatsapp && (
              <a href={contacts.whatsapp} target="_blank" rel="noopener noreferrer" data-cursor="WhatsApp">
                <span>WhatsApp</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
            )}
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="order-card stitch">
            <h3 className="order-card-title">Оставить заявку</h3>
            <p className="order-card-sub">Расскажите, какая сумка вам нужна, — мы всё согласуем.</p>
            <OrderForm idPrefix="o" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- footer */

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Logo />
            <p>Вязаные сумки из натуральной рафии. Ручная работа, летние истории и внимание к деталям.</p>
          </div>
          <div className="footer-col">
            <div className="footer-title">Навигация</div>
            {navLinks.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </div>
          <div className="footer-col">
            <div className="footer-title">Связаться</div>
            <a href={contacts.telegram} target="_blank" rel="noopener noreferrer">
              Telegram
            </a>
            {contacts.whatsapp && (
              <a href={contacts.whatsapp} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            )}
            <p>Пишите в любое время</p>
          </div>
        </div>

        <div className="footer-word" aria-hidden>
          Raffia <em>atelier</em>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Raffia Atelier. Сумки ручной работы.</span>
          <a href="#top" className="to-top">
            Наверх ↑
          </a>
          <span>Сделано с любовью к лету</span>
        </div>
      </div>
    </footer>
  );
}
