import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import { createCategory, updateCategory, deleteCategory } from "./api";

export const useCreateCategory = () => {
  const mutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      toast.success("Category created");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};

export const useUpdateCategory = () => {
  const mutation = useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      toast.success("Category updated");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};

export const useDeleteCategory = () => {
  const mutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      toast.success("Category deleted");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
