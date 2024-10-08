import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import { createBillboard, deleteBillboard, updateBillboard } from "./api";

export const useCreateBillboard = () => {
  const mutation = useMutation({
    mutationFn: createBillboard,
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
    mutationFn: updateBillboard,
    onSuccess: () => {
      toast.success("Billboard updated");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};

export const useDeleteBillboard = () => {
  const mutation = useMutation({
    mutationFn: deleteBillboard,
    onSuccess: () => {
      toast.success("Billboard deleted");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
