import FormMaker from "@/Components/FormMaker";
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from "@/Components/ui/select";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useFormQuery } from "./api";
import { DynamicFormData } from "./api/api.types";

export default function Home() {
 const { t, i18n } = useTranslation();

 const { data, isLoading } = useFormQuery();

 const [selectedForm, setSelectedForm] = useState<DynamicFormData["formId"]>();

 return isLoading ? (
  <div className="w-full h-full flex items-center justify-center">
   <div className="w-16 h-16 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
  </div>
 ) : (
  <div className="w-full h-full flex flex-col text-sm items-center justify-center">
   <div className="w-full bg-white flex items-center flex-col justify-center border p-3 md:p-4 rounded-xl min-h-96 border-gray-50 shadow  lg:w-1/3">
    <p className="text-sm pb-2 md:pb-3 text-gray-700">{t("home.hint")}</p>
    <Select
     onValueChange={(selectedItem) => setSelectedForm(selectedItem)}
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
      selectedForm ? "max-h-[999px]" : "max-h-0"
     }`}
    >
     {data && selectedForm && (
      <FormMaker data={data} selectedForm={selectedForm} />
     )}
    </div>
   </div>
  </div>
 );
}
