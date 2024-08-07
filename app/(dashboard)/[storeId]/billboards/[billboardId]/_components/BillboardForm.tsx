"use client";

import * as z from "zod";
import { useState } from "react";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { Billboard } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  useCreateBillboard,
  useUpdateBillboard,
} from "@/features/billboards/queries";

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
import { UploadImage } from "@/components/UploadImage";

type Props = {
  billboard: Billboard | null;
};

const formSchema = z.object({
  label: z.string().trim().min(1),
  imageUrl: z.string().trim().min(1),
});

type BillboardFormValues = z.infer<typeof formSchema>;

export const BillboardForm = ({ billboard }: Props) => {
  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: billboard || {
      label: "",
      imageUrl: "",
    },
  });

  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const createMutation = useCreateBillboard();
  const updateMutation = useUpdateBillboard();

  const isLoading = createMutation.isPending || updateMutation.isPending;

  const onSubmit = (values: BillboardFormValues) => {
    if (billboard) {
      updateMutation.mutate(
        {
          ...values,
          storeId: params.storeId as string,
          billboardId: params.billboardId as string,
        },
        {
          onSuccess: () => {
            router.refresh();
            router.push(`/${params.storeId}/billboards`);
          },
        }
      );
    } else {
      createMutation.mutate(
        { ...values, storeId: params.storeId as string },
        {
          onSuccess: () => {
            router.refresh();
            router.push(`/${params.storeId}/billboards`);
          },
        }
      );
    }
  };

  const onConfirm = () => {
    console.log("confirm");
  };

  const title = billboard ? "Edit Billboard" : "Create Billboard";
  const description = billboard ? "Edit a billboard" : "Add a new billboard";
  const action = billboard ? "Save Changes" : "Create";

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
        {!!billboard && (
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
            name="imageUrl"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background Image</FormLabel>
                <FormControl>
                  <UploadImage
                    disabled={isLoading}
                    value={field.value}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-8">
            <FormField
              name="label"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isLoading}
                      placeholder="Billboard label..."
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
