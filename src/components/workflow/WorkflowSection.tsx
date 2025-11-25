// src/components/workflow/WorkflowSection.tsx
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; // Import useRouter

export function WorkflowSection() {
  const router = useRouter(); // Initialize useRouter

  const handleCleanData = () => {
    router.push("/cleaner"); // Navigate to the new /cleaner page
  };

  return (
    <section id="workflow" className="py-20 sm:py-32 bg-background">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 10,
            delay: 0.2,
          }}
        >
          <h2 className="text-3xl md::text-4xl font-bold mb-6">
            Ready to Clean Your Data?
          </h2>
          <p className="mt-4 text-lg text-foreground/70 mb-8">
            Leverage AI to effortlessly clean and optimize your datasets.
          </p>
          <Button
            onClick={handleCleanData}
            className="px-8 py-3 text-lg"
          >
            Clean Your Data with AI
          </Button>
        </motion.div>
      </div>
    </section>
  );
}