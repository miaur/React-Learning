import React, { useState } from "react";
import { Link } from "react-router-dom";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

import { RecipeModel } from "../../models/RecipeModel";
import RecipeCardMenu from "./RecipeCardMenu";
import { RecipeTimeToCook } from "./RecipeTimeToCook";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 400,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      maxHeight: 800,
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    header: {
      height: 70,
      overflow: "hidden",
      // lineHeight: 15,
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
    },
  })
);

export function getFavouriresList() {
  let favoritesList: Array<string> = [];
  let favorites = localStorage.getItem("favorites");
  if (favorites) {
    favoritesList = JSON.parse(favorites);
  }
  return favoritesList;
}

function handleFavoriteRecipe(recipeId: string) {
  let favoritesList = getFavouriresList();
  if (favoritesList.includes(recipeId))
    favoritesList = favoritesList.filter((item) => item !== recipeId);
  else favoritesList.push(recipeId);

  localStorage.setItem("favorites", JSON.stringify(favoritesList));
}

export default function Recipe({ recipe }: { recipe: RecipeModel }) {
  const classes = useStyles();
  const [favorite, setFavorite] = useState(
    getFavouriresList().includes(recipe.id)
  );

  const ingredientsList = recipe.ingredients.map((ingredient, index) => (
    <li key={index}>{ingredient.name + " - " + ingredient.quantity}</li>
  ));
  const ingredients = (
    <div>
      <ul>{ingredientsList}</ul>
    </div>
  );

  return (
    <Card className={classes.root}>
      <CardHeader
        action={<RecipeCardMenu recipeId={recipe.id} />}
        title={
          <div className={classes.header}>
            <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
          </div>
        }
        subheader={new Date(recipe.date).toDateString()}
      />
      <CardMedia
        className={classes.media}
        image={recipe.image || "https://via.placeholder.com/320x180"}
        title={recipe.title}
      />
      <CardContent>
        {recipe.type && recipe.type !== "" ? (
          <Typography variant="body2" color="textSecondary" component="p">
            {`Dish Type: ${recipe.type}.`}
          </Typography>
        ) : (
          <Typography paragraph />
        )}
        <RecipeTimeToCook timetocook={recipe.timetocook} />
        <Typography paragraph>Ingredients: </Typography>
        {ingredients}
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={() => {
            handleFavoriteRecipe(recipe.id);
            setFavorite(!favorite);
          }}
        >
          {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
        {/* <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
      </CardActions>
    </Card>
  );
}
