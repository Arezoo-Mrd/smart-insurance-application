import { UseFormRegisterReturn } from "react-hook-form";
import { Textarea } from "../ui/textarea";

interface TextareaFieldProps {
 id: string;
 label?: string;
 value?: string;
 registration: UseFormRegisterReturn;
 error?: boolean;
}

export const TextareaField = ({
 id,
 label,
 value,
 registration,
 error,
}: TextareaFieldProps) => {
 const errorClasses = error ? "border-red-500" : "border-gray-300";

 return (
  <Textarea
   id={id}
   {...registration}
   value={value}
   placeholder={label}
   className={`${errorClasses}`}
  />
 );
};
