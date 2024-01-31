type CourseListElement = {
  id: string;
  name: string;
  description: string;
  price: number;
};

type CreateListElementCommand = {
  name: string;
  description: string;
  price: number;
};

type DeleteListElementCommand = {
  id: string;
};
