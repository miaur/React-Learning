export interface IngredientModel {
  quantity: string;
  name: string;
  type: string;
}

export enum IngredientType {
  "groats",
  "vegetables",
  "fruits",
  "meat",
  "fish",
  "spice",
  "dairy",
  "condiments",
  "flavoring",
  "other",
}
