import {
    FEELS_LIKE_KEY,
    HUMIDITY_KEY,
    PRECIPITATION_KEY,
    TEMPERATURE_KEY,
    TIME_KEY,
    WEATHER_CODE_KEY,
    WIND_SPEED_KEY,
} from "./apiConstants";
import { parseWeatherCodeToCondition } from "./parseWeatherCodeToCondition";

// current forcast - date, weatherState, temperature, feelslike, humidity, precipitation, and wind
export const parseCurrentWeatherData = (rawData, utcOffsetSeconds) => {
    const current = rawData.current();

    // Note: The order of weather variables in the URL query and the indices below need to match!
    const currentData = {
        [TIME_KEY]: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
        [TEMPERATURE_KEY]: current.variables(0).value(),
        [HUMIDITY_KEY]: current.variables(1).value(),
        [FEELS_LIKE_KEY]: current.variables(2).value(),
        [PRECIPITATION_KEY]: current.variables(3).value(),
        [WEATHER_CODE_KEY]: current.variables(4).value(),
        [WIND_SPEED_KEY]: current.variables(5).value(),
    };

    return {
        dateTime: currentData[TIME_KEY],
        temperature: currentData[TEMPERATURE_KEY],
        condition: parseWeatherCodeToCondition(currentData[WEATHER_CODE_KEY]),
        feelsLike: currentData[FEELS_LIKE_KEY],
        humidity: currentData[HUMIDITY_KEY],
        wind: currentData[WIND_SPEED_KEY],
        precipitation: currentData[PRECIPITATION_KEY],
    };
};
