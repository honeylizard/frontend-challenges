import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

import { GlobalContext } from "../../../GlobalStateProvider";
import {
    OPERATOR_ADD,
    OPERATOR_MINUS,
    OPERATOR_MULTIPLY,
    OPERATOR_DIVIDE,
} from "../utils/common";

import appStyles from "../../../styles/calculator-app/app.module.scss";

const OperatorButton = ({ value = "", ...attr }) => {
    const { updateCalcData, calculatorApp: globalData } =
        useContext(GlobalContext);

    const [label, setLabel] = useState(null);
    const [title, setTitle] = useState(null);

    const addOperatorToFormula = (operatorValue) => {
        const oldOutputValue = globalData.output || "";
        const oldFormulaValue = globalData.formula || "";
        const newValue = oldFormulaValue + oldOutputValue + operatorValue;

        updateCalcData({
            output: "", // Clear the current value
            formula: newValue,
            error: null,
        });
    };

    const handleClick = () => {
        if (value === OPERATOR_ADD) {
            addOperatorToFormula(" + ");
        } else if (value === OPERATOR_MINUS) {
            addOperatorToFormula(" - ");
        } else if (value === OPERATOR_DIVIDE) {
            addOperatorToFormula(" / ");
        } else if (value === OPERATOR_MULTIPLY) {
            addOperatorToFormula(" * ");
        }
    };

    useEffect(() => {
        const labelMap = {
            [OPERATOR_ADD]: "+",
            [OPERATOR_MINUS]: "-",
            [OPERATOR_DIVIDE]: "/",
            [OPERATOR_MULTIPLY]: "x",
        };

        setLabel(labelMap[value] || value);

        const titleMap = {
            [OPERATOR_ADD]: "Add",
            [OPERATOR_MINUS]: "Minus",
            [OPERATOR_DIVIDE]: "Divide",
            [OPERATOR_MULTIPLY]: "Multiply",
        };

        setTitle(titleMap[value]);
    }, [value]);

    return (
        <button
            className={appStyles.button}
            title={title}
            onClick={() => handleClick()}
            {...attr}
        >
            {label}
        </button>
    );
};

OperatorButton.propTypes = {
    value: PropTypes.string,
};

export default OperatorButton;
