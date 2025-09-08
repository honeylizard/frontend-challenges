// World Meteorological Organization (WMO) Code Reference: https://open-meteo.com/en/docs?#weather_variable_documentation
// TODO: expand to include night or day imagery based provided param.
export const parseWeatherCode = (code) => {
    let imgSrc = "";

    if (code === 0) {
        // Clear Sky
        imgSrc = "/assets/wmo-code-symbols/icon-sunny.webp";
    } else if ([1, 2, 3].includes(code)) {
        // Mainly clear, partly cloudy, and overcast
        imgSrc = "/assets/wmo-code-symbols/icon-partly-cloudy.webp";
        // TODO: which code(s) determines overcast?
        // imgSrc = "/assets/wmo-code-symbols/icon-overcast.webp";
    } else if ([45, 48].includes(code)) {
        // Fog and depositing rime fog
        imgSrc = "/assets/wmo-code-symbols/icon-fog.webp";
    } else if ([51, 53, 55, 56, 57].includes(code)) {
        // 51, 53, 55 => Drizzle: Light, moderate, and dense intensity
        // 56, 57 => Freezing Drizzle: Light and dense intensity
        imgSrc = "/assets/wmo-code-symbols/icon-drizzle.webp";
    } else if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
        // 61, 63, 65 => Rain: Slight, moderate and heavy intensity
        // 66, 67 => Freezing Rain: Light and heavy intensity
        // 80, 81, 82 => Rain showers: Slight, moderate, and violent
        imgSrc = "/assets/wmo-code-symbols/icon-rain.webp";
    } else if ([71, 73, 75, 77, 85, 86].includes(code)) {
        // 71, 73, 75 => Snow fall: Slight, moderate, and heavy intensity
        // 77 => Snow grains
        // 85, 86 => Snow showers slight and heavy
        imgSrc = "/assets/wmo-code-symbols/icon-snow.webp";
    } else if ([95, 96, 99].includes(code)) {
        // 95 => Thunderstorm: Slight or moderate
        // 96, 99 => Thunderstorm with slight and heavy hail
        imgSrc = "/assets/wmo-code-symbols/icon-storm.webp";
    } else {
        console.warn("Unknown Weather Code: ", code);
    }

    return imgSrc;
};
