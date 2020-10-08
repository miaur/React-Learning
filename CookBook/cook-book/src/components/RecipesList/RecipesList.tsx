import React from "react";
import { useQuery, QueryCache, ReactQueryCacheProvider } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";
import { RecipeModel } from "../../models/RecipeModel";
import RecipesListView from './RecipesListView'
import RecipesGridSkeleton from "../RecipeSkeleton/RecipesGridSkeleton";

const queryCache = new QueryCache();

const url = "http://localhost:3000/recipes";

export default function RecipesList() {
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
        retValue = <RecipesListView recipes={data} />
    return (
        <ReactQueryCacheProvider queryCache={queryCache}>
            {retValue}
            <ReactQueryDevtools initialIsOpen />
        </ReactQueryCacheProvider>
    );
}