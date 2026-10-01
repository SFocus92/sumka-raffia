# Raffia Atelier — лендинг вязаных сумок из рафии

Сайт: **https://sfocus92.github.io/sumka-raffia/**

Next.js 16 (App Router) + React 19 + Tailwind 4, статическая сборка (`output: "export"`) для GitHub Pages.

## Запуск

```bash
npm install
npm run dev      # http://localhost:3000/sumka-raffia
npm run check    # типы + линтер + продакшн-сборка в ./out
```

## Деплой

Каждый push в `main` запускает GitHub Actions (`.github/workflows/deploy.yml`): проверка типов, линтер, сборка и публикация на GitHub Pages.
В настройках репозитория: **Settings → Pages → Source: GitHub Actions**.

## Настройки

Необязательные переменные (локально — в `.env.local`, на GitHub — **Settings → Secrets and variables → Actions → Variables**), см. `.env.example`:

| Переменная | Назначение |
| --- | --- |
| `NEXT_PUBLIC_WHATSAPP` | Номер WhatsApp. Если задан — на сайте появятся ссылки на WhatsApp |
| `NEXT_PUBLIC_ORDER_ENDPOINT` | URL обработчика форм (Formspree, Web3Forms и т. п.). Без него заявка открывается в Telegram с готовым текстом |
| `NEXT_PUBLIC_SITE_URL` | Публичный адрес (SEO, Open Graph, sitemap) |
| `NEXT_PUBLIC_BASE_PATH` | Подпуть сайта (`/sumka-raffia`; для своего домена — пусто) |

## Контент

- Модели, цены, FAQ, лукбук, контакты — `src/data.ts`
- Фото — `public/images/` (сжатые JPEG до 1600 px). `bag-light.jpg` и `bag-brown.jpg` — собственные фото изделий, остальные — бесплатные фото с Pexels (лицензия Pexels, без обязательной атрибуции).
