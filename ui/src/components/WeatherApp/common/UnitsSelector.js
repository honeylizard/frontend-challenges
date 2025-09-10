import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";

import unitsIcon from "../../../assets/weather-app/icon-units.svg";
import styles from "../../../styles/weather-app/units-selector.module.scss";

const UnitsSelector = ({ intl }) => {
    const unitsLabel = intl.formatMessage({
        id: "weatherApp.header.units",
    });

    return (
        <button type="button" className={styles.select}>
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
        </button>
    );
};

UnitsSelector.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(UnitsSelector);
