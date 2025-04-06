import "@/utils/i18n";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home/index";
import SubmittedApplicationPage from "./pages/SubmittedApplication";

const queryClient = new QueryClient();

const App = () => {
 const { i18n } = useTranslation();

 useEffect(() => {
  document.dir = i18n.language === "fa" ? "rtl" : "ltr";
 }, [i18n.language]);

 return (
  <QueryClientProvider client={queryClient}>
   <Toaster />
   <BrowserRouter>
    <div className="min-h-screen bg-gray-50">
     <Navbar />
     <div className="container min-h-screen mx-auto pt-20">
      <Routes>
       <Route path="/" element={<Home />} />
       <Route
        path="/submitted-application"
        element={<SubmittedApplicationPage />}
       />
      </Routes>
     </div>
    </div>
   </BrowserRouter>
  </QueryClientProvider>
 );
};

export default App;
