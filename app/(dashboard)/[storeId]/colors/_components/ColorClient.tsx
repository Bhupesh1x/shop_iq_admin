"use client";

import { Plus } from "lucide-react";
import { Color } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

import { Heading } from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { ApiList } from "@/components/ApiList";
import { DataTable } from "@/components/DataTable";
import { Separator } from "@/components/ui/separator";

import { columns } from "./columns";

type Props = {
  colors: Color[];
};

export const ColorClient = ({ colors }: Props) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Colors (${colors.length})`}
          description="Manage colors for your store"
        />
        <Button onClick={() => router.push(`/${params.storeId}/colors/new`)}>
          <Plus className="h-4 w-4 mr-2" />
          Add New
        </Button>
      </div>

      <DataTable data={colors} columns={columns} searchKey="name" />

      <Heading title="Api" description="Api calls for colors" />
      <Separator />

      <ApiList entityName="colors" entityIdName="colorid" />
    </>
  );
};
