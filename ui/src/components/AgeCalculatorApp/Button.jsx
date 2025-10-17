import React from "react";
import PropTypes from "prop-types";
import buttonStyles from "../../../styles/age-calculator-app/button.module.scss";

const Button = ({ label, children, customClasses = [], ...attrs }) => {
    const classes = [buttonStyles.button, ...customClasses];

    return (
        <button className={classes.join(" ")} {...attrs}>
            {children}
        </button>
    );
};

Button.propTypes = {
    label: PropTypes.string,
    children: PropTypes.node,
    customClasses: PropTypes.array,
};

export default Button;
