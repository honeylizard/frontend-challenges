// World Meteorological Organization (WMO) Code Reference: https://open-meteo.com/en/docs?#weather_variable_documentation
// TODO: expand to include night or day imagery based provided param.
export const parseWeatherCodeToCondition = (code) => {
    let imgSrc = "";
    let imgAlt = "";

    if (code === 0) {
        // Clear Sky
        imgSrc = "/frontend-challenges/assets/wmo-code-symbols/icon-sunny.webp";
        imgAlt = "Sunny";
    } else if ([1, 2, 3].includes(code)) {
        // Mainly clear, partly cloudy, and overcast
        imgSrc = "/frontend-challenges/assets/wmo-code-symbols/icon-partly-cloudy.webp";
        imgAlt = "Partly Cloudy";
        // TODO: which code(s) determines overcast?
        // imgSrc = "/frontend-challenges/assets/wmo-code-symbols/icon-overcast.webp";
    } else if ([45, 48].includes(code)) {
        // Fog and depositing rime fog
        imgSrc = "/frontend-challenges/assets/wmo-code-symbols/icon-fog.webp";
        imgAlt = "Foggy";
    } else if ([51, 53, 55, 56, 57].includes(code)) {
        // 51, 53, 55 => Drizzle: Light, moderate, and dense intensity
        // 56, 57 => Freezing Drizzle: Light and dense intensity
        imgSrc = "/frontend-challenges/assets/wmo-code-symbols/icon-drizzle.webp";
        imgAlt = "Drizzling";
    } else if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
        // 61, 63, 65 => Rain: Slight, moderate and heavy intensity
        // 66, 67 => Freezing Rain: Light and heavy intensity
        // 80, 81, 82 => Rain showers: Slight, moderate, and violent
        imgSrc = "/frontend-challenges/assets/wmo-code-symbols/icon-rain.webp";
        imgAlt = "Rainy";
    } else if ([71, 73, 75, 77, 85, 86].includes(code)) {
        // 71, 73, 75 => Snow fall: Slight, moderate, and heavy intensity
        // 77 => Snow grains
        // 85, 86 => Snow showers slight and heavy
        imgSrc = "/frontend-challenges/assets/wmo-code-symbols/icon-snow.webp";
        imgAlt = "Snowy";
    } else if ([95, 96, 99].includes(code)) {
        // 95 => Thunderstorm: Slight or moderate
        // 96, 99 => Thunderstorm with slight and heavy hail
        imgSrc = "/frontend-challenges/assets/wmo-code-symbols/icon-storm.webp";
        imgAlt = "Stormy";
    } else {
        console.warn("Unknown Weather Code: ", code);
    }

    return {
        src: imgSrc,
        alt: imgAlt,
    };
};
