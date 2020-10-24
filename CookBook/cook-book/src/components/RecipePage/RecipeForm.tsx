import React, { useRef, useState } from "react";

import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Button, Grid, List, Paper } from "@material-ui/core";
import AddCircleOutlineTwoToneIcon from "@material-ui/icons/AddCircleOutlineTwoTone";
import IngredientForm from "./IngredientForm";
import { IngredientModel } from "../../models/IngredientModel";
import AlertDialog from "../AlertDialog/AlertDialog";
import { AlertDialogState } from "../../models/AlertDialogState";
import { InsertRecipe, UpdateRecipe } from "../RecepieControl/RecepieControl";
import { RecipeModel } from "../../models/RecipeModel";

import { Field, FieldArray, Form, Formik } from "formik";
import { initialFormikvalues, validationSchema } from "./RPFormikValidation";
import StepForm from "./StepForm";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainPaper: {
      position: "relative",
      backgroundColor: theme.palette.grey["50"],
      color: theme.palette.common.white,
      marginBottom: theme.spacing(4),
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    },
    root: {
      textAlign: "center",
    },
    singleTextfield: {
      width: "83%",
    },
    listItem: {
      paddingLeft: "0",
    },
    listBlockWithButtonPlus: {
      padding: "8px",
    },
    listLabel: {
      color: "grey",
    },
  })
);

