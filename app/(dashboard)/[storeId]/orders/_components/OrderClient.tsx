import { Heading } from "@/components/Heading";
import { DataTable } from "@/components/DataTable";

import { columns, OrderColumn } from "./columns";

type Props = {
  orders: OrderColumn[];
};

export const OrderClient = ({ orders }: Props) => {
  return (
    <>
      <Heading
        title={`Orders (${orders.length})`}
        description="Manage orders for your store"
      />

      <DataTable data={orders} columns={columns} searchKey="products" />
    </>
  );
};
