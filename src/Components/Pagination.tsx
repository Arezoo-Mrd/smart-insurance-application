import { Table } from "@tanstack/react-table";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

import { twMerge } from "tailwind-merge";

type PaginationProps<TData> = {
 table: Table<TData>;
};

const Pagination = <TData,>({ table }: PaginationProps<TData>) => {
 const { i18n } = useTranslation();
 const currentPage = table.getState().pagination.pageIndex + 1;
 const lastPage = table.getPageCount();

 const paginationRange = Array.from(
  { length: table.getPageCount() },
  (_, idx) => idx + 1
 );

 const onPageChange = (page: number) => {
  table.setPageIndex(page - 1);
 };

 const onNext = () => {
  console.log("next page");
  table.nextPage();
 };

 const onPrevious = () => {
  table.previousPage();
 };

 return (
  paginationRange.length > 0 && (
   <div className={`flex  items-center justify-center`}>
    <button
     onClick={onPrevious}
     aria-label="previous page"
     className={`${
      currentPage === 1 ? "pointer-events-none" : ""
     }  min-w-fit items-center rounded-lg cursor-pointer border dark:border-gray-500 border-gray-900 p-1 transition-all duration-500 ease-in-out flex`}
    >
     {i18n.language === "fa" ? (
      <ArrowRight size={20} className="text-gray-900 dark:text-gray-500" />
     ) : (
      <ArrowLeft size={20} className="text-gray-900 dark:text-gray-500" />
     )}
    </button>
    <ul
     className={twMerge("flex w-fit select-none items-center justify-center")}
    >
     {paginationRange &&
      paginationRange.map((pageNumber) => {
       return (
        <li
         className={`${
          pageNumber === currentPage
           ? "bg-secondary-50 text-blue-500 dark:text-blue-300"
           : "text-gray-900 dark:text-gray-500"
         } flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg font-RaviFaNum-Medium transition-all duration-200 ease-linear`}
         onClick={() => onPageChange(pageNumber)}
         key={pageNumber}
        >
         {pageNumber}
        </li>
       );
      })}
    </ul>

    <button
     onClick={onNext}
     aria-label="next page"
     className={`${
      currentPage === lastPage ? "pointer-events-none" : ""
     }  min-w-fit items-center cursor-pointer rounded-lg border  dark:border-gray-500 border-gray-900 p-1 transition-all duration-500 ease-in-out flex`}
    >
     {i18n.language === "fa" ? (
      <ArrowLeft size={20} className="text-gray-900 dark:text-gray-500" />
     ) : (
      <ArrowRight size={20} className="text-gray-900 dark:text-gray-500" />
     )}
    </button>
   </div>
  )
 );
};

export default Pagination;