export function makeRandomKey(length: number) {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export default function RecipeForm({
  recipeToEdit,
}: {
  recipeToEdit?: RecipeModel;
}) {
  const initialRecipeToEditvalues = initialFormikvalues;
  if (recipeToEdit) {
    initialRecipeToEditvalues.id = recipeToEdit.id;
    initialRecipeToEditvalues.title = recipeToEdit.title;
    initialRecipeToEditvalues.steps = recipeToEdit.directions;
    initialRecipeToEditvalues.image = recipeToEdit.image;
    initialRecipeToEditvalues.timetocook = recipeToEdit.timetocook;
    initialRecipeToEditvalues.ingredients = recipeToEdit.ingredients;
  }

  const classes = useStyles();

  const [alertDialogState, setAlertDialogState] = useState<AlertDialogState>({
    open: false,
  });

  const valueRefForTimeToCook = useRef<HTMLInputElement>();
  const valueRefForImageUrl = useRef<HTMLInputElement>();

  const createRecipeObject = (
    title: string,
    directions: Array<string>,
    ingredients: Array<IngredientModel>,
    date?: string,
    id?: string
  ) => {
    const recipeObject: RecipeModel = {
      id: id ? id : makeRandomKey(30),
      date: date ? date : new Date().toDateString(),
      directions: directions,
      title: title,
      image: valueRefForImageUrl.current
        ? valueRefForImageUrl.current.value
        : "",
      ingredients: ingredients,
      timetocook: valueRefForTimeToCook.current
        ? valueRefForTimeToCook.current.value
        : "",
    };
    return recipeObject;
  };

  return (
    <>
      <Paper className={classes.mainPaper}>
        <Formik
          onSubmit={async (values) => {
            try {
              if (!recipeToEdit) {
                const newRecipeToInsert: RecipeModel = createRecipeObject(
                  values.title,
                  values.steps,
                  values.ingredients
                );
                await InsertRecipe(newRecipeToInsert);
                setAlertDialogState({
                  text: "New Recipe inserted.",
                  open: true,
                });
              } else {
                const newRecipeToInsert: RecipeModel = createRecipeObject(
                  values.title,
                  values.steps,
                  values.ingredients,
                  values.date,
                  recipeToEdit.id
                );
                await UpdateRecipe(newRecipeToInsert);
                setAlertDialogState({ text: "Recipe updated.", open: true });
              }
            } catch (error) {
              const alertMessage =
                "An error has occurred: " +
                (error as { message: string })?.message;
              setAlertDialogState({
                alertTitle: "Error",
                text: alertMessage,
                open: true,
              });
            }
          }}
          initialValues={initialRecipeToEditvalues}
          validationSchema={validationSchema}
        >
          {({ values }) => (
            <Form>
              <div className={classes.root}>
                <Grid
                  container
                  spacing={2}
                  justify="center"
                  alignItems="center"
                >
                  {/* *** Title *** */}
                  <Grid item xs={12}>
                    <Field name={"title"}>
                      {({ field, meta }: any) => (
                        <TextField
                          className={classes.singleTextfield}
                          required
                          id="outlined-required"
                          label="Title"
                          variant="outlined"
                          helperText={meta.error}
                          {...field}
                          error={!!meta.error && meta.touched}
                        />
                      )}
                    </Field>
                  </Grid>
                  {/* *** Time to cook *** */}
                  <Grid item xs={12}>
                    <Field name={"timetocook"}>
                      {({ field, meta }: any) => (
                        <TextField
                          className={classes.singleTextfield}
                          id="outlined-required"
                          label="Time to cook"
                          variant="outlined"
                          inputRef={valueRefForTimeToCook}
                          {...field}
                          error={!!meta.error && meta.touched}
                        />
                      )}
                    </Field>
                  </Grid>
                  {/* *** Image *** */}
                  <Grid item xs={12}>
                    <Field name={"image"}>
                      {({ field, meta }: any) => (
                        <TextField
                          className={classes.singleTextfield}
                          id="outlined-required"
                          label="Image url"
                          variant="outlined"
                          inputRef={valueRefForImageUrl}
                          {...field}
                          error={!!meta.error && meta.touched}
                        />
                      )}
                    </Field>
                  </Grid>
                  {/* *** Ingredients *** */}
                  <FieldArray
                    name="ingredients"
                    render={(ingredientsArrayHelpers) => (
                      <Grid
                        className={classes.listBlockWithButtonPlus}
                        container
                        justify="center"
                        alignItems="center"
                      >
                        <Grid item xs={1} />
                        <Grid item xs={10}>
                          <fieldset>
                            <legend className={classes.listLabel}>
                              Ingredients*:
                            </legend>
                            <div>
                              <List className={classes.listItem}>
                                {values.ingredients.map((ingredient, index) => (
                                  <IngredientForm
                                    key={index}
                                    index={index}
                                    quantity={ingredient.quantity}
                                    name={ingredient.name}
                                    type={ingredient.type}
                                    onDeleteClick={() => {
                                      ingredientsArrayHelpers.remove(index);
                                    }}
                                  />
                                ))}
                              </List>
                            </div>
                          </fieldset>
                        </Grid>
                        <Grid item xs={1}>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              ingredientsArrayHelpers.push({
                                name: "",
                                quantity: "",
                                type: "",
                              });
                            }}
                          >
                            <AddCircleOutlineTwoToneIcon />
                          </Button>
                        </Grid>
                      </Grid>
                    )}
                  />
                  {/* *** Steps *** */}
                  <FieldArray
                    name="steps"
                    render={(stepsArrayHelpers) => (
                      <Grid
                        className={classes.listBlockWithButtonPlus}
                        container
                        justify="center"
                        alignItems="center"
                      >
                        <Grid item xs={1} />
                        <Grid item xs={10}>
                          <fieldset>
                            <legend className={classes.listLabel}>
                              Steps*:
                            </legend>
                            <List>
                              {values.steps.map((step, index) => (
                                <StepForm
                                  index={index}
                                  key={index}
                                  stepValue={step}
                                  onDeleteClick={() => {
                                    stepsArrayHelpers.remove(index);
                                  }}
                                />
                              ))}
                            </List>
                          </fieldset>
                        </Grid>
                        <Grid item xs={1}>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              stepsArrayHelpers.push("");
                            }}
                          >
                            <AddCircleOutlineTwoToneIcon />
                          </Button>
                        </Grid>
                      </Grid>
                    )}
                  />

                  {/* Save recipe into db button: */}
                  <Grid item xs={12}>
                    <Button variant="contained" color="primary" type="submit">
                      Save
                    </Button>
                  </Grid>
                  <Grid item xs={12} />
                </Grid>
              </div>
            </Form>
          )}
        </Formik>
      </Paper>
      <AlertDialog
        alertDialogState={alertDialogState}
        onClose={() => {
          setAlertDialogState({ open: false });
        }}
      />
    </>
  );
}
