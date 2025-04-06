import { FormSubmissionResponse } from "@/pages/SubmittedApplication/api/api.types";
import { Row } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

const TableInfo = ({
 rowData,
}: {
 rowData: Row<FormSubmissionResponse["data"][number]>;
}) => {
 const { t } = useTranslation();

 return (
  <div className="mt-8 p-4 bg-blue-50 rounded-lg">
   <h3 className="text-lg font-bold text-center mb-4 text-gray-700">
    {t("submittedApp.submittedFormInfo")}
   </h3>
   <div className=" w-full flex flex-col gap-3 text-center justify-center items-center ">
    {Object.entries(rowData.original)
     .filter(([key]) => key !== "id")
     .map(([key, value]) => (
      <span key={key} className="text-gray-600">
       {t(`submittedApp.${key}`)}: {value}
      </span>
     ))}
   </div>
  </div>
 );
};

export default TableInfo;
