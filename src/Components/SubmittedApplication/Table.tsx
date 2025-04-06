import {
 ColumnDef,
 ColumnFiltersState,
 flexRender,
 getCoreRowModel,
 getFilteredRowModel,
 getPaginationRowModel,
 getSortedRowModel,
 PaginationState,
 SortingState,
 useReactTable,
} from "@tanstack/react-table";

import {
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableHeader,
 TableRow,
} from "@/Components/ui/table";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Input } from "../ui/input";
import Pagination from "../Pagination";

interface DataTableProps<TData, TValue> {
 columns: ColumnDef<TData, TValue>[];
 data: TData[] | undefined;
 searchableItem?: string;
}

export function DataTable<TData, TValue>({
 columns,
 data,
 searchableItem,
}: DataTableProps<TData, TValue>) {
 const { t } = useTranslation();
 const [sorting, setSorting] = useState<SortingState>([]);
 const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
 const [pagination, setPagination] = useState<PaginationState>({
  pageIndex: 0,
  pageSize: 2,
 });

 const table = useReactTable({
  data: data || [],
  columns,
  getCoreRowModel: getCoreRowModel(),
  onSortingChange: setSorting,
  getSortedRowModel: getSortedRowModel(),
  onColumnFiltersChange: setColumnFilters,
  getFilteredRowModel: getFilteredRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  onPaginationChange: setPagination,
  state: {
   sorting,
   columnFilters,
   pagination,
  },
 });

 const translationSearchableItem = t(`submittedApp.Full Name`);

 return (
  <div className="rounded-lg min-h-[400px] shadow bg-white w-3/4 border flex flex-col justify-between">
   <div className="flex flex-col">
    {searchableItem && (
     <div className="flex items-center py-4  justify-center">
      <Input
       placeholder={t("common.search", { field: translationSearchableItem })}
       value={
        (table.getColumn(searchableItem)?.getFilterValue() as string) ?? ""
       }
       onChange={(event) =>
        table.getColumn(searchableItem)?.setFilterValue(event.target.value)
       }
       className="max-w-sm"
      />
     </div>
    )}
    <Table>
     <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
       <TableRow key={headerGroup.id}>
        {headerGroup.headers.map((header) => {
         return (
          <TableHead key={header.id}>
           {header.isPlaceholder
            ? null
            : flexRender(header.column.columnDef.header, header.getContext())}
          </TableHead>
         );
        })}
       </TableRow>
      ))}
     </TableHeader>
     <TableBody>
      {table.getRowModel().rows?.length ? (
       table.getRowModel().rows.map((row) => (
        <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
         {row.getVisibleCells().map((cell) => (
          <TableCell key={cell.id}>
           {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
         ))}
        </TableRow>
       ))
      ) : (
       <TableRow>
        <TableCell colSpan={columns.length} className="h-24 text-center">
         {t("common.noData")}
        </TableCell>
       </TableRow>
      )}
     </TableBody>
    </Table>
   </div>
   <div className="py-4">
    <Pagination table={table} />
   </div>
  </div>
 );
}
