import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import { GlobalContext } from "../../../GlobalStateProvider";

import styles from "@styles/weather-app/weekday-selector.module.scss";

const WeekdaySelector = ({ intl, options }) => {
    const { updateWeatherAppData, weatherApp: globalData } = useContext(GlobalContext);
    const { hourlyWeekday: initialValue, isLoading = true } = globalData;
    const [currentValue, setCurrentValue] = useState(initialValue);

    const label = intl.formatMessage({
        id: "weatherApp.weekday",
    });

    const handleChange = (event) => {
        const { value: newValue } = event.target;

        setCurrentValue(newValue);
        updateWeatherAppData({
            hourlyWeekday: newValue,
        });
    };

    return (
        <>
            <label htmlFor="hourly-weekday" className="sr-only">
                {label}
            </label>
            <select
                id="hourly-weekday"
                className={styles.select}
                value={currentValue}
                onChange={handleChange}
                disabled={isLoading}
            >
                <option value="">-</option>
                {options.map((option, index) => (
                    <option key={option.key || index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </>
    );
};

WeekdaySelector.propTypes = {
    intl: PropTypes.object.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string,
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        })
    ),
};

export default injectIntl(WeekdaySelector);
