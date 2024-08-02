import { toast } from "sonner";
import { Store } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";

import { createStore } from "./api";

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
