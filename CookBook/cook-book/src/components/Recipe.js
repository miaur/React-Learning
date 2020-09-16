import React, { Component } from 'react'

class Recipe extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
        };
    
    }

    render() {
        const {recipe} = this.props;

        const ingredientsList = recipe.ingredients.map(
            (ingredient) => 
                <li>{ingredient}</li>
        );
        const ingredients = <div><ul>{ingredientsList}</ul></div>;
        const directions = <div><ul>{
            recipe.directions.map(
                (direction, index) => 
            <li>Step {(index + 1) + " " + direction}</li>
                
        )}</ul></div>;

        return(
            <div style={{width:'80%'}}>
                <div>
                    {/* TODO image from file */}
                    <img src={recipe.image} alt={recipe.title + " image"} className="rounded float-right" />
                </div>
                <div>
                    <h2>{recipe.title}</h2>
                </div>
                Ingredients:
                {ingredients}

                Directions:
                {directions}
            </div>
        );
    }
}

export default Recipe