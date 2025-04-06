import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";

const Navbar = () => {
 const { t } = useTranslation();

 return (
  <nav className="flex flex-col md:flex-row justify-start md:items-center  bg-gray-900  dark:bg-gray-800 text-white h-fit md:h-18 p-4 w-full">
   <ul className="w-full flex items-center gap-5">
    <li>
     <Link to="/" className="hover:text-gray-400">
      {t("nav.home")}
     </Link>
    </li>
    <li>
     <Link to="/submitted-application" className="hover:text-gray-400">
      {t("nav.listOfSubmittedApplications")}
     </Link>
    </li>
   </ul>
   <div className="flex justify-end p-4"></div>
   <div className="flex gap-5 items-center">
    <LanguageSwitcher />
    <ThemeSwitcher />
   </div>
  </nav>
 );
};

export default Navbar;
