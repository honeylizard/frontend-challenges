import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import appStyles from "../../../styles/calculator-app/app.module.scss";
import {
    ACTION_CALCULATE,
    ACTION_DECIMAL_PERIOD,
    ACTION_DELETE,
    ACTION_RESET,
} from "../utils/common";

const ActionButton = ({ value = "" }) => {
    const [label, setLabel] = useState(null);
    const [title, setTitle] = useState(null);

    const [buttonClasses, setButtonClasses] = useState(appStyles.button);

    const handleClick = () => {
        console.log("Action Button Clicked!", value);
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
    }, [value]);

    return (
        <button
            className={buttonClasses}
            title={title}
            onClick={() => handleClick()}
        >
            {label}
        </button>
    );
};

ActionButton.propTypes = {
    value: PropTypes.string,
};

export default ActionButton;
