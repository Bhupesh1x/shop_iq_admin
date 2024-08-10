import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import { createColor, updateColor, deleteColor } from "./api";

export const useCreateColor = () => {
  const mutation = useMutation({
    mutationFn: createColor,
    onSuccess: () => {
      toast.success("Color created");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};

export const useUpdateColor = () => {
  const mutation = useMutation({
    mutationFn: updateColor,
    onSuccess: () => {
      toast.success("Color updated");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};

export const useDeleteColor = () => {
  const mutation = useMutation({
    mutationFn: deleteColor,
    onSuccess: () => {
      toast.success("Color deleted");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
