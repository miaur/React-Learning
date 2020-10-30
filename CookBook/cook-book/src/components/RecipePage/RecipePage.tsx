import React from "react";
import {
  Button,
  CardMedia,
  Link,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
} from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { RecipeModel } from "../../models/RecipeModel";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    //===Main
    mainPaper: {
      position: "relative",
      backgroundColor: theme.palette.grey["50"],
      color: theme.palette.common.white,
      marginBottom: theme.spacing(4),
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    },
    //===Picture
    media: {
      height: 0,
      paddingTop: "40%",
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
    listOfIngredients: {
      width: "100%",
    },
    ingredientsListItem: {
      borderBottom: "solid rgba(0, 0, 0, 0.3)",
    },
    ingredientsItemText: {
      background: theme.palette.grey["50"],
    },
    //===Steps
    stepsList: {
      counterReset: "li",
    },
    stepsListItem: {
      "&:first-letter": {
        textTransform: "uppercase",
      },
      position: "relative",
      marginBottom: "16px",
      paddingLeft: "1em",

      "&:before": {
        position: "absolute",
        left: "-1.5em",
        width: "1.5em",
        textAlign: "center",
        color: theme.palette.grey["50"],
        fontWeight: "bold",
        background: "grey",
        borderRadius: "50%",
        counterIncrement: "li",
        content: "counter(li)",
      },
    },
    footer: {
      height: theme.spacing(4),
    },
    spaceBetweentElements: {
      height: theme.spacing(3),
    },
  })
);

export default function RecipePage({ recipe }: { recipe: RecipeModel }) {
  const classes = useStyles();

  const ingredientsList = recipe.ingredients.map((ingredient) => (
    <ListItem key={ingredient.name} className={classes.ingredientsListItem}>
      <ListItemText
        className={classes.ingredientsItemText}
        primary={ingredient.name}
      />
      <ListItemSecondaryAction>
        <ListItemText
          className={classes.ingredientsItemText}
          primary={ingredient.quantity}
        />
      </ListItemSecondaryAction>
    </ListItem>
  ));

  const stepsList = recipe.directions.map((step, index) => (
    <ListItem key={index} className={classes.stepsListItem}>
      {step}
    </ListItem>
  ));
  return (
    <div>
      <Paper className={classes.mainPaper}>
        <Typography paragraph>
          <Link
            href={`/editForm/${recipe.id}`}
            style={{ textDecoration: "none" }}
          >
            <Button>
              <EditIcon />
              Edit
            </Button>
          </Link>
        </Typography>
        <Typography className={classes.spaceBetweentElements} />
        <Typography
          className={classes.header}
          variant="h3"
          component="h3"
          gutterBottom
        >
          {recipe.title}
        </Typography>
        <Typography className={classes.spaceBetweentElements} />
        <Typography className={classes.header} paragraph>
          <AccessTimeIcon fontSize={"large"} />{" "}
          <span style={{ verticalAlign: "50%" }}>{recipe.timetocook}</span>
        </Typography>
        <CardMedia
          className={classes.media}
          image={recipe.image}
          title={recipe.title}
        />
        <Typography className={classes.spaceBetweentElements} />
        <Typography className={classes.subtitle} paragraph>
          Ingredients:
        </Typography>
        <Typography className={classes.listContainer}>
          <List className={classes.listOfIngredients}>{ingredientsList}</List>
        </Typography>
        <Typography className={classes.spaceBetweentElements} />
        <Typography className={classes.subtitle} paragraph>
          Steps:
        </Typography>
        <Typography className={classes.listContainer}>
          <List className={classes.stepsList}>{stepsList}</List>
        </Typography>
        <Typography className={classes.footer} />
      </Paper>
    </div>
  );
}
