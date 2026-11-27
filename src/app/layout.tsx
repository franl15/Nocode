import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const plusJakarta = localFont({
  src: "./fonts/plus-jakarta-sans.woff2",
  weight: "400 700",
  display: "swap",
  variable: "--font-jakarta",
});

const jetbrainsMono = localFont({
  src: "./fonts/jetbrains-mono.woff2",
  weight: "500 600",
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nocode.studio"),
  alternates: {
    canonical: "/",
  },
  title: "NoCode — Ingeniería Web, Software a Medida y Automatización IA",
  description:
    "Estudio de ingeniería digital. Construimos páginas web de alta conversión, software a medida y sistemas de automatización con IA que operan 24/7.",
  keywords: [
    "desarrollo de software a medida",
    "automatizaciones con IA",
    "diseño web profesional",
    "agentes WhatsApp IA",
    "NoCode studio",
  ],
  openGraph: {
    title: "NoCode — Ingeniería Web, Software a Medida y Automatización IA",
    description:
      "Webs rápidas, software a medida y automatizaciones 24/7 diseñadas para escalar operaciones reales.",
    type: "website",
    locale: "es_CO",
    siteName: "NoCode",
  },
  twitter: {
    card: "summary_large_image",
    title: "NoCode — Software, Automatización IA y Web",
    description:
      "Construimos sistemas digitales que venden, automatizan y escalan tu negocio.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${plusJakarta.variable} ${jetbrainsMono.variable}`}
    >
      <body className="selection:bg-[#7EA2DB] selection:text-[#000000]">
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
