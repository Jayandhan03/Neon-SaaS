import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/*  
  Superhuman Aurora Button Styles
  - pastel gradients
  - glassmorphism
  - soft hover animations
  - rounded full (iOS-style)
*/

const buttonVariants = cva(
  // Base styles
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Primary pastel gradient button (Superhuman-style)
        default:
          "bg-gradient-to-tr from-primary to-accent text-primary-foreground shadow-sm hover:opacity-90",

        // Red destructive
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/80 rounded-full",

        // Soft outline with pastel hover
        outline:
          "border border-input bg-background hover:bg-secondary hover:text-foreground rounded-full",

        // Calm lavender soft button
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/70 rounded-full shadow-sm",

        // Ultra-soft pastel hover
        ghost:
          "text-foreground/80 hover:bg-accent/20 hover:text-foreground rounded-full",

        // Underline link style
        link: "text-primary underline-offset-4 hover:underline",

        // 🟣 Aurora gradient button (Superhuman CTA)
        aurora:
          "bg-gradient-to-r from-[hsl(260,90%,85%)] via-[hsl(230,90%,80%)] to-[hsl(210,85%,75%)] text-foreground shadow-md hover:opacity-90",

        // 🧊 Glassmorphic subtle button
        glass:
          "backdrop-blur-xl bg-white/10 dark:bg-white/5 border border-white/20 text-foreground shadow-md hover:bg-white/20 rounded-full",

        // 🌸 Soft blossom pastel button
        soft:
          "bg-[hsl(250,45%,92%)] text-[hsl(230,40%,22%)] hover:bg-[hsl(250,45%,88%)] shadow-sm rounded-full",

        // ✨ Outline glow button
        "outline-aurora":
          "border border-[hsl(265_85%_70%/0.6)] text-foreground shadow-[0_0_20px_hsl(265_85%_70%/0.3)] hover:bg-[hsl(265_85%_70%/0.08)] rounded-full",

        // 🌙 Circular glowing icon button
        "icon-soft":
          "h-10 w-10 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 hover:bg-white/20 shadow-md",
      },

      size: {
        default: "h-11 px-6 text-sm",
        sm: "h-9 px-4 text-sm",
        lg: "h-12 px-8 text-base",
        icon: "h-11 w-11 flex items-center justify-center",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
