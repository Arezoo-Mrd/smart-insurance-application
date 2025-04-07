import { useSubmitFormMutation } from "@/pages/Home/api";
import { DynamicFormData } from "@/pages/Home/api/api.types";
import { useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import FormField from "./FormField";
import { Button } from "./ui/button";
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from "./ui/select";
import Loading from "./Loading";
import { toast } from "sonner";
import { SuccessMessage } from "./SuccessMessage";

type FormMakerProps = {
 data: DynamicFormData[] | undefined;
};

const FormMaker = ({ data }: FormMakerProps) => {
 const { t, i18n } = useTranslation();
 const { mutate, isPending } = useSubmitFormMutation();
 const [submitForm, setSubmitForm] = useState(false);

 const [selectedForm, setSelectedForm] = useState<DynamicFormData["formId"]>();

 const handleSubmit = (e: unknown) => {
  mutate(e, {
   onSuccess: () => {
    setSubmitForm(true);
   },
   onError: () => {
    toast.error(t("home.submitError"));
   },
  });
 };

 const controls = useForm<FieldValues>();

 return submitForm ? (
  <SuccessMessage
   message={t("home.submitSuccess")}
   hint={t("home.thanks")}
   onClose={() => {
    setSubmitForm(false);
    setSelectedForm(undefined);
    controls.reset();
   }}
  />
 ) : (
  <FormProvider {...controls}>
   <Select
    onValueChange={(selectedItem) => {
     setSelectedForm(selectedItem);
     controls.reset();
    }}
    dir={i18n.language === "fa" ? "rtl" : "ltr"}
   >
    <SelectTrigger className="w-full">
     <SelectValue placeholder={t("home.selectForm")} />
    </SelectTrigger>
    <SelectContent>
     {data?.map((item) => (
      <SelectItem key={item.formId} value={item.formId}>
       {item.title}
      </SelectItem>
     ))}
    </SelectContent>
   </Select>
   <div
    className={` w-full rounded-xl transition-[max_height] duration-300 delay-300 mt-4 overflow-hidden ${
     selectedForm ? "max-h-[2000px]" : "max-h-0"
    }`}
   >
    {data && selectedForm && (
     <>
      <form onSubmit={controls.handleSubmit(handleSubmit)}>
       {data
        ?.find((item) => item.formId === selectedForm)
        ?.fields.map((field) => (
         <FormField key={field.id} field={field} />
        ))}
       <div className="flex items-center justify-center my-4">
        <Button disabled={isPending} className="" type="submit">
         {isPending ? (
          <Loading className="w-5 h-5 text-gray-100" />
         ) : (
          t("home.submit")
         )}
        </Button>
       </div>
      </form>
     </>
    )}
   </div>
  </FormProvider>
 );
};

export default FormMaker;
