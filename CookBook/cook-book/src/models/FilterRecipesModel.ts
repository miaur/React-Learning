export interface FilterRecipesModel {
  title: string;
  type: Array<string>;
  ingredients: Array<string>;
  timeToCook: { from: number; to: number };
}
