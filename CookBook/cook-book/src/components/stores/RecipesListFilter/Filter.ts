import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import { RecipeModel } from "../../../models/RecipeModel";
import { getFavoriresList } from "../../RecepieControl/FavoritesList";

export class Filter {
  title: string = "";
  timeToCookFrom = "";
  timeToCookTo = "";
  favorites = false;
  dishType: Array<string> = [];
  ingredientsType: Array<string> = [];

  currentRecipesList: Array<RecipeModel> = [];

  get filteredRecipesList(): Array<RecipeModel> {
    return this.currentRecipesList.filter((recipe) => {
      return (
        Filter.filterByTitle(recipe, this.title) &&
        Filter.filterByTimeToCook(
          recipe,
          this.timeToCookFrom,
          this.timeToCookTo
        ) &&
        Filter.filterByDishType(recipe, this.dishType) &&
        Filter.filterByIngredientTypes(recipe, this.ingredientsType) &&
        (this.favorites
          ? Filter.filterFavorites(recipe, getFavoriresList())
          : true)
      );
    });
  }

  static filterFavorites = (
    recipe: RecipeModel,
    favoritesList: Array<string>
  ) => {
    return favoritesList.includes(recipe.id);
  };

  static filterByTitle = (recipe: RecipeModel, title: string) => {
    return recipe.title.includes(title);
  };

  static filterByDishType = (recipe: RecipeModel, dishType: Array<string>) => {
    return dishType.length ? dishType.includes(recipe.type) : true;
  };

  static filterByTimeToCook = (
    recipe: RecipeModel,
    timeToCookFrom: string,
    timeToCookTo: string
  ) => {
    return (
      recipe.timetocook >= Number(timeToCookFrom) &&
      (timeToCookTo !== "" ? recipe.timetocook <= Number(timeToCookTo) : true)
    );
  };

  static filterByIngredientTypes = (
    recipe: RecipeModel,
    ingredientsType: Array<string>
  ) => {
    if (!ingredientsType.length) return 1;
    const filteredIngredients = recipe.ingredients.filter(function (ingr) {
      return ingredientsType.includes(ingr.type);
    });
    return filteredIngredients.length;
  };

  constructor() {
    makeAutoObservable(this);
  }
}

export const FilterContext = createContext(new Filter());
