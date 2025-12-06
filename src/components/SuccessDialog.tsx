import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface SuccessDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  variant?: "success" | "error" | "info" | "warning";
}

const variantConfig = {
  success: {
    icon: CheckCircle,
    bgColor: "bg-green-500/10",
    iconColor: "text-green-500",
  },
  error: {
    icon: AlertCircle,
    bgColor: "bg-red-500/10",
    iconColor: "text-red-500",
  },
  info: {
    icon: Info,
    bgColor: "bg-blue-500/10",
    iconColor: "text-blue-500",
  },
  warning: {
    icon: AlertTriangle,
    bgColor: "bg-orange-500/10",
    iconColor: "text-orange-500",
  },
};

const SuccessDialog = ({
  isOpen,
  onClose,
  title,
  description,
  variant = "success",
}: SuccessDialogProps) => {
  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-3xl p-8">
        <div className="text-center space-y-6 animate-in fade-in zoom-in duration-500">
          <div
            className={cn(
              "w-20 h-20 rounded-full flex items-center justify-center mx-auto",
              config.bgColor
            )}
          >
            <Icon className={cn("h-10 w-10", config.iconColor)} />
          </div>
          <div>
            <h3 className="text-2xl font-black mb-2 tracking-tight">{title}</h3>
            <p className="text-muted-foreground font-medium">{description}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessDialog;
