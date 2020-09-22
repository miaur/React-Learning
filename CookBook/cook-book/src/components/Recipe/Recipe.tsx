import React from 'react'

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { RecipeModel } from '../../models/RecipeModel';
import { Link } from 'react-router-dom';

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
    avatar: {
      backgroundColor: red[500],
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
      <li key={index}>{ingredient}</li>
  );
  const ingredients = <span><ul>{ingredientsList}</ul></span>;

  const directions = <span><ul>{
    recipe.directions.map(
      (direction: string, index: number) =>
        <li key={index}>Step {(index + 1) + " " + direction}</li>

    )}</ul></span>;

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={<Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>}
        subheader={(new Date(recipe.date)).toDateString()}
      />
      <CardMedia
        className={classes.media}
        image={recipe.image}
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