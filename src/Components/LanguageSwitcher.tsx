import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from "./ui/select";

export default function LanguageSwitcher() {
 const { t, i18n } = useTranslation();

 const changeLanguage = (lng: string) => {
  i18n.changeLanguage(lng);
  document.dir = lng === "fa" ? "rtl" : "ltr";
  document.documentElement.lang = lng;
 };

 return (
  <div className=" flex items-center gap-2">
   <Globe className="w-6 h-6 dark:text-blue-800 text-blue-400" />
   <Select
    dir={i18n.language === "fa" ? "rtl" : "ltr"}
    onValueChange={changeLanguage}
    defaultValue={i18n.language}
   >
    <SelectTrigger className="w-[180px]">
     <SelectValue placeholder={t("nav.selectLanguage")} />
    </SelectTrigger>
    <SelectContent>
     <SelectItem value="en">{t("nav.english")}</SelectItem>
     <SelectItem value="fa">{t("nav.persian")}</SelectItem>
    </SelectContent>
   </Select>
  </div>
 );
}
