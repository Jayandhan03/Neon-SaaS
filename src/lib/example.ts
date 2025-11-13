import { get, post } from "./api";

interface ExampleData {
  id: number;
  name: string;
}

// Example GET request
export const getSomething = () => {
  // This will call https://your-backend-api.com/api/example
  return get<ExampleData[]>("/example");
};

// Example POST request
export const postSomething = (data: { name: string }) => {
  // This will call https://your-backend-api.com/api/example
  return post<ExampleData>("/example", data);
};
