import { DOTS, usePagination } from "@/hooks/usePagination";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

import { twMerge } from "tailwind-merge";

type PaginationProps = {
 totalCount: number;
 siblingCount?: number;
 currentPage: number;
 pageSize: number;
 className?: string;
 onPageChange: (page: number | string) => void;
 disabled?: boolean;
};

const Pagination = (props: PaginationProps) => {
 const { i18n } = useTranslation();

 const {
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  className,
 } = props;

 const paginationRange = usePagination({
  currentPage,
  totalCount,
  siblingCount,
  pageSize,
 });

 if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
  return null;
 }

 const lastPage =
  paginationRange && paginationRange[paginationRange.length - 1];

 const onNext = () => {
  if (props.disabled) return;
  onPageChange(currentPage + 1);
 };

 const onPrevious = () => {
  if (props.disabled) return;
  onPageChange(currentPage - 1);
 };

 return (
  <div
   className={`flex ${
    i18n.language === "fa" ? "flex-row" : "flex-row-reverse"
   } items-center justify-center`}
  >
   <button
    onClick={onPrevious}
    aria-label="previous page"
    className={`${
     currentPage === 1 ? "pointer-events-none" : ""
    } hidden min-w-fit items-center rounded-lg cursor-pointer border border-blue-300 p-1 transition-all duration-500 ease-in-out md:flex`}
   >
    <ArrowRight size={20} className="text-blue-500" />
   </button>
   <ul
    className={twMerge(
     "flex w-fit select-none items-center justify-center",
     className
    )}
   >
    {paginationRange &&
     paginationRange.map((pageNumber) => {
      if (pageNumber === DOTS) {
       return (
        <li
         key={pageNumber}
         className="flex h-10 w-10 items-center justify-center text-blue-500"
        >
         &#8230;
        </li>
       );
      }

      return (
       <li
        className={`${
         pageNumber === currentPage
          ? "bg-secondary-50 text-primary-600"
          : "text-blue-500"
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
    } hidden min-w-fit items-center cursor-pointer rounded-lg border border-blue-300 p-1 transition-all duration-500 ease-in-out md:flex`}
   >
    <ArrowLeft size={20} className="text-blue-500" />
   </button>
  </div>
 );
};

export default Pagination;
