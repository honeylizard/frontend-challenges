import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { injectIntl, useIntl } from "react-intl";

import ErrorSection from "./section/ErrorSection";
import { GlobalContext } from "../../GlobalStateProvider";

import appStyles from "../../styles/weather-app/app.module.scss";
import { getInitialWeatherData } from "./utils/initialData";
import ResultsSection from "./section/ResultsSection";
import { getLocationData } from "./utils/getLocationData";

const WeatherForm = ({ intl }) => {
    const { updateWeatherAppData, weatherApp: globalData } = useContext(GlobalContext);
    const { currentLocation = {} } = globalData;
    const { locale = "en-US" } = useIntl();

    const [searchTerm, setSearchTerm] = useState(""); // "Atlanta, United States" or "Kortrijk, Belgium"
    const [showResults, setShowResults] = useState(false);
    const [showError, setShowError] = useState(false);

    const formTitleLabel = intl.formatMessage({
        id: "weatherApp.form.title",
    });
    const searchFieldLabel = intl.formatMessage({
        id: "weatherApp.form.search",
    });
    const searchFieldPlaceholder = intl.formatMessage({
        id: "weatherApp.form.searchPlaceholder",
    });
    const searchSubmitLabel = intl.formatMessage({
        id: "weatherApp.form.submit",
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("handleSubmit - before", {
            currentLocation,
            searchTerm,
        });
        getLocationData(searchTerm, locale, updateWeatherAppData, setShowResults, setShowError);
    };

    const handleReset = () => {
        // Reset the data
        updateWeatherAppData(getInitialWeatherData());

        // Clear the form
        setSearchTerm("");

        // Reset the UI state
        setShowResults(false);
        setShowError(false);
    };

    const handleChange = (event) => {
        const { value: newValue } = event.target;
        setSearchTerm(newValue);
    };

    // TODO: change the input search into an autocomplete filtering system

    return (
        <>
            {!showError && <h2 className={appStyles.formTitle}>{formTitleLabel}</h2>}
            <div className={appStyles.mainContainer}>
                {!showError && (
                    <form onSubmit={handleSubmit} className={appStyles.formContainer}>
                        <label htmlFor="weather-search" className="sr-only">
                            {searchFieldLabel}
                        </label>
                        <div className={appStyles.searchField}>
                            <input
                                id="weather-search"
                                type="text"
                                onChange={handleChange}
                                value={searchTerm}
                                placeholder={searchFieldPlaceholder}
                                className={appStyles.input}
                            />
                        </div>
                        <button type="submit" className={appStyles.submitButton}>
                            {searchSubmitLabel}
                        </button>
                    </form>
                )}
                {showResults && <ResultsSection />}
                {showError && <ErrorSection handleReset={handleReset} />}
            </div>
        </>
    );
};

WeatherForm.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(WeatherForm);
