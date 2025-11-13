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
    price: {
      monthly: "$29",
      yearly: "$290",
    },
    description: "For individuals and small teams.",
    features: [
      "10 Projects",
      "Basic Analytics",
      "48-hour support",
      "1GB Storage",
    ],
    cta: "Choose Starter",
  },
  {
    name: "Pro",
    price: {
      monthly: "$79",
      yearly: "$790",
    },
    description: "For growing businesses.",
    features: [
      "Unlimited Projects",
      "Advanced Analytics",
      "24-hour support",
      "10GB Storage",
      "API Access",
    ],
    cta: "Choose Pro",
    popular: true,
  },
  {
    name: "Enterprise",
    price: {
      monthly: "Custom",
      yearly: "Custom",
    },
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
    <section id="pricing" className="py-20 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            Find the perfect plan
          </h2>
          <p className="mt-4 text-lg text-foreground/70">
            Simple, transparent pricing that scales with you.
          </p>
        </div>

        <div className="flex justify-center items-center gap-4 mb-12">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingTiers.map((tier) => (
            <Card
              key={tier.name}
              className={cn(
                "flex flex-col",
                tier.popular
                  ? "border-primary ring-2 ring-primary shadow-lg"
                  : "border-border"
              )}
            >
              {tier.popular && (
                <div className="absolute top-0 -translate-y-1/2 w-full text-center">
                  <span className="bg-primary text-primary-foreground px-4 py-1 text-sm font-semibold rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader className="pt-12">
                <CardTitle>{tier.name}</CardTitle>
                <div className="flex items-baseline gap-2">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={isYearly ? "yearly" : "monthly"}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="text-4xl font-bold"
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
                <CardDescription>{tier.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={tier.popular ? "default" : "outline"}
                >
                  {tier.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
