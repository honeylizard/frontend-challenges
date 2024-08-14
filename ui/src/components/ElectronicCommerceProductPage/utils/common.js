export const currencyAmount = (amount, currency = "USD", locale = "en-US") => {
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 2,
    }).format(amount);
};

export const percentageAmount = (amount, percision = 2) => {
    return Number(amount).toLocaleString(undefined, {
        style: "percent",
        minimumFractionDigits: percision,
    });
};
