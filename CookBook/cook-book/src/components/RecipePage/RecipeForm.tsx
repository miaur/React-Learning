import React, { useRef, useState } from 'react'

import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button, Grid, InputAdornment, List, Paper } from '@material-ui/core';
import AddCircleOutlineTwoToneIcon from '@material-ui/icons/AddCircleOutlineTwoTone';
import IngredientForm from './IngredientForm';
import { IngredientModel } from '../../models/IngredientModel';
import AlertDialog from '../AlertDialog/AlertDialog';
import { AlertDialogState } from '../../models/AlertDialogState'
import { InsertNewRecipeAxios } from '../DataLoader/DataLoader';
import { RecipeModel } from '../../models/RecipeModel';

import { Field, FieldArray, Form, Formik } from 'formik';
import { validationSchema, initialFormikvalues } from './RPFormikValidation'
import StepForm from './StepForm';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        //===Main
        mainPaper: {
            position: 'relative',
            backgroundColor: theme.palette.grey['50'],
            color: theme.palette.common.white,
            marginBottom: theme.spacing(4),
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
        },
        root: {
            textAlign: "center",
        },
        singleTextfield: {
            width: "83%",
        },
        ul: {
            listStyle: "none",
            counterReset: "li",
        },
        stepsLi: {
            paddingBottom: "1%",
        },
        stepTextField: {
            width: "94%",
        },
        listItem: {
            paddingLeft: "0",
        },
    }),
);

