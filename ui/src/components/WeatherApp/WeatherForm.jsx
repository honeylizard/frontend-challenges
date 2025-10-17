import React, { useContext } from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";

import ErrorSection from "./section/ErrorSection";
import { GlobalContext } from "../../GlobalStateProvider";

import appStyles from "@styles/weather-app/app.module.scss";
import { getInitialWeatherData } from "./utils/initialData";
import LocationSearchField from "./common/LocationSearchField";
import { getWeatherData } from "./utils/getWeatherData";
import CurrentSection from "./section/CurrentSection";
import DailySection from "./section/DailySection";
import HourlySection from "./section/HourlySection";

const WeatherForm = ({ intl }) => {
    const { updateWeatherAppData, weatherApp: globalData } = useContext(GlobalContext);
    const {
        currentLocation = {},
        configData,
        showWeatherResults = false,
        hasNoResult = false,
        showError = false,
    } = globalData;

    const formTitleLabel = intl.formatMessage({
        id: "weatherApp.form.title",
    });
    const searchSubmitLabel = intl.formatMessage({
        id: "weatherApp.form.submit",
    });
    const noResultsLabel = intl.formatMessage({
        id: "weatherApp.form.no_results",
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        getWeatherData(currentLocation.latitude, currentLocation.longitude, configData, updateWeatherAppData);
    };

    const handleReset = () => {
        updateWeatherAppData(getInitialWeatherData());
    };

    console.log("render", globalData);

    return (
        <>
            {!showError && <h2 className={appStyles.formTitle}>{formTitleLabel}</h2>}
            <div className={appStyles.mainContainer}>
                {!showError && (
                    <form onSubmit={handleSubmit} className={appStyles.formContainer} autoComplete="off">
                        <LocationSearchField />
                        <button type="submit" className={appStyles.submitButton}>
                            {searchSubmitLabel}
                        </button>
                    </form>
                )}
                {showWeatherResults && (
                    <>
                        {hasNoResult ? (
                            <div className={appStyles.noResults}>{noResultsLabel}</div>
                        ) : (
                            <>
                                <div className={appStyles.primaryContainer}>
                                    <CurrentSection />
                                    <DailySection />
                                </div>
                                <aside className={appStyles.secondaryContainer}>
                                    <HourlySection />
                                </aside>
                            </>
                        )}
                    </>
                )}
                {showError && <ErrorSection handleReset={handleReset} />}
            </div>
        </>
    );
};

WeatherForm.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(WeatherForm);
