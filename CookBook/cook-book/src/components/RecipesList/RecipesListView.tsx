import React, { useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { RecipeModel } from "../../models/RecipeModel";
import RecipeCard from "../RecipeCard";
import { RecipesFilterMenu } from "./RecipesFilterMenu";

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

export function RecipesListView({ recipes }: { recipes?: Array<RecipeModel> }) {
  const classes = useStyles();
  const [recipesToShow, setRecipesToShow] = useState(recipes);

  return (
    <Grid container className={classes.root}>
      <Grid container spacing={1} item xs={3}>
        <Grid item xs={10}>
          <RecipesFilterMenu
            currentRecipesList={recipes ?? []}
            onFilterChange={(filteredList: Array<RecipeModel>) => {
              setRecipesToShow(filteredList);
            }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={1} item xs={9}>
        {!recipesToShow?.length
          ? "Ups... There is no recipies"
          : recipesToShow.map((recipe) => (
              <Grid xs={4} key={recipe.id} item>
                <RecipeCard recipe={recipe} />
              </Grid>
            ))}
      </Grid>
    </Grid>
  );
}
