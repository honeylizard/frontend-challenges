import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";

import ThemeSwitcher from "./common/ThemeSwitcher";

import appStyles from "../../styles/calculator-app/app.module.scss";

const Header = ({ intl }) => {
    const appTitleLabel = intl.formatMessage({
        id: "calculatorApp.header.title",
    });
    const themeLabel = intl.formatMessage({
        id: "calculatorApp.theme",
    });

    return (
        <header className={[appStyles.wrapper, appStyles.header].join(" ")}>
            <h1 className={appStyles.appTitle}>{appTitleLabel}</h1>
            <div className={appStyles.themeSwitcherContainer}>
                <div className={appStyles.themeSwitcherLabel}>{themeLabel}</div>
                <ThemeSwitcher />
            </div>
        </header>
    );
};

Header.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(Header);
