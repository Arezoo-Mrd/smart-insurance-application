import { FormSubmissionResponse } from "@/pages/SubmittedApplication/api/api.types";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Pagination from "../Pagination";
import { DataTable } from "./Table";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";

type SubmittedApplicationProps = {
 data: FormSubmissionResponse | undefined;
};

const pageSize = 2;

const SubmittedApplication = ({ data }: SubmittedApplicationProps) => {
 const { t } = useTranslation();
 const [currentPage, setCurrentPage] = useState<number>(1);
 const [paginatedData, setPaginatedData] = useState<
  FormSubmissionResponse["data"]
 >([]);

 useEffect(() => {
  if (data) {
   // Calculate the start and end index for the current page
   const startIndex = (currentPage - 1) * pageSize;
   const endIndex = startIndex + pageSize;
   // Slice the data array to get only the items for the current page
   const currentData = data.data.slice(startIndex, endIndex);
   setPaginatedData(currentData);
  }
 }, [data, currentPage]);

 const onPageChange = (page: number) => {
  setCurrentPage(page);
 };

 const columns: ColumnDef<FormSubmissionResponse["data"][number]>[] =
  useMemo(() => {
   return [
    {
     accessorKey: "id",
     header: ({ column }) => {
      return (
       <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
       >
        {t(`submittedApp.row`)}
        <ArrowUpDown className="ml-2 h-4 w-4" />
       </Button>
      );
     },
    },
   ].concat(
    data?.columns.map((column) => ({
     accessorKey: column,
     header: ({ column }) => {
      console.log(column);
      return (
       <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="cursor-pointer"
       >
        {t(`submittedApp.${column.id}`)}
        <ArrowUpDown className="ml-2 h-4 w-4" />
       </Button>
      );
     },
    })) || []
   );
  }, [data, t]);

 return data ? (
  <div className="flex flex-col min-h-[400px] justify-between w-full h-full">
   <DataTable columns={columns} data={paginatedData} />
   <Pagination
    totalCount={data.data.length}
    currentPage={currentPage}
    pageSize={pageSize}
    onPageChange={(page) => onPageChange(Number(page))}
   />
  </div>
 ) : (
  <div className="w-full text-3xl h-full flex items-center justify-center">
   {t("common.noData")}
  </div>
 );
};

export default SubmittedApplication;
