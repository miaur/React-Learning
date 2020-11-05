import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import { IngredientModel } from "../../../models/IngredientModel";
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
  // get filteredRecipesList(): Array<RecipeModel> {
  //   const title = this.title;
  //   const timeToCookFrom = this.timeToCookFrom;
  //   var filteredArray = this.currentRecipesList.filter(function (elem) {
  //     return elem.title.includes(title) && elem.timetocook >= Number(timeToCookFrom);
  //   });

  //   const timeToCookTo = this.timeToCookTo;
  //   if (timeToCookTo !== "")
  //     filteredArray = filteredArray.filter(function (elem) {
  //       return elem.timetocook <= Number(timeToCookTo);
  //     });

  //   const favorites = this.favorites;
  //   if (favorites) {
  //     let favoritesList = getFavouriresList();
  //     let favoriteRecipesList = Array<RecipeModel>();
  //     filteredArray?.forEach((recipe) => {
  //       if (favoritesList.includes(recipe.id)) favoriteRecipesList.push(recipe);
  //     });
  //     filteredArray = favoriteRecipesList;
  //   }

  //   if (this.dishType.length) {
  //     let filteredByDishType: Array<RecipeModel> = [];
  //     this.dishType.forEach((dishType) => {
  //       filteredArray.forEach((recipe) => {
  //         if (recipe.type === dishType) filteredByDishType.push(recipe);
  //       });
  //     });
  //     filteredArray = filteredByDishType;
  //   }

  //   if (this.ingredientsType.length) {
  //     let filteredByIngredientsType: Array<RecipeModel> = [];
  //     this.ingredientsType.forEach((ingrType) => {
  //       filteredArray.forEach((recipe) => {
  //         let ingredients = recipe.ingredients.filter((ingr) => {
  //           return ingr.type === ingrType;
  //         });
  //         if (ingredients.length) filteredByIngredientsType.push(recipe);
  //       });
  //     });
  //     filteredArray = filteredByIngredientsType;
  //   }

  //   return filteredArray;
  // }

  get filteredRecipesList(): Array<RecipeModel> {
    const favoritesList = getFavouriresList();
    let filteredList: Array<RecipeModel> = [];
    this.currentRecipesList.forEach((recipe) => {
      if (
        recipe.title.includes(this.title) &&
        recipe.timetocook >= Number(this.timeToCookFrom) &&
        (this.timeToCookTo !== ""
          ? recipe.timetocook <= Number(this.timeToCookTo)
          : true) &&
        (this.dishType.length ? this.dishType.includes(recipe.type) : true) &&
        (this.ingredientsType.length
          ? this.filterIngredientTypes(recipe.ingredients)
          : true) &&
        (this.favorites ? favoritesList.includes(recipe.id) : true)
      )
        filteredList.push(recipe);
    });
    return filteredList;
  }

  filterIngredientTypes = (ingredients: Array<IngredientModel>) => {
    const ingredientsType = this.ingredientsType;
    const filteredIngredients = ingredients.filter(function (ingr) {
      return ingredientsType.includes(ingr.type);
    });
    return filteredIngredients.length;
  };

  constructor() {
    makeAutoObservable(this);
  }
}

export const FilterContext = createContext(new Filter());
