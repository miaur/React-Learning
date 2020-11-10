import { IngredientModel } from "./IngredientModel";

export interface RecipeModel {
  id: string;
  type: string;
  date: string;
  title: string;
  directions: Array<string>;
  image: string;
  ingredients: Array<IngredientModel>;
  timetocook: number;
}

export enum DishType {
  soup = "soup",
  secondCourse = "second course",
  vegan = "vegan",
  desert = "desert",
  drink = "drink",
}
