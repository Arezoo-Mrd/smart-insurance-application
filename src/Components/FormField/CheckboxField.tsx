import { UseFormRegisterReturn } from "react-hook-form";

interface CheckboxFieldProps {
 options?: string[];
 value?: string[];
 registration: UseFormRegisterReturn;
}

export const CheckboxField = ({
 options,
 value = [],
 registration,
}: CheckboxFieldProps) => {
 return (
  <div className="space-y-2">
   {options?.map((option) => (
    <label key={option} className="flex items-center space-x-2">
     <input
      type="checkbox"
      {...registration}
      value={option}
      checked={value && (value as string[])?.includes(option)}
      className="text-blue-600 focus:ring-blue-500"
     />
     <span>{option}</span>
    </label>
   ))}
  </div>
 );
};
