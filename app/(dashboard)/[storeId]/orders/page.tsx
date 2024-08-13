import { format } from "date-fns";

import db from "@/lib/db";
import { formatter } from "@/lib/utils";

import { OrderClient } from "./_components/OrderClient";

async function OrdersPage({ params }: { params: { storeId: string } }) {
  const orders = await db.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedOrders = orders?.map((order) => ({
    id: order.id,
    phone: order.phone,
    address: order.address,
    isPaid: order.isPaid,
    products: order.orderItems.map((item) => item.product.name).join(", "),
    totalPrice: formatter.format(
      order.orderItems.reduce((total, item) => {
        return (total += Number(item.product.price));
      }, 0)
    ),
    createdAt: format(order.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="main-container space-y-4 py-4 lg:py-6">
      <OrderClient orders={formattedOrders} />
    </div>
  );
}

export default OrdersPage;
