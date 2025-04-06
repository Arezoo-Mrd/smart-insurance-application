import { DynamicFormData } from "@/pages/Home/api/api.types";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import FormField from "./FormField";

type FormMakerProps = {
 data: DynamicFormData[];
 selectedForm: string;
};

const FormMaker = ({ data, selectedForm }: FormMakerProps) => {
 const controls = useForm();
 const { t } = useTranslation();

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  console.log("submit");
 };
 return (
  <FormProvider {...controls}>
   <form>
    {data
     ?.find((item) => item.formId === selectedForm)
     ?.fields.map((field) => (
      <FormField key={field.id} field={field} />
     ))}
    <button
     type="submit"
     onClick={handleSubmit}
     className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
    >
     {t("home.submitButton")}
    </button>
   </form>
  </FormProvider>
 );
};

export default FormMaker;
