import {
  Button,
  createStyles,
  Grid,
  ListItem,
  makeStyles,
  TextField,
  Theme,
} from "@material-ui/core";
import { Field } from "formik";
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    stepsListItem: {
      paddingBottom: theme.spacing(1),
    },
    stepTextField: {
      width: "94%",
    },
  })
);

interface StepProps {
  stepValue: string;
  index: number;
  onDeleteClick: () => void;
}

export default function StepForm(props: StepProps) {
  const classes = useStyles();
  const { onDeleteClick } = props;

  return (
    <ListItem key={props.index} className={classes.stepsListItem}>
      <Grid container spacing={2} justify="center" alignItems="center">
        <Grid item xs>
          <Field name={`steps[${props.index}]`}>
            {({ field, meta }: any) => (
              <TextField
                className={classes.stepTextField}
                id="outlined-multiline-static"
                required
                multiline
                rows={6}
                variant="outlined"
                label={`Step ${props.index + 1}. `}
                helperText={meta.error}
                {...field}
                error={!!meta.error && meta.touched}
              />
            )}
          </Field>
        </Grid>
        {/* Delete - cancel button */}
        <Grid item xs={1}>
          <Button
            onClick={() => {
              onDeleteClick();
            }}
          >
            <DeleteIcon />
          </Button>
        </Grid>
      </Grid>
    </ListItem>
  );
}
