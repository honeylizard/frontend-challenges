import React from "react";
import PropTypes from "prop-types";

import formFieldStyles from "@styles/multi-step-form/form.module.scss";

const FormInputSwitchOption = ({ label, className, isSelected = false, ...attr }) => {
    const classes = [formFieldStyles.switchToggleLabel, className];
    if (isSelected) {
        classes.push(formFieldStyles.switchToggleLabelSelected);
    }
    return (
        <span className={classes.join(" ")} aria-hidden={!isSelected} {...attr}>
            {label}
        </span>
    );
};

FormInputSwitchOption.propTypes = {
    label: PropTypes.string,
    className: PropTypes.string,
    isSelected: PropTypes.bool,
};

export default FormInputSwitchOption;
