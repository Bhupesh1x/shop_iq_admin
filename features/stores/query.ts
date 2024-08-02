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
    onSuccess: () => {
      toast.success("Store created successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
