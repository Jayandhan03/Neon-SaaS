"use client";

import { motion } from "framer-motion";

const workflowSteps = [
  {
    step: 1,
    title: "Sign Up",
    description: "Create your account in just a few clicks.",
  },
  {
    step: 2,
    title: "Configure",
    description: "Set up your preferences and integrations.",
  },
  {
    step: 3,
    title: "Launch",
    description: "Go live and start seeing results immediately.",
  },
];

export function WorkflowSection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };
  
  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 0.5,
        delay: 0.5,
      },
    },
  };

  return (
    <section id="workflow" className="py-20 sm:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            A Simple, Powerful Workflow
          </h2>
          <p className="mt-4 text-lg text-foreground/70">
            Get up and running in three simple steps.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={containerVariants}
          className="relative flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-8"
        >
          <motion.div
            variants={lineVariants}
            className="absolute top-1/2 left-0 w-full h-px bg-border lg:h-full lg:w-px lg:top-0"
            style={{ transformOrigin: 'left' }}
          />

          {workflowSteps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative z-10 w-full lg:w-1/3"
            >
              <div className="text-center p-8 bg-card rounded-lg border border-border/50 shadow-sm">
                <div className="mb-4 w-12 h-12 flex items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xl mx-auto">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-foreground/70">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
