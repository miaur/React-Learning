import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import { RecipeModel } from "../../../models/RecipeModel";
import { getFavouriresList } from "../../RecipeCard/RecipeCard";

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
        this.filterByTitle(recipe) &&
        this.filterByTimeToCook(recipe) &&
        this.filterByDishType(recipe) &&
        this.filterByIngredientTypes(recipe) &&
        this.filterFavorites(recipe)
      );
    });
  }

  filterFavorites = (recipe: RecipeModel) => {
    const favoritesList = getFavouriresList();
    return this.favorites ? favoritesList.includes(recipe.id) : true;
  };

  filterByTitle = (recipe: RecipeModel) => {
    return recipe.title.includes(this.title);
  };

  filterByDishType = (recipe: RecipeModel) => {
    return this.dishType.length ? this.dishType.includes(recipe.type) : true;
  };

  filterByTimeToCook = (recipe: RecipeModel) => {
    return (
      recipe.timetocook >= Number(this.timeToCookFrom) &&
      (this.timeToCookTo !== ""
        ? recipe.timetocook <= Number(this.timeToCookTo)
        : true)
    );
  };

  filterByIngredientTypes = (recipe: RecipeModel) => {
    if (!this.ingredientsType.length) return 1;
    const ingredientsType = this.ingredientsType;
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
