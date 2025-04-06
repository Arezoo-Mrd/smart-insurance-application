import { Field, SubField } from "@/pages/Home/api/api.types";
import { useStatesQuery } from "@/pages/Home/api";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { SelectField } from "./SelectField";
import { RadioField } from "./RadioField";
import { CheckboxField } from "./CheckboxField";
import { InputField } from "./InputField";
import Wrapper from "./Wrapper";
import { TextareaField } from "./TextAreaField";
import Loading from "../Loading";

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

 const { data: dynamicData, isLoading } = useStatesQuery(dynamicOptionsValue);

 const isVisible = useMemo(() => {
  if (!dependsOn) return true;
  const expectedValue = visibility?.value;

  return expectedValue
   ? dependentValue === expectedValue
   : Boolean(dependentValue);
 }, [dependsOn, visibility?.value, dependentValue]);

 if (!isVisible) {
  return null;
 }

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

 const registration = register(fieldId, {
  required: {
   value: isVisible ? !!field.required : false,
   message: t("home.required", {
    field: field.label,
   }),
  },
  ...(field.type === "text" || field.type === "textarea"
   ? {
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
     }
   : {}),
  ...(field.type === "text"
   ? {
      pattern: {
       value: field.validation?.pattern
        ? new RegExp(field.validation.pattern)
        : new RegExp(""),
       message: t("home.invalid", {
        field: field.label,
       }),
      },
     }
   : {}),
  onChange(event) {
   if (field.type === "checkbox") {
    const currentValues = new Set(watch(fieldId) || []);
    if (event.target.checked) {
     currentValues.add(event.target.value);
    } else {
     currentValues.delete(event.target.value);
    }
    setValue(fieldId, Array.from(currentValues));
   } else {
    setValue(fieldId, event.target.value);
   }
  },
 });

 const renderField = () => {
  switch (field.type) {
   case "select":
    return isLoading ? (
     <div className="flex justify-center items-center">
      <Loading className="w-7 h-7 text-gray-100" />
     </div>
    ) : (
     <SelectField
      id={fieldId}
      label={field.label}
      options={field.options}
      dynamicOptions={dynamicData?.states}
      value={value as string}
      registration={registration}
      error={!!error}
      onValueChange={(value) => {
       setValue(fieldId, value, {
        shouldDirty: true,
        shouldValidate: true,
       });
      }}
      dir={i18n.language === "fa" ? "rtl" : "ltr"}
     />
    );

   case "radio":
    return (
     <RadioField
      options={field.options}
      value={value as string}
      registration={registration}
     />
    );

   case "checkbox":
    return (
     <CheckboxField
      options={field.options}
      value={value as string[]}
      registration={registration}
     />
    );

   case "textarea":
    return (
     <TextareaField
      id={fieldId}
      label={field.label}
      value={value as string}
      registration={registration}
      error={!!error}
     />
    );

   default:
    return (
     <InputField
      id={fieldId}
      type={field.type}
      label={field.label}
      value={value as string}
      registration={registration}
      error={!!error}
      min={field.validation?.min}
      max={field.validation?.max}
      pattern={field.validation?.pattern}
     />
    );
  }
 };

 return (
  <Wrapper
   id={fieldId}
   label={field.label}
   required={field.required}
   error={error?.message as string}
  >
   {renderField()}
  </Wrapper>
 );
};

export default FormField;