export function makeRandomKey(length: number) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export default function RecipeForm() {
    const classes = useStyles();

    const [alertDialogState, setAlertDialogState] = useState<AlertDialogState>({ open: false });

    const valueRefForTimeToCook = useRef<HTMLInputElement>();
    const valueRefForImageUrl = useRef<HTMLInputElement>();

    const createRecipeObject = (title: string, directions: Array<string>, ingredients: Array<IngredientModel>) => {
        var recipeObject: RecipeModel = {
            id: makeRandomKey(30),
            date: new Date().toDateString(),
            directions: directions,
            title: title,
            image: valueRefForImageUrl.current ? valueRefForImageUrl.current.value : '',
            ingredients: ingredients,
            timetocook: valueRefForTimeToCook.current ? valueRefForTimeToCook.current.value : '',
        };
        return recipeObject;
    }



    return (
        <Paper className={classes.mainPaper} >
            <Formik
                onSubmit={(values) => {
                    var ingredientsValues = new Array<IngredientModel>();
                    values.ingredients.forEach(i => {
                        var ingr: IngredientModel = {
                            quantity: i.ingridientCount,
                            name: i.ingridientName,
                            type: i.ingridientType
                        }
                        ingredientsValues.push(ingr);
                    });
                    var newRecipeToInsert: RecipeModel = createRecipeObject(values.title, values.steps, ingredientsValues);
                    var resultParams = InsertNewRecipeAxios(newRecipeToInsert);
                    resultParams.then(() => {
                        setAlertDialogState({ text: "New Recipe inserted.", open: true });
                    }).catch((error) => {
                        const errorMessage = error as { message: string };
                        var alertMessage = "An error has occurred: " + errorMessage?.message;
                        setAlertDialogState({ alertTitle: 'Error', text: alertMessage, open: true });
                    });
                    console.log("===OnSubmit===");
                }}
                initialValues={initialFormikvalues}
                validationSchema={validationSchema}
                render={({ values }) => (
                    <Form>
                        <div className={classes.root} >
                            <Grid container spacing={2} justify="center" alignItems="center">
                                {/* *** Title *** */}
                                <Grid item xs={12}>
                                    <Field name={'title'}>
                                        {({ field, meta }: any) => (
                                            <TextField className={classes.singleTextfield}
                                                required
                                                id="outlined-required"
                                                label="Title"
                                                variant="outlined"
                                                helperText={meta.error}
                                                {...field} error={!!meta.error && meta.touched} />
                                        )}
                                    </Field>
                                </Grid>
                                {/* *** Time to cook *** */}
                                <Grid item xs={12}>
                                    <TextField className={classes.singleTextfield}
                                        id="outlined-required"
                                        label="Time to cook"
                                        variant="outlined"
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">Min</InputAdornment>,
                                        }}
                                        inputRef={valueRefForTimeToCook}
                                    />
                                </Grid>
                                {/* *** Image *** */}
                                <Grid item xs={12}>
                                    <TextField className={classes.singleTextfield}
                                        id="outlined-required"
                                        label="Image url"
                                        variant="outlined"
                                        inputRef={valueRefForImageUrl}
                                    />
                                </Grid>
                                {/* *** Ingredients *** */}
                                <FieldArray name="ingredients"
                                    render={
                                        (ingredientsArrayHelpers) => (
                                            <Grid container spacing={2} justify="center" alignItems="center" >
                                                <Grid item xs={1} />
                                                <Grid item xs={10}>
                                                    <fieldset>
                                                        <legend style={{ "color": "grey" }}>Ingredients*:</legend>
                                                        <div>
                                                            <List className={classes.listItem}>
                                                                {values.ingredients.map((i, index) =>
                                                                    <IngredientForm
                                                                        key={index}
                                                                        index={index}
                                                                        quantity={i.ingridientCount}
                                                                        name={i.ingridientName}
                                                                        type={i.ingridientType}
                                                                        onDeleteClick={() => {
                                                                            ingredientsArrayHelpers.remove(index);
                                                                        }}
                                                                    />


                                                                )}
                                                            </List>
                                                        </div>
                                                    </fieldset>
                                                </Grid>
                                                <Grid item xs={1}>
                                                    <Button variant="contained" color="primary" onClick={
                                                        () => {
                                                            ingredientsArrayHelpers.push({ ingridientName: "", ingridientCount: "", ingridientType: "" });
                                                        }
                                                    }><AddCircleOutlineTwoToneIcon /></Button>
                                                </Grid>
                                            </Grid>
                                        )
                                    } />

                                {/* *** Steps *** */}
                                <FieldArray name="steps"
                                    render={
                                        (stepsArrayHelpers) => (
                                            <Grid container spacing={2} justify="center" alignItems="center" >
                                                <Grid item xs={1} />
                                                <Grid item xs={10}>
                                                    <fieldset >
                                                        <legend style={{ "color": "grey" }}>Steps*:</legend>

                                                        <List className={classes.ul}>
                                                            {values.steps.map((s, index) =>
                                                                <StepForm index={index} key={index} stepValue={s}
                                                                    onDeleteClick={() => {
                                                                        // setSteps(steps.filter((item) => item.stepKey !== stepKey))
                                                                        stepsArrayHelpers.remove(index);
                                                                    }}
                                                                />
                                                            )}
                                                        </List>

                                                    </fieldset>
                                                </Grid>
                                                <Grid item xs={1}>
                                                    <Button variant="contained" color="primary" onClick={
                                                        () => {
                                                            var step = {
                                                                stepKey: makeRandomKey(5),
                                                                stepValue: '',
                                                                tmpValue: '',
                                                            };
                                                            stepsArrayHelpers.push("");
                                                            // setSteps(steps.concat([step]))
                                                        }}><AddCircleOutlineTwoToneIcon /></Button>
                                                </Grid>
                                            </Grid>
                                        )
                                    } />

                                {/* Save recipe into db button: */}
                                <Grid item xs={12}>
                                    <Button variant="contained" color="primary" type="submit">Save</Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <AlertDialog alertDialogState={alertDialogState}
                                        onClose={() => {
                                            setAlertDialogState({ open: false })
                                        }} />
                                </Grid>
                            </Grid>
                        </div>
                    </Form>
                )}
            />
        </Paper >

    );
}