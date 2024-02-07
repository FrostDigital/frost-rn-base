export interface Pet {
  _id: string;
  name: string;
  category?: "dog" | "cat" | "bird" | "fish";
  age: number;
  created: Date;
}
