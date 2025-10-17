import React from "react";
import PropTypes from "prop-types";

import { percentageAmount } from "../utils/common";

const PercentageAmount = ({ amount, suffix = "", percision = 0, ...props }) => {
    return amount ? (
        <span {...props}>
            {suffix}
            {percentageAmount(amount, percision)}
        </span>
    ) : null;
};

PercentageAmount.propTypes = {
    amount: PropTypes.number,
    suffix: PropTypes.string,
    percision: PropTypes.number,
};

export default PercentageAmount;
