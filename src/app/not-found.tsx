import Link from "next/link";

export default function NotFound() {
  return (
    <main className="section" style={{ minHeight: "80vh", display: "grid", placeItems: "center", textAlign: "center" }}>
      <div className="container">
        <p className="eyebrow" style={{ justifyContent: "center" }}>
          <i />
          Ошибка 404
        </p>
        <h1 className="h2">
          Такой страницы <em>нет</em>
        </h1>
        <p className="sec-lead" style={{ margin: "1rem auto 2rem" }}>
          Возможно, ссылка устарела. Вернитесь на главную — там вся коллекция.
        </p>
        <Link href="/" className="btn btn-primary">
          <span className="btn-label">На главную</span>
        </Link>
      </div>
    </main>
  );
}
