import './styles.css'

import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import RecipesList from '../RecipesList'
import recipes from '../../data/recipes_data'

import CardMedia from '@material-ui/core/CardMedia'

import { Switch, Router, Route } from 'react-router-dom'
import RecipePage from '../RecipePage';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export default function App ()
{
    return (
        <div className = 'container'>
            <div className='jumbotron'>
                <h1 className='display-3'>
                    Cook Book
                    <button className='btn btn-primary btn-sm btn-right'>Sing In</button> 
                </h1>
            </div>
            <Router history={history}>
                <Switch>
                    <Route path='/recipe/:id' component={RecipePage} />
                    <Route path='/'>
                        <RecipesList recipes = {recipes}/>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

