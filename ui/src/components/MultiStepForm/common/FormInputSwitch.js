import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import formFieldStyles from "../../../styles/multi-step-form/form.module.scss";

const FormInputSwitch = ({
    id,
    name,
    label,
    value,
    labelOn = "On",
    valueOn = "true",
    labelOff = "Off",
    valueOff = "false",
    onChange,
}) => {
    const [isToggleOn, setIsToggleOn] = useState(false);

    useEffect(() => {
        if (value === valueOn && !isToggleOn) {
            setIsToggleOn(true);
        }
    }, [value]);

    // TODO: convert to components and add a aria-describedby to link to button?
    const renderOption = (label, className) => (
        <span className={className} aria-hidden="true">
            {label}
        </span>
    );

    const handleToggle = (event) => {
        const newValue = !isToggleOn;
        setIsToggleOn(newValue);
        onChange(event, newValue ? valueOn : valueOff);
    };

    return (
        <div className={formFieldStyles.fieldWrapper}>
            <label htmlFor={id}>{label}</label>
            <input type="hidden" id={id} name={name} value={value} />
            <button
                type="button"
                role="switch"
                aria-checked={isToggleOn}
                className={formFieldStyles.switchToggle}
                onClick={(event) => handleToggle(event)}
            >
                {renderOption(labelOff, valueOff)}
                <svg xmlns="http://www.w3.org/2000/svg" height="20" width="36">
                    <rect
                        className="container"
                        x="1"
                        y="1"
                        width="34"
                        height="18"
                        rx="4"
                    ></rect>
                    {isToggleOn ? (
                        <rect
                            className="on"
                            x="20"
                            y="4"
                            width="12"
                            height="12"
                            rx="4"
                        ></rect>
                    ) : (
                        <rect
                            className="off"
                            x="4"
                            y="4"
                            width="12"
                            height="12"
                            rx="4"
                        ></rect>
                    )}
                </svg>
                {renderOption(labelOn, valueOn)}
            </button>
        </div>
    );
};

FormInputSwitch.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    labelOn: PropTypes.string,
    labelOff: PropTypes.string,
    valueOn: PropTypes.string,
    valueOff: PropTypes.string,
    onChange: PropTypes.func,
};

export default FormInputSwitch;
