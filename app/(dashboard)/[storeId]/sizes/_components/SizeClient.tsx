"use client";

import { Plus } from "lucide-react";
import { Size } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

import { Heading } from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { ApiList } from "@/components/ApiList";
import { DataTable } from "@/components/DataTable";
import { Separator } from "@/components/ui/separator";

import { columns } from "./columns";

type Props = {
  sizes: Size[];
};

export const SizeClient = ({ sizes }: Props) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Sizes (${sizes.length})`}
          description="Manage sizes for your store"
        />
        <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
          <Plus className="h-4 w-4 mr-2" />
          Add New
        </Button>
      </div>

      <DataTable data={sizes} columns={columns} searchKey="name" />

      <Heading title="Api" description="Api calls for sizes" />
      <Separator />

      <ApiList entityName="sizes" entityIdName="sizeId" />
    </>
  );
};
