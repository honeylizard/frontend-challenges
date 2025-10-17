import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";

import { GlobalContext } from "../../../GlobalStateProvider";
import { OPERATOR_ADD, OPERATOR_MINUS, OPERATOR_MULTIPLY, OPERATOR_DIVIDE } from "../utils/common";
import data from "../../../assets/calculator-app/data.json";

import appStyles from "../../../styles/calculator-app/app.module.scss";

const OperatorButton = ({ intl, value = "", ...attr }) => {
    const { updateCalcData, calculatorApp: globalData } = useContext(GlobalContext);

    const [label, setLabel] = useState(null);
    const [title, setTitle] = useState(null);
    const [currentValue, setCurrentValue] = useState(null);

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
        if (value !== currentValue) {
            const labelMap = {};
            const titleMap = {};
            data.operators.forEach((item) => {
                labelMap[item.code] = item.symbol;
                titleMap[item.code] = intl.formatMessage({ id: item.labelKey });
            });

            setLabel(labelMap[value] || value);
            setTitle(titleMap[value]);
            setCurrentValue(value);
        }
    }, [value, intl, currentValue]);

    return (
        <button className={appStyles.button} title={title} onClick={() => handleClick()} {...attr}>
            {label}
        </button>
    );
};

OperatorButton.propTypes = {
    intl: PropTypes.object.isRequired,
    value: PropTypes.string,
};

export default injectIntl(OperatorButton);
