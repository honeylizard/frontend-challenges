import React from "react";
import PropTypes from "prop-types";

import appStyles from "../../../styles/calculator-app/app.module.scss";

const NumberButton = ({ value = "" }) => {
    const handleClick = () => {
        console.log("Number Button Clicked!", value);
    };

    return (
        <button className={appStyles.button} onClick={() => handleClick()}>
            {value}
        </button>
    );
};

NumberButton.propTypes = {
    value: PropTypes.number,
};

export default NumberButton;
