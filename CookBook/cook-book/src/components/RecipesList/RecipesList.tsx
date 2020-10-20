import React from "react";
import { useQuery } from "react-query";
import { RecipeModel } from "../../models/RecipeModel";
import RecipesListView from './RecipesListView'
import RecipesGridSkeleton from "../RecipeSkeleton/RecipesGridSkeleton";
import { Constants } from "../../constants";

export default function RecipesList() {
    const { isLoading, error, data } = useQuery<Array<RecipeModel>>("recipes", async () => {
        const resultFetch = await fetch(`${Constants.url}/recipes/`);
        const resultJson = await resultFetch.json();
        return resultJson;
    });
    
    if (error) {
        const errorMessage = error as { message: string };
        return <p>{"An error has occurred: " + errorMessage?.message}</p>;
    }

    if (isLoading){
        return <RecipesGridSkeleton count={4} />;
    }

    return (
        <RecipesListView recipes={data} />
    );
}