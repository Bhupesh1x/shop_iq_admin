import { toast } from "sonner";
import { Store } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";

import { createStore, deleteStore, updateStore } from "./api";

type CreateStoreRequest = {
  name: string;
};

export const useCreateStore = () => {
  const mutation = useMutation<Store, Error, CreateStoreRequest>({
    mutationFn: createStore,
    onSuccess: (store) => {
      window.location.assign(`${store.id}`);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};

export const useUpdateStore = (storeId: string) => {
  const mutation = useMutation({
    mutationFn: (data: { name: string }) => updateStore(storeId, data),
    onSuccess: () => {
      toast.success("Store updated.");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};

export const useDeleteStore = () => {
  const mutation = useMutation({
    mutationFn: (storeId: string) => deleteStore(storeId),
    onSuccess: () => {
      toast.success("Store deleted success");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
