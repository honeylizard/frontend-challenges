import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";

import { GlobalContext } from "../../GlobalStateProvider";
import { THEME_DARK, THEME_HIGH_CONTRAST, THEME_LIGHT } from "./utils/common";
import Footer from "./Footer";
import Header from "./Header";
import OutputScreen from "./common/OutputScreen";
import Keypad from "./common/Keypad";

import appStyles from "../../styles/calculator-app/app.module.scss";

const CalculatorApp = () => {
    const { calculatorApp: globalData } = useContext(GlobalContext);
    const currentTheme = globalData.theme;

    const [currentThemeClasses, setCurrentThemeClasses] = useState("");

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
    }, [currentTheme, currentThemeClasses]);

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
                <OutputScreen />
                <Keypad />
            </main>
            <Footer />
        </React.Fragment>
    );
};

export default CalculatorApp;
