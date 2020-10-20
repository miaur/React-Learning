import React from "react";
import { RouteComponentProps } from "react-router";
import { useQuery } from "react-query";
import axios from 'axios'

import { RecipeModel } from "../../models/RecipeModel";
import RecipesGridSkeleton from "../RecipeSkeleton/RecipesGridSkeleton";
import RecipePage from "../RecipePage";
import RecipeForm from "../RecipePage/RecipeForm";
import { Constants } from "../../constants";

interface RecepieControlProps extends RouteComponentProps<{ id: string }>{};

export function RecepieControl(props: RecepieControlProps) {
    const { isLoading, error, data: recipe } = useQuery<RecipeModel, { message: string }>(`recipes/${props.match.params.id}`, async () => {
        const resultFetch = await fetch(`${Constants.url}/recipes/${props.match.params.id}`);
        const resultJson = await resultFetch.json();
        return resultJson;
    });

    if (error || !recipe) {
        return <p>{"An error has occurred: " + error?.message}</p>;
    }

    if (isLoading){
        return <RecipesGridSkeleton count={1} />;
    }

    if(props.match.url.includes("editForm")) {
        return <RecipeForm recipeToEdit={recipe}/>
    } else {
        return <RecipePage recipe={recipe} />
    }
}

export async function UpdateRecipe(recipe: RecipeModel) {
    const { data: result } = await axios.patch(`${Constants.url}/recipes/${recipe.id}`, recipe);
    return result;
}

export async function DeleteRecipe(id:string) {
    const { data: result } = await axios.delete(`${Constants.url}/recipes/${id}`);
    return result;
}

export async function InsertRecipe(recipe: RecipeModel) {
    const { data: result } = await axios.post(`${Constants.url}/recipes/`, recipe);
    return result;
}

/*
interface InsertNewRecipeProps {
    recipe: RecipeModel,
    onClose?: () => void,
};

function InsertNewRecipeUseQuery(props: InsertNewRecipeProps) {
    const fetchPOST = async () => {
        const rawResponse = await fetch(`${Constants.url}/recipes/`, {
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
    let retValueAlert = null;
    if (error) {
        const errorMessage = error as { message: string };
        retValueAlert = "An error has occurred: " + errorMessage?.message;
    } else {
        retValueAlert = "New Recipe inserted.";
    }

    let alertParams = {
        text: retValueAlert,
        open: true,
    }
    const [alertDialogState, setAlertDialogState] = useState<AlertDialogState>(alertParams);
    let retValue = <AlertDialog alertDialogState={alertDialogState}
        onClose={() => {
            setAlertDialogState({ text: "", open: false })
        }}
    />
    return ({retValue});
}

export async function LoadRecipeById(id: string) {
    const result = await axios.get<RecipeModel>(`${Constants.url}/recipes/${id}`)
    return result;
}
*/
