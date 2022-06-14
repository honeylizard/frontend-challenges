import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import appStyles from "../../../styles/calculator-app/app.module.scss";
import {
    OPERATOR_ADD,
    OPERATOR_MINUS,
    OPERATOR_MULTIPLY,
    OPERATOR_DIVIDE,
} from "../utils/common";

const OperatorButton = ({ value = "" }) => {
    const [label, setLabel] = useState(null);
    const [title, setTitle] = useState(null);

    const handleClick = () => {
        console.log("Operator Button Clicked!", value);
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
        >
            {label}
        </button>
    );
};

OperatorButton.propTypes = {
    value: PropTypes.string,
};

export default OperatorButton;
