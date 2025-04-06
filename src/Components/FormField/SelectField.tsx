import { useTranslation } from "react-i18next";
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from "../ui/select";
import { UseFormRegisterReturn } from "react-hook-form";

interface SelectFieldProps {
 id: string;
 label: string;
 options?: string[];
 dynamicOptions?: string[];
 value?: string;
 registration: UseFormRegisterReturn;
 error?: boolean;
 onValueChange: (value: string) => void;
 dir?: "ltr" | "rtl";
}

export const SelectField = ({
 id,
 label,
 options,
 dynamicOptions,
 value,
 registration,
 error,
 onValueChange,
 dir = "ltr",
}: SelectFieldProps) => {
 const { t } = useTranslation();
 const errorClasses = error ? "border-red-500" : "border-gray-300";

 return (
  <Select dir={dir} value={value} name={id} onValueChange={onValueChange}>
   <SelectTrigger {...registration} className={`w-full ${errorClasses}`}>
    <SelectValue placeholder={`${t("home.select")} ${label}`} />
   </SelectTrigger>
   <SelectContent>
    {dynamicOptions
     ? dynamicOptions.map((option) => (
        <SelectItem key={option} value={option}>
         {option}
        </SelectItem>
       ))
     : options?.map((option) => (
        <SelectItem key={option} value={option}>
         {option}
        </SelectItem>
       ))}
   </SelectContent>
  </Select>
 );
};
