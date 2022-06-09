import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import buttonStyles from "../../../styles/bookmark-landing-page/button-link.module.scss";

const ButtonLink = ({
    url,
    children,
    type = "primary",
    customClasses = [],
    ...attrs
}) => {
    const classes = [
        buttonStyles.button,
        type === "primary" ? buttonStyles.buttonPrimary : null,
        type === "secondary" ? buttonStyles.buttonSecondary : null,
        type === "tertiary" ? buttonStyles.buttonTertiary : null,
        ...customClasses,
    ].filter(Boolean);

    // TODO: finish styling button links

    return url ? (
        <Link to={url} className={classes.join(" ")} {...attrs}>
            {children}
        </Link>
    ) : (
        <div className={classes.join(" ")} {...attrs}>
            {children}
        </div>
    );
};

ButtonLink.propTypes = {
    url: PropTypes.string,
    type: PropTypes.string,
    children: PropTypes.node,
    customClasses: PropTypes.array,
};

export default ButtonLink;
