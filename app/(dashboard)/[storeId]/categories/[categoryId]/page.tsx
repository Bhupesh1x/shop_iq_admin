import db from "@/lib/db";

import { CategoryForm } from "./_components/CategoryForm";

type Props = {
  params: {
    storeId: string;
    categoryId: string;
  };
};

async function BillboardPage({ params }: Props) {
  const category = await db.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });

  const billboards = await db.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="main-container space-y-4 py-4 lg:py-6">
      <CategoryForm category={category} billboards={billboards} />
    </div>
  );
}

export default BillboardPage;
