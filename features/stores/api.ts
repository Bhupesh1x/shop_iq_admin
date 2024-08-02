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
