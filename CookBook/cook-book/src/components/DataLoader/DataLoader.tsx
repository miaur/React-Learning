/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useQuery, QueryCache, ReactQueryCacheProvider } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";
import { RecipeModel } from "../../models/RecipeModel";
import RecipesList from '../RecipesList'
import Recipe from '../Recipe'
import RecipesGridSkeleton from "../RecipeSkeleton/RecipesGridSkeleton";
import RecipePage from "../RecipePage";
import { RouteComponentProps } from "react-router";

const queryCache = new QueryCache();

const url = "http://localhost:3000/recipes";

export default function LoaderAllRecipes() {
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
        retValue = <RecipesGridSkeleton count={4} />;

    if (!retValue)
        retValue = <RecipesList recipes={data} />
    return (
        <ReactQueryCacheProvider queryCache={queryCache}>
            {retValue}
            <ReactQueryDevtools initialIsOpen />
        </ReactQueryCacheProvider>
    );
}

type LoaderRecipeByIdProps = RouteComponentProps<{id?: string}>;

export function LoaderRecipeById(props: LoaderRecipeByIdProps) {
    const { isLoading, error, data } = useQuery<Array<RecipeModel>>("", async () => {
        const resultFetch = await fetch(url);
        const resultJson = await resultFetch.json();
        return resultJson;
    });

    var resultRecipeById = data?.filter((obj) => { return (obj.id == props.match.params.id); })[0];

    var retValue = null;
    if (error || !resultRecipeById) {
        const errorMessage = error as { message: string };
        retValue = <p>{"An error has occurred: " + errorMessage?.message}</p>;
    }
    if (isLoading)
        retValue = <RecipesGridSkeleton count={4} />;

    let res = resultRecipeById as RecipeModel;
    if (!retValue)
        retValue = <RecipePage recipe={res} />

    return (
        <ReactQueryCacheProvider queryCache={queryCache}>
            {retValue}
            <ReactQueryDevtools initialIsOpen />
        </ReactQueryCacheProvider>
    );
}
