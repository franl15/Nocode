import { SmoothScroll } from "@/components/SmoothScroll";
import { CustomCursor } from "@/components/CustomCursor";
import { IntroLoader } from "@/components/IntroLoader";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProofMetrics } from "@/components/ProofMetrics";
import { BeforeAfter } from "@/components/BeforeAfter";
import { Services } from "@/components/Services";
import { ProcessSection } from "@/components/ProcessSection";
import { Portfolio } from "@/components/Portfolio";
import { TestimonialsFaq } from "@/components/TestimonialsFaq";
import { ContactSection } from "@/components/ContactSection";
import { FaqWidget } from "@/components/FaqWidget";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <SmoothScroll />
      <CustomCursor />
      <IntroLoader />
      <Navbar />
      <Hero />
      <ProofMetrics />
      <BeforeAfter />
      <Services />
      <ProcessSection />
      <Portfolio />
      <TestimonialsFaq />
      <ContactSection />
      <FaqWidget />
    </main>
  );
}
