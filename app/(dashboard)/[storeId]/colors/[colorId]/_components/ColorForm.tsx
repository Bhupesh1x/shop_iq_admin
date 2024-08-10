"use client";

import * as z from "zod";
import { useState } from "react";
import { Trash } from "lucide-react";
import { Color } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";

import {
  useCreateColor,
  useDeleteColor,
  useUpdateColor,
} from "@/features/colors/queries";

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
  color: Color | null;
};

const formSchema = z.object({
  name: z.string().trim().min(1),
  value: z.string().min(4).regex(/^#/, {
    message: "String must be a valid hex code",
  }),
});

type ColorFormValues = z.infer<typeof formSchema>;

export const ColorForm = ({ color }: Props) => {
  const form = useForm<ColorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: color || {
      name: "",
      value: "",
    },
  });

  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const createMutation = useCreateColor();
  const updateMutation = useUpdateColor();
  const deleteMutation = useDeleteColor();

  const isLoading =
    createMutation.isPending ||
    updateMutation.isPending ||
    deleteMutation.isPending;

  const onSubmit = (values: ColorFormValues) => {
    if (color) {
      updateMutation.mutate(
        {
          ...values,
          colorId: color.id,
          storeId: params.storeId as string,
        },
        {
          onSuccess: () => {
            router.push(`/${params.storeId}/colors`);
            router.refresh();
          },
        }
      );
    } else {
      createMutation.mutate(
        { ...values, storeId: params.storeId as string },
        {
          onSuccess: () => {
            router.push(`/${params.storeId}/colors`);
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
        colorId: color?.id || (params.colorId as string),
      },
      {
        onSuccess: () => {
          router.push(`/${params.storeId}/colors`);
          router.refresh();
        },
      }
    );
  };

  const title = color ? "Edit Color" : "Create Color";
  const description = color ? "Edit a color" : "Add a new color";
  const action = color ? "Save Changes" : "Create";

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
        {!!color && (
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
          <div className="grid grid-cols-3 gap-8">
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
                      placeholder="Color name..."
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
                    <div className="flex items-center gap-x-4">
                      <Input
                        {...field}
                        disabled={isLoading}
                        placeholder="Color value..."
                      />
                      <div
                        className="h-8 w-9 rounded-full border"
                        style={{ backgroundColor: field.value }}
                      />
                    </div>
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
