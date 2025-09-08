import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
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
} from "./apiConstants";
import { parseCurrentWeatherData } from "./parseCurrentWeatherData";
import { parseDailyWeatherData } from "./parseDailyWeatherData";
import { parseHourlyWeatherData } from "./parseHourlyWeatherData";

// import appStyles from "../../styles/weather-app/app.module.scss";

const WeatherForm = ({ intl }) => {
    const [currentWeatherData, setCurrentWeatherData] = useState();
    const [dailyWeatherData, setDailyWeatherData] = useState();
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
        params.set("language", "en");
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
    }, [searchTerm]);

    useEffect(() => {
        const baseUrl = "https://api.open-meteo.com";
        if (currentLocation?.latitude && currentLocation?.longitude) {
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
            }).then((response) => {
                const data = response[0];
                const utcOffsetSeconds = data.utcOffsetSeconds();

                setCurrentWeatherData(parseCurrentWeatherData(data, utcOffsetSeconds));
                setHourlyWeatherData(parseHourlyWeatherData(data, utcOffsetSeconds, 8));
                setDailyWeatherData(parseDailyWeatherData(data, utcOffsetSeconds));
            });
        }
    }, [configData, currentLocation]);

    return (
        <div>
            {/*
            Search for a city, e.g., New York
            Search
            */}
            {!!currentWeatherData && (
                <div>
                    <h3 className="sr-only">Current Weather</h3>
                    <div>
                        <div>
                            <span className="sr-only">Location: </span>
                            {currentLocation?.name}
                        </div>
                        <div>
                            <span className="sr-only">Date: </span>
                            {currentWeatherData?.dateTime?.toString()}
                        </div>
                        {!!currentWeatherData?.condition && (
                            <div>
                                <span className="sr-only">Current Condition: </span>
                                <img
                                    src={process.env.PUBLIC_URL + currentWeatherData?.condition?.src}
                                    alt={currentWeatherData?.condition?.alt}
                                />
                            </div>
                        )}
                        <div>
                            <span className="sr-only">Temperature: </span>
                            {currentWeatherData?.temperature} {configData?.temperature_unit}
                        </div>
                    </div>
                    <div>
                        <div>Feels Like</div>
                        <div>
                            {currentWeatherData?.feelsLike} {configData?.temperature_unit}
                        </div>
                    </div>
                    <div>
                        <div>Humidity</div>
                        <div>{currentWeatherData?.humidity} %</div>
                    </div>
                    <div>
                        <div>Wind</div>
                        <div>
                            {currentWeatherData?.wind} {configData?.wind_speed_unit}
                        </div>
                    </div>
                    <div>
                        <div>Precipitation</div>
                        <div>
                            {currentWeatherData?.precipitation} {configData?.precipitation_unit}
                        </div>
                    </div>
                </div>
            )}
            {dailyWeatherData?.length > 0 && (
                <div>
                    <h3>Daily forecast</h3>
                    {dailyWeatherData?.map((dayWeather, index) => {
                        return (
                            <div key={`daily-weather-${index}`}>
                                <div>{dayWeather?.dateTime?.toString()}</div>
                                {!!dayWeather?.condition && (
                                    <div>
                                        <span className="sr-only">Condition: </span>
                                        <img
                                            src={process.env.PUBLIC_URL + dayWeather?.condition?.src}
                                            alt={dayWeather?.condition?.alt}
                                        />
                                    </div>
                                )}
                                <div>
                                    <span className="sr-only">Temperature (High): </span>
                                    {dayWeather?.maxTemperature} {configData?.temperature_unit}
                                </div>
                                <div>
                                    <span className="sr-only">Temperature (Low): </span>
                                    {dayWeather?.minTemperature} {configData?.temperature_unit}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
            {hourlyWeatherData?.length > 0 && (
                <div>
                    <h3>Hourly forecast</h3>
                    {/* TODO: Pick a date dropdown and limit the display to just that date */}
                    {hourlyWeatherData?.map((hourlyWeather, index) => {
                        return (
                            <div key={`hourly-weather-${index}`}>
                                <div>{hourlyWeather?.dateTime?.toString()}</div>
                                {!!hourlyWeather?.condition && (
                                    <div>
                                        <span className="sr-only">Condition: </span>
                                        <img
                                            src={process.env.PUBLIC_URL + hourlyWeather?.condition?.src}
                                            alt={hourlyWeather?.condition?.alt}
                                        />
                                    </div>
                                )}
                                <div>
                                    <span className="sr-only">Temperature: </span>
                                    {hourlyWeather?.temperature} {configData?.temperature_unit}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

WeatherForm.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(WeatherForm);
