/* eslint-disable @typescript-eslint/no-explicit-any */
import { DynamicFormData } from "@/pages/Home/api/api.types";
import { FieldValues, FormProvider, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import FormField from "./FormField";

type FormMakerProps = {
 data: DynamicFormData[];
 controls: UseFormReturn<FieldValues, any, FieldValues>;
 selectedForm: string;
};

const FormMaker = ({ data, controls, selectedForm }: FormMakerProps) => {
 const { t } = useTranslation();

 const handleSubmit = (e: any) => {
  console.log("controls", e, controls.getValues());
 };
 return (
  <FormProvider {...controls}>
   <form onSubmit={controls.handleSubmit(handleSubmit)}>
    {data
     ?.find((item) => item.formId === selectedForm)
     ?.fields.map((field) => (
      <FormField key={field.id} field={field} />
     ))}
    <button
     type="submit"
     className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
    >
     {t("home.submitButton")}
    </button>
   </form>
  </FormProvider>
 );
};

export default FormMaker;
