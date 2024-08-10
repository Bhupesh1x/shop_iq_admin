import db from "@/lib/db";

import { ColorClient } from "./_components/ColorClient";

async function ColorsPage({ params }: { params: { storeId: string } }) {
  const colors = await db.color.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="main-container space-y-4 py-4 lg:py-6">
      <ColorClient colors={colors} />
    </div>
  );
}

export default ColorsPage;
