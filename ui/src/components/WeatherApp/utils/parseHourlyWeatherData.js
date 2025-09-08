import { TEMPERATURE_KEY, TIME_KEY, WEATHER_CODE_KEY } from "./apiConstants";
import { parseDateTime } from "./parseDateTime";
import { parseWeatherCodeToCondition } from "./parseWeatherCodeToCondition";

// hourly forecast (8 sets) - time, weatherState and temperature
export const parseHourlyWeatherData = (rawData, utcOffsetSeconds, limit = 8) => {
    const hourlyDataRaw = rawData.hourly();

    // Note: The order of weather variables in the URL query and the indices below need to match!
    const hourlyData = {
        [TIME_KEY]: parseDateTime(hourlyDataRaw, utcOffsetSeconds),
        [TEMPERATURE_KEY]: hourlyDataRaw.variables(0).valuesArray(),
        [WEATHER_CODE_KEY]: hourlyDataRaw.variables(1).valuesArray(),
    };

    const newHourlyWeatherData = [];

    hourlyData[TIME_KEY].slice(0, limit - 1).forEach((dateTime, index) => {
        const newHourlyEntry = {
            dateTime,
            temperature: hourlyData[TEMPERATURE_KEY][index],
            condition: parseWeatherCodeToCondition(hourlyData[WEATHER_CODE_KEY][index]),
        };

        newHourlyWeatherData.push(newHourlyEntry);
    });

    return newHourlyWeatherData;
};
