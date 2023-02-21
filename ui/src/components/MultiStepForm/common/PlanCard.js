import React from "react";
import PropTypes from "prop-types";

import Button from "../common/Button";
import Price from "../common/Price";

import appStyles from "../../../styles/multi-step-form/app.module.scss";

const PlanCard = ({ title, imageSrc, frequency, costOptions, onChange, isCurrent = false }) => {
    const currentCost = costOptions.find((cost) => cost.frequency === frequency);
    const classes = [appStyles.planTypeCard];

    if (isCurrent) {
        classes.push(appStyles.planTypeCardCurrent);
    }

    return (
        <Button type="button" customClasses={classes} onClick={onChange}>
            {imageSrc && <img src={process.env.PUBLIC_URL + imageSrc} alt="" role="presentation" />}
            <div className={appStyles.planTypeCardText}>
                <div className={appStyles.planTypeCardTitle}>{title}</div>
                {currentCost && (
                    <React.Fragment>
                        <div className={appStyles.planTypeCardCost}>
                            <Price
                                amount={currentCost.amount}
                                frequency={currentCost.frequency}
                                currency={currentCost.currency}
                            />
                        </div>
                        <div className={appStyles.planTypeCardDesc}>{currentCost.description}</div>
                    </React.Fragment>
                )}
            </div>
        </Button>
    );
};

PlanCard.propTypes = {
    title: PropTypes.string.isRequired,
    imageSrc: PropTypes.string,
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
    isCurrent: PropTypes.bool,
};

export default PlanCard;
