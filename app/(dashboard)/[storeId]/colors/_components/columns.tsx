"use client";

import { format } from "date-fns";
import { Color } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

import { Actions } from "./Actions";

export const columns: ColumnDef<Color>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-x-2">
          <p>{row.original.value}</p>
          <div
            className="h-7 w-7 rounded-full border"
            style={{ backgroundColor: row.original.value }}
          />
        </div>
      );
    },
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
