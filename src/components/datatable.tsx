"use client";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "./ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { TablePagination } from "./table-pagination";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[] | (() => ColumnDef<TData, TValue>[]);
  data: TData[];
  className?: string;
  pagination?: boolean;
  initialPageSize?: number;
  initialSortingState?: SortingState;
  enableMultiRowSelection?: boolean;
  onRowSelect?: (values: TData[]) => void;
}

export function Datatable<TData, TValue>({
  data,
  columns,
  className,
  pagination = true,
  initialPageSize = 5,
  initialSortingState,
  enableMultiRowSelection,
  onRowSelect,
}: DataTableProps<TData, TValue>) {
  const [selected, setSelected] = useState<TData[]>([]);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns: Array.isArray(columns) ? columns : columns(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableMultiRowSelection: enableMultiRowSelection,
    onRowSelectionChange: setRowSelection,
    initialState: {
      sorting: initialSortingState,
      pagination: {
        pageSize: initialPageSize,
      },
    },
    state: { rowSelection },
  });

  useEffect(() => {
    setSelected(
      table.getFilteredSelectedRowModel().rows.map((row) => row.original)
    );
  }, [rowSelection, table]);
  useEffect(() => {
    if (onRowSelect) {
      onRowSelect(selected);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <div className={cn("space-y-4", className)}>
      <div className="rounded-md border">
        <Table className="h-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {pagination && <TablePagination table={table} />}
    </div>
  );
}
