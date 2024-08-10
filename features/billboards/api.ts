type CreateBillboardRequest = {
  label: string;
  imageUrl: string;
  storeId: string;
};

export const createBillboard = async (data: CreateBillboardRequest) => {
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

interface UpdateBillboardRequest extends CreateBillboardRequest {
  billboardId: string;
}

export const updateBillboard = async (data: UpdateBillboardRequest) => {
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

type DeleteRequest = {
  storeId: string;
  billboardId: string;
};

export const deleteBillboard = async (data: DeleteRequest) => {
  const res = await fetch(
    `/api/${data.storeId}/billboards/${data.billboardId}`,
    {
      method: "DELETE",
    }
  );

  if (!res) {
    throw new Error(
      "Error deleting billboard. Make sure you removed all categories first."
    );
  }

  return await res.json();
};
