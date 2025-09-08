import { TEMPERATURE_MAX_KEY, TEMPERATURE_MIN_KEY, TIME_KEY, WEATHER_CODE_KEY } from "./apiConstants";
import { parseDateTime } from "./parseDateTime";
import { parseWeatherCode } from "./parseWeatherCode";

// daily forcast - date, weatherState, and min/max temperature
export const parseDailyWeatherData = (rawData, utcOffsetSeconds) => {
    const dailyDataRaw = rawData.daily();

    // Note: The order of weather variables in the URL query and the indices below need to match!
    const dailyData = {
        [TIME_KEY]: parseDateTime(dailyDataRaw, utcOffsetSeconds),
        [TEMPERATURE_MAX_KEY]: dailyDataRaw.variables(0).valuesArray(),
        [TEMPERATURE_MIN_KEY]: dailyDataRaw.variables(1).valuesArray(),
        [WEATHER_CODE_KEY]: dailyDataRaw.variables(2).valuesArray(),
    };

    const newDailyWeatherData = [];

    dailyData[TIME_KEY].forEach((dateTime, index) => {
        const newDailyEntry = {
            dateTime,
            maxTemperature: dailyData[TEMPERATURE_MAX_KEY][index],
            minTemperature: dailyData[TEMPERATURE_MIN_KEY][index],
            weatherCodeImageSource: parseWeatherCode(dailyData[WEATHER_CODE_KEY][index]),
        };

        newDailyWeatherData.push(newDailyEntry);
    });

    return newDailyWeatherData;
};
