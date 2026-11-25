import { ArrowUpRight, Bot, Check, BarChart3, Globe } from "lucide-react";

const PROJECTS = [
  {
    badge: "Automatización IA · En producción",
    title: "Agente de WhatsApp + Agenda Automática",
    desc: "Sistema conectado a WhatsApp Business, calendario y CRM que responde preguntas frecuentes, cotiza servicios y confirma citas sin intervención humana.",
    metric: "+38 citas agendadas / semana",
    kind: "ai",
  },
  {
    badge: "Diseño Web · Alta Conversión",
    title: "Landing & Catálogo de Autor para Estudio B2B",
    desc: "Arquitectura enfocada en claridad inmediata, velocidad de carga sub-segundo y embudo directo hacia WhatsApp y formulario calificado.",
    metric: "3.2x más solicitudes calificadas",
    kind: "web",
  },
  {
    badge: "Software a Medida · Dashboard",
    title: "Panel Operativo y Cotizador en Tiempo Real",
    desc: "Aplicación web interna que reemplazó 6 hojas de Excel: genera cotizaciones en PDF en 10 segundos y notifica automáticamente a ventas y finanzas.",
    metric: "-45 horas manuales al mes",
    kind: "software",
  },
];

function DeviceMockup({ kind }: { kind: string }) {
  return (
    <div className="relative pt-4 pb-8 px-2 sm:px-6">
      {/* MacBook Frame */}
      <div className="rounded-2xl bg-black p-2 sm:p-2.5 shadow-[0_24px_55px_-18px_rgba(6,13,33,0.5)] border border-white/10">
        {/* Top bar */}
        <div className="flex items-center gap-1.5 px-2 pb-2">
          <span className="w-2 h-2 rounded-full bg-white/25" />
          <span className="w-2 h-2 rounded-full bg-white/25" />
          <span className="w-2 h-2 rounded-full bg-white/75" />
        </div>

        {/* Screen Content */}
        <div className="rounded-xl bg-[#060D21] text-[#F2F0EB] p-5 sm:p-6 min-h-[220px] sm:min-h-[250px] flex flex-col justify-between overflow-hidden relative">
          {kind === "ai" && (
            <>
              <div className="flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1.5 font-semibold text-white">
                  <Bot className="w-4 h-4" /> Flujo WhatsApp IA
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                  ACTIVO 24/7
                </span>
              </div>
              <div className="space-y-2.5 my-4">
                <div className="max-w-[82%] rounded-2xl rounded-tl-sm bg-white/10 px-3.5 py-2 text-xs">
                  Hola, ¿tienen disponibilidad mañana para una evaluación?
                </div>
                <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-black text-white border border-white/20 px-3.5 py-2 text-xs font-medium">
                  ¡Hola! Sí, tenemos 10:00 AM y 3:30 PM. ¿Te aparto el de las
                  10:00 AM? Te envío el recordatorio por aquí.
                </div>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-white/65">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Sincronizado con Google Calendar &amp; CRM</span>
              </div>
            </>
          )}

          {kind === "web" && (
            <>
              <div className="flex items-center justify-between text-xs border-b border-white/10 pb-3">
                <span className="font-display font-bold flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#8CA8DB]" /> estudio-pro.co
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-black text-white border border-white/25 text-[10px] font-bold">
                  Cotizar →
                </span>
              </div>
              <div className="my-4 space-y-2">
                <div className="font-display font-extrabold text-xl sm:text-2xl leading-tight">
                  Diseño arquitectónico que{" "}
                  <span className="text-[#8CA8DB]">se vende solo.</span>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-2">
                  <div className="rounded-lg bg-black/50 border border-white/10 p-2 text-center">
                    <div className="font-bold text-sm text-white">99</div>
                    <div className="text-[10px] opacity-70">Lighthouse</div>
                  </div>
                  <div className="rounded-lg bg-black/50 border border-white/10 p-2 text-center">
                    <div className="font-bold text-sm">0.6s</div>
                    <div className="text-[10px] opacity-70">Carga</div>
                  </div>
                  <div className="rounded-lg bg-black/50 border border-white/10 p-2 text-center">
                    <div className="font-bold text-sm text-emerald-300">+220%</div>
                    <div className="text-[10px] opacity-70">Leads</div>
                  </div>
                </div>
              </div>
              <div className="text-[11px] text-white/60">
                Next.js · Tailwind · Conversión directa a WhatsApp
              </div>
            </>
          )}

          {kind === "software" && (
            <>
              <div className="flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1.5 font-semibold text-white">
                  <BarChart3 className="w-4 h-4" /> Panel Operativo v2
                </span>
                <span className="text-[10px] text-white/60 font-mono">LIVE</span>
              </div>
              <div className="grid grid-cols-3 gap-2 my-4">
                <div className="rounded-xl bg-black/45 border border-white/10 p-3">
                  <div className="text-[10px] text-white/60">Cotizaciones</div>
                  <div className="font-display font-bold text-lg">128</div>
                </div>
                <div className="rounded-xl bg-black/45 border border-white/10 p-3">
                  <div className="text-[10px] text-white/60">Aprobadas</div>
                  <div className="font-display font-bold text-lg text-[#8CA8DB]">
                    64%
                  </div>
                </div>
                <div className="rounded-xl bg-black/45 border border-white/10 p-3">
                  <div className="text-[10px] text-white/60">Tiempo avg</div>
                  <div className="font-display font-bold text-lg text-emerald-300">
                    10s
                  </div>
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full w-4/5 rounded-full bg-white" />
                </div>
                <div className="text-[11px] text-white/65">
                  PDF + envío automático por WhatsApp y correo
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Laptop Base Lip */}
      <div className="mx-auto w-[92%] h-2.5 bg-[#121929] rounded-b-xl shadow-md" />

      {/* Overlapping Context-Specific Floating Card */}
      <div className="hidden sm:flex flex-col justify-between absolute -bottom-1 right-2 w-36 bg-[#F2F0EB] text-[#060D21] p-3 border-2 border-black shadow-xl animate-float-slow">
        <div className="w-8 h-0.5 bg-black/30 mb-2" />
        <div className="font-mono-tech text-[10px] font-bold uppercase text-black">
          {kind === "ai"
            ? "WHATSAPP 24/7"
            : kind === "web"
            ? "CARGA 0.6s"
            : "PDF EN 10s"}
        </div>
        <div className="text-[11px] font-bold leading-tight mt-1">
          {kind === "ai"
            ? "Respuesta en 3 seg sin intervención"
            : kind === "web"
            ? "Optimizada para cerrar desde móvil"
            : "Sincronizado con ventas y finanzas"}
        </div>
      </div>
    </div>
  );
}

export function Portfolio() {
  return (
    <section
      id="proyectos"
      className="bg-[#E5E9F2] text-[#060D21] py-24 sm:py-32 px-5 sm:px-8"
    >
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="max-w-2xl space-y-3">
          <span className="font-mono-tech text-[11px] uppercase tracking-[0.22em] text-[#475575] block">
            03 // CASOS Y DEMOS
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-[-0.03em]">
            Sistemas reales, resultados medibles.
          </h2>
          <p className="text-base sm:text-lg text-[#475575]">
            Cada proyecto combina diseño limpio, velocidad técnica y automatización
            pensada para vender y ahorrar horas.
          </p>
        </div>

        {/* Alternating Showcase Rows */}
        <div className="space-y-20">
          {PROJECTS.map((project, idx) => {
            const reversed = idx % 2 === 1;
            return (
              <div
                key={project.title}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              >
                <div
                  className={`lg:col-span-7 ${reversed ? "lg:order-2" : "lg:order-1"}`}
                >
                  <DeviceMockup kind={project.kind} />
                </div>

                <div
                  className={`lg:col-span-5 space-y-4 ${
                    reversed ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <span className="inline-block rounded-full bg-white border border-[#060D21]/12 px-3.5 py-1 text-xs font-semibold text-[#060D21]">
                    {project.badge}
                  </span>
                  <h3 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#475575] leading-relaxed">
                    {project.desc}
                  </p>
                  <div className="text-sm font-bold text-black">
                    {project.metric}
                  </div>
                  <div className="pt-2">
                    <a
                      href="#contacto"
                      className="inline-flex items-center gap-2 rounded-full bg-black hover:bg-[#060D21] text-white px-5 py-2.5 text-xs sm:text-sm font-semibold transition-colors"
                    >
                      <span>Quiero algo así para mi negocio</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
