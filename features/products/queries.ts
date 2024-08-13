import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import { createProduct, updateProduct, deleteProduct } from "./api";

export const useCreateProduct = () => {
  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      toast.success("Product created");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};

export const useUpdateProduct = () => {
  const mutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      toast.success("Product updated");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};

export const useDeleteProduct = () => {
  const mutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      toast.success("Product deleted");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
