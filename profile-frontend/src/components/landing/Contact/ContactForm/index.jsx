import React from 'react';
import axios from 'axios';
import { Formik, Form, FastField, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Input } from 'components/common';
import { Error, Center, InputField, Wrapper } from './styles';

export default () => (
    <Wrapper>
        <h2>Contact</h2>
        <Formik
            initialValues={{
                name: '',
                email: '',
                message: '',
                success: false,
            }}
            validationSchema={Yup.object().shape({
                name: Yup.string().required('Full name field is required'),
                email: Yup.string().email("Invalid email").required("Email field is required"),
                message: Yup.string().required('Message field is required'),
            })}
            onSubmit={async ({ name, email, message }, { setSubmitting, resetForm, setFieldValue }) => {
                try {
                    await axios({
                        method: 'POST',
                        url: `${process.env.BACKEND_URL}`,
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        data: JSON.stringify({
                            name,
                            email,
                            message,
                        }),
                    });
                    setSubmitting(false);
                    setFieldValue('success', true);
                    setTimeout(() => resetForm(), 6000);
                } catch (err) {
                    setSubmitting(false);
                    setFieldValue('success', false);
                    alert("Something went wrong, please try again!"); // eslint-disable-line
                }
            }}
        >
            {({ values, touched, errors, setFieldValue, isSubmitting }) => (
                <Form>
                    <InputField>
                        <Input
                            as={FastField}
                            type="text"
                            name="name"
                            component="input"
                            aria-label="name"
                            placeholder="Full name*"
                            error={touched.name && errors.name}
                        />
                        <ErrorMessage component={Error} name="name" />
                    </InputField>
                    <InputField>
                        <Input
                            id="email"
                            aria-label="email"
                            component="input"
                            as={FastField}
                            type="email"
                            name="email"
                            placeholder="Email*"
                            error={touched.email && errors.email}
                        />
                        <ErrorMessage component={Error} name="email" />
                    </InputField>
                    <InputField>
                        <Input
                            as={FastField}
                            component="textarea"
                            aria-label="message"
                            id="message"
                            rows="8"
                            type="text"
                            name="message"
                            placeholder="Message*"
                            error={touched.message && errors.message}
                        />
                        <ErrorMessage component={Error} name="message" />
                    </InputField>
                    {values.success && (
                        <InputField>
                            <Center>
                                <h4>Your message has been successfully sent, I will get back to you ASAP!</h4>
                            </Center>
                        </InputField>
                    )}
                    <Center>
                        <Button secondary type="submit" disabled={isSubmitting} className="submit-btn">
                            Submit
            </Button>
                    </Center>
                </Form>
            )}
        </Formik>
    </Wrapper>
);
