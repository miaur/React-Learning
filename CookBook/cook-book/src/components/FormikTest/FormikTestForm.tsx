import { Button, createStyles, makeStyles, Paper, TextField, Theme } from '@material-ui/core';
import { Field, Formik } from 'formik';

import React, { useRef } from 'react'
import * as Yup from 'yup'


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
        singleTextfield: {
            width: "83%",
        },
    }),
);

const validationSchema = Yup.object().shape({
    title: Yup.string()
        .min(4, 'Too Short!')
        .max(15, 'Too Long!')
        .required('Required'),
});

export default function FormikTestForm() {
    const valueRefForTitle = useRef<HTMLInputElement>();
    const classes = useStyles();
    const values = { title: "" };
    return (
        <Paper className={classes.mainPaper} >
            <Formik
                onSubmit={() => { console.log("===OnSubmit==="); }}
                initialValues={values}
                validationSchema={validationSchema}
                validateOnChange>
                <Field name={'title'}>
                    {({ field, meta }: any) => (
                        <TextField
                            className={classes.singleTextfield}
                            required
                            label="Title"
                            variant="outlined"
                            inputRef={valueRefForTitle}
                            id="outlined-required"
                            {...field} error={!!meta.error && meta.touched} />
                    )}
                </Field>
            </Formik>
            <p />
            <Button type="submit" variant="contained" color="primary">Submit</Button>
            <p />
        </Paper>

    );
}

