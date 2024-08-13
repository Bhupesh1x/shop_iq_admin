type CreateProductRequest = {
  name: string;
  price: number;
  images: { url: string }[];
  categoryId: string;
  sizeId: string;
  colorId: string;
  isFeatured?: boolean;
  isArchived?: boolean;
  storeId: string;
};

export const createProduct = async (data: CreateProductRequest) => {
  const res = await fetch(`/api/${data.storeId}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Error creating product");
  }

  return await res.json();
};

interface UpdateProductRequest extends CreateProductRequest {
  productId: string;
}

export const updateProduct = async (data: UpdateProductRequest) => {
  const res = await fetch(`/api/${data.storeId}/products/${data.productId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Error updating product");
  }

  return await res.json();
};

type DeleteRequest = {
  storeId: string;
  productId: string;
};

export const deleteProduct = async (data: DeleteRequest) => {
  const res = await fetch(`/api/${data.storeId}/products/${data.productId}`, {
    method: "DELETE",
  });

  if (!res) {
    throw new Error("Error deleting product.");
  }

  return await res.json();
};
