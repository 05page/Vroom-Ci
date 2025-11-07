import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

//cv permet de gérer des classes intelligentes, permettant de gérer facilement les variantes (styles, tailles, états, etc.)
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-card hover:shadow-hover transition-smooth",
        green:"bg-[hsl(var(--success))]",
        greenOutline:"hover:bg-[hsl(var(--success))]",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "bg-primary text-primary-foreground hover:scale-105 shadow-hover transition-smooth font-semibold",
        success: "bg-[hsl(var(--success))] text-[hsl(var(--success-foreground))] hover:bg-[hsl(var(--success))]/90 transition-smooth",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,//Permet à ton composant Button d’accepter toutes les props classiques d’un <button>
    VariantProps<typeof buttonVariants>//Permet d’accepter les props définies par cva
  {
    asChild?: boolean; //Prop optionnelle qui indique si le bouton doit utiliser son enfant comme élément racine (via Slot) au lieu d’un <button>
  }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>( //forwardRef permet de passer la ref vers l’élément réel
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";//asChild  permet de rendre un composant enfant en un autre composant, exemple: un button dans un autre button
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;//cn permet de fusionner les classes
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
