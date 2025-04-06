import { FormSubmissionResponse } from "@/pages/SubmittedApplication/api/api.types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { DataTable } from "./Table";

type SubmittedApplicationProps = {
 data: FormSubmissionResponse | undefined;
};

const SubmittedApplication = ({ data }: SubmittedApplicationProps) => {
 const { t } = useTranslation();

 const columns: ColumnDef<FormSubmissionResponse["data"][number]>[] =
  useMemo(() => {
   return [
    {
     accessorKey: "id",

     // eslint-disable-next-line @typescript-eslint/no-explicit-any
     header: ({ column }: { column: any }) => {
      return (
       <Button
        variant="ghost"
        className="cursor-pointer"
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

 return (
  <div className="flex  min-h-[400px] justify-center items-center w-full h-full">
   <DataTable
    searchableItem={`Full Name`}
    columns={columns}
    data={data?.data}
   />
  </div>
 );
};

export default SubmittedApplication;
