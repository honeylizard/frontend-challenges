// Convert raw Open-Meteo data to a Date Time
export const parseDateTime = (rawData, utcOffsetSeconds) => {
    return [...Array((Number(rawData.timeEnd()) - Number(rawData.time())) / rawData.interval())].map(
        (_, i) => new Date((Number(rawData.time()) + i * rawData.interval() + utcOffsetSeconds) * 1000)
    );
};
