import React from 'react'
import RecipesList from '../RecipesList'

import { Switch, Router, Route } from 'react-router-dom'
import RecipePage from '../RecipePage';
import { createBrowserHistory } from 'history';

import Container from '@material-ui/core/Container'
import Header from '../Header'

import LoaderAllRecipes, {LoaderRecipeById}  from '../DataLoader/DataLoader'

const history = createBrowserHistory();

export default function App() {
    return (
        <Container>
            <Router history={history}>
                <Header />
                <Switch>
                    <Route path='/recipe/:id' component={LoaderRecipeById} />
                    <Route path='/'><LoaderAllRecipes/></Route>
                </Switch>
            </Router>
        </Container>
    );
}

