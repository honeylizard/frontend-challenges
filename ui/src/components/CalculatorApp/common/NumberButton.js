import React, { useContext } from "react";
import PropTypes from "prop-types";

import { GlobalContext } from "../../../GlobalStateProvider";

import appStyles from "../../../styles/calculator-app/app.module.scss";

const NumberButton = ({ value = "", ...attr }) => {
    const { updateCalcData, calculatorApp: globalData } = useContext(GlobalContext);

    const handleClick = () => {
        const oldValue = globalData.output || "";
        updateCalcData({
            output: oldValue + value.toString(),
            error: null,
        });
    };

    return (
        <button className={appStyles.button} onClick={() => handleClick()} {...attr}>
            {value}
        </button>
    );
};

NumberButton.propTypes = {
    value: PropTypes.number,
};

export default NumberButton;
