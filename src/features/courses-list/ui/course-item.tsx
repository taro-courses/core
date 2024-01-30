"use client";
import { Button } from "@/shared/ui/button";
import { MinusCircle } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/shared/ui/card";
import { useTransition } from "react";

export function CourseItem({
  course,
  onDelete,
}: {
  course: CourseListElement;
  onDelete: () => Promise<void>;
}) {
  const [isLoadingDelete, startDeleteTransition] = useTransition();
  const handleDelete = () => {
    startDeleteTransition(async () => {
      await onDelete();
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{course.name}</CardTitle>
        <CardDescription>{course.description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button
          variant={"destructive"}
          disabled={isLoadingDelete}
          onClick={handleDelete}
          className="flex gap-2"
        >
          <MinusCircle size={18} />
          Удалить
        </Button>
      </CardFooter>
    </Card>
  );
}
