import React from "react";
import PropTypes from "prop-types";

import Button from "../common/Button";
import Price from "../common/Price";

import appStyles from "../../../styles/multi-step-form/app.module.scss";

const PlanCard = ({ title, frequency, costOptions, onChange }) => {
    const currentCost = costOptions.find((cost) => cost.frequency === frequency);
    return (
        <Button type="button" customClasses={[appStyles.planTypeCard]} onClick={onChange}>
            {title}
            {currentCost && (
                <React.Fragment>
                    <br />
                    <Price
                        amount={currentCost.amount}
                        frequency={currentCost.frequency}
                        currency={currentCost.currency}
                    />
                    <br />
                    {currentCost.description}
                </React.Fragment>
            )}
        </Button>
    );
};

PlanCard.propTypes = {
    title: PropTypes.string.isRequired,
    frequency: PropTypes.string,
    costOptions: PropTypes.arrayOf(
        PropTypes.shape({
            amount: PropTypes.number,
            frequency: PropTypes.string,
            currency: PropTypes.string,
            description: PropTypes.string,
        })
    ),
    onChange: PropTypes.func,
};

export default PlanCard;
