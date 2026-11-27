import Image from "next/image";

export function NetworkFallbackVisual() {
  return (
    <div className="relative w-full h-full min-h-[340px] flex flex-col items-center justify-center p-6 sm:p-8 bg-[#030712]">
      <div className="relative w-56 h-56 sm:w-64 sm:h-64 overflow-hidden border border-[#F2F0EB]/15 bg-[#060D21]">
        <Image
          src="/images/nocode-mascot.jpg"
          alt="N-01, núcleo de automatización e ingeniería IA de NoCode"
          width={520}
          height={520}
          priority
          sizes="(max-width: 1024px) 256px, 320px"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="mt-5 w-full max-w-[280px] border border-[#F2F0EB]/15 bg-[#060D21]/90 px-3.5 py-2.5 flex items-center justify-between font-mono-tech text-[10px] uppercase tracking-[0.16em] text-[#F2F0EB]">
        <span>N-01 // RED ACTIVA</span>
        <span className="text-[#7EA2DB]">6 NODOS</span>
      </div>
    </div>
  );
}
