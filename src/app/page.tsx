import { HeroSection } from "@/components/hero/HeroSection";
import { FeaturesSection } from "@/components/features/FeaturesSection";
import { WorkflowSection } from "@/components/workflow/WorkflowSection";
import { PricingSection } from "@/components/pricing/PricingSection";

export default function Home() {
  return (
    <div
      className="
        flex flex-col min-h-[100dvh]
        relative
        overflow-x-hidden
      "
    >
      {/* Soft Aurora Background Layer */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-hero" />

      {/* Optional Glow Overlay */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_center,rgba(255,255,255,0.25),transparent_70%)]" />

      {/* Hero Section */}
      <section className="pb-28">
        <HeroSection />
      </section>

      {/* Subtle pastel divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50 mb-20" />

      {/* Features */}
      <section className="py-10 md:py-20">
        <FeaturesSection />
      </section>

      {/* Divider between sections */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-40 my-20" />

      {/* Workflow */}
      <section className="py-10 md:py-20">
        <WorkflowSection />
      </section>

      {/* Divider before pricing */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-40 my-20" />

      {/* Pricing */}
      <section className="pb-20 md:pb-32">
        <PricingSection />
      </section>
    </div>
  );
}
