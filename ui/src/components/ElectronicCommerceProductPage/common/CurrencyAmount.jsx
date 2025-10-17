import React from "react";
import PropTypes from "prop-types";

import { currencyAmount } from "../utils/common";

const CurrencyAmount = ({ amount, currency = "USD", locale = "en-US", ...props }) => {
    // TODO: update to handle multiple currencies
    return amount ? <span {...props}>{currencyAmount(amount, currency, locale)}</span> : null;
};

CurrencyAmount.propTypes = {
    amount: PropTypes.number,
    currency: PropTypes.string,
    locale: PropTypes.string,
};

export default CurrencyAmount;
