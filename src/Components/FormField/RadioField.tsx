import { UseFormRegisterReturn } from "react-hook-form";

interface RadioFieldProps {
 options?: string[];
 value?: string;
 registration: UseFormRegisterReturn;
}

export const RadioField = ({
 options,
 value,
 registration,
}: RadioFieldProps) => {
 return (
  <div className="space-y-2">
   {options?.map((option) => (
    <label key={option} className="flex items-center space-x-2">
     <input
      type="radio"
      {...registration}
      value={option}
      id={option}
      checked={value === option}
      className="text-blue-600 focus:ring-blue-500"
     />
     <span>{option}</span>
    </label>
   ))}
  </div>
 );
};
