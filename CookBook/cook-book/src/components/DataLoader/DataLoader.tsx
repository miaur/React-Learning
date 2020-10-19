import React, { useState } from "react";
import { useQuery, QueryCache, ReactQueryCacheProvider } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";
import { RecipeModel } from "../../models/RecipeModel";
import RecipesGridSkeleton from "../RecipeSkeleton/RecipesGridSkeleton";
import RecipePage from "../RecipePage";
import { RouteComponentProps } from "react-router";
import AlertDialog from "../AlertDialog/AlertDialog";
import { AlertDialogState } from "../../models/AlertDialogState";
import axios from 'axios'
// import { makeRandomKey } from "../RecipePage/RecipeForm";

const queryCache = new QueryCache();

const url = "http://localhost:3000/recipes";

type LoaderRecipeByIdProps = RouteComponentProps<{ id?: string }>;

export function LoaderRecipeById(props: LoaderRecipeByIdProps) {
    const { isLoading, error, data } = useQuery<Array<RecipeModel>>("", async () => {
        const resultFetch = await fetch(url + "?id=" + props.match.params.id);
        const resultJson = await resultFetch.json();
        return resultJson;
    });
    var resultRecipeById;
    if (data)
        resultRecipeById = (data as Array<RecipeModel>)[0];

    var retValue = null;
    if (error || !resultRecipeById) {
        const errorMessage = error as { message: string };
        retValue = <p>{"An error has occurred: " + errorMessage?.message}</p>;
    }
    if (isLoading)
        retValue = <RecipesGridSkeleton count={1} />;

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

interface InsertNewRecipeProps {
    recipe: RecipeModel,
    onClose?: () => void,
}
function InsertNewRecipeUseQuery(props: InsertNewRecipeProps) {
    const fetchPOST = async () => {
        const rawResponse = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(props.recipe)
        });
        const content = await rawResponse.json();

        console.log(content);
        return content;
    }

    const { error } = useQuery("", fetchPOST);
    var retValueAlert = null;
    if (error) {
        const errorMessage = error as { message: string };
        retValueAlert = "An error has occurred: " + errorMessage?.message;
    } else {
        retValueAlert = "New Recipe inserted.";
    }
        
    var alertParams = {
        text: retValueAlert,
        open: true,
    }
    const [alertDialogState, setAlertDialogState] = useState<AlertDialogState>(alertParams);
    var retValue = <AlertDialog alertDialogState={alertDialogState}
        onClose={() => {
            setAlertDialogState({ text: "", open: false })
        }}
    />
    return (
        <ReactQueryCacheProvider queryCache={queryCache}>
            {retValue}
            <ReactQueryDevtools initialIsOpen />
        </ReactQueryCacheProvider>
    );
}

export async function InsertNewRecipeAxios(recipe: RecipeModel) {
    const resultParams = {
        message: '',
        ok: false,
    }
    const { data : result } = await axios.post(url, recipe);
    
    return result;    
}
