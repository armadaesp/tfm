import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Estudio TFM – Estrés y bienestar emocional | UNIR",
  description:
    "Encuesta de investigación sobre estrés percibido y bienestar emocional en población adulta española. TFM – Universidad Internacional de La Rioja.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-surface text-text-primary">
        <Navbar />
        <div className="flex-1">{children}</div>
        <footer className="border-t border-surface-border mt-auto">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text-muted">
            <span>© 2026 UNIR – Universidad Internacional de La Rioja</span>
            <span>
              Investigador:{" "}
              <a href="mailto:danituring@gmail.com" className="hover:text-primary transition-colors">
                Daniel Lara Becerra
              </a>
              {" · "}
              <a href="mailto:ppd@unir.net" className="hover:text-primary transition-colors">
                ppd@unir.net
              </a>
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
