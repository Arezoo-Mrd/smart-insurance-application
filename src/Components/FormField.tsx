import { Field, SubField } from "@/pages/Home/api/api.types";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Input } from "./ui/input";
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { useStatesQuery } from "@/pages/Home/api";

interface FormFieldProps {
 field: Field | SubField;
}

const FormField = ({ field }: FormFieldProps) => {
 const { t, i18n } = useTranslation();
 const {
  setValue,
  watch,
  formState: { errors },
 } = useFormContext();
 const fieldId = field.id;
 const value = watch(fieldId);
 const error = errors[fieldId];
 const visibility = field.visibility;
 const dynamicOptions = (field as SubField)?.dynamicOptions;
 const dependsOn = visibility?.dependsOn || dynamicOptions?.dependsOn;
 const dependentValue = dependsOn && watch(dependsOn);
 const dynamicOptionsValue = dynamicOptions && watch(dynamicOptions.dependsOn);

 const { data: dynamicData } = useStatesQuery(dynamicOptionsValue);

 const isVisible = useMemo(() => {
  if (!dependsOn) return true;
  const expectedValue = visibility?.value;

  return expectedValue
   ? dependentValue === expectedValue
   : Boolean(dependentValue);
 }, [dependsOn, visibility?.value, dependentValue]);

 if (!isVisible) return null;

 const handleChange = (
  e:
   | React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
     >
   | string
 ) => {
  if (typeof e === "string") {
   setValue(fieldId, e);
   return;
  }
  const newValue =
   e.target.type === "checkbox"
    ? (e.target as HTMLInputElement).checked
    : e.target.value;

  setValue(fieldId, newValue);
 };

 if (field.type === "group") {
  return (
   <fieldset className="border rounded-md p-4 mb-4">
    <legend className="text-lg font-semibold px-2 select-none">
     {field.label}
    </legend>
    <div className="space-y-4">
     {(field as Field).fields?.map((subField) => (
      <FormField key={subField.id} field={subField} />
     ))}
    </div>
   </fieldset>
  );
 }

 const errorClasses = error ? "border-red-500" : "border-gray-300";

 const renderField = () => {
  switch (field.type) {
   case "select":
    return (
     <>
      <Select
       onValueChange={(event) => handleChange(event)}
       dir={i18n.language === "fa" ? "rtl" : "ltr"}
       value={value as string}
       required={field.required}
       name={fieldId}
      >
       <SelectTrigger className="w-full">
        <SelectValue placeholder={`${t("home.select")} ${field.label}`} />
       </SelectTrigger>
       <SelectContent>
        {dynamicData
         ? dynamicData.states.map((state) => {
            return (
             <SelectItem key={state} value={state}>
              {state}
             </SelectItem>
            );
           })
         : field.options?.map((option) => (
            <SelectItem key={option} value={option}>
             {option}
            </SelectItem>
           ))}
       </SelectContent>
      </Select>
     </>
    );

   case "radio":
    return (
     <div className="space-y-2">
      {field.options?.map((option) => (
       <label key={option} className="flex items-center space-x-2">
        <input
         type="radio"
         name={fieldId}
         value={option}
         id={option}
         checked={value === option}
         onChange={handleChange}
         required={field.required}
         className="text-blue-600 focus:ring-blue-500"
        />
        <span>{option}</span>
       </label>
      ))}
     </div>
    );

   case "checkbox":
    return (
     <div className="space-y-2">
      {field.options?.map((option) => (
       <label key={option} className="flex items-center space-x-2">
        <input
         type="checkbox"
         name={fieldId}
         value={option}
         checked={(value as string[])?.includes(option)}
         onChange={(e) => {
          const currentValues = (value as string[]) || [];
          const newValues = e.target.checked
           ? [...currentValues, option]
           : currentValues.filter((v) => v !== option);
          setValue(fieldId, newValues);
         }}
         required={field.required}
         className="text-blue-600 focus:ring-blue-500"
        />
        <span>{option}</span>
       </label>
      ))}
     </div>
    );

   case "textarea":
    return (
     <>
      <Textarea
       id={fieldId}
       onChange={handleChange}
       required={field.required}
       value={value as string}
       placeholder={field?.label}
       className={` ${errorClasses}`}
      />
     </>
    );
   default:
    return (
     <>
      <Input
       id={fieldId}
       type={field.type}
       onChange={handleChange}
       required={field.required}
       value={value as string}
       min={field.validation?.min}
       max={field.validation?.max}
       pattern={field.validation?.pattern}
       placeholder={field?.label}
       className={`${errorClasses}`}
      />
     </>
    );
  }
 };

 return (
  <div className="mb-4">
   <label
    htmlFor={fieldId}
    className="block text-sm font-medium text-gray-700 mb-1"
   >
    {field.label}
    {field.required && <span className="text-red-500 ml-1">*</span>}
   </label>
   {renderField()}
   {error && (
    <p className="mt-1 text-sm text-red-500">{error.message as string}</p>
   )}
  </div>
 );
};

export default FormField;
