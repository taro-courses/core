import { dbClient } from "@/shared/lib/db";
import { cache } from "react";

class CoursesRepository {
  getCoursesList = cache(
    (): Promise<CourseListElement[]> => dbClient.course.findMany(),
  );

  createCourseElement = (
    command: CreateListElementCommand,
  ): Promise<CourseListElement> => {
    return dbClient.course.create({
      data: command,
    });
  };

  deleteCourseElement = (command: DeleteListElementCommand) => {
    return dbClient.course.delete({
      where: { id: command.id },
    });
  };
}

export const coursesRepository = new CoursesRepository();
