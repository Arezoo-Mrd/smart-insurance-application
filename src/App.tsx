import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import Home from "./pages/Home/index";
import SubmittedApplication from "./pages/SubmittedApplication";
import "@/utils/i18n";
import LanguageSwitcher from "./Components/LanguageSwitcher";
import { Toaster } from "sonner";

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
     <LanguageSwitcher />
     <div className="container mx-auto pt-20">
      <Routes>
       <Route path="/" element={<Home />} />
       <Route
        path="/submitted-application"
        element={<SubmittedApplication />}
       />
      </Routes>
     </div>
    </div>
   </BrowserRouter>
  </QueryClientProvider>
 );
};

export default App;
