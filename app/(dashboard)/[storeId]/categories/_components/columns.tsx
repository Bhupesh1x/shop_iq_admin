"use client";

import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";

import { CategoryWithBillboard } from "@/types";

import { Actions } from "./Actions";

export const columns: ColumnDef<CategoryWithBillboard>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "Billboard",
    cell: ({ row }) => {
      const billboardName = row.original.billboard.label;

      return <p>{billboardName}</p>;
    },
  },
  {
    accessorKey: "Date",
    cell: ({ row }) => {
      const date = row.original.createdAt;

      return <p>{format(date, "MMMM do, yyyy")}</p>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <Actions data={row.original} />,
  },
];
