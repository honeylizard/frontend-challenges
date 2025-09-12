import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";

import unitsIcon from "../../../assets/weather-app/icon-units.svg";
import arrowIcon from "../../../assets/weather-app/icon-dropdown.svg";

import styles from "../../../styles/weather-app/units-selector.module.scss";
import UnitsSelectorItem from "./UnitsSelectorItem";

const UnitsSelector = ({ intl }) => {
    const [showMenu, setShowMenu] = useState(false);
    const [useImperial, setUseImperial] = useState(false);

    const unitsLabel = intl.formatMessage({
        id: "weatherApp.header.units",
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

    const handleToggle = () => {
        setShowMenu(!showMenu);
    };

    const handleUseImperial = () => {
        setUseImperial(!useImperial);

        if (!useImperial) {
            // TODO: set config for metric values
        } else {
            // TODO: set config for imperial values
        }
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
                <button type="button" onClick={handleUseImperial} className={styles.menuButton}>
                    {useImperial ? "Switch to Metric" : "Switch to Imperial"}
                </button>

                <div className={styles.itemTitle}>{temperatureLabel}</div>
                <UnitsSelectorItem label="Celsius (&deg; C)" isSelected={!useImperial} />
                <UnitsSelectorItem label="Fahrenheit (&deg; F)" isSelected={useImperial} />

                <div className={styles.divider} />

                <div className={styles.itemTitle}>{windSpeedLabel}</div>
                <UnitsSelectorItem label="km/h" isSelected={!useImperial} />
                <UnitsSelectorItem label="mph" isSelected={useImperial} />

                <div className={styles.divider} />

                <div className={styles.itemTitle}>{precipitationLabel}</div>
                <UnitsSelectorItem label="Millimeters (mm)" isSelected={!useImperial} />
                <UnitsSelectorItem label="Inches (in)" isSelected={useImperial} />
            </div>
        </div>
    );
};

UnitsSelector.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(UnitsSelector);
