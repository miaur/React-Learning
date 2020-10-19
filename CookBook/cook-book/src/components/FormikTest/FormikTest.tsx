import React from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik';
import FormikTestForm from './FormikTestForm';

const validationSchema = Yup.object().shape({
    title: Yup.string()
        .min(4, 'Too Short!')
        .max(15, 'Too Long!')
        .required('Required'),
});

export default function FormikTest() {
    const values = { title: "" };
    return (
        <Formik
            onSubmit={()=> {console.log("===OnSubmit===");}}
            initialValues={values}
            validationSchema={validationSchema}
            render={FormikTestForm}
            validateOnChange />
            
    );
}