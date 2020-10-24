import {
  Button,
  createStyles,
  Grid,
  ListItem,
  makeStyles,
  MenuItem,
  TextField,
  Theme,
} from "@material-ui/core";
import React from "react";
import { IngredientType } from "../../models/IngredientModel";
import DeleteIcon from "@material-ui/icons/Delete";
import { Field } from "formik";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    singleTextfield: {
      width: "83%",
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      width: "80%",
    },
  })
);

function mapIngredientsTypes() {
  const values = Object.values(IngredientType).filter(
    (x) => typeof x === "string"
  );
  let ret = [
    <MenuItem key={"-1"} value="">
      <em>None</em>
    </MenuItem>,
  ];
  let arr = values.map((value) => (
    <MenuItem key={value} value={value}>
      <em>{value}</em>
    </MenuItem>
  ));
  ret.concat(arr);
  return ret;
}

interface IngredientFormProps {
  quantity: string;
  name: string;
  type: string;
  index: number;
  onDeleteClick: () => void;
}

export default function IngredientForm(props: IngredientFormProps) {
  const { onDeleteClick } = props;
  const classes = useStyles();

  const fieldIngrName = `ingredients[${props.index}]`;

  return (
    <ListItem key={props.index}>
      <Grid container spacing={2} justify="center" alignItems="center">
        <Grid item xs>
          <Field name={`${fieldIngrName}.name`}>
            {({ field, meta }: any) => (
              <TextField
                className={classes.singleTextfield}
                id="outlined-required"
                required
                label="Name"
                variant="outlined"
                helperText={meta.error}
                {...field}
                error={!!meta.error && meta.touched}
              />
            )}
          </Field>
        </Grid>
        <Grid item xs>
          <Field name={`${fieldIngrName}.quantity`}>
            {({ field, meta }: any) => (
              <TextField
                required
                className={classes.singleTextfield}
                id="outlined-required"
                label="Count"
                variant="outlined"
                helperText={meta.error}
                {...field}
                error={!!meta.error && meta.touched}
              />
            )}
          </Field>
        </Grid>
        <Grid item xs>
          <Field name={`${fieldIngrName}.type`}>
            {({ field, meta }: any) => (
              <TextField
                required
                className={classes.singleTextfield}
                id="outlined-required"
                variant="outlined"
                select
                label="Type"
                helperText={meta.error}
                {...field}
                error={!!meta.error && meta.touched}
              >
                {mapIngredientsTypes()}
              </TextField>
            )}
          </Field>
        </Grid>

        <Grid item xs={1}>
          <Button
            onClick={() => {
              onDeleteClick?.();
            }}
          >
            <DeleteIcon />
          </Button>
        </Grid>
      </Grid>
    </ListItem>
  );
}
