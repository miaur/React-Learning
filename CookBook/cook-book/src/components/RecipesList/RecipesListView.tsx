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
import RecipesFilterMenu from "./RecipesFilterMenu";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    filterHeading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    filterMenu: {
      width: "100%",
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
    <Grid container className={classes.root}>
      <Grid container spacing={1} item xs={3}>
        <Grid item xs={10}>
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
          <RecipesFilterMenu />
        </Grid>
      </Grid>
      <Grid container spacing={1} item xs={9}>
        {recipesToShow.map((recipe) => (
          <Grid xs={4} key={recipe.id} item>
            <RecipeCard recipe={recipe} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
