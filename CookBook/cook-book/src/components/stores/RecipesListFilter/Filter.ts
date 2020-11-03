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
    const title = this.title;
    const timeToCookFrom = this.timeToCookFrom;
    var filteredArray = this.currentRecipesList.filter(function (elem) {
      return (
        elem.title.includes(title) && elem.timetocook >= Number(timeToCookFrom)
      );
    });

    const timeToCookTo = this.timeToCookTo;
    if (timeToCookTo !== "")
      filteredArray = filteredArray.filter(function (elem) {
        return elem.timetocook <= Number(timeToCookTo);
      });

    const favorites = this.favorites;
    if (favorites) {
      let favoritesList = getFavouriresList();
      let favoriteRecipesList = Array<RecipeModel>();
      filteredArray?.forEach((recipe) => {
        if (favoritesList.includes(recipe.id)) favoriteRecipesList.push(recipe);
      });
      filteredArray = favoriteRecipesList;
    }

    if (this.dishType.length) {
      let filteredByDishType: Array<RecipeModel> = [];
      this.dishType.forEach((dishType) => {
        filteredArray.forEach((recipe) => {
          if (recipe.type === dishType) filteredByDishType.push(recipe);
        });
      });
      filteredArray = filteredByDishType;
    }

    if (this.ingredientsType.length) {
      let filteredByIngredientsType: Array<RecipeModel> = [];
      this.ingredientsType.forEach((ingrType) => {
        filteredArray.forEach((recipe) => {
          let ingredients = recipe.ingredients.filter((ingr) => {
            return ingr.type === ingrType;
          });
          if (ingredients.length) filteredByIngredientsType.push(recipe);
        });
      });
      filteredArray = filteredByIngredientsType;
    }

    return filteredArray;
  }

  constructor() {
    makeAutoObservable(this);
  }
}

export const FilterContext = createContext(new Filter());
