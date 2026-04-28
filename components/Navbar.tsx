import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-surface-border shadow-sm">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/unir-logo.svg"
            alt="UNIR – Universidad Internacional de La Rioja"
            width={140}
            height={40}
            priority
          />
        </Link>
        <nav className="flex items-center gap-4 text-sm text-text-secondary">
          <Link href="/privacidad" className="hover:text-primary transition-colors">
            Privacidad
          </Link>
        </nav>
      </div>
    </header>
  );
}
