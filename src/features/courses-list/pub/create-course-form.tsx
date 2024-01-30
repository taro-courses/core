"use client";
import { PlusCircle } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";

import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/ui/utils";
import { createCourseAction } from "../actions";

const createCourseFormSchema = z.object({
  name: z.string().min(5, {
    message: "Название не менее 5 букв",
  }),
  description: z.string(),
});

export function CreateCourseForm({
  className,
  revalidatePagePath,
}: {
  className: string;
  revalidatePagePath: string;
}) {
  const [isCreateTransiton, startCreateTransition] = useTransition();
  const form = useForm({
    resolver: zodResolver(createCourseFormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          startCreateTransition(async () => {
            createCourseAction(data, revalidatePagePath);
          });
          form.reset();
        })}
        className={cn(className, "space-y-4")}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название курса</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Описание</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="mt-8 flex gap-2"
          type="submit"
          disabled={isCreateTransiton}
        >
          <PlusCircle size={18} />
          Добавить
        </Button>
      </form>
    </Form>
  );
}
