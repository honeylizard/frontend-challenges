import React from "react";
import PropTypes from "prop-types";

const Price = ({ amount, frequency, currency = "USD", ...props }) => {
    // TODO: update to handle multiple currencies
    const planFrequencyText = frequency === "monthly" ? "mo" : "yr";
    const amountWithCurrency = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
        trailingZeroDisplay: "stripIfInteger",
    }).format(amount);

    return amount ? (
        <span {...props}>
            {amountWithCurrency}/{planFrequencyText}
        </span>
    ) : null;
};

Price.propTypes = {
    amount: PropTypes.number,
    frequency: PropTypes.string,
    currency: PropTypes.string,
};

export default Price;
