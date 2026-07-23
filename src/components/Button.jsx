import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-mono text-xs font-bold uppercase tracking-widest px-8 py-4 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-on-primary hover:shadow-[0_0_15px_rgba(0,255,156,0.6)]",
        secondary:
          "bg-transparent border border-primary text-primary hover:bg-primary/10",
        ghost:
          "bg-transparent text-on-surface-variant hover:text-primary hover:bg-surface/30 normal-case tracking-normal font-sans text-sm font-normal px-3 py-2",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

const Button = React.forwardRef(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };
