import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { RecipeModel } from '../../models/RecipeModel';
import RecipeCard from '../RecipeCard'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        cardItem: {
            // height: 600
        },
    }),
);

export default function RecipesListView({ recipes }: { recipes?: Array<RecipeModel> }) {
    const classes = useStyles();

    if (!recipes?.length) {
        return (
            <Grid container className={classes.root} spacing={1}>Ups... There is no recipies</Grid>
        );
    }

    return (
        <Grid container className={classes.root} spacing={2}>
            {recipes.map((recipe) => (
                <Grid xs={6} lg={3} key={recipe.id} item className={classes.cardItem}>
                    <RecipeCard recipe={recipe} />
                </Grid>
            ))}
        </Grid>
    );
}