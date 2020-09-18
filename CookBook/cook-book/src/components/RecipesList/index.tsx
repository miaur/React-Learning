import { Component } from "react"
import React from 'react'
import Recipe from '../Recipe'
import './style.css'

export default function  RecipesList ({recipes} : {recipes:any[]}) {
    
        const recipesElements = recipes.map(
            (recipe) => 
                <li className='recipeListLi border border-secondary rounded' key={recipe.id}>
                    <Recipe recipe={recipe}></Recipe>
                </li>
            
        );
        return (
            <ul>
                {recipesElements}
            </ul>
        );
}