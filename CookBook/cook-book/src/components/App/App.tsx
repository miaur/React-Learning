import React from 'react'
import RecipesList from '../RecipesList'

import { Switch, Router, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history';

import Container from '@material-ui/core/Container'
import Header from '../Header'

import {LoaderRecipeById}  from '../DataLoader/DataLoader'
import RecipeForm from '../RecipePage/RecipeForm';

const history = createBrowserHistory();

export default function App() {
    return (
        <Container>
            <Router history={history}>
                <Header />
                <Switch>
                    <Route path='/recipe/:id' component={LoaderRecipeById} />
                    <Route path='/editForm' component={RecipeForm}/>
                    <Route path='/'><RecipesList/></Route>
                </Switch>
            </Router>
        </Container>
    );
}

