import React, { useState } from 'react'

import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button, Grid, InputAdornment, List, ListItem, Paper } from '@material-ui/core';
import AddCircleOutlineTwoToneIcon from '@material-ui/icons/AddCircleOutlineTwoTone';
import IngredientForm from './IngredientForm';
import { IngredientModel } from '../../models/IngredientModel';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import AlertDialog from '../AlertDialog/AlertDialog';

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

interface listItemIngredientState {
    ingrKey: string,
    disabled: boolean,
    ingr: IngredientModel,
}

interface listItemStepState {
    stepKey: string,
    disabled: boolean,
    step: string,
    tmpValue: string,
}

interface AlertDialogState {
    text: string,
    open: boolean,
}


function makeKey(length: number) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
const alertWhenAddIngredient = "You need to save edited ingredient or cancel editing it before add new ingredient."
const alertWhenAddStep = "You need to save edited step or cancel editing it before add new step."

export default function RecipeForm() {
    const classes = useStyles();
    const [ingredients, setIngredients] = useState<Array<listItemIngredientState>>(
        [{
            ingrKey: makeKey(5),
            disabled: true,
            ingr: {
                name: '',
                quantity: '',
                type: ''
            }
        }]);

    const [steps, setSteps] = useState<Array<listItemStepState>>([{
        stepKey: makeKey(5),
        disabled: true,
        step: '',
        tmpValue: '',
    }]);

    const [alertDialogState, setAlertDialogState] = useState<AlertDialogState>({ text: "Something went wrong!", open: false });

    return (
        <Paper className={classes.mainPaper} >
            <div className={classes.root} >
                <form noValidate autoComplete="off">
                    <Grid container spacing={2} justify="center" alignItems="center">
                        {/* *** Title *** */}
                        <Grid item xs={12}>
                            <TextField className={classes.singleTextfield}
                                required
                                id="outlined-required"
                                label="Title"
                                variant="outlined"
                            />
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
                            />
                        </Grid>
                        {/* *** Image *** */}
                        <Grid item xs={12}>
                            <TextField className={classes.singleTextfield}
                                id="outlined-required"
                                label="Image url"
                                variant="outlined"
                            />
                        </Grid>
                        {/* *** Ingredients *** */}
                        <Grid item xs={1} />
                        <Grid item xs={10}>
                            <fieldset>
                                <legend style={{ "color": "grey" }}>Ingredients*:</legend>
                                <div>
                                    <List className={classes.listItem}>
                                        {ingredients.map(i => <IngredientForm ingrKey={i.ingrKey} key={i.ingrKey} disabled={i.disabled} ingr={i.ingr}
                                            onSaveClick={
                                                (ingr) => {
                                                    i.disabled = !i.disabled;
                                                    i.ingr = ingr;
                                                    setIngredients(ingredients.slice(0));
                                                }}
                                            onDeleteClick={(ingrKey) => {
                                                setIngredients(ingredients.filter((item) => item.ingrKey !== ingrKey))
                                            }}
                                            onDisabled={
                                                (value) => {
                                                    i.disabled = value;
                                                    setIngredients(ingredients.slice(0));
                                                }
                                            } />)}
                                    </List>
                                </div>
                            </fieldset>
                        </Grid>
                        <Grid item xs={1}>
                            <Button variant="contained" color="primary" onClick={
                                () => {
                                    var canAdd = true;
                                    ingredients.forEach(i => {
                                        if (!i.disabled) {
                                            canAdd = false;
                                        }
                                    });
                                    if (!canAdd) {
                                        setAlertDialogState({ text: alertWhenAddIngredient, open: true });
                                    } else
                                        setIngredients(
                                            ingredients.concat([
                                                {
                                                    ingrKey: makeKey(5),
                                                    disabled: true,
                                                    ingr: {
                                                        name: '',
                                                        quantity: '',
                                                        type: ''
                                                    }
                                                }]))
                                }
                            }><AddCircleOutlineTwoToneIcon /></Button>
                        </Grid>

                        {/* *** Steps *** */}
                        <Grid item xs={1} />
                        <Grid item xs={10}>
                            <fieldset >
                                <legend style={{ "color": "grey" }}>Steps*:</legend>
                                <div>
                                    <List className={classes.ul}>
                                        {steps.map((s, index) =>
                                            <ListItem key={s.stepKey} className={classes.stepsLi}>
                                                <Grid container spacing={2} justify="center" alignItems="center">
                                                    <Grid item xs={10}>
                                                        <TextField className={classes.stepTextField}
                                                            id="outlined-multiline-static"
                                                            multiline
                                                            rows={6}
                                                            variant="outlined"
                                                            label={"Step " + (index + 1) + "."}
                                                            value={s.step}
                                                            disabled={s.disabled}
                                                            onChange={(e) => {
                                                                steps.forEach(step => {
                                                                    if (step.stepKey === s.stepKey) {
                                                                        step.step = e.target.value;
                                                                    }
                                                                });
                                                                setSteps(steps.slice(0));
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={1}>
                                                        <Button onClick={
                                                            () => {
                                                                steps.forEach(step => {
                                                                    if (step.stepKey === s.stepKey) {
                                                                        step.disabled = !s.disabled;
                                                                        step.tmpValue = step.step;
                                                                    }
                                                                });
                                                                setSteps(steps.slice(0));
                                                            }}>
                                                            {s.disabled ? <EditIcon /> : <DoneIcon />}</Button>
                                                    </Grid>
                                                    <Grid item xs={1}>
                                                        <Button onClick={
                                                            () => {
                                                                if (s.disabled) {
                                                                    steps.forEach((step, index) => {
                                                                        if (step.stepKey === s.stepKey) {
                                                                            steps.splice(index, 1);
                                                                        }
                                                                    });
                                                                    setSteps(steps.slice(0));
                                                                }
                                                                else {
                                                                    steps.forEach(step => {
                                                                        if (step.stepKey === s.stepKey) {
                                                                            step.disabled = !s.disabled;
                                                                            step.step = step.tmpValue;
                                                                        }
                                                                    });
                                                                    setSteps(steps.slice(0));
                                                                }
                                                            }
                                                        }>
                                                            {s.disabled ? <DeleteIcon /> : <CloseIcon />}</Button>
                                                    </Grid>
                                                </Grid>
                                            </ListItem>
                                        )}
                                    </List>
                                </div>
                            </fieldset>
                        </Grid>
                        <Grid item xs={1}>
                            <Button variant="contained" color="primary" onClick={
                                () => {
                                    var canAdd = true;
                                    steps.forEach(element => {
                                        if (!element.disabled) {
                                            canAdd = false;
                                        }
                                    });
                                    if (canAdd) {
                                        setSteps(
                                            steps.concat([
                                                {
                                                    stepKey: makeKey(5),
                                                    disabled: true,
                                                    step: '',
                                                    tmpValue: '',
                                                }])
                                        )
                                    }
                                    else {
                                        setAlertDialogState({ text: alertWhenAddStep, open: true });
                                    }

                                }}><AddCircleOutlineTwoToneIcon /></Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary">Save</Button>
                        </Grid>
                        <Grid item xs={12}>
                            <AlertDialog alertDialogState={alertDialogState}
                                onClose={() => {
                                    setAlertDialogState({ text: "Something went wrong!", open: false })
                                }} />
                        </Grid>
                    </Grid>
                </form>

            </div>
        </Paper >
    );
}