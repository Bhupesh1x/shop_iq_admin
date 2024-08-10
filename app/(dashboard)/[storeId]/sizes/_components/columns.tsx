"use client";

import { format } from "date-fns";
import { Size } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

import { Actions } from "./Actions";

export const columns: ColumnDef<Size>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
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
