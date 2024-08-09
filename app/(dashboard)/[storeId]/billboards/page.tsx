import db from "@/lib/db";

import { BillboardClient } from "./_components/BillboardClient";

async function BillboardsPage({ params }: { params: { storeId: string } }) {
  const billboards = await db.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="main-container space-y-4 py-4 lg:py-6">
      <BillboardClient billboards={billboards} />
    </div>
  );
}

export default BillboardsPage;
