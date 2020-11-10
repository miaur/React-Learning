export interface IngredientModel {
  quantity: string;
  name: string;
  type: string;
}

export enum IngredientType {
  groats = "groats",
  vegetables = "vegetables",
  fruits = "fruits",
  meat = "meat",
  fish = "fish",
  spice = "spice",
  dairy = "dairy",
  condiments = "condiments",
  flavoring = "flavoring",
  other = "other",
}
