import React, { useContext, useRef, useState } from "react";
import PropTypes from "prop-types";
import { injectIntl, useIntl } from "react-intl";

import loadingIcon from "../../../assets/weather-app/icon-loading.svg";
import { getLocationData } from "../utils/getLocationData";

import styles from "../../../styles/weather-app/location-search-field.module.scss";
import { GlobalContext } from "../../../GlobalStateProvider";

const LocationSearchField = ({ intl }) => {
    const { locale = "en-US" } = useIntl();
    const { updateWeatherAppData } = useContext(GlobalContext);

    const [searchTerm, setSearchTerm] = useState(""); // "Atlanta, United States" or "Kortrijk, Belgium"
    const [showDropdown, setShowDropdown] = useState(false);
    const [isLoadingResults, setIsLoadingResults] = useState(false);
    const [results, setResults] = useState([]);

    const [activeDescendantId, setActiveDescendantId] = useState(null);
    const inputRef = useRef(null);
    const listboxRef = useRef(null);

    const searchFieldLabel = intl.formatMessage({
        id: "weatherApp.form.search",
    });
    const searchFieldPlaceholder = intl.formatMessage({
        id: "weatherApp.form.searchPlaceholder",
    });

    const handleChange = (event) => {
        const { value: newValue } = event.target;
        setSearchTerm(newValue);
        setActiveDescendantId(null); // Reset active descendant on new input

        if (searchTerm.length >= 3) {
            setShowDropdown(true);
            setIsLoadingResults(true);
            setResults([]);
            getLocationData(searchTerm, locale, setShowDropdown, setIsLoadingResults, setResults);
        } else {
            setShowDropdown(false);
            setIsLoadingResults(false);
            setResults([]);
        }
    };

    const handleOptionClick = (option) => {
        setSearchTerm(option.name);
        setShowDropdown(false);
        setActiveDescendantId(null);
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
            // if (activeDescendantId < results.length - 1) {
            //     setActiveDescendantId(activeDescendantId + 1);
            // }
        } else if (event.key === "ArrowUp") {
            event.preventDefault();
            // if (state.currentIndex > 0) {
            //     const currentIndex = state.currentIndex - 1;
            //     dispatch({
            //     type: "setCurrentIndex",
            //     currentIndex
            //     });
            //     updateActiveDescendant(currentIndex);
            // }
        } else if (event.key === "Enter") {
            event.preventDefault();
            // if (state.currentIndex === -1) {
            //     dispatch({ type: "resetSuggestions" });
            //     return;
            // }

            // dispatch({
            //     type: "setSelectedColor",
            //     selectedColor: state.suggestions[state.currentIndex]
            // });
        } else if (event.key === "Escape") {
            event.preventDefault();
            // dispatch({ type: "resetSuggestions" });
        } else if (event.key === "Tab") {
            event.preventDefault();
            // dispatch({
            //     type: "setSelectedColor",
            //     selectedColor: state.suggestions[state.currentIndex]
            // });
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
                            <span>Search in progress</span>
                        </li>
                    ) : (
                        <>
                            {results.length === 0 && <div>No results</div>}
                            {results.map((result, index) => {
                                const resultId = `location-result-${index}`;
                                const isSelected = activeDescendantId === index;
                                const classes = [styles.result];
                                if (isSelected) classes.push(styles.selected);

                                return (
                                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                                    <li
                                        id={resultId}
                                        key={resultId}
                                        role="option"
                                        className={classes.join(" ")}
                                        aria-selected={activeDescendantId === index}
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
    // dateTime: PropTypes.object,
    // condition: PropTypes.object,
    // location: PropTypes.object,
    // temperature: PropTypes.number,
    // config: PropTypes.object.isRequired,
    // isLoading: PropTypes.bool,
};

export default injectIntl(LocationSearchField);
