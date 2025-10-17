import React from "react";
import PropTypes from "prop-types";
import buttonStyles from "@styles/bookmark-landing-page/button.module.scss";

const Button = ({ label, children, rank, customClasses = [], ...attrs }) => {
    const classes = [
        buttonStyles.button,
        rank === "primary" ? buttonStyles.buttonPrimary : null,
        rank === "secondary" ? buttonStyles.buttonSecondary : null,
        rank === "tertiary" ? buttonStyles.buttonTertiary : null,
        ...customClasses,
    ].filter(Boolean);

    return (
        <button className={classes.join(" ")} {...attrs}>
            {children}
        </button>
    );
};

Button.propTypes = {
    label: PropTypes.string,
    children: PropTypes.node,
    rank: PropTypes.string,
    customClasses: PropTypes.array,
};

export default Button;
