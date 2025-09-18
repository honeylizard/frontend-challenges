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
            wind_speed_unit: "mph", // Kilometers per hour "kmh" is the default. Other options: ["kmh", "ms", "mph", "kn"] => Meters per second, Miles per hour, and knots
            temperature_unit: "fahrenheit", // "celsius" is the default. Other options: ["fahrenheit", "celsius"]
            precipitation_unit: "inch", // Millimeters "mm" is the default. Other options: ["inch", "mm"] => Inches
            timeformat: "unixtime", // ISO 8601 (e.g. 2025-09-07) is the default. Other options: ["unixtime"]
        },
        currentWeatherData: {},
        dailyWeatherData: [],
        hourlyWeatherData: [],
        isLoading: false,
        hourlyWeekday: "", // Weekday Selector Value
        hasNoResult: true,
        showWeatherResults: false,
        showError: false,
        activeDescendantId: null,
    };
};
