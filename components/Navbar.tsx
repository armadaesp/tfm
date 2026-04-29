import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="banner">
      <div className="banner-inner">
        <Link href="/" className="brand">
          <Image
            src="/unir-logo.svg"
            alt="UNIR – Universidad Internacional de La Rioja"
            width={70}
            height={20}
            priority
            style={{ display: "block" }}
          />
          <span className="brand-text">
            <span className="brand-name">Estudio</span>
            <span className="brand-sub">2026</span>
          </span>
        </Link>
        <nav className="banner-right">
          <Link href="/privacidad" className="banner-link">Privacidad</Link>
        </nav>
      </div>
    </header>
  );
}
