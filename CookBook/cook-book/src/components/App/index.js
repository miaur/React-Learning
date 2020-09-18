import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import RecipesList from '../RecipesList'
import recipes from '../../data/recipes_data'

class App extends Component {
    render () {
        return (
            <div className = 'container'>
                {/* <Header
                    onCreateAccount={() => {}}
                    onLogin={function noRefCheck() {}}
                    onLogout={function noRefCheck() {}}
                    user={{}}
                    /> */}
                <div className='jumbotron'>
                    <h1 className='display-3'>
                        Cook Book
                        {/* <Button
                            backgroundColor="rgba(118,99,235,1)"
                            label="Login"
                            onClick={() => {}}
                            primaryn
                            size="medium"
                            /> */}
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