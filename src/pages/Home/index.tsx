import FormMaker from "@/Components/FormMaker";
import { useFormQuery } from "./api";
import { useTranslation } from "react-i18next";
import Loading from "@/Components/Loading";

export default function Home() {
 const { data, isLoading } = useFormQuery();
 const { t } = useTranslation();

 return isLoading ? (
  <div className="w-full h-full flex items-center justify-center">
   <Loading />
  </div>
 ) : (
  <div className="w-full h-full flex flex-col text-sm items-center justify-center">
   <div className="w-full dark:bg-gray-900  bg-white flex items-center flex-col justify-center border p-3 md:p-4 rounded-xl min-h-96 border-gray-50 shadow  lg:w-1/3">
    <p className="text-sm pb-2 md:pb-3 dark:text-white text-gray-700">
     {t("home.hint")}
    </p>
    <FormMaker data={data} />
   </div>
  </div>
 );
}
