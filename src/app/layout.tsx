import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
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
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Outfit:wght@400;500;600;700&family=Unbounded:wght@600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="selection:bg-black selection:text-white">
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
