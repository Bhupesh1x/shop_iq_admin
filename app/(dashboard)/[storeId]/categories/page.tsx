import db from "@/lib/db";

import { CategoryClient } from "./_components/CategoryClient";

async function CategoriesPage({ params }: { params: { storeId: string } }) {
  const categories = await db.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="main-container space-y-4 py-4 lg:py-6">
      <CategoryClient categories={categories} />
    </div>
  );
}

export default CategoriesPage;
