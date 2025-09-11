import { fetchWeatherApi } from "openmeteo";

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

const BASE_URL = "https://api.open-meteo.com";
const WEATHER_FORECAST_ENDPOINT = "/v1/forecast";

export const getWeatherData = (latitude, longitude, configData, updateWeatherAppData, setHasNoResult) => {
    if (latitude && longitude) {
        const params = {
            latitude: latitude,
            longitude: longitude,
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
        };
        updateWeatherAppData({ isLoading: true });
        setHasNoResult(false);
        fetchWeatherApi(`${BASE_URL}${WEATHER_FORECAST_ENDPOINT}`, params)
            .then((response) => {
                const data = response[0];
                const utcOffsetSeconds = data.utcOffsetSeconds();

                const dailyData = parseDailyWeatherData(data, utcOffsetSeconds);
                const hourlyData = parseHourlyWeatherData(data, utcOffsetSeconds, 8);
                const currentData = parseCurrentWeatherData(data, utcOffsetSeconds);

                if (dailyData && hourlyData && currentData) {
                    updateWeatherAppData({
                        dailyWeatherData: dailyData,
                        hourlyWeatherData: hourlyData,
                        currentWeatherData: currentData,
                    });
                } else {
                    setHasNoResult(true);
                }
            })
            .catch((error) => {
                console.error("Error Retrieving Weather Data: ", error?.message);
            })
            .finally(() => {
                updateWeatherAppData({ isLoading: false });
            });
    }
};
