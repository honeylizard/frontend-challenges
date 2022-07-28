import React, { useContext } from "react";
import lodash from "lodash";
import { GlobalContext } from "../../../GlobalStateProvider";
import {
    THEMES,
    THEME_DARK,
    THEME_HIGH_CONTRAST,
    THEME_LIGHT,
} from "../utils/common";

import appStyles from "../../../styles/calculator-app/app.module.scss";

const ThemeSwitcher = () => {
    const {
        updateCalcData,
        calculatorApp: { theme: currentTheme },
    } = useContext(GlobalContext);

    const data = [
        {
            order: 1,
            label: "dark",
            code: THEME_DARK,
        },
        {
            order: 2,
            label: "light",
            code: THEME_LIGHT,
        },
        {
            order: 3,
            label: "high contrast",
            code: THEME_HIGH_CONTRAST,
        },
    ];

    const changeTheme = (newTheme) => {
        if (THEMES.includes(newTheme)) {
            updateCalcData({
                theme: newTheme,
            });
        }
    };

    const sortedThemeData = lodash.orderBy(data, ["order"], ["asc"]);

    console.log("currentTheme", currentTheme);

    return (
        <div>
            <div className={appStyles.switcherHeader}>
                {sortedThemeData.map((item, index) => (
                    <div key={`theme-switch-label-${index}`}>{index + 1}</div>
                ))}
            </div>
            <div className={appStyles.threeWayToggle}>
                {sortedThemeData.map((item, index) => (
                    <button
                        key={`theme-switch-button-${index}`}
                        className={
                            currentTheme === item.code ||
                            (currentTheme === null && item.code === THEME_DARK)
                                ? appStyles.currentTheme
                                : null
                        }
                        onClick={() => changeTheme(item.code)}
                    >
                        <span className="sr-only">{item.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ThemeSwitcher;
