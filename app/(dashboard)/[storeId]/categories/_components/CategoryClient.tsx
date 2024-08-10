"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { CategoryWithBillboard } from "@/types";

import { Heading } from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { ApiList } from "@/components/ApiList";
import { DataTable } from "@/components/DataTable";
import { Separator } from "@/components/ui/separator";

import { columns } from "./columns";

type Props = {
  categories: CategoryWithBillboard[];
};

export const CategoryClient = ({ categories }: Props) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories (${categories?.length})`}
          description="Manage categories for your store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/categories/new`)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New
        </Button>
      </div>

      <DataTable data={categories} columns={columns} searchKey="name" />

      <Heading title="Api" description="Api calls for categories" />
      <Separator />

      <ApiList entityName="categories" entityIdName="categoryId" />
    </>
  );
};
