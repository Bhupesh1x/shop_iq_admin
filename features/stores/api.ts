type CreateStoreRequest = {
  name: string;
};

export const createStore = async ({ name }: CreateStoreRequest) => {
  const res = await fetch("/api/stores", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  return await res.json();
};

export const updateStore = async (storeId: string, data: { name: string }) => {
  const res = await fetch(`/api/stores/${storeId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Error updating store");
  }

  return await res.json();
};

export const deleteStore = async (storeId: string) => {
  const res = await fetch(`/api/stores/${storeId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error(
      "Error deleting store. Make sure you removed all products and categories first."
    );
  }
  return await res.json();
};
