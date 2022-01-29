import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import CheckBoxField from "../common/form/checkBoxField";
// import * as yup from "yup";

const LoginForm = () => {
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");

    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    });
    const [errors, setErrors] = useState({});

    // const validateScheme = yup.object().shape({
    //     password: yup.string()
    //         .required("Password is required")
    //         .matches(/^(?=.*[A-Z])/, "Password doesn't have capital letters")
    //         .matches(/^(?=.*[0-9])/, "Password doesn't have digit")
    //         .matches(/^(?=.*[!@#$%^&*])/, "Password must include symbols")
    //         .matches(/^(?=.{8,})/, "Password must contains max 8 symbols"),
    //     email: yup.string().required("Email is required").email("Incorrect email")
    // });

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Email is required"
            },

            isEmail: {
                message: "Incorrect email"
            }
        },
        password: {
            isRequired: {
                message: "Password is required"
            },
            isCapitalSymbol: {
                message: "Password doesn't have capital letters"
            },
            isContainDigit: {
                message: "Password doesn't have digit"
            },
            min: {
                message: "Password must contains max 8 symbols",
                value: 8
            }
        }
    };

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);

        // validateScheme.validate(data).then(() => setErrors({})).catch((err) => setErrors({ [err.path]: err.message }));

        setErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const handleChange = (target) => {
        setData((prevState) => {
            return {
                ...prevState,
                [target.name]: target.value
            };
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Email"
                onChange={handleChange}
                name="email"
                value={data.email}
                error={errors.email}
            />
            <TextField
                label="Password"
                type="password"
                onChange={handleChange}
                name="password"
                value={data.password}
                error={errors.password}
            />

            <CheckBoxField
                value={data.stayOn}
                name="stayOn"
                onChange={handleChange}
            >
                Remain in the system
            </CheckBoxField>

            <button
                className="btn btn-primary w-100 mx-auto"
                type="submit"
                disabled={!isValid}
            >
                Submit
            </button>
        </form>
    );
};

export default LoginForm;
