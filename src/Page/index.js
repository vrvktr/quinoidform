import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import Regions from '../Components/Regions';

const SignupSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Too Short!').max(70, 'Too Long!')
        .required('Required'),
    region: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email')
        .required('Required'),
    termConditions: Yup.bool().oneOf([true], 'Accept Terms & Conditions is required')
});

const FormPage = () => {
    const [isLoading, setLoading] = useState(false);
    const [isRegions, setRegions] = useState();
    const fetchRegions = (region) => {
        setLoading(true);
        axios.get(`https://restcountries.com/v3.1/region/${region}`)
            .then(res => {
                const data = res.data;
                setRegions(data);
                setLoading(false);
            })
    }

    const handleDate = (e, setFieldValue) => {
        setFieldValue("dateOfBirth", e.target.value);
    }


    const handleDateValidation = (values) => {
        let errors = {}
        var date = new Date();
        var dd = date.getDate();
        var mm = date.getMonth();
        date.setFullYear(date.getFullYear() - 18);
        var yyyy = date.getFullYear();
        var dateMax = yyyy + '-' + mm + '-' + dd;

        if (!values.dateOfBirth) {
            errors.dateOfBirth = 'This issss required';
        } else {
            let selectedDate = new Date(values.dateOfBirth);
            let maxDate = new Date(dateMax);
            if (selectedDate > maxDate) {
                errors.dateOfBirth = 'You are not Old Enough';
            }
        }
        return errors;
    }

    return (
        <div className="row text-center">
            {!isLoading && (
                <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        dateOfBirth: '',
                        region: '',
                        termConditions: false
                    }}
                    validationSchema={SignupSchema}
                    validate={(values) => handleDateValidation(values)}
                    onSubmit={(values, { resetForm }) => {
                        fetchRegions(values.region);
                        resetForm();
                    }}
                >
                    {({ values, errors, touched, setFieldValue, handleChange }) => (
                        <Form>
                            <div className="col-12 py-2">
                                <label htmlFor="name">Name: </label>
                                <Field id="name" name="name" />
                                {errors.name && touched.name ? (
                                    <span className="required">{errors.name}</span>
                                ) : null}
                                {/* <ErrorMessage name="name" /> */}
                            </div>

                            <div className="col-12 py-2">
                                <label htmlFor="email">email:</label>
                                <Field id="email" name="email" />

                                {errors.email && touched.email ? (
                                    <span className="required">{errors.email}</span>
                                ) : null}
                                {/* <ErrorMessage name="email" /> */}
                            </div>
                            <div className="col-12 py-2">
                                <label htmlFor="email">Region:</label>
                                <select
                                    name="region"
                                    value={values.region}
                                    onChange={handleChange}
                                >
                                    <option value="" label="Select a region" />
                                    <option value="Africa" label="Africa" />
                                    <option value="Americas" label="Americas" />
                                    <option value="Asia" label="Asia" />
                                    <option value="Europe" label="Europe" />
                                    <option value="Oceania" label="Oceania" />
                                </select>
                                {errors.region && touched.region ? (
                                    <span className="required">{errors.region}</span>
                                ) : null}
                            </div>
                            <div className="col-12 py-2" >
                                <label htmlFor="email">DOB:</label>

                                <input
                                    name="dateOfBirth"
                                    type="date"
                                    onChange={(e) => handleDate(e, setFieldValue)}
                                />
                                {errors.dateOfBirth && touched.dateOfBirth ? (
                                    <span className="required">{errors.dateOfBirth}</span>
                                ) : null}
                            </div>
                            <div className="col-12 py-2">
                                <label>
                                    <Field type="checkbox" className="px-1" name="termConditions" />
                                    I agree to Terms and Conditions
                                </label>
                                {errors.termConditions && touched.termConditions ? (
                                    <p className="required">{errors.termConditions}</p>
                                ) : null}
                            </div>

                            <div className="col-12 ">
                                <button type="submit" className="btn btn-primary">Submit</button>

                            </div>
                        </Form>
                    )}
                </Formik >
            )}
            {isLoading && (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}
            {!isLoading && isRegions && (
                <Regions Regions={isRegions} />
            )}
        </div >
    )

}


export default FormPage
