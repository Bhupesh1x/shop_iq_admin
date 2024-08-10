import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import { createSize, updateSize, deleteSize } from "./api";

export const useCreateSize = () => {
  const mutation = useMutation({
    mutationFn: createSize,
    onSuccess: () => {
      toast.success("Size created");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};

export const useUpdateSize = () => {
  const mutation = useMutation({
    mutationFn: updateSize,
    onSuccess: () => {
      toast.success("Size updated");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};

export const useDeleteSize = () => {
  const mutation = useMutation({
    mutationFn: deleteSize,
    onSuccess: () => {
      toast.success("Size deleted");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
