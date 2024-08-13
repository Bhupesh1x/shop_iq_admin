import db from "@/lib/db";

import { ProductForm } from "./_components/ProductForm";

type Props = {
  params: {
    productId: string;
    storeId: string;
  };
};

async function ProductPage({ params }: Props) {
  const product = await db.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
    },
  });

  const categories = await db.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const sizes = await db.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const colors = await db.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="main-container space-y-4 py-4 lg:py-6">
      <ProductForm
        sizes={sizes}
        colors={colors}
        product={product}
        categories={categories}
      />
    </div>
  );
}

export default ProductPage;
