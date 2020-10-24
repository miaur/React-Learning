import React, { useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { RecipeModel } from "../../models/RecipeModel";
import RecipeCard from "../RecipeCard";
import Checkbox from "@material-ui/core/Checkbox";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import { FormControlLabel } from "@material-ui/core";
import { getFavouriresList } from "../RecipeCard/RecipeCard";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  })
);

export default function RecipesListView({
  recipes,
}: {
  recipes?: Array<RecipeModel>;
}) {
  const classes = useStyles();
  const [recipesToShow, setRecipesToShow] = useState(recipes);
  const [showFavoriteRecipes, setShowFavoriteRecipes] = useState(false);

  if (!recipesToShow?.length) {
    return (
      <Grid container className={classes.root} spacing={1}>
        Ups... There is no recipies
      </Grid>
    );
  }

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid container justify="center">
        <FormControlLabel
          control={
            <Checkbox
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<CheckCircleOutlineIcon color="action" />}
              name="favoriteCh"
              onClick={() => {
                if (!showFavoriteRecipes) {
                  let favoritesList = getFavouriresList();
                  let favoriteRecipesList = Array<RecipeModel>();
                  recipes?.forEach((recipe) => {
                    if (favoritesList.includes(recipe.id))
                      favoriteRecipesList.push(recipe);
                  });
                  setRecipesToShow(favoriteRecipesList);
                } else {
                  setRecipesToShow(recipes);
                }
                setShowFavoriteRecipes(!showFavoriteRecipes);
              }}
            />
          }
          label="Favorite Recipes"
        />
      </Grid>
      {recipesToShow.map((recipe) => (
        <Grid xs={6} lg={3} key={recipe.id} item>
          <RecipeCard recipe={recipe} />
        </Grid>
      ))}
    </Grid>
  );
}
