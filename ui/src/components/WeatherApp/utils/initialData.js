export const getInitialWeatherData = () => {
    return {
        currentLocation: {
            name: "",
            city: "",
            county: "",
            state: "",
            country: "",
            latitude: null,
            longitude: null,
        },
        configData: {
            wind_speed_unit: "mph", // Kilometers per hour is the default. Other options: ["ms", "mph", "kn"] => Meters per second, Miles per hour, and knots
            temperature_unit: "fahrenheit", // Celsius is the default. Other options: ["fahrenheit"]
            precipitation_unit: "inch", // millimeter is the default. Other options: ["inch"]
            timeformat: "unixtime", // ISO 8601 (e.g. 2025-09-07) is the default. Other options: ["unixtime"]
        },
        currentWeatherData: {},
        dailyWeatherData: [],
        hourlyWeatherData: [],
        isLoading: true,
        hourlyWeekday: "", // Weekday Selector Value
    };
};
