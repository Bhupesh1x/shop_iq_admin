"use client";

import { toast } from "sonner";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";

import { CategoryWithBillboard } from "@/types";

import { useDeleteCategory } from "@/features/categories/queries";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { AlertModal } from "@/components/AlertModal";

type Props = {
  data: CategoryWithBillboard;
};

export const Actions = ({ data }: Props) => {
  const params = useParams();
  const router = useRouter();

  const { mutate, isPending } = useDeleteCategory();

  const [open, setOpen] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(data.id);
    toast.success("Category Id copied to the clipboard.");
  };

  const handleUpdate = () => {
    router.push(`/${params.storeId}/categories/${data.id}`);
  };

  const onConfirm = () => {
    mutate(
      { storeId: params.storeId as string, categoryId: data.id },
      {
        onSuccess: () => {
          setOpen(false);
          router.refresh();
        },
      }
    );
  };

  return (
    <>
      <AlertModal
        isLoading={isPending}
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
      />
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
          <DropdownMenuItem
            className="text-red-500 hover:bg-gray-200 transition cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
