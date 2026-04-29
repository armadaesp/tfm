import Link from "next/link";

export default function Navbar() {
  return (
    <header className="banner">
      <div className="banner-inner">
        <Link href="/" className="brand">
          <span className="brand-mark">E</span>
          <span className="brand-text">
            <span className="brand-name">Estudio</span>
            <span className="brand-sub">UNIR · 2026</span>
          </span>
        </Link>
        <nav className="banner-right">
          <Link href="/privacidad" className="banner-link">Privacidad</Link>
        </nav>
      </div>
    </header>
  );
}
