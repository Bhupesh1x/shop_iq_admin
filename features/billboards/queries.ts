import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import { createBillbord, updateBillbord } from "./api";

export const useCreateBillboard = () => {
  const mutation = useMutation({
    mutationFn: createBillbord,
    onSuccess: () => {
      toast.success("Billboard created");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};

export const useUpdateBillboard = () => {
  const mutation = useMutation({
    mutationFn: updateBillbord,
    onSuccess: () => {
      toast.success("Billboard updated");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
