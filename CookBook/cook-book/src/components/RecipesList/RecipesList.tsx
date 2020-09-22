import React from 'react'
import RecipesGrid from '../Grig/RecipesGrig'
import { RecipeModel } from "../../models/RecipeModel"

export default function RecipesList({ recipes }: { recipes: Array<RecipeModel> }) {
    return (
        <div>
            <RecipesGrid recipesList={recipes} />
        </div>
    );
}