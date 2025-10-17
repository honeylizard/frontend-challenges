import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import appLogo from "@resources/weather-app/logo.svg";

import appStyles from "@styles/weather-app/app.module.scss";
import UnitsSelector from "@components/WeatherApp/common/UnitsSelector";

const Header = ({ intl }) => {
    const skipToContentLabel = intl.formatMessage({ id: "app.skipToContent" });
    const appTitleLabel = intl.formatMessage({
        id: "weatherApp.header.title",
    });

    return (
        <header className={[appStyles.wrapper, appStyles.header].join(" ")}>
            <a
                className="sr-only sr-focusable"
                href="/frontend-challenges#/frontend-challenges/weather-app#content"
                title={skipToContentLabel}
            >
                {skipToContentLabel}
            </a>
            <h1 className={appStyles.appTitle}>
                <img src={appLogo} alt={appTitleLabel} className={appStyles.headerLogo} />
            </h1>
            <div className={appStyles.uomSwitcherContainer}>
                <UnitsSelector />
            </div>
        </header>
    );
};

Header.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(Header);
