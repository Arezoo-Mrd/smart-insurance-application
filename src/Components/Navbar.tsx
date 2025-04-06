import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
 const { t } = useTranslation();

 return (
  <nav className="flex justify-start items-center bg-gray-900 text-white h-18 p-4 w-full">
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
   <LanguageSwitcher />
  </nav>
 );
};

export default Navbar;
