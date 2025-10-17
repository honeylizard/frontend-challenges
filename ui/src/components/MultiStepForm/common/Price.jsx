import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";

const Price = ({ intl, amount, frequency, currency = "USD", ...props }) => {
    const monthlyLabel = intl.formatMessage({
        id: "multiStepForm.monthly.abbreviation",
    });
    const yearlyLabel = intl.formatMessage({
        id: "multiStepForm.annual.abbreviation",
    });
    // TODO: update to handle multiple currencies
    const planFrequencyText = frequency === "monthly" ? monthlyLabel : yearlyLabel;
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
    intl: PropTypes.object.isRequired,
    amount: PropTypes.number,
    frequency: PropTypes.string,
    currency: PropTypes.string,
};

export default injectIntl(Price);
