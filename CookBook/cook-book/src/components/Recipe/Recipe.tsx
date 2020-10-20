import React from 'react'
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { RecipeModel } from '../../models/RecipeModel';
import RecipeCardMenu from './RecipeCardMenu';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 345,
        },
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
    }),
);

export default function Recipe({ recipe }: { recipe: RecipeModel }) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const ingredientsList = recipe.ingredients.map(
        (ingredient, index) =>
            <li key={index}>{ingredient.name + " - " + ingredient.quantity}</li>
    );
    const ingredients = <span><ul>{ingredientsList}</ul></span>;

    const directions = <span><ul>{
        recipe.directions.map(
            (direction, index) =>
                <li key={index}>Step {(index + 1) + " " + direction}</li>

        )}</ul></span>;

    return (
        <Card className={classes.root}>
            <CardHeader
                action={<RecipeCardMenu recipeId={recipe.id}/>}
                title={<Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>}
                subheader={(new Date(recipe.date)).toDateString()}
            />
            <CardMedia
                className={classes.media}
                image={recipe.image || 'https://via.placeholder.com/320x180'}
                title={recipe.title}

            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    Time to cook: {recipe.timetocook}
                </Typography>
                <Typography paragraph>Ingredients: </Typography>
                {ingredients}
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <IconButton
                    //todo: expand steps
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Directions:</Typography>
                    {directions}
                </CardContent>
            </Collapse>
        </Card>
    );
}