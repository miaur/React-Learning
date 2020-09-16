import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import RecipesList from './RecipesList'
import recipes from '../data/recipes_data.js'

class App extends Component {
    render () {
        return (
            <div className = 'container'>
                <div className='jumbotron'>
                    <h1 className='display-3'>
                        Cook Book
                        <button className='btn btn-primary btn-sm'>Sing In</button>
                    </h1>
                </div>
                <RecipesList recipes = {recipes}>
                    {/* Список рецептов */}
                </RecipesList>
            </div>
        );
    }
}

export default App