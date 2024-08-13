"use client";

import * as z from "zod";
import { useState } from "react";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { Billboard, Category } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  useCreateCategory,
  useDeleteCategory,
  useUpdateCategory,
} from "@/features/categories/queries";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Heading } from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { AlertModal } from "@/components/AlertModal";
import { Separator } from "@/components/ui/separator";

type Props = {
  billboards: Billboard[];
  category: Category | null;
};

const formSchema = z.object({
  name: z.string().trim().min(1),
  billboardId: z.string().trim().min(1),
});

type CategoryFormValues = z.infer<typeof formSchema>;

export const CategoryForm = ({ category, billboards }: Props) => {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: category || {
      name: "",
      billboardId: "",
    },
  });

  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();
  const deleteMutation = useDeleteCategory();

  const isLoading =
    createMutation.isPending ||
    updateMutation.isPending ||
    deleteMutation.isPending;

  const onSubmit = (values: CategoryFormValues) => {
    if (category) {
      updateMutation.mutate(
        {
          ...values,
          storeId: params.storeId as string,
          categoryId: category.id,
        },
        {
          onSuccess: () => {
            router.push(`/${params.storeId}/categories`);
            router.refresh();
          },
        }
      );
    } else {
      createMutation.mutate(
        { ...values, storeId: params.storeId as string },
        {
          onSuccess: () => {
            router.push(`/${params.storeId}/categories`);
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
        categoryId: params.categoryId as string,
      },
      {
        onSuccess: () => {
          router.push(`/${params.storeId}/categories`);
          router.refresh();
        },
      }
    );
  };

  const title = category ? "Edit Category" : "Create Category";
  const description = category ? "Edit a category" : "Add a new category";
  const action = category ? "Save Changes" : "Create";

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
        {!!category && (
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
                      placeholder="Category name..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="billboardId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billboard</FormLabel>
                  <Select
                    disabled={isLoading}
                    value={field.value}
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a billboard"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {billboards.map((billboard) => (
                        <SelectItem key={billboard.id} value={billboard.id}>
                          {billboard.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
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
