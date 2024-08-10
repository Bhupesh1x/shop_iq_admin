import { Billboard, Category } from "@prisma/client";

export type CategoryWithBillboard = Category & {
  billboard: Billboard;
};
