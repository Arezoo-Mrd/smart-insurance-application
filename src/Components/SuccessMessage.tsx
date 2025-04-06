import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";
import { CheckCircle2 } from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

interface SuccessMessageProps {
 message: string;
 hint?: string;
 className?: string;
 onClose?: () => void;
}

export const SuccessMessage = ({
 message,
 className,
 onClose,
 hint,
}: SuccessMessageProps) => {
 const { t } = useTranslation();
 useEffect(() => {
  confetti({
   particleCount: 100,
   spread: 70,
   origin: { y: 0.6 },
  });

  if (onClose) {
   const timer = setTimeout(onClose, 5000);
   return () => clearTimeout(timer);
  }
 }, [onClose]);

 return (
  <div
   className={cn(
    "fixed inset-0 flex items-center justify-center bg-black/50 z-50",
    className
   )}
   onClick={onClose}
  >
   <div
    className="bg-white rounded-lg p-6 shadow-xl transform animate-in fade-in slide-in-from-bottom-4 duration-300"
    onClick={(e) => e.stopPropagation()}
   >
    <div className="flex items-center gap-3">
     <CheckCircle2 className="w-8 h-8 text-blue-500" />
     <h3 className="text-xl font-semibold text-gray-900">{message}</h3>
    </div>
    <p className="mt-2 text-gray-600">{hint}</p>
    <button
     onClick={onClose}
     className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
    >
     {t("common.close")}
    </button>
   </div>
  </div>
 );
};
