"use client";

import * as z from "zod";
import { useState } from "react";
import { Trash } from "lucide-react";
import { Size } from "@prisma/client";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  useCreateSize,
  useDeleteSize,
  useUpdateSize,
} from "@/features/sizes/queries";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Heading } from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { AlertModal } from "@/components/AlertModal";
import { Separator } from "@/components/ui/separator";

type Props = {
  size: Size | null;
};

const formSchema = z.object({
  name: z.string().trim().min(1),
  value: z.string().trim().min(1),
});

type SizeFormValues = z.infer<typeof formSchema>;

export const SizeForm = ({ size }: Props) => {
  const form = useForm<SizeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: size || {
      name: "",
      value: "",
    },
  });

  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const createMutation = useCreateSize();
  const updateMutation = useUpdateSize();
  const deleteMutation = useDeleteSize();

  const isLoading =
    createMutation.isPending ||
    updateMutation.isPending ||
    deleteMutation.isPending;

  const onSubmit = (values: SizeFormValues) => {
    if (size) {
      updateMutation.mutate(
        {
          ...values,
          sizeId: size.id,
          storeId: params.storeId as string,
        },
        {
          onSuccess: () => {
            router.push(`/${params.storeId}/sizes`);
            router.refresh();
          },
        }
      );
    } else {
      createMutation.mutate(
        { ...values, storeId: params.storeId as string },
        {
          onSuccess: () => {
            router.push(`/${params.storeId}/sizes`);
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
        sizeId: size?.id || (params.sizeId as string),
      },
      {
        onSuccess: () => {
          router.push(`/${params.storeId}/sizes`);
          router.refresh();
        },
      }
    );
  };

  const title = size ? "Edit Size" : "Create Size";
  const description = size ? "Edit a size" : "Add a new size";
  const action = size ? "Save Changes" : "Create";

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
        {!!size && (
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
                      placeholder="Size name..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="value"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isLoading}
                      placeholder="Size value..."
                    />
                  </FormControl>
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
