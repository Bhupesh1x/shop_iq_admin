import { format } from "date-fns";

import db from "@/lib/db";
import { formatter } from "@/lib/utils";

import { ProductClient } from "./_components/ProductClient";

async function ProductsPage({ params }: { params: { storeId: string } }) {
  const products = await db.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      color: true,
      size: true,
      images: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProducts = products?.map((product) => ({
    id: product.id,
    name: product.name,
    isFeatured: product.isFeatured,
    isArchived: product.isArchived,
    size: product.size.value,
    category: product.category.name,
    price: formatter.format(product.price.toNumber()),
    color: product.color.value,
    createdAt: format(product.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="main-container space-y-4 py-4 lg:py-6">
      <ProductClient products={formattedProducts} />
    </div>
  );
}

export default ProductsPage;
