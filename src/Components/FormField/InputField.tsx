import { UseFormRegisterReturn } from "react-hook-form";
import { Input } from "../ui/input";

interface InputFieldProps {
 id: string;
 type?: string;
 label?: string;
 value?: string;
 registration: UseFormRegisterReturn;
 error?: boolean;
 min?: number;
 max?: number;
 pattern?: string;
}

export const InputField = ({
 id,
 type = "text",
 label,
 value,
 registration,
 error,
 min,
 max,
 pattern,
}: InputFieldProps) => {
 const errorClasses = error ? "border-red-500" : "border-gray-300";

 return (
  <Input
   id={id}
   type={type}
   {...registration}
   value={value}
   min={min}
   max={max}
   pattern={pattern}
   placeholder={label}
   className={`${errorClasses}`}
  />
 );
};
