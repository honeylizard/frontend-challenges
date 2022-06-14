import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";

import { GlobalContext } from "../../GlobalStateProvider";
import ActionButton from "./common/ActionButon";
import NumberButton from "./common/NumberButton";
import OperatorButton from "./common/OperatorButton";

import appStyles from "../../styles/calculator-app/app.module.scss";

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
    THEME_DARK,
    THEME_HIGH_CONTRAST,
    THEME_LIGHT,
} from "./utils/common";
import Footer from "./Footer";
import Header from "./Header";

const CalculatorApp = () => {
    const { calculatorApp: globalData } = useContext(GlobalContext);
    const currentTheme = globalData.theme;
    const [currentThemeClasses, setCurrentThemeClasses] = useState("");
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

    useEffect(() => {
        const getThemeContainerClass = (theme) => {
            let themeClass = appStyles.solutionContainerDark;
            if (theme === THEME_LIGHT) {
                themeClass = appStyles.solutionContainerLight;
            } else if (theme === THEME_DARK) {
                themeClass = appStyles.solutionContainerDark;
            } else if (theme === THEME_HIGH_CONTRAST) {
                themeClass = appStyles.solutionContainerHighContrast;
            }
            return themeClass;
        };
        const newClasses = [
            appStyles.solutionContainer,
            getThemeContainerClass(currentTheme),
        ]
            .filter(Boolean)
            .join(" ");

        if (newClasses !== currentThemeClasses) {
            setCurrentThemeClasses(newClasses);
        }
    }, [currentTheme]);

    return (
        <React.Fragment>
            <Helmet>
                <body className={currentThemeClasses} />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@400;700&display=swap"
                />
            </Helmet>
            <Header />
            <main id="content" className={appStyles.wrapper}>
                <output className={appStyles.output}>123,456,789</output>
                <div className={appStyles.keypad}>
                    <div className={appStyles.primaryKeypad}>
                        {keypadButtonValues?.length > 0 &&
                            keypadButtonValues.map((value, index) => {
                                const itemKey = `keypad-btn-${index}`;
                                return isNumber(value) ? (
                                    <NumberButton key={itemKey} value={value} />
                                ) : OPERATORS.includes(value) ? (
                                    <OperatorButton
                                        key={itemKey}
                                        value={value}
                                    />
                                ) : ACTIONS.includes(value) ? (
                                    <ActionButton key={itemKey} value={value} />
                                ) : (
                                    value
                                );
                            })}
                    </div>
                    <div className={appStyles.secondaryKeypad}>
                        <ActionButton value="reset" />
                        <ActionButton value="calculate" />
                    </div>
                </div>
            </main>
            <Footer />
        </React.Fragment>
    );
};

export default CalculatorApp;
