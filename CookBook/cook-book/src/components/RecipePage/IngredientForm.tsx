import { Button, createStyles, FormControl, Grid, InputLabel, ListItem, makeStyles, MenuItem, Select, TextField, Theme } from '@material-ui/core';
import React, { useState } from 'react'
import { IngredientModel, IngredientType } from '../../models/IngredientModel';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';

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
    }),
);

function mapIngredientsTypes() {
    const values = Object.values(IngredientType).filter(x => typeof x === 'string');
    let ret = [<MenuItem key={""} value=""><em></em></MenuItem>];
    for (let i = 0; i < values.length; i++) {
        ret.push(
            <MenuItem key={values[i].toString()} value={values[i].toString()}><em>{values[i].toString()}</em></MenuItem>
        );
    }
    return (ret);
}

interface Props {
    ingrKey: string,
    disabled: boolean;
    ingr: IngredientModel;
    onSaveClick: (ingr: IngredientModel) => void;
    onDeleteClick: (ingrKey: string) => void;
    onDisabled?: (disabledValue: boolean) => void;
}

export default function IngredientForm(props: Props) {
    const { onDeleteClick, onSaveClick } = props;
    const [isDisabled, setIsDisabled] = useState(true);
    const [name, setName] = useState(props.ingr.name);
    const [quantity, setQuantity] = useState(props.ingr.quantity);
    const [type, setType] = useState(props.ingr.type);

    const classes = useStyles();
    var editDoneButtonIcon = isDisabled ? <EditIcon /> : <DoneIcon />;
    var deleteCloseButtonIcon = isDisabled ? <DeleteIcon /> : <CloseIcon />;
    return (
        <ListItem key={props.ingrKey}>
            <Grid container spacing={2} justify="center" alignItems="center">
                <Grid item xs>
                    <TextField required className={classes.singleTextfield}
                        id="outlined-required"
                        label="Name"
                        variant="outlined"
                        disabled={isDisabled}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Grid>
                <Grid item xs>
                    <TextField required className={classes.singleTextfield}
                        id="outlined-required"
                        label="Count"
                        variant="outlined"
                        disabled={isDisabled}
                        onChange={(e) => setQuantity(e.target.value)}
                        value={quantity}
                    />
                </Grid>
                <Grid item xs>
                    <FormControl variant="outlined" className={classes.formControl} required>
                        <InputLabel id="demo-simple-select-outlined-label">Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            label="Type"
                            disabled={isDisabled}
                            onChange={(e) => setType(e.target.value as string)}
                            value={type}
                        >
                            {mapIngredientsTypes()}
                        </Select>
                    </FormControl>
                </Grid>
                {/* Edit - save button */}
                <Grid item xs={1}><Button onClick={() => {
                    setIsDisabled(!isDisabled);
                    if (!isDisabled) {
                        onSaveClick?.({ name: name, quantity: quantity, type: type });
                    }
                    props.onDisabled?.(!isDisabled);
                }}>
                    {editDoneButtonIcon}
                </Button></Grid>
                {/* Delete - cancel button */}
                <Grid item xs={1}><Button onClick={() => {

                    if (isDisabled) {
                        //=== Delete item from list:
                        onDeleteClick?.(props.ingrKey);
                    }
                    else {
                        //=== Cancel editing ingridient:
                        setIsDisabled(!isDisabled);
                        setName(props.ingr.name);
                        setQuantity(props.ingr.quantity);
                        setType(props.ingr.type);
                        props.onDisabled?.(!isDisabled);
                    }
                }}>
                    {deleteCloseButtonIcon}</Button></Grid>
            </Grid>
        </ListItem>
    );
}