"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { bags, contacts } from "@/data";
import { Btn } from "./ui";

/* -------------------------------------------------------------- context */

type Ctx = { openOrder: (model?: string) => void };
const OrderCtx = createContext<Ctx>({ openOrder: () => {} });
export const useOrder = () => useContext(OrderCtx);

const FALLBACK = "Не знаю, нужна консультация";

/** Необязательный URL обработчика форм (Formspree, Web3Forms, свой бэкенд). */
const ORDER_ENDPOINT = process.env.NEXT_PUBLIC_ORDER_ENDPOINT ?? "";

type OrderData = { name: string; contact: string; model: string; comment: string };

const orderText = (d: OrderData) =>
  [
    "Здравствуйте! Хочу заказать сумку.",
    `Имя: ${d.name}`,
    `Контакт: ${d.contact}`,
    `Модель: ${d.model}`,
    d.comment && `Пожелания: ${d.comment}`,
  ]
    .filter(Boolean)
    .join("\n");

/* ----------------------------------------------------------------- form */

export function OrderForm({
  defaultModel,
  idPrefix = "f",
}: {
  defaultModel?: string;
  idPrefix?: string;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [error, setError] = useState("");
  const [via, setVia] = useState<"endpoint" | "telegram">("endpoint");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const val = (k: string, max: number) => String(fd.get(k) ?? "").replace(/\s+/g, " ").trim().slice(0, max);

    // бот заполнил скрытое поле — тихо игнорируем
    if (val("website", 50)) {
      setStatus("ok");
      return;
    }

    const data = {
      name: val("name", 80),
      contact: val("contact", 120),
      model: val("model", 120) || FALLBACK,
      comment: val("comment", 1200),
    };
    if (data.name.length < 2) return fail("Укажите имя");
    if (data.contact.length < 3) return fail("Укажите Telegram или телефон");

    setError("");

    // Сайт статический (GitHub Pages): если задан внешний обработчик форм — отправляем туда,
    // иначе открываем чат в Telegram с готовым текстом заявки.
    if (!ORDER_ENDPOINT) {
      const text = orderText(data);
      const url = `${contacts.telegram}?text=${encodeURIComponent(text)}`;
      window.open(url, "_blank", "noopener,noreferrer");
      navigator.clipboard?.writeText(text).catch(() => {});
      form.reset();
      setVia("telegram");
      setStatus("ok");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch(ORDER_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...data, _subject: "Новая заявка с сайта Raffia Atelier" }),
        signal: AbortSignal.timeout(10000),
      });
      if (!res.ok) throw new Error();
      form.reset();
      setVia("endpoint");
      setStatus("ok");
    } catch {
      fail("Не удалось отправить заявку. Напишите нам в Telegram — ответим в течение дня.");
    }
  }

  function fail(msg: string) {
    setError(msg);
    setStatus("error");
  }

  if (status === "ok") {
    return (
      <div className="form-done">
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none" aria-hidden>
          <circle cx="36" cy="36" r="33" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 5" className="done-ring" />
          <path d="M22 37l10 10 18-22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="done-check" />
        </svg>
        <h3>{via === "telegram" ? "Почти готово!" : "Заявка отправлена"}</h3>
        <p>
          {via === "telegram"
            ? "Мы открыли чат в Telegram с текстом заявки (он также скопирован). Отправьте сообщение — и мы ответим в течение дня."
            : "Спасибо! Мы свяжемся с вами в течение дня, чтобы обсудить детали и стоимость."}
        </p>
        <div className="form-done-actions">
          <Btn href={contacts.telegram} external variant="primary">
            Написать в Telegram
          </Btn>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="form">
      <div className="hp" aria-hidden>
        <label>
          Сайт
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="field">
        <input id={`${idPrefix}-name`} name="name" required minLength={2} maxLength={80} placeholder=" " autoComplete="name" />
        <label htmlFor={`${idPrefix}-name`}>Ваше имя</label>
        <span className="field-line" />
      </div>
      <div className="field">
        <input id={`${idPrefix}-contact`} name="contact" required minLength={3} maxLength={120} placeholder=" " autoComplete="tel" />
        <label htmlFor={`${idPrefix}-contact`}>Telegram или телефон</label>
        <span className="field-line" />
      </div>
      <div className="field field-select">
        <select id={`${idPrefix}-model`} name="model" defaultValue={defaultModel ?? FALLBACK}>
          {bags.map((b) => (
            <option key={b.id} value={b.name}>
              {b.name}
            </option>
          ))}
          <option value={FALLBACK}>{FALLBACK}</option>
          <option value="Свой дизайн">Свой дизайн</option>
        </select>
        <label htmlFor={`${idPrefix}-model`}>Модель</label>
        <span className="field-line" />
      </div>
      <div className="field">
        <textarea id={`${idPrefix}-comment`} name="comment" rows={3} maxLength={1200} placeholder=" " />
        <label htmlFor={`${idPrefix}-comment`}>Оттенок, размер, длина ремешка…</label>
        <span className="field-line" />
      </div>
      {status === "error" && (
        <div className="form-error" role="alert">
          {error}
        </div>
      )}
      <Btn type="submit" full disabled={status === "loading"}>
        {status === "loading" ? "Отправляем…" : ORDER_ENDPOINT ? "Отправить заявку" : "Отправить в Telegram"}
      </Btn>
      <p className="form-note">Нажимая кнопку, вы соглашаетесь на обработку контактных данных для связи по заказу.</p>
    </form>
  );
}

/* ---------------------------------------------------------------- modal */

export function OrderProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [model, setModel] = useState<string | undefined>();
  const [key, setKey] = useState(0);

  const openOrder = useCallback((m?: string) => {
    setModel(m);
    setKey((k) => k + 1);
    setOpen(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <OrderCtx.Provider value={{ openOrder }}>
      {children}
      {open && (
        <div className="modal-ov" onClick={() => setOpen(false)} role="dialog" aria-modal="true" aria-label="Заказать сумку">
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="modal-x" onClick={() => setOpen(false)} aria-label="Закрыть">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
            <div className="eyebrow">
              <i />
              Заявка
            </div>
            <h3 className="modal-title">{model && model !== FALLBACK ? <>«{model}»</> : <>Заказать сумку</>}</h3>
            <p className="modal-sub">Оставьте контакт — вернёмся с деталями и точной стоимостью в течение дня.</p>
            <OrderForm key={key} defaultModel={model} idPrefix="m" />
          </div>
        </div>
      )}
    </OrderCtx.Provider>
  );
}

/* ------------------------------------------------------------- triggers */

export function OrderButton({
  model,
  children,
  variant = "primary",
  className = "",
  full,
}: {
  model?: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "light" | "gold";
  className?: string;
  full?: boolean;
}) {
  const { openOrder } = useOrder();
  return (
    <Btn variant={variant} className={className} full={full} onClick={() => openOrder(model)}>
      {children}
    </Btn>
  );
}

export function OrderTrigger({
  model,
  className = "",
  cursor,
  children,
}: {
  model?: string;
  className?: string;
  cursor?: string;
  children: ReactNode;
}) {
  const { openOrder } = useOrder();
  return (
    <div
      className={className}
      data-cursor={cursor}
      role="button"
      tabIndex={0}
      onClick={() => openOrder(model)}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), openOrder(model))}
    >
      {children}
    </div>
  );
}
