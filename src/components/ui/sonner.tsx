import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="top-right"
      expand={true}
      richColors
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-card group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-2xl group-[.toaster]:backdrop-blur-xl group-[.toaster]:rounded-xl group-[.toaster]:p-4",
          description: "group-[.toast]:text-muted-foreground group-[.toast]:text-sm",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:font-semibold group-[.toast]:rounded-lg group-[.toast]:px-4 group-[.toast]:py-2 group-[.toast]:hover:scale-105 group-[.toast]:transition-transform",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground group-[.toast]:rounded-lg group-[.toast]:hover:bg-muted/80",
          success: "group-[.toaster]:bg-success/10 group-[.toaster]:border-success/20 group-[.toaster]:text-success",
          error: "group-[.toaster]:bg-destructive/10 group-[.toaster]:border-destructive/20 group-[.toaster]:text-destructive",
          warning: "group-[.toaster]:bg-orange-500/10 group-[.toaster]:border-orange-500/20 group-[.toaster]:text-orange-600",
          info: "group-[.toaster]:bg-primary/10 group-[.toaster]:border-primary/20 group-[.toaster]:text-primary",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
