"use client";

import * as z from "zod";
import { Trash } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { Category, Color, Image, Product, Size } from "@prisma/client";

import {
  useCreateProduct,
  useDeleteProduct,
  useUpdateProduct,
} from "@/features/products/queries";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Heading } from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertModal } from "@/components/AlertModal";
import { Separator } from "@/components/ui/separator";
import { UploadImage } from "@/components/UploadImage";
import { SelectInput } from "@/components/SelectInput";

type Props = {
  sizes: Size[];
  colors: Color[];
  categories: Category[];
  product: (Product & { images: Image[] }) | null;
};

const formSchema = z.object({
  name: z.string().trim().min(1),
  images: z.object({ url: z.string() }).array(),
  price: z.coerce.number().min(1),
  categoryId: z.string().min(1),
  sizeId: z.string().min(1),
  colorId: z.string().min(1),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
});

type ProductFormValues = z.infer<typeof formSchema>;

export const ProductForm = ({ product, sizes, categories, colors }: Props) => {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: product
      ? { ...product, price: parseFloat(String(product.price)) }
      : {
          name: "",
          images: [],
          price: 0,
          categoryId: "",
          colorId: "",
          sizeId: "",
          isArchived: false,
          isFeatured: false,
        },
  });

  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();
  const deleteMutation = useDeleteProduct();

  const isLoading =
    createMutation.isPending ||
    updateMutation.isPending ||
    deleteMutation.isPending;

  const onSubmit = (values: ProductFormValues) => {
    if (product) {
      updateMutation.mutate(
        {
          ...values,
          productId: product?.id as string,
          storeId: params.storeId as string,
        },
        {
          onSuccess: () => {
            router.push(`/${params.storeId}/products`);
            router.refresh();
          },
        }
      );
    } else {
      createMutation.mutate(
        {
          ...values,
          storeId: params.storeId as string,
        },
        {
          onSuccess: () => {
            router.push(`/${params.storeId}/products`);
            router.refresh();
          },
        }
      );
    }
  };

  const onConfirm = () => {
    deleteMutation.mutate(
      {
        storeId: params.storeId as string,
        productId: product?.id as string,
      },
      {
        onSuccess: () => {
          router.push(`/${params.storeId}/products`);
          router.refresh();
        },
      }
    );
  };

  const title = product ? "Edit Product" : "Create Product";
  const description = product ? "Edit a product" : "Add a new product";
  const action = product ? "Save Changes" : "Create";

  const categoriesOptions = useMemo(
    () =>
      categories.map((category) => ({
        label: category.name,
        value: category.id,
      })),
    [categories]
  );

  const sizesOptions = useMemo(
    () =>
      sizes.map((size) => ({
        label: size.name,
        value: size.id,
      })),
    [sizes]
  );

  const colorsOptions = useMemo(
    () =>
      colors.map((color) => ({
        label: color.name,
        value: color.id,
      })),
    [colors]
  );

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        isLoading={isLoading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {!!product && (
          <Button
            disabled={isLoading}
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}
          >
            <Trash />
          </Button>
        )}
      </div>

      <Separator />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            name="images"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <UploadImage
                    disabled={isLoading}
                    value={field.value.map((image) => image.url)}
                    onChange={(url) =>
                      field.onChange([...field.value, { url }])
                    }
                    onRemove={(url) =>
                      field.onChange(
                        ...[field.value.filter((image) => image.url !== url)]
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isLoading}
                      placeholder="Product name..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="price"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      disabled={isLoading}
                      placeholder="9.99"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="categoryId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <SelectInput
                    name="category"
                    value={field.value}
                    defaultValue={field.value}
                    disabled={isLoading}
                    onChange={field.onChange}
                    options={categoriesOptions}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="sizeId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size</FormLabel>
                  <SelectInput
                    name="size"
                    value={field.value}
                    defaultValue={field.value}
                    disabled={isLoading}
                    onChange={field.onChange}
                    options={sizesOptions}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="colorId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <SelectInput
                    name="color"
                    value={field.value}
                    defaultValue={field.value}
                    disabled={isLoading}
                    onChange={field.onChange}
                    options={colorsOptions}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="isFeatured"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="mt-1"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-0">
                    <FormLabel>Featured</FormLabel>
                    <FormDescription>
                      This product will appear on the home page
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              name="isArchived"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="mt-1"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-0">
                    <FormLabel>Archived</FormLabel>
                    <FormDescription>
                      This product will not appear anywhere in the store
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isLoading} type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
