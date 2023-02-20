import React, { useContext, useEffect, useState } from "react";
import lodash from "lodash";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";

import { GlobalContext } from "../../../GlobalStateProvider";
import { THEMES, THEME_DARK } from "../utils/common";
import data from "../../../assets/calculator-app/data.json";

import appStyles from "../../../styles/calculator-app/app.module.scss";

const ThemeSwitcher = ({ intl }) => {
    const defaultTheme = THEME_DARK;
    const [isInitialized, setIsInitialized] = useState(false);
    const {
        updateCalcData,
        calculatorApp: { theme: currentTheme },
    } = useContext(GlobalContext);

    useEffect(() => {
        if (!isInitialized) {
            const storedTheme = localStorage.getItem("calculatorTheme");
            const initialTheme = storedTheme && THEMES.includes(storedTheme) ? storedTheme : defaultTheme;
            setIsInitialized(true);
            updateCalcData({
                theme: initialTheme,
            });
        }
    }, [updateCalcData, isInitialized, defaultTheme]);

    const changeTheme = (newTheme) => {
        if (THEMES.includes(newTheme)) {
            updateCalcData({
                theme: newTheme,
            });
        }
    };

    const sortedThemeData = lodash.orderBy(data.themes, ["order"], ["asc"]);

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
                            currentTheme === item.code || (currentTheme === null && item.code === THEME_DARK)
                                ? appStyles.currentTheme
                                : null
                        }
                        onClick={() => changeTheme(item.code)}
                    >
                        <span className="sr-only">{intl.formatMessage({ id: item.labelKey })}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

ThemeSwitcher.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(ThemeSwitcher);
