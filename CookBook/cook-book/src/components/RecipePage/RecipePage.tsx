import React from 'react'
import { RouteComponentProps } from 'react-router-dom';

import { Avatar, CardMedia, Paper } from '@material-ui/core';
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
        //===Main
        mainPaper: {
            // fontFamily: "'Marck Script', cursive",
            position: 'relative',
            backgroundColor: theme.palette.grey['50'],
            color: theme.palette.common.white,
            marginBottom: theme.spacing(4),
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
        },
        //===Picture
        media: {
            height: 0,
            paddingTop: '40%',
            width: "80%",
            marginRight: "auto",
            marginLeft: "auto",
        },
        image: {
            width: "60%",
            marginLeft: "auto",
            marginRight: "auto",
        },
        header: {
            textAlign: "center",
            color: theme.palette.text.primary,
            verticalAlign: "middle",
        },
        subtitle: {
            color: theme.palette.text.primary,
            textTransform: "uppercase",
            fontWeight: "bold",
            paddingLeft: "10%",
        },

        //===Lists
        listContainer: {
            color: theme.palette.text.primary,
            width: "60%",
            paddingLeft: "10%",
        },
        //===Ingredients
        list: {
            listStyle: "none",
        },
        ingredientsLi: {
            marginBottom: "16px", //as in Typography
            lineHeight: "1",
            borderBottom: "double",
            '& span:nth-child(odd)': {
                paddingRight: "6px",
            },
            '& span:nth-child(even)': {
                float: "right",
                // paddingLeft: "6px",
                color: "brown",
            },
            '&:first-letter': {
                textTransform: "uppercase",
            },
        },
        ingredientsSpan: {
            background: theme.palette.grey['50'],
            position: "relative",
            bottom: "-7px",

        },
        //===Steps
        stepsUl: {
            listStyle: "none",
            counterReset: "li",
        },
        stepsLi: {
            '&:first-letter': {
                textTransform: "uppercase",
            },
            position: "relative",
            marginBottom: "16px",
            paddingLeft: "1em",

            '&:before': {
                position: "absolute",
                left: "-1.5em",
                width: "1.5em",
                textAlign: "center",
                color: theme.palette.grey['50'],
                fontWeight: "bold",
                background: "grey",
                borderRadius: "50%",
                counterIncrement: "li",
                content: 'counter(li)',
            },
        },
    }),
);

export default function RecipePage({ recipe }: { recipe: RecipeModel }) {
    const classes = useStyles();

    const ingredientsLi = recipe.ingredients.map(
        (ingredient, index) =>
            <li key={index} className={classes.ingredientsLi}>
                <span className={classes.ingredientsSpan}>{ingredient.name}</span>
                <span className={classes.ingredientsSpan}>{ingredient.quantity}</span>
            </li>);

    const stepsLi = recipe.directions.map(
        (step, index) =>
            <li key={index} className={classes.stepsLi}>
                <span>{step}</span>
            </li>);
    return (
        <div>
            <Paper className={classes.mainPaper} >
                <Typography className={classes.header} variant="h3" component="h3" gutterBottom>
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
                <Typography className={classes.listContainer} >
                    <span><ul className={classes.list}>{ingredientsLi}</ul></span>
                </Typography>
                <Typography paragraph />
                <Typography className={classes.subtitle} paragraph>
                    Steps:
                </Typography>
                <Typography className={classes.listContainer} >
                    <span><ol className={classes.stepsUl}>{stepsLi}</ol></span>
                </Typography>
                <Typography paragraph />
            </Paper>

        </div>
    );
}