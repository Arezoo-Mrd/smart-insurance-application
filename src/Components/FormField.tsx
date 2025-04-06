import { useStatesQuery } from "@/pages/Home/api";
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

interface FormFieldProps {
 field: Field | SubField;
}

const FormField = ({ field }: FormFieldProps) => {
 const { t, i18n } = useTranslation();
 const {
  setValue,
  watch,
  register,
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
       dir={i18n.language === "fa" ? "rtl" : "ltr"}
       value={value as string}
       {...register(fieldId, {
        required: {
         value: isVisible ?? !!field.required,
         message: t("home.required", {
          field: field.label,
         }),
        },
       })}
       name={fieldId}
       onValueChange={(value) => {
        setValue(fieldId, value, {
         shouldValidate: true,
         shouldDirty: true,
        });
       }}
      >
       <SelectTrigger className={`w-full ${errorClasses}`}>
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
         {...register(fieldId, {
          required: {
           value: isVisible ?? !!field.required,
           message: t("home.required", {
            field: field.label,
           }),
          },
          onChange(event) {
           setValue(fieldId, event.target.value);
          },
         })}
         name={fieldId}
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

   case "checkbox":
    return (
     <div className="space-y-2">
      {field.options?.map((option) => (
       <label key={option} className="flex items-center space-x-2">
        <input
         {...register(fieldId, {
          required: {
           value: isVisible ?? !!field.required,
           message: t("home.required", {
            field: field.label,
           }),
          },
          onChange(event) {
           const currentValues = (value as string[]) || [];
           const newValues = event.target.checked
            ? [...currentValues, option]
            : currentValues.filter((v) => v !== option);
           setValue(fieldId, newValues);
          },
         })}
         type="checkbox"
         name={fieldId}
         value={option}
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
       {...register(fieldId, {
        required: {
         value: isVisible ?? !!field.required,
         message: `${field.label} is required`,
        },
        minLength: {
         value: field.validation?.min || 0,
         message: t("home.minLength", {
          field: field.label,
          min: field.validation?.min,
         }),
        },
        maxLength: {
         value: field.validation?.max || 1000,
         message: t("home.maxLength", {
          field: field.label,
          max: field.validation?.max,
         }),
        },
        onChange(event) {
         setValue(fieldId, event.target.value);
        },
       })}
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
       {...register(fieldId, {
        required: {
         value: isVisible ?? !!field.required,
         message: t("home.required", {
          field: field.label,
         }),
        },
        minLength: {
         value: field.validation?.min || 0,
         message: t("home.minLength", {
          field: field.label,
          min: field.validation?.min,
         }),
        },
        maxLength: {
         value: field.validation?.max || 1000,
         message: t("home.maxLength", {
          field: field.label,
          max: field.validation?.max,
         }),
        },
        pattern: {
         value: field.validation?.pattern
          ? new RegExp(field.validation.pattern)
          : new RegExp(""),
         message: t("home.invalid", {
          field: field.label,
         }),
        },
        onChange(event) {
         setValue(fieldId, event.target.value);
        },
       })}
       value={value as string}
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
