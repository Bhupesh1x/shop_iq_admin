type CreateSizeRequest = {
  name: string;
  value: string;
  storeId: string;
};

export const createSize = async (data: CreateSizeRequest) => {
  const res = await fetch(`/api/${data.storeId}/sizes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Error creating size");
  }

  return await res.json();
};

interface UpdateSizeRequest extends CreateSizeRequest {
  sizeId: string;
}

export const updateSize = async (data: UpdateSizeRequest) => {
  const res = await fetch(`/api/${data.storeId}/sizes/${data.sizeId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Error updating size");
  }

  return await res.json();
};

type DeleteRequest = {
  storeId: string;
  sizeId: string;
};

export const deleteSize = async (data: DeleteRequest) => {
  const res = await fetch(`/api/${data.storeId}/sizes/${data.sizeId}`, {
    method: "DELETE",
  });

  if (!res) {
    throw new Error(
      "Error deleting size. Make sure you removed all products with the size first."
    );
  }

  return await res.json();
};
