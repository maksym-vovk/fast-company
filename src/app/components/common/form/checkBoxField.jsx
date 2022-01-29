import React from "react";
import PropTypes from "prop-types";

const CheckBoxField = ({ name, value, onChange, children, error }) => {
    const getInputClasses = () => {
        return "form-check-label " + (error ? "is-invalid" : "");
    };

    const handleChange = () => {
        onChange({ name: name, value: !value });
    };

    return (
        <div className="mb-4">
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id={name} checked={value} onChange={handleChange}/>
                <label className={getInputClasses()} htmlFor={name}>
                    {children}
                </label>
                {error && (
                    <div className="invalid-feedback">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
};

CheckBoxField.propTypes = {
    name: PropTypes.string,
    value: PropTypes.bool,
    label: PropTypes.string,
    onChange: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    error: PropTypes.string
};

export default CheckBoxField;
