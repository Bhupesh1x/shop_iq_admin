type CreateCategoryRequest = {
  name: string;
  billboardId: string;
  storeId: string;
};

export const createCategory = async (data: CreateCategoryRequest) => {
  const res = await fetch(`/api/${data.storeId}/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Error creating category");
  }

  return await res.json();
};

interface UpdateCategoryRequest extends CreateCategoryRequest {
  categoryId: string;
}

export const updateCategory = async (data: UpdateCategoryRequest) => {
  const res = await fetch(
    `/api/${data.storeId}/categories/${data.categoryId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    throw new Error("Error updating category");
  }

  return await res.json();
};

type DeleteRequest = {
  storeId: string;
  categoryId: string;
};

export const deleteCategory = async (data: DeleteRequest) => {
  const res = await fetch(
    `/api/${data.storeId}/categories/${data.categoryId}`,
    {
      method: "DELETE",
    }
  );

  if (!res) {
    throw new Error("Error deleting category.");
  }

  return await res.json();
};
