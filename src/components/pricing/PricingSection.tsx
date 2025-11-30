"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const pricingTiers = [
  {
    name: "Starter",
    price: { monthly: "$29", yearly: "$290" },
    description: "For individuals and small teams.",
    features: ["10 Projects", "Basic Analytics", "48-hour support", "1GB Storage"],
    cta: "Choose Starter",
  },
  {
    name: "Pro",
    price: { monthly: "$79", yearly: "$790" },
    description: "For growing businesses.",
    features: [
      "Unlimited Projects",
      "Advanced Analytics",
      "24-hour support",
      "10GB Storage",
      "API Access",
    ],
    cta: "Choose Pro",
    highlighted: true, // Middle card soft highlight
  },
  {
    name: "Enterprise",
    price: { monthly: "Custom", yearly: "Custom" },
    description: "For large-scale applications.",
    features: [
      "Everything in Pro",
      "Dedicated Infrastructure",
      "Priority Support",
      "Custom Integrations",
    ],
    cta: "Contact Sales",
  },
];

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="relative py-24 sm:py-40">
      {/* Soft Aurora Glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(200,170,255,0.16),transparent_65%)]"></div>

      <div className="text-center mb-16">
        <h2 className="text-gradient-primary text-4xl md:text-5xl font-bold">
          Find the perfect plan
        </h2>
        <p className="mt-4 text-lg text-foreground/70 max-w-2xl mx-auto">
          Transparent pricing designed to grow with your business.
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex justify-center items-center gap-4 mb-16">
        <Label htmlFor="pricing-toggle">Monthly</Label>

        <Switch
          id="pricing-toggle"
          checked={isYearly}
          onCheckedChange={setIsYearly}
        />

        <Label htmlFor="pricing-toggle" className="flex items-center gap-2">
          Yearly{" "}
          <span className="text-xs font-semibold bg-accent text-accent-foreground px-2 py-0.5 rounded-full">
            2 months free
          </span>
        </Label>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-5xl mx-auto px-4">
        {pricingTiers.map((tier) => (
          <motion.div
            key={tier.name}
            whileHover={{ scale: 1.03, y: -6 }}
            transition={{ duration: 0.25 }}
          >
            <Card
              className={cn(
                "flex flex-col h-full p-6 backdrop-blur-xl border rounded-2xl",
                "bg-white/15 dark:bg-white/10 border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.12)]",
                tier.highlighted &&
                  "shadow-[0_12px_50px_rgba(150,120,255,0.32)] border-[hsl(260_80%_75%/0.6)]"
              )}
            >
              <CardHeader className="pt-6">
                <CardTitle className="text-2xl font-semibold tracking-tight">
                  {tier.name}
                </CardTitle>

                {/* Animated Price */}
                <div className="flex items-baseline gap-2 mt-4">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={isYearly ? "yearly" : "monthly"}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.25 }}
                      className="text-5xl font-bold text-gradient-primary drop-shadow-sm"
                    >
                      {isYearly ? tier.price.yearly : tier.price.monthly}
                    </motion.span>
                  </AnimatePresence>

                  {tier.name !== "Enterprise" && (
                    <span className="text-sm text-foreground/60">
                      {isYearly ? "/ year" : "/ month"}
                    </span>
                  )}
                </div>

                <CardDescription className="mt-3 text-foreground/70 leading-relaxed">
                  {tier.description}
                </CardDescription>
              </CardHeader>

              {/* Features */}
              <CardContent className="flex-1 mt-6">
                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-accent" />
                      <span className="text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              {/* CTA */}
              <CardFooter className="mt-8">
                <Button
                  variant={tier.highlighted ? "aurora" : "soft"}
                  className="w-full py-5 text-base font-semibold rounded-full"
                >
                  {tier.cta}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
