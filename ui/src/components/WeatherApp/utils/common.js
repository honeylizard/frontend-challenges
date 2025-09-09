import React from "react";
import dayjs from "dayjs";

// Whole number amount with a unit of measurement displayed after
export const amountWithUnitOfMeasure = (amount, unit, locale = "en-US") => {
    const formattedAmount = new Intl.NumberFormat(locale, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
    return (
        <span>
            <span>{formattedAmount}</span>
            <span>{unit}</span>
        </span>
    );
};

export const temperatureAmount = (amount, unit = "fahrenheit", locale = "en-US") => {
    const unitOfMeasure =
        unit === "fahrenheit" ? (
            <>
                &deg;
                <span className="sr-only">F</span>
            </>
        ) : (
            <>
                <sup>&deg;</sup>
                <span className="sr-only">C</span>
            </>
        );
    return amountWithUnitOfMeasure(amount, unitOfMeasure, locale);
};

export const hourOnly = (dateTime) => {
    const formattedDate = dayjs(dateTime, true);

    return formattedDate.isValid ? formattedDate.format("h A") : dateTime?.toString();
};

export const dayOfWeekOnly = (dateTime) => {
    const formattedDate = dayjs(dateTime, true);

    return formattedDate.isValid ? formattedDate.format("ddd") : dateTime?.toString();
};

export const dateWithWeekDayOnly = (dateTime) => {
    const formattedDate = dayjs(dateTime, true);

    return formattedDate.isValid ? formattedDate.format("dddd, MMM D, YYYY") : dateTime?.toString();
};
