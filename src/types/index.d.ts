import { Category } from "@/payload-types";

type CustomCategory = Category & {
  subcategories: Category[];
};
