import * as React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CheckCircle, AlertCircle } from "lucide-react";

interface ConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  variant?: "success" | "warning" | "destructive";
}

export function ConfirmationDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  onConfirm,
  variant = "success",
}: ConfirmationDialogProps) {
  const Icon = variant === "destructive" || variant === "warning" ? AlertCircle : CheckCircle;
  const iconColor = 
    variant === "destructive" ? "text-destructive" :
    variant === "warning" ? "text-amber-500" :
    "text-accent";
  const iconBg = 
    variant === "destructive" ? "bg-destructive/10" :
    variant === "warning" ? "bg-amber-100" :
    "bg-accent/10";

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-2xl p-8 gap-6">
        <AlertDialogHeader className="space-y-4">
          <div className="flex items-start gap-4">
            <div className={`p-4 rounded-full ${iconBg} shrink-0`}>
              <Icon className={`h-8 w-8 ${iconColor}`} />
            </div>
            <div className="flex-1 space-y-2">
              <AlertDialogTitle className="text-2xl font-bold">
                {title}
              </AlertDialogTitle>
              <AlertDialogDescription className="text-base text-muted-foreground">
                {description}
              </AlertDialogDescription>
            </div>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-3">
          <AlertDialogCancel className="text-base py-6 px-8">
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className={`text-base py-6 px-8 ${
              variant === "destructive" ? "bg-destructive hover:bg-destructive/90" : ""
            }`}
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
