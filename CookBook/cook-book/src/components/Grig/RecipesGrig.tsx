import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import  {RecipeModel}  from '../../models/RecipeModel';
import Recipe from '../Recipe'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    control: {
      padding: theme.spacing(2),
    },
  }),
);

export default function RecipesGrid({recipesList}:{recipesList?: Array<RecipeModel>}) {
  const [spacing, setSpacing] = React.useState<GridSpacing>(2);
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpacing(Number((event.target as HTMLInputElement).value) as GridSpacing);
  };

  if (!recipesList?.length){
    return(
      <Grid container className={classes.root} spacing={1}>Ups... There is no recipies</Grid>
    );
  }
  
  return (
    <Grid container className={classes.root} spacing={2}>
      {recipesList.map((recipe) => (
        <Grid xs={6} lg={3} key={recipe.id} item>
          <Recipe recipe={recipe} />
        </Grid>
      ))}
    </Grid>
  );
}