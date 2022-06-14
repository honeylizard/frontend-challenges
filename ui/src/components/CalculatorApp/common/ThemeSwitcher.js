import React, { useContext } from "react";
import { GlobalContext } from "../../../GlobalStateProvider";
import {
    THEMES,
    THEME_DARK,
    THEME_HIGH_CONTRAST,
    THEME_LIGHT,
} from "../utils/common";

import appStyles from "../../../styles/calculator-app/app.module.scss";

const ThemeSwitcher = () => {
    const { updateCalcData } = useContext(GlobalContext);

    const changeTheme = (newTheme) => {
        if (THEMES.includes(newTheme)) {
            updateCalcData({
                theme: newTheme,
            });
        }
    };

    return (
        <React.Fragment>
            <button onClick={() => changeTheme(THEME_LIGHT)}>light</button>
            <button onClick={() => changeTheme(THEME_DARK)}>dark</button>
            <button onClick={() => changeTheme(THEME_HIGH_CONTRAST)}>
                high contrast
            </button>
        </React.Fragment>
    );
};

export default ThemeSwitcher;
