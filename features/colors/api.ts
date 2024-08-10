type CreateColorRequest = {
  name: string;
  value: string;
  storeId: string;
};

export const createColor = async (data: CreateColorRequest) => {
  const res = await fetch(`/api/${data.storeId}/colors`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Error creating color");
  }

  return await res.json();
};

interface UpdateColorRequest extends CreateColorRequest {
  colorId: string;
}

export const updateColor = async (data: UpdateColorRequest) => {
  const res = await fetch(`/api/${data.storeId}/colors/${data.colorId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Error updating color");
  }

  return await res.json();
};

type DeleteRequest = {
  storeId: string;
  colorId: string;
};

export const deleteColor = async (data: DeleteRequest) => {
  const res = await fetch(`/api/${data.storeId}/colors/${data.colorId}`, {
    method: "DELETE",
  });

  if (!res) {
    throw new Error(
      "Error deleting color. Make sure you removed all products with the color first."
    );
  }

  return await res.json();
};
