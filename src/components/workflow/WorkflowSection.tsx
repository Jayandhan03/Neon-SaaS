// src/components/workflow/WorkflowSection.tsx
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function WorkflowSection() {
  const router = useRouter();

  const handleCleanData = () => {
    router.push("/cleaner");
  };

  return (
    <section
      id="workflow"
      className="
        relative py-24 sm:py-40
        overflow-hidden
      "
    >
      {/* Soft Aurora Back Glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(210,180,255,0.15),transparent_60%)]"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-[50%] bg-[radial-gradient(circle,rgba(140,120,255,0.12),transparent_75%)] blur-3xl -z-10"></div>

      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 14,
          }}
          className="relative mx-auto max-w-3xl"
        >
          {/* Glass-look background behind text */}
          <div className="absolute inset-0 -z-10 rounded-3xl bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.15)]"></div>

          {/* Title */}
          <h2 className="text-gradient-primary text-4xl md:text-5xl font-bold tracking-tight">
            Ready to Clean Your Data?
          </h2>

          {/* Subtext */}
          <p className="mt-6 text-lg text-foreground/70 leading-relaxed max-w-xl mx-auto">
            Leverage pastel-powered AI magic to effortlessly clean and optimize your datasets.
          </p>

          {/* CTA */}
          <div className="mt-10 flex justify-center">
            <Button
              variant="aurora"
              size="lg"
              onClick={handleCleanData}
              className="px-10 py-6 text-lg btn-glow"
            >
              Clean Your Data with AI
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
