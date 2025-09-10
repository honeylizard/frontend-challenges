import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { injectIntl, useIntl } from "react-intl";
import { fetchWeatherApi } from "openmeteo";
import axios from "axios";

import {
    FEELS_LIKE_KEY,
    HUMIDITY_KEY,
    PRECIPITATION_KEY,
    TEMPERATURE_KEY,
    TEMPERATURE_MAX_KEY,
    TEMPERATURE_MIN_KEY,
    WEATHER_CODE_KEY,
    WIND_SPEED_KEY,
} from "./utils/apiConstants";
import { parseCurrentWeatherData } from "./utils/parseCurrentWeatherData";
import { parseDailyWeatherData } from "./utils/parseDailyWeatherData";
import { parseHourlyWeatherData } from "./utils/parseHourlyWeatherData";
import HourlySection from "./section/HourlySection";
import DailySection from "./section/DailySection";
import CurrentSection from "./section/CurrentSection";

import appStyles from "../../styles/weather-app/app.module.scss";

const WeatherForm = ({ intl }) => {
    const { locale = "en-US" } = useIntl();

    const [currentWeatherData, setCurrentWeatherData] = useState();
    const [dailyWeatherData, setDailyWeatherData] = useState([]);
    const [hourlyWeatherData, setHourlyWeatherData] = useState();
    // TODO: set this via dropdown options on "Units"
    const [configData, setConfigData] = useState({
        wind_speed_unit: "mph", // Kilometers per hour is the default. Other options: ["ms", "mph", "kn"] => Meters per second, Miles per hour, and knots
        temperature_unit: "fahrenheit", // Celsius is the default. Other options: ["fahrenheit"]
        precipitation_unit: "inch", // millimeter is the default. Other options: ["inch"]
        timeformat: "unixtime", // ISO 8601 (e.g. 2025-09-07) is the default. Other options: ["unixtime"]
    });
    // TODO: set this to a debounced input field
    const [searchTerm, setSearchTerm] = useState("Kortrijk, Belgium"); // useState("Atlanta, United States");
    const [currentLocation, setCurrentLocation] = useState();
    // const appTitleLabel = intl.formatMessage({
    //     id: "weatherApp.header.title",
    // });

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // API takes in zip code or city/country (no country codes) => "Atlanta, United States", or "Berlin, Germany", or "30066"
        // "Atlanta" returns multiple results
        // could add &countryCode=US to query to limit to USA?

        // String to search for. An empty string or only 1 character will return an empty result.
        // 2 characters will only match exact matching locations.
        // 3 and more characters will perform fuzzy matching.
        // The search string can be a location name or a postal code.
        const baseUrl = "https://geocoding-api.open-meteo.com";

        const params = new URLSearchParams();
        params.set("name", searchTerm);
        params.set("language", locale);
        params.set("format", "json");
        params.set("count", "1");

        axios.get(`${baseUrl}/v1/search?${params.toString()}`).then((response) => {
            const locationData = response.data.results[0] || {};
            const { admin1: state, admin2: county, name: city, country, latitude, longitude } = locationData;

            setCurrentLocation({
                name: [city, country].join(", "),
                city,
                county,
                state,
                country,
                latitude,
                longitude,
            });
        });
    }, [searchTerm, locale]);

    useEffect(() => {
        const baseUrl = "https://api.open-meteo.com";
        if (currentLocation?.latitude && currentLocation?.longitude) {
            setIsLoading(true);
            fetchWeatherApi(`${baseUrl}/v1/forecast`, {
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
                // Order matters between this call and how the parse methods extract!
                daily: [TEMPERATURE_MAX_KEY, TEMPERATURE_MIN_KEY, WEATHER_CODE_KEY],
                hourly: [TEMPERATURE_KEY, WEATHER_CODE_KEY],
                current: [
                    TEMPERATURE_KEY,
                    HUMIDITY_KEY,
                    FEELS_LIKE_KEY,
                    PRECIPITATION_KEY,
                    WEATHER_CODE_KEY,
                    WIND_SPEED_KEY,
                ],
                ...configData,
            })
                .then((response) => {
                    const data = response[0];
                    const utcOffsetSeconds = data.utcOffsetSeconds();

                    setCurrentWeatherData(parseCurrentWeatherData(data, utcOffsetSeconds));
                    setHourlyWeatherData(parseHourlyWeatherData(data, utcOffsetSeconds, 8));
                    setDailyWeatherData(parseDailyWeatherData(data, utcOffsetSeconds));
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [configData, currentLocation]);

    return (
        <div className={appStyles.mainContainer}>
            {/*
            Search for a city, e.g., New York
            Search
            */}
            <div className={appStyles.primaryContainer}>
                <CurrentSection
                    data={currentWeatherData}
                    location={currentLocation}
                    config={configData}
                    isLoading={isLoading}
                />
                <DailySection data={dailyWeatherData} config={configData} isLoading={isLoading} />
            </div>
            <aside className={appStyles.secondaryContainer}>
                <HourlySection data={hourlyWeatherData} config={configData} isLoading={isLoading} />
            </aside>
        </div>
    );
};

WeatherForm.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(WeatherForm);
