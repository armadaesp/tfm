import type { Metadata } from "next";
import { Inter_Tight, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

const sourceSerif4 = Source_Serif_4({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-source-serif-4",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Estudio – Estrés y bienestar emocional | UNIR",
  description:
    "Encuesta de investigación sobre estrés percibido y bienestar emocional en población adulta española. Universidad Internacional de La Rioja.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" data-theme="slate" className={`${interTight.variable} ${sourceSerif4.variable}`}>
      <body className="app-shell">
        <Navbar />
        <div style={{ flex: 1 }}>{children}</div>
        <footer className="footer">
          <div className="footer-inner">
            <span>© 2026 · Universidad Internacional de La Rioja</span>
            <span>DPD UNIR: <a href="mailto:ppd@unir.net">ppd@unir.net</a></span>
          </div>
        </footer>
      </body>
    </html>
  );
}
