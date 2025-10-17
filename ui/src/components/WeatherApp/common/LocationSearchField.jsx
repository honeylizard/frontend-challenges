import React, { useContext, useRef, useState } from "react";
import PropTypes from "prop-types";
import { injectIntl, useIntl } from "react-intl";

import loadingIcon from "@resources/weather-app/icon-loading.svg";
import { getLocationData } from "../utils/getLocationData";

import styles from "@styles/weather-app/location-search-field.module.scss";
import { GlobalContext } from "../../../GlobalStateProvider";

const LocationSearchField = ({ intl }) => {
    const { locale = "en-US" } = useIntl();
    const { updateWeatherAppData, weatherApp: globalData } = useContext(GlobalContext);
    const { activeDescendantId } = globalData;

    const [searchTerm, setSearchTerm] = useState(""); // "Atlanta, United States" or "Kortrijk, Belgium"
    const [showDropdown, setShowDropdown] = useState(false);
    const [isLoadingResults, setIsLoadingResults] = useState(false);
    const [results, setResults] = useState([]);

    const inputRef = useRef(null);
    const listboxRef = useRef(null);

    const searchFieldLabel = intl.formatMessage({
        id: "weatherApp.form.search",
    });
    const searchFieldPlaceholder = intl.formatMessage({
        id: "weatherApp.form.searchPlaceholder",
    });
    const searchInProgressLabel = intl.formatMessage({
        id: "weatherApp.search_in_progress",
    });
    const noResultsLabel = intl.formatMessage({
        id: "weatherApp.no_results",
    });

    const compareLocation = (locationA, locationB) => {
        if (!locationB || !locationA) return false;

        return (
            locationA.latitude === locationB.latitude &&
            locationA.longitude === locationB.longitude &&
            locationA.name === locationB.name &&
            locationA.city === locationB.city &&
            locationA.county === locationB.county &&
            locationA.country === locationB.country &&
            locationA.state === locationB.state
        );
    };

    const handleChange = (event) => {
        const { value: newValue } = event.target;
        setSearchTerm(newValue);

        if (newValue !== searchTerm) {
            if (newValue.length >= 3) {
                setShowDropdown(true);
                setIsLoadingResults(true);
                setResults([]);
                getLocationData(searchTerm, locale, setShowDropdown, setIsLoadingResults, setResults);
            } else {
                setShowDropdown(false);
                setIsLoadingResults(false);
                setResults([]);
            }
        }
    };

    const handleOptionClick = (option) => {
        setSearchTerm(option.name);
        setShowDropdown(false);
        updateWeatherAppData({ activeDescendantId: null });
        inputRef.current.focus();

        updateWeatherAppData({
            currentLocation: option,
            currentWeatherData: null, // reset the data for display
            dailyWeatherData: null, // reset the data for display
            hourlyWeatherData: null, // reset the data for display
            isLoading: true,
            showWeatherResults: false,
        });
    };

    const handleKeyDown = (event) => {
        if (event.key === "ArrowDown") {
            event.preventDefault();
            // set setActiveDescendantId to result below if not last item; otherwise, do nothing
            if (activeDescendantId) {
                const currentIndex = results.findIndex((result) => compareLocation(result, activeDescendantId));
                if (currentIndex !== results.length - 1) {
                    const selection = results[currentIndex + 1];
                    updateWeatherAppData({ activeDescendantId: selection });
                }
            } else {
                updateWeatherAppData({ activeDescendantId: results[0] });
            }
        } else if (event.key === "ArrowUp") {
            event.preventDefault();
            // set setActiveDescendantId to result above if not first item; otherwise, do nothing
            if (activeDescendantId) {
                const currentIndex = results.findIndex((result) => compareLocation(result, activeDescendantId));
                if (currentIndex !== 0) {
                    const selection = results[currentIndex - 1];
                    updateWeatherAppData({ activeDescendantId: selection });
                }
            }
            // Else; do nothing if we haven't worked with the list yet
        } else if (event.key === "Enter") {
            event.preventDefault();
            // update currentLocation with setActiveDescendantId if valid
            if (activeDescendantId) {
                handleOptionClick(activeDescendantId);
            }
        } else if (event.key === "Escape") {
            event.preventDefault();
            updateWeatherAppData({ activeDescendantId: null });
        }
    };

    return (
        <div className={styles.container}>
            <label htmlFor="weather-search" className="sr-only">
                {searchFieldLabel}
            </label>
            <div className={styles.searchField}>
                <input
                    id="weather-search"
                    type="text"
                    onChange={handleChange}
                    value={searchTerm}
                    placeholder={searchFieldPlaceholder}
                    className={styles.input}
                    role="combobox"
                    aria-autocomplete="list"
                    aria-expanded={showDropdown}
                    aria-controls="cb1-listbox"
                    ref={inputRef}
                    aria-haspopup="listbox"
                    aria-activedescendant={activeDescendantId}
                    onKeyUp={handleChange}
                    onKeyDown={handleKeyDown}
                />
            </div>
            {showDropdown && (
                <ul
                    className={styles.searchFieldResults}
                    id="cb1-listbox"
                    role="listbox"
                    aria-label="Locations"
                    ref={listboxRef}
                >
                    {isLoadingResults ? (
                        <li className={styles.loading}>
                            <img src={loadingIcon} alt="" role="presentation" />
                            <span>{searchInProgressLabel}</span>
                        </li>
                    ) : (
                        <>
                            {results.length === 0 && <li className={styles.emptyList}>{noResultsLabel}</li>}
                            {results.map((result, index) => {
                                const resultId = `location-result-${index}`;
                                const isSelected = compareLocation(result, activeDescendantId);
                                const classes = [styles.result];
                                if (isSelected) classes.push(styles.selected);

                                return (
                                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                                    <li
                                        id={resultId}
                                        key={resultId}
                                        role="option"
                                        className={classes.join(" ")}
                                        aria-selected={isSelected}
                                        onClick={() => handleOptionClick(result)}
                                    >
                                        {result.name}
                                    </li>
                                );
                            })}
                        </>
                    )}
                </ul>
            )}
        </div>
    );
};

LocationSearchField.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(LocationSearchField);
