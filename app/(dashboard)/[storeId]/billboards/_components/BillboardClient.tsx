"use client";

import { Plus } from "lucide-react";
import { Billboard } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

import { Heading } from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/DataTable";

import { columns } from "./columns";

type Props = {
  billboards: Billboard[];
};

export const BillboardClient = ({ billboards }: Props) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards (${billboards.length})`}
          description="Manage billboards for your store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New
        </Button>
      </div>

      <DataTable data={billboards} columns={columns} searchKey="label" />
    </>
  );
};
