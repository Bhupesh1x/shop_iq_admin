"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Heading } from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { ApiList } from "@/components/ApiList";
import { DataTable } from "@/components/DataTable";
import { Separator } from "@/components/ui/separator";

import { columns, ProductColumn } from "./columns";

type Props = {
  products: ProductColumn[];
};

export const ProductClient = ({ products }: Props) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Products (${products.length})`}
          description="Manage products for your store"
        />
        <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
          <Plus className="h-4 w-4 mr-2" />
          Add New
        </Button>
      </div>

      <DataTable data={products} columns={columns} searchKey="name" />

      <Heading title="Api" description="Api calls for products" />
      <Separator />

      <ApiList entityName="products" entityIdName="productId" />
    </>
  );
};
