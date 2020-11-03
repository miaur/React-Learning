import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  createStyles,
  FormControlLabel,
  FormGroup,
  Grid,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import React, { useContext } from "react";
import { IngredientType } from "../../models/IngredientModel";
import { DishType, RecipeModel } from "../../models/RecipeModel";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { Filter, FilterContext } from "../stores/RecipesListFilter/Filter";
import FilterListIcon from "@material-ui/icons/FilterList";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    filterMenu: {
      width: "100%",
    },
    filterHeading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  })
);

export interface RecipesListFilterProps {
  currentRecipesList: Array<RecipeModel>;
  onFilterChange: (filteredRecipesList: Array<RecipeModel>) => void;
}

export const RecipesFilterMenu = observer((props: RecipesListFilterProps) => {
  const classes = useStyles();
  const filter = useContext(FilterContext);
  filter.currentRecipesList = props.currentRecipesList;

  const mapTypes = function (
    type: typeof IngredientType | typeof DishType,
    filter: Filter,
    typeOfEnum: string
  ) {
    const values = Object.values(type).filter((x) => typeof x === "string");
    return values.map((value) => (
      <FormControlLabel
        control={
          <Checkbox
            icon={<RadioButtonUncheckedIcon />}
            checkedIcon={<CheckCircleOutlineIcon color="action" />}
            name={`${value}`}
            onChange={(e) => {
              if (e.target.checked) {
                if (
                  typeOfEnum === "IngredientType" &&
                  !filter.ingredientsType.includes(e.target.name)
                ) {
                  filter.ingredientsType.push(e.target.name);
                  props.onFilterChange(filter.filteredRecipesList);
                } else if (
                  typeOfEnum === "DishType" &&
                  !filter.dishType.includes(e.target.name)
                ) {
                  filter.dishType.push(e.target.name);
                  props.onFilterChange(filter.filteredRecipesList);
                }
              } else {
                if (typeOfEnum === "IngredientType") {
                  filter.ingredientsType = filter.ingredientsType.filter(
                    (item) => item !== e.target.name
                  );
                  props.onFilterChange(filter.filteredRecipesList);
                } else if (typeOfEnum === "DishType") {
                  filter.dishType = filter.dishType.filter(
                    (item) => item !== e.target.name
                  );
                  props.onFilterChange(filter.filteredRecipesList);
                }
              }
            }}
          />
        }
        label={value}
        key={value}
      />
    ));
  };

  return (
    <div>
      <Button
        onClick={() => {
          filter.title = "";
          filter.title = "";
          filter.timeToCookFrom = "";
          filter.timeToCookTo = "";
          filter.favorites = false;
          filter.dishType = [];
          filter.ingredientsType = [];
          props.onFilterChange(filter.currentRecipesList);
        }}
      >
        <FilterListIcon />
        Reset filter
      </Button>
      <FormControlLabel
        control={
          <Checkbox
            icon={<RadioButtonUncheckedIcon />}
            checkedIcon={<CheckCircleOutlineIcon color="action" />}
            name="favoriteCh"
            onClick={() => {
              filter.favorites = !filter.favorites;
              props.onFilterChange(filter.filteredRecipesList);
            }}
          />
        }
        label="Favorite Recipes"
      />
      <Accordion defaultExpanded className={classes.filterMenu}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.filterHeading}>Title</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            id="outlined-required"
            label=""
            variant="outlined"
            value={filter.title}
            onChange={(e) => {
              filter.title = e.target.value;
              props.onFilterChange(filter.filteredRecipesList);
            }}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded className={classes.filterMenu}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.filterHeading}>Dish Type</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>{mapTypes(DishType, filter, "DishType")}</FormGroup>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.filterHeading}>Ingredients</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {mapTypes(IngredientType, filter, "IngredientType")}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded className={classes.filterMenu}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.filterHeading}>
            Time To Cook
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={1}>
            <Grid item xs={5}>
              <TextField
                label="from"
                type={"number"}
                value={toJS(filter.timeToCookFrom)}
                onChange={(e) => {
                  filter.timeToCookFrom = e.target.value;
                  props.onFilterChange(filter.filteredRecipesList);
                }}
                id="formatted-numberformat-input"
              />
            </Grid>
            <Grid item xs={2}>
              <Typography> - </Typography>
            </Grid>
            <Grid item xs={5}>
              <TextField
                label="to"
                value={toJS(filter.timeToCookTo)}
                type={"number"}
                onChange={(e) => {
                  filter.timeToCookTo = e.target.value;
                  props.onFilterChange(filter.filteredRecipesList);
                }}
                id="formatted-numberformat-input"
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
});
