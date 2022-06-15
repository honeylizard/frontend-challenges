import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { create as mathEngineGenerator, all } from "mathjs";

import { GlobalContext } from "../../../GlobalStateProvider";
import {
    ACTION_CALCULATE,
    ACTION_DECIMAL_PERIOD,
    ACTION_DELETE,
    ACTION_RESET,
} from "../utils/common";

import appStyles from "../../../styles/calculator-app/app.module.scss";

const ActionButton = ({ value = "", ...attr }) => {
    const { updateCalcData, calculatorApp: globalData } =
        useContext(GlobalContext);

    const [mathEngine, setMathEngine] = useState(null);
    const [label, setLabel] = useState(null);
    const [title, setTitle] = useState(null);

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
                console.error("error", "You already have a decimal");
                updateCalcData({
                    error: "You already have a decimal",
                });
            }
        } else if (value === ACTION_DELETE) {
            const oldValue = globalData.output || "";
            const newValue =
                oldValue.length > 0 ? oldValue.slice(0, -1) : oldValue;
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
                const results = mathEngine.evaluate(
                    globalData.formula + globalData.output
                );
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
        const labelMap = {
            [ACTION_DELETE]: "del",
            [ACTION_DECIMAL_PERIOD]: ".",
            [ACTION_RESET]: "Reset",
            [ACTION_CALCULATE]: "=",
        };
        setLabel(labelMap[value] || value);

        const titleMap = {
            [ACTION_DELETE]: "Delete",
            [ACTION_DECIMAL_PERIOD]: "Period",
            [ACTION_RESET]: "Reset",
            [ACTION_CALCULATE]: "Calculate",
        };

        setTitle(titleMap[value]);

        if ([ACTION_DELETE, ACTION_RESET].includes(value)) {
            setButtonClasses(appStyles.buttonSecondary);
        }

        if ([ACTION_CALCULATE].includes(value)) {
            setButtonClasses(appStyles.buttonPrimary);
        }

        const mathEngineConfig = {};
        setMathEngine(mathEngineGenerator(all, mathEngineConfig));
    }, [value]);

    return (
        <button
            className={buttonClasses}
            title={title}
            onClick={() => handleClick()}
            {...attr}
        >
            {label}
        </button>
    );
};

ActionButton.propTypes = {
    value: PropTypes.string,
};

export default ActionButton;
