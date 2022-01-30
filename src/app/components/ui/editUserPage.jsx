import React, { useEffect, useState } from "react";
import api from "../../api";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import { useHistory, useParams } from "react-router-dom";

const EditUserPage = () => {
    const { userId } = useParams();
    const history = useHistory();

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({
        name: "",
        email: "",
        professions: "",
        sex: "male",
        qualities: []
    });
    const [errors, setErrors] = useState({});
    const [professions, setProfessions] = useState([]);
    const [qualities, setQualities] = useState({});

    const transformData = (data) => {
        return data.map((qual) => ({ label: qual.name, value: qual._id }));
    };

    useEffect(() => {
        setIsLoading(true);
        api.users.getById(userId).then(({ profession, qualities, ...data }) => {
            setData(prevState => ({
                ...prevState,
                ...data,
                qualities: transformData(qualities),
                profession: profession._id
            }));
        });
        api.professions.fetchAll().then(data => setProfessions(data));
        api.qualities.fetchAll().then(data => setQualities(data));
    }, []);

    useEffect(() => {
        if (data._id) setIsLoading(false);
    }, [data]);

    const validatorConfig = {
        name: {
            isRequired: {
                message: "Enter your name"
            }
        },
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

    const getProfessionById = (id) => {
        for (const prof in professions) {
            const profData = professions[prof];
            if (profData._id === id) return profData;
        }
    };

    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality]._id) {
                    qualitiesArray.push(qualities[quality]);
                }
            }
        }
        return qualitiesArray;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const { profession, qualities } = data;
        api.users
            .update(userId, {
                ...data,
                profession: getProfessionById(profession),
                qualities: getQualities(qualities)
            })
            .then((data) => history.push(`/users/${data._id}`));
    };

    return (
        <div className="container mt-5">
            <div className="row ">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {!isLoading && Object.keys(professions).length > 0
                        ? (<form onSubmit={handleSubmit}>
                            <TextField
                                label="Name"
                                onChange={handleChange}
                                name="name"
                                value={data.name}
                                error={errors.name}
                            />

                            <TextField
                                label="Email"
                                onChange={handleChange}
                                name="email"
                                value={data.email}
                                error={errors.email}
                            />

                            <SelectField
                                label="Choose profession"
                                value={data.professions}
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

                            <button
                                className="btn btn-primary w-100 mx-auto"
                                type="submit"
                                disabled={!isValid}
                                onSubmit={handleSubmit}
                            >
                                Submit
                            </button>
                        </form>)
                        : ("Loading...")
                    }
                </div>
            </div>
        </div>
    );
};

export default EditUserPage;
