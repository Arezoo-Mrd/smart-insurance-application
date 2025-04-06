import { Loader2 } from "lucide-react";
import { twMerge } from "tailwind-merge";

const Loading = ({
 className,
 size = 40,
}: {
 className?: string;
 size?: number;
}) => {
 return (
  <div
   role="status"
   className={twMerge(
    "flex items-center text-blue-500 dark:text-slate-50  justify-center",
    className
   )}
  >
   <Loader2 className="animate-spin" size={size} />
  </div>
 );
};

export default Loading;
