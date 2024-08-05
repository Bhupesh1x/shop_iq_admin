"use client";

import * as z from "zod";
import { useState } from "react";
import { Trash } from "lucide-react";
import { Store } from "@prisma/client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { useDeleteStore, useUpdateStore } from "@/features/stores/query";

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
  store: Store;
};

const formSchema = z.object({
  name: z.string().trim().min(1),
});

type SettingsFormValues = z.infer<typeof formSchema>;

const SettingsForm = ({ store }: Props) => {
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: store.name,
    },
  });

  const [open, setOpen] = useState(false);

  const router = useRouter();
  const { mutate, isPending } = useUpdateStore(store.id);
  const { mutate: deleteMutate, isPending: isDeletePending } = useDeleteStore();

  const onSubmit = (values: SettingsFormValues) => {
    mutate(values, {
      onSuccess: () => {
        router.refresh();
      },
    });
  };

  const onConfirm = () => {
    deleteMutate(store.id, {
      onSuccess: () => {
        setOpen(false);
        router.refresh();
        router.push("/");
      },
    });
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        isLoading={isPending || isDeletePending}
      />
      <div className="flex items-center justify-between">
        <Heading title="Settings" description="Manage store preferences" />
        <Button
          disabled={isPending || isDeletePending}
          variant="destructive"
          size="icon"
          onClick={() => setOpen(true)}
        >
          <Trash />
        </Button>
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
                      disabled={isPending || isDeletePending}
                      placeholder="Store name..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={isPending || isDeletePending}
            className="ml-auto"
            type="submit"
          >
            Save changes
          </Button>
        </form>
      </Form>
    </>
  );
};

export default SettingsForm;
