/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useQuery, QueryCache, ReactQueryCacheProvider } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";
import { RecipeModel } from "../../models/RecipeModel";
import RecipesList from '../RecipesList'
import RecipesGridSkeleton from "../RecipeSkeleton/RecipesGridSkeleton";

const queryCache = new QueryCache();

const url = "http://localhost:3000/recipes";

export function LoadAllRecipes() {
    const { isLoading, error, data } = useQuery<Array<RecipeModel>>("", async () => {
        const resultFetch = await fetch(url);
        const resultJson = await resultFetch.json();
        return resultJson;
    });
    var retValue = null;
    if (error) {       
        const errorMessage = error as { message: string };
        retValue = <p>{"An error has occurred: " + errorMessage?.message}</p>;
    }
    if (isLoading) 
        retValue = <RecipesGridSkeleton /> ;

    if(!retValue)
        retValue = <RecipesList recipes={data} />
    return (
        <ReactQueryCacheProvider queryCache={queryCache}>
            {retValue}
            <ReactQueryDevtools initialIsOpen />
        </ReactQueryCacheProvider>
    );
}

export function loadRecipe(id: string) {
    const recipe: RecipeModel | undefined = undefined;
    return recipe;
}

export default function DataLoader() {
    return (
        <LoadAllRecipes />
    );
}
