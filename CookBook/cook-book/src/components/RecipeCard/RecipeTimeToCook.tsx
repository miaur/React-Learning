import { Typography } from "@material-ui/core";
import React from "react";

interface TimeToCookProps {
  timetocook: number;
}
export function RecipeTimeToCook(props: TimeToCookProps) {
  if (props.timetocook && props.timetocook != 0) {
    if (props.timetocook < 60) {
      return (
        <Typography variant="body2" color="textSecondary" component="p">
          Time to cook: {`${props.timetocook} minutes`}
        </Typography>
      );
    }
    return (
      <Typography variant="body2" color="textSecondary" component="p">
        Time to cook:{" "}
        {`${Math.trunc(props.timetocook / 60)} hours ${
          props.timetocook % 60
        } minutes`}
      </Typography>
    );
  }
  return <Typography />;
}
