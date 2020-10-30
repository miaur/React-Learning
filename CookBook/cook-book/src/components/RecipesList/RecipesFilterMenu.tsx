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
import MenuBookIcon from "@material-ui/icons/MenuBook";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import React, { ChangeEvent, useState } from "react";
import { IngredientType } from "../../models/IngredientModel";
import { DishType } from "../../models/RecipeModel";
import NumberFormat from "react-number-format";

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

function mapTypes(type: typeof IngredientType | typeof DishType) {
  const values = Object.values(type).filter((x) => typeof x === "string");
  return values.map((value) => (
    <FormControlLabel
      control={
        <Checkbox
          icon={<RadioButtonUncheckedIcon />}
          checkedIcon={<CheckCircleOutlineIcon color="action" />}
          name={`${value}Ch`}
          onClick={() => {}}
        />
      }
      label={value}
    />
  ));
}

interface TimeToCookState {
  from: string;
  to: string;
}

export default function RecipesFilterMenu() {
  const classes = useStyles();
  const [timeToCookvalues, setTimeToCookvalues] = useState<TimeToCookState>({
    from: "",
    to: "",
  });

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={() => {}}>
        <MenuBookIcon />
        Filter
      </Button>
      <Typography paragraph />
      <Accordion defaultExpanded className={classes.filterMenu}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.filterHeading}>Title</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField id="outlined-required" label="" variant="outlined" />
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
          <FormGroup>{mapTypes(DishType)}</FormGroup>
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
          <FormGroup>{mapTypes(IngredientType)}</FormGroup>
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
                value={timeToCookvalues.from}
                onChange={(e) => {
                  setTimeToCookvalues({
                    from: e.target.value,
                    to: timeToCookvalues.to,
                  });
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
                value={timeToCookvalues.to}
                type={"number"}
                onChange={(e) => {
                  setTimeToCookvalues({
                    to: e.target.value,
                    from: timeToCookvalues.from,
                  });
                }}
                id="formatted-numberformat-input"
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
