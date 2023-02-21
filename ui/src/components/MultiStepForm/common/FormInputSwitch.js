import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import formFieldStyles from "../../../styles/multi-step-form/form.module.scss";
import FormInputSwitchOption from "./FormInputSwitchOption";

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
    hideLabel = true,
    classNames = [],
    ...attrs
}) => {
    const [isToggleOn, setIsToggleOn] = useState(false);

    useEffect(() => {
        if (value === valueOn && !isToggleOn) {
            setIsToggleOn(true);
        }
    }, [value, isToggleOn, valueOn]);

    const handleToggle = (event) => {
        const newValue = !isToggleOn;
        setIsToggleOn(newValue);
        onChange(event, newValue ? valueOn : valueOff);
    };

    const parentLevelClasses = [formFieldStyles.fieldWrapper, ...classNames].filter(Boolean);

    return (
        <div className={parentLevelClasses.join(" ")}>
            <label htmlFor={id} className={hideLabel ? "sr-only" : null}>
                {label}
            </label>
            <input type="hidden" id={id} name={name} value={value} />
            <button
                type="button"
                role="switch"
                aria-checked={isToggleOn}
                className={formFieldStyles.switchToggle}
                onClick={(event) => handleToggle(event)}
                title={`Change "${label}" from "${isToggleOn ? labelOn : labelOff}" to "${
                    isToggleOn ? labelOff : labelOn
                }"`}
                {...attrs}
            >
                <FormInputSwitchOption label={labelOff} className={valueOff} isSelected={!isToggleOn} />
                <svg xmlns="http://www.w3.org/2000/svg" height="20" width="38">
                    <rect className={formFieldStyles.container} x="1" y="1" width="34" height="18" rx="10"></rect>
                    {isToggleOn ? (
                        <circle
                            className={[formFieldStyles.circle, formFieldStyles.on].join(" ")}
                            cx="26"
                            cy="10"
                            r="6"
                        />
                    ) : (
                        <circle
                            className={[formFieldStyles.circle, formFieldStyles.off].join(" ")}
                            cx="11"
                            cy="10"
                            r="6"
                        />
                    )}
                </svg>
                <FormInputSwitchOption label={labelOn} className={valueOn} isSelected={isToggleOn} />
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
    hideLabel: PropTypes.bool,
    classNames: PropTypes.arrayOf(PropTypes.string),
};

export default FormInputSwitch;
