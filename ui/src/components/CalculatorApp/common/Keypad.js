import React, { useEffect, useState } from "react";

import ActionButton from "./ActionButon";
import NumberButton from "./NumberButton";
import OperatorButton from "./OperatorButton";
import {
    ACTIONS,
    ACTION_DECIMAL_PERIOD,
    ACTION_DELETE,
    addAfter,
    isNumber,
    OPERATORS,
    OPERATOR_ADD,
    OPERATOR_DIVIDE,
    OPERATOR_MINUS,
    OPERATOR_MULTIPLY,
} from "../utils/common";

import appStyles from "../../../styles/calculator-app/app.module.scss";

const Keypad = () => {
    const [keypadButtonValues, setKeypadButtonValues] = useState([]);

    useEffect(() => {
        let buttonValues = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];

        buttonValues = addAfter(buttonValues, 3, ACTION_DELETE);
        buttonValues = addAfter(buttonValues, 7, OPERATOR_ADD);
        buttonValues = addAfter(buttonValues, 11, OPERATOR_MINUS);
        buttonValues = addAfter(buttonValues, 12, ACTION_DECIMAL_PERIOD);
        buttonValues.push(OPERATOR_DIVIDE);
        buttonValues.push(OPERATOR_MULTIPLY);

        setKeypadButtonValues(buttonValues);
    });

    return (
        <div className={appStyles.keypad}>
            <div className={appStyles.primaryKeypad}>
                {keypadButtonValues?.length > 0 &&
                    keypadButtonValues.map((value, index) => {
                        const itemKey = `keypad-btn-${index}`;
                        return isNumber(value) ? (
                            <NumberButton
                                id={itemKey}
                                key={itemKey}
                                value={value}
                            />
                        ) : OPERATORS.includes(value) ? (
                            <OperatorButton
                                id={itemKey}
                                key={itemKey}
                                value={value}
                            />
                        ) : ACTIONS.includes(value) ? (
                            <ActionButton
                                id={itemKey}
                                key={itemKey}
                                value={value}
                            />
                        ) : (
                            value
                        );
                    })}
            </div>
            <div className={appStyles.secondaryKeypad}>
                <ActionButton value="reset" id="keypad-btn-reset" />
                <ActionButton value="calculate" id="keypad-btn-calculate" />
            </div>
        </div>
    );
};

export default Keypad;
