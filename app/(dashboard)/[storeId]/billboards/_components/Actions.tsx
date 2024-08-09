"use client";

import { toast } from "sonner";
import { Billboard } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

type Props = {
  data: Billboard;
};

export const Actions = ({ data }: Props) => {
  const params = useParams();
  const router = useRouter();
  const handleCopy = () => {
    navigator.clipboard.writeText(data.id);
    toast.success("Billboard Id copied to the clipboard.");
  };

  const handleUpdate = () => {
    router.push(`/${params.storeId}/billboards/${data.id}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={handleCopy}
          className="hover:bg-gray-200 transition cursor-pointer"
        >
          <Copy className="h-4 w-4 mr-2" />
          Copy id
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleUpdate}
          className="hover:bg-gray-200 transition cursor-pointer"
        >
          <Edit className="h-4 w-4 mr-2" />
          Update
        </DropdownMenuItem>
        <DropdownMenuItem className="text-red-500 hover:bg-gray-200 transition cursor-pointer">
          <Trash className="h-4 w-4 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
