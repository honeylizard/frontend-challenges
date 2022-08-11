import React, { useContext, useEffect, useState } from "react";

import { GlobalContext } from "../../../GlobalStateProvider";

import appStyles from "../../../styles/calculator-app/app.module.scss";

const OutputScreen = () => {
    const { calculatorApp: globalData } = useContext(GlobalContext);
    const currentOutput = globalData.output;
    const currentError = globalData.error;
    const currentFormula = globalData.formula;

    const [inputButtonIds, setInputButtonIds] = useState([]);

    const TOTAL_NUMBERS = 10;
    const TOTAL_ACTIONS = 2;
    const TOTAL_OPERATORS = 4;
    const TOTAL_KEYS = TOTAL_NUMBERS + TOTAL_ACTIONS + TOTAL_OPERATORS;

    useEffect(() => {
        const inputIds = ["keypad-btn-reset", "keypad-btn-calculate"];
        for (let index = 0; index < TOTAL_KEYS; index++) {
            inputIds.push(`keypad-btn-${index}`);
        }
        setInputButtonIds(inputIds);
    }, [TOTAL_KEYS]);

    // TODO: format the numbers even when it is a wip

    return (
        <React.Fragment>
            <output
                className={appStyles.output}
                htmlFor={inputButtonIds.join(" ")}
            >
                {currentOutput}
            </output>
            <div className={appStyles.formula}>{currentFormula}</div>
            {currentError ? (
                <div className={appStyles.error}>{currentError}</div>
            ) : null}
        </React.Fragment>
    );
};

export default OutputScreen;
