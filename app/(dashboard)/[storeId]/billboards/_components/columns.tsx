"use client";

import { format } from "date-fns";
import { Billboard } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

import { Actions } from "./Actions";

export const columns: ColumnDef<Billboard>[] = [
  {
    accessorKey: "label",
    header: "Label",
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
