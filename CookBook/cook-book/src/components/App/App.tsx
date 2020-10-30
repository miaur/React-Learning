import React from "react";
import { Switch, Router, Route } from "react-router-dom";
import { ReactQueryDevtools } from "react-query-devtools";
// import { QueryCache } from 'react-query';
import { createBrowserHistory } from "history";

import Container from "@material-ui/core/Container";

import Header from "../Header";
import RecipesList from "../RecipesList";
import { RecepieControl } from "../RecepieControl/RecepieControl";
import RecipeForm from "../RecipePage/RecipeForm";
import { TestMobXPlusHook } from "../TestMobXPlusHook/TestMobXPlusHook";

const history = createBrowserHistory();
// const queryCache = new QueryCache();

export default function App() {
  return (
    // <ReactQueryCacheProvider queryCache={queryCache}>
    <>
      <Container>
        <Router history={history}>
          <Header />
          <Switch>
            <Route path={["/test"]} component={TestMobXPlusHook} />
            <Route
              path={["/recipe/:id", "/editForm/:id"]}
              component={RecepieControl}
            />
            <Route path="/editForm" component={RecipeForm} />
            <Route path="/" component={RecipesList} />
          </Switch>
        </Router>
      </Container>
      <ReactQueryDevtools initialIsOpen />
    </>
    // </ReactQueryCacheProvider>
  );
}
