import { useTranslation } from "react-i18next";
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from "./ui/select";
import { useTheme } from "next-themes";
import { Moon, SunMoon } from "lucide-react";

const ThemeSwitcher = () => {
 const { t, i18n } = useTranslation();
 const { theme, setTheme } = useTheme();

 return (
  <div className=" flex items-center gap-2">
   {theme === "dark" ? (
    <Moon className="w-6 h-6 dark:text-blue-800 text-blue-400" />
   ) : (
    <SunMoon className="w-6 h-6 dark:text-blue-800 text-blue-400" />
   )}
   <Select
    dir={i18n.language === "fa" ? "rtl" : "ltr"}
    onValueChange={setTheme}
    defaultValue={theme}
   >
    <SelectTrigger className="w-[180px]">
     <SelectValue placeholder={t("nav.selectTheme")} />
    </SelectTrigger>
    <SelectContent>
     <SelectItem value="dark">{t("nav.dark")}</SelectItem>
     <SelectItem value="light">{t("nav.light")}</SelectItem>
    </SelectContent>
   </Select>
  </div>
 );
};

export default ThemeSwitcher;
