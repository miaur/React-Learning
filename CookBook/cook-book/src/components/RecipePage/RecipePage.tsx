import React from 'react'
import { RouteComponentProps } from 'react-router-dom';

import { CardMedia, Paper } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import { RecipeModel } from '../../models/RecipeModel';
import Image from 'material-ui-image'
import AccessTimeIcon from '@material-ui/icons/AccessTime';

type RecipePageProps = {} & RouteComponentProps<{
    id: string
}>;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        mainPaper: {
            position: 'relative',
            backgroundColor: theme.palette.grey['50'],
            color: theme.palette.common.white,
            marginBottom: theme.spacing(4),
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
        },
        media: {
            height: 0,
            paddingTop: '40%',
            width: "80%",
            marginRight: "auto",
            marginLeft: "auto",
        },
        header: {
            textAlign: "center",
            color: theme.palette.text.primary,
            verticalAlign: "middle",
        },
        textColor: {
            color: theme.palette.text.primary,
        },
        subtitle: {
            color: theme.palette.text.primary,
            textTransform: "uppercase",
            fontWeight: "bold",
            paddingLeft: "10%",
        },
        ingredientLi: {
            listStyle: "none",
            paddingLeft: "10%",
        },
        image: {
            width: "60%",
            marginLeft: "auto",
            marginRight: "auto",
        },
    }),
);

export default function RecipePage({ recipe }: { recipe: RecipeModel }) {
    const classes = useStyles();

    const ingredientsLi = recipe.ingredients.map(
        (ingredient, index) =>
            <li key={index}>{ingredient.name + " - " + ingredient.quantity}</li>);

    const stepsLi = recipe.directions.map(
        (step, index) =>
            <li key={index}>{step}</li>);
    return (
        <div>
            <Paper className={classes.mainPaper} >
                <Typography className={classes.header} variant="h2" component="h1" gutterBottom>
                    {recipe.title}
                </Typography>
                <Typography paragraph />
                <Typography className={classes.header} paragraph>
                    <AccessTimeIcon fontSize={"large"} /> <span style={{ verticalAlign: "50%" }}>{recipe.timetocook}</span>
                </Typography>
                <CardMedia
                    className={classes.media}
                    image={recipe.image}
                    title={recipe.title}
                />
                <Typography paragraph />
                <Typography className={classes.subtitle} paragraph>
                    Ingredients:
                </Typography>
                <Typography className={classes.textColor} >
                    <span><ul className={classes.ingredientLi}>{ingredientsLi}</ul></span>
                </Typography>
                <Typography paragraph />
                <Typography className={classes.subtitle} paragraph>
                    Steps:
                </Typography>
                <Typography className={classes.textColor} >
                    <span><ul>{stepsLi}</ul></span>
                </Typography>
            </Paper>

        </div>
    );
}