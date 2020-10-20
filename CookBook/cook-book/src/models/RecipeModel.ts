import { IngredientModel } from "./IngredientModel";

export interface RecipeModel {
    id: string,
    date: string,
    title: string,
    directions: Array<string>,
    image: string,
    ingredients: Array<IngredientModel>,
    timetocook: string
}