import React from 'react'
import RecipesList from '../RecipesList'
// import recipes from '../../data/recipes_data'

import { Switch, Router, Route } from 'react-router-dom'
import RecipePage from '../RecipePage';
import { createBrowserHistory } from 'history';

import Container from '@material-ui/core/Container'
import Header from '../Header'

import LoadAllRecipes from '../DataLoader/DataLoader'
import TestSkeleton from '../TestSkeleton/TestSkeleton';

const history = createBrowserHistory();

export default function App() {
    return (
        <Container>
            <Router history={history}>
                <Header />
                <Switch>
                    <Route path='/recipe/:id' component={RecipePage} />
                    <Route path='/testpage' component={TestSkeleton} />
                    <Route path='/'><LoadAllRecipes/></Route>
                </Switch>
            </Router>
        </Container>
    );
}

