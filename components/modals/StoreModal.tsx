"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useStoreModal } from "@/hooks/useStoreModal";
import { useCreateStore } from "@/features/stores/query";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Modal } from "@/components/Modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().trim().min(1),
});

type FormData = z.infer<typeof formSchema>;

export const StoreModal = () => {
  const { isOpen, onClose } = useStoreModal();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const { mutate, isPending } = useCreateStore();

  const onSubmit = (values: FormData) => {
    mutate({ name: values.name });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create store"
      description="Add a new store to manage products and categories"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="E-Commerce"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-6 flex items-center justify-end w-full gap-3">
            <Button
              disabled={isPending}
              variant="outline"
              type="button"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button disabled={isPending}>Continue</Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};
