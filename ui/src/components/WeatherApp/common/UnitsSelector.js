import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";

import unitsIcon from "../../../assets/weather-app/icon-units.svg";
import arrowIcon from "../../../assets/weather-app/icon-dropdown.svg";
import UnitsSelectorItem from "./UnitsSelectorItem";
import { GlobalContext } from "../../../GlobalStateProvider";

import styles from "../../../styles/weather-app/units-selector.module.scss";

const UnitsSelector = ({ intl }) => {
    const { updateWeatherAppData, weatherApp: globalData } = useContext(GlobalContext);
    const { configData } = globalData;
    const [showMenu, setShowMenu] = useState(false);
    const [useImperial, setUseImperial] = useState(configData.temperature_unit === "fahrenheit");

    useEffect(() => {
        if (useImperial) {
            // set config for imperial values
            updateWeatherAppData({
                configData: {
                    wind_speed_unit: "mph",
                    temperature_unit: "fahrenheit",
                    precipitation_unit: "inch",
                },
            });
        } else {
            // set config for metric values
            updateWeatherAppData({
                configData: {
                    wind_speed_unit: "kmh",
                    temperature_unit: "celsius",
                    precipitation_unit: "mm",
                },
            });
        }
    }, [useImperial]); // eslint-disable-line react-hooks/exhaustive-deps

    const unitsLabel = intl.formatMessage({
        id: "weatherApp.header.units",
    });
    const switchToImperialLabel = intl.formatMessage({
        id: "weatherApp.switch_to_imperial",
    });
    const switchToMetricLabel = intl.formatMessage({
        id: "weatherApp.switch_to_metric",
    });

    const temperatureLabel = intl.formatMessage({
        id: "weatherApp.temperature",
    });
    const windSpeedLabel = intl.formatMessage({
        id: "weatherApp.wind_speed",
    });
    const precipitationLabel = intl.formatMessage({
        id: "weatherApp.precipitation",
    });

    const celsiusLabel = intl.formatMessage({
        id: "weatherApp.unitsLong.celsius",
    });
    const fahrenheitLabel = intl.formatMessage({
        id: "weatherApp.unitsLong.fahrenheit",
    });
    const kmhLabel = intl.formatMessage({
        id: "weatherApp.unitsLong.kmh",
    });
    const mphLabel = intl.formatMessage({
        id: "weatherApp.unitsLong.mph",
    });
    const mmLabel = intl.formatMessage({
        id: "weatherApp.unitsLong.mm",
    });
    const inchLabel = intl.formatMessage({
        id: "weatherApp.unitsLong.inch",
    });

    const handleToggle = () => {
        setShowMenu(!showMenu);
    };

    const handleUseImperial = () => {
        setUseImperial(!useImperial);
    };

    useEffect(() => {
        const keyDownHandler = (event) => {
            console.log("event", event);
            if (event.key === "Escape") {
                event.preventDefault();

                setShowMenu(false);
            }
        };

        document.addEventListener("keydown", keyDownHandler);

        return () => {
            document.removeEventListener("keydown", keyDownHandler);
        };
    }, []);

    return (
        <div>
            <button
                id="units-button"
                type="button"
                className={styles.dropdown}
                onClick={handleToggle}
                aria-controls="units-dropdown"
            >
                <img src={unitsIcon} alt="" role="presentation" />
                <span>{unitsLabel}</span>
                <img src={arrowIcon} alt="" role="presentation" />
            </button>
            <div
                id="units-dropdown"
                aria-labelledby="units-button"
                className={[styles.dropdownMenu, showMenu ? styles.active : styles.inactive].join(" ")}
            >
                <button type="button" onClick={() => handleUseImperial(useImperial)} className={styles.menuButton}>
                    {useImperial ? switchToMetricLabel : switchToImperialLabel}
                </button>

                <div className={styles.itemTitle}>{temperatureLabel}</div>
                <UnitsSelectorItem label={celsiusLabel} isSelected={!useImperial} />
                <UnitsSelectorItem label={fahrenheitLabel} isSelected={useImperial} />

                <div className={styles.divider} />

                <div className={styles.itemTitle}>{windSpeedLabel}</div>
                <UnitsSelectorItem label={kmhLabel} isSelected={!useImperial} />
                <UnitsSelectorItem label={mphLabel} isSelected={useImperial} />

                <div className={styles.divider} />

                <div className={styles.itemTitle}>{precipitationLabel}</div>
                <UnitsSelectorItem label={mmLabel} isSelected={!useImperial} />
                <UnitsSelectorItem label={inchLabel} isSelected={useImperial} />
            </div>
        </div>
    );
};

UnitsSelector.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(UnitsSelector);
