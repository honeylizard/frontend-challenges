import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import appLogo from "../../assets/weather-app/logo.svg";
import unitsIcon from "../../assets/weather-app/icon-units.svg";

import appStyles from "../../styles/weather-app/app.module.scss";

const Header = ({ intl }) => {
    const skipToContentLabel = intl.formatMessage({ id: "app.skipToContent" });
    const appTitleLabel = intl.formatMessage({
        id: "weatherApp.header.title",
    });
    const unitsLabel = intl.formatMessage({
        id: "weatherApp.header.units",
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
                <img src={unitsIcon} alt="" role="presentation" />
                <span>{unitsLabel}</span>

                {/*
                Switch to Imperial/Metric

                Temperature

                Celsius (°C)
                Fahrenheit (°F)

                Wind Speed

                km/h
                mph

                Precipitation

                Millimeters (mm)
                Inches (in)
                */}
            </div>
        </header>
    );
};

Header.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(Header);
