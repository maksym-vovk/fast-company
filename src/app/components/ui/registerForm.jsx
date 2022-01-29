import React, { useState, useEffect } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import api from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";

const RegisterForm = () => {
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");

    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: [],
        licence: false
    });
    const [errors, setErrors] = useState({});
    const [professions, setProfessions] = useState([]);
    const [qualities, setQualities] = useState({});

    useEffect(() => {
        api.professions.fetchAll().then(data => setProfessions(data));
        api.qualities.fetchAll().then(data => setQualities(data));
    }, []);

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
        },
        profession: {
            isRequired: {
                message: "Choose your profession"
            }
        },
        licence: {
            isRequired: {
                message: "You must confirm our agreement"
            }
        }
    };

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);

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

            <SelectField
                label="Choose profession"
                value={data.profession}
                name="professions"
                onChange={handleChange}
                defaultOption="Choose.."
                options={professions}
                error={errors.profession}
            />

            <RadioField
                options={[
                    { name: "Male", value: "male" },
                    { name: "Female", value: "female" },
                    { name: "Other", value: "other" }
                ]}
                value={data.sex}
                name="sex"
                onChange={handleChange}
                label="Choose sex"
            />

            <MultiSelectField
                options={qualities}
                onChange={handleChange}
                name="qualities"
                label="Choose qualities"
                defaultValue={data.qualities}
            />

            <CheckBoxField
                value={data.licence}
                name="licence"
                onChange={handleChange}
                error={errors.licence}
            >
                Confirm <a>licence agreement</a>
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

export default RegisterForm;
