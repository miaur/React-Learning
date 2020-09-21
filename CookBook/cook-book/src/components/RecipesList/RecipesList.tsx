import { Component } from "react"
import React from 'react'
import Recipe from '../Recipe'
import './style.css'
import RecipesGrid from '../Grig/RecipesGrig'
import { RecipeModel } from "../../models/RecipeModel"

export default function  RecipesList ({recipes} : {recipes:Array<RecipeModel>}) {
        return (
            <div>
                <RecipesGrid recipesList={recipes}/>
            </div>
        );
}