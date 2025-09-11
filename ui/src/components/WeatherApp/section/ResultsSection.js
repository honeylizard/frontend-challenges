import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";

import HourlySection from "./HourlySection";
import DailySection from "./DailySection";
import CurrentSection from "./CurrentSection";
import { GlobalContext } from "../../../GlobalStateProvider";

import appStyles from "../../../styles/weather-app/app.module.scss";
import { getWeatherData } from "../utils/getWeatherData";

const ResultSection = ({ intl }) => {
    const { updateWeatherAppData, weatherApp: globalData } = useContext(GlobalContext);
    const { currentLocation = {}, configData } = globalData;
    const [hasNoResult, setHasNoResult] = useState(false);

    const noResultsLabel = intl.formatMessage({
        id: "weatherApp.form.no_results",
    });

    useEffect(() => {
        console.log("handleSubmit - after", {
            currentLocation,
        });

        getWeatherData(
            currentLocation.latitude,
            currentLocation.longitude,
            configData,
            updateWeatherAppData,
            setHasNoResult
        );
    }, [currentLocation, configData]); // eslint-disable-line react-hooks/exhaustive-deps

    return hasNoResult ? (
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
    );
};

ResultSection.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(ResultSection);
