import React, { useState } from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";

import styles from "../../../styles/weather-app/weekday-selector.module.scss";

const WeekdaySelector = ({ intl, options }) => {
    const [currentValue, setCurrentValue] = useState("");

    const label = intl.formatMessage({
        id: "weatherApp.weekday",
    });

    const handleChange = (event) => {
        const { value: newValue } = event.target;

        setCurrentValue(newValue);
    };

    console.log("Hourly Weekday Selected", currentValue);

    return (
        <>
            <label htmlFor="hourly-weekday" className="sr-only">
                {label}
            </label>
            <select id="hourly-weekday" className={styles.select} value={currentValue} onChange={handleChange}>
                {options?.length > 0 ? (
                    <>
                        {options.map((option, index) => (
                            <option key={option.key || index} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </>
                ) : (
                    <option value="">-</option>
                )}
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
