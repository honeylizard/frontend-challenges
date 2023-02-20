import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { create as mathEngineGenerator, all } from "mathjs";
import { injectIntl } from "react-intl";

import { GlobalContext } from "../../../GlobalStateProvider";
import { ACTION_CALCULATE, ACTION_DECIMAL_PERIOD, ACTION_DELETE, ACTION_RESET } from "../utils/common";
import data from "../../../assets/calculator-app/data.json";

import appStyles from "../../../styles/calculator-app/app.module.scss";

const ActionButton = ({ intl, value = "", ...attr }) => {
    const { updateCalcData, calculatorApp: globalData } = useContext(GlobalContext);

    const [mathEngine, setMathEngine] = useState(null);
    const [label, setLabel] = useState(null);
    const [title, setTitle] = useState(null);
    const [currentValue, setCurrentValue] = useState(null);

    const [buttonClasses, setButtonClasses] = useState(appStyles.button);

    const handleClick = () => {
        if (value === ACTION_DECIMAL_PERIOD) {
            if (!globalData.output.includes(".")) {
                const oldValue = globalData.output || "";
                const newValue = oldValue + ".";
                updateCalcData({
                    output: newValue,
                    error: null,
                });
            } else {
                const errorMessage = intl.formatMessage({
                    id: "calculatorApp.error.alreadyDecimal",
                });
                console.error("error", errorMessage);
                updateCalcData({
                    error: errorMessage,
                });
            }
        } else if (value === ACTION_DELETE) {
            const oldValue = globalData.output || "";
            const newValue = oldValue.length > 0 ? oldValue.slice(0, -1) : oldValue;
            updateCalcData({
                output: newValue,
                error: null,
            });
        } else if (value === ACTION_RESET) {
            updateCalcData({
                output: "",
                formula: "",
                error: null,
            });
        } else if (value === ACTION_CALCULATE) {
            try {
                const results = mathEngine.evaluate(globalData.formula + globalData.output);
                updateCalcData({
                    output: results.toString(),
                    formula: "",
                    error: null,
                });
            } catch (error) {
                console.error("error", error);
                updateCalcData({
                    error: error.name + " - " + error.message,
                });
            }
        }
    };

    useEffect(() => {
        const mathEngineConfig = {};
        setMathEngine(mathEngineGenerator(all, mathEngineConfig));
    }, []);

    useEffect(() => {
        if (value !== currentValue) {
            const labelMap = {};
            const titleMap = {};
            data.actions.forEach((item) => {
                labelMap[item.code] = item.symbol || intl.formatMessage({ id: item.symbolKey });
                titleMap[item.code] = intl.formatMessage({ id: item.labelKey });
            });

            setLabel(labelMap[value] || value);
            setTitle(titleMap[value]);

            if ([ACTION_DELETE, ACTION_RESET].includes(value)) {
                setButtonClasses(appStyles.buttonSecondary);
            }

            if ([ACTION_CALCULATE].includes(value)) {
                setButtonClasses(appStyles.buttonPrimary);
            }
            setCurrentValue(value);
        }
    }, [value, intl, currentValue]);

    return (
        <button className={buttonClasses} title={title} onClick={() => handleClick()} {...attr}>
            {label}
        </button>
    );
};

ActionButton.propTypes = {
    intl: PropTypes.object.isRequired,
    value: PropTypes.string,
};

export default injectIntl(ActionButton);
