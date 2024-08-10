import db from "@/lib/db";

import { SizeClient } from "./_components/SizeClient";

async function SizesPage({ params }: { params: { storeId: string } }) {
  const sizes = await db.size.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="main-container space-y-4 py-4 lg:py-6">
      <SizeClient sizes={sizes} />
    </div>
  );
}

export default SizesPage;
