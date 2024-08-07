type CreateBillboardRequest = {
  label: string;
  imageUrl: string;
  storeId: string;
};

export const createBillbord = async (data: CreateBillboardRequest) => {
  const res = await fetch(`/api/${data.storeId}/billboards`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Error creating billboard");
  }

  return await res.json();
};

interface UpdateBillbordRequest extends CreateBillboardRequest {
  billboardId: string;
}

export const updateBillbord = async (data: UpdateBillbordRequest) => {
  const res = await fetch(
    `/api/${data.storeId}/billboards/${data.billboardId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    throw new Error("Error updating billboard");
  }

  return await res.json();
};
