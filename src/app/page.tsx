import { HeroSection } from "@/components/hero/HeroSection";
import { FeaturesSection } from "@/components/features/FeaturesSection";
import { WorkflowSection } from "@/components/workflow/WorkflowSection";
import { PricingSection } from "@/components/pricing/PricingSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <HeroSection />
      <FeaturesSection />
      <WorkflowSection />
      <PricingSection />
    </div>
  );
}
