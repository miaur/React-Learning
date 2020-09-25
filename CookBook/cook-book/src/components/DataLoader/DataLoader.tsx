/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useQuery, QueryCache, ReactQueryCacheProvider } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";
import { RecipeModel } from "../../models/RecipeModel";
import RecipesList from '../RecipesList'

const queryCache = new QueryCache();

const url = "http://localhost:3000/recipes";


export function LoadAllRecipes() {
    var recipesList: Array<RecipeModel> | undefined = new Array<RecipeModel>();
    const { isLoading, error, data } = useQuery<Array<RecipeModel>>("", async () => {
        const resultFetch = await fetch(url);
        const resultJson = await resultFetch.json();
        return resultJson;
    });
    if (error) { 
        const errorMessage = error as {message: string};
        return(
            <ReactQueryCacheProvider queryCache={queryCache}>
                <p>{"An error has occurred: " + errorMessage?.message}</p>
                <ReactQueryDevtools initialIsOpen />
            </ReactQueryCacheProvider>
            );
    }
    if(isLoading) {
        return (
            <ReactQueryCacheProvider queryCache={queryCache}>
                <p>Loading.....</p>
                <ReactQueryDevtools initialIsOpen />
            </ReactQueryCacheProvider>
        );
    }

    recipesList = data;
    return (
        <ReactQueryCacheProvider queryCache={queryCache}>
            <RecipesList recipes={recipesList} />
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
