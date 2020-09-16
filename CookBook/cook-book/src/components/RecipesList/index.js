import { Component } from "react"
import React from 'react'
import Recipe from '../Recipe'
import './style.css'

export default class RecipesList extends Component {
    render (){
        const recipesElements = this.props.recipes.map(
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
}