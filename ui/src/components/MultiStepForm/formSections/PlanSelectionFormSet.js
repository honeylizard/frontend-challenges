import React from "react";
import PropTypes from "prop-types";

import Button from "../common/Button";
import FormInput from "../common/FormInput";

import appStyles from "../../../styles/multi-step-form/app.module.scss";

const PlanSelectionFormSet = ({
    formData,
    onChange,
    currentStep = 2,
    totalSteps = 4,
}) => {
    const planTypes = [
        {
            title: "Arcade",
            value: "arcade",
            cost: {
                monthly: 9,
                annual: "",
                currency: "USD",
            },
        },
        {
            title: "Advanced",
            value: "advanced",
            cost: {
                monthly: 12,
                annual: "",
                currency: "USD",
            },
        },
        {
            title: "Pro",
            value: "pro",
            cost: {
                monthly: 15,
                annual: "",
                currency: "USD",
            },
        },
    ];

    // TODO: update to handle multiple currencies
    const displayWithCurrency = (amount, frequency, currency = "USD") => {
        const planFrequencyText = frequency === "monthly" ? "mo" : "yr";
        const amountWithCurrency = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currency,
            trailingZeroDisplay: "stripIfInteger",
        }).format(amount);
        return amount ? `${amountWithCurrency}/${planFrequencyText}` : null;
    };

    const handlePlanType = (event, value) => {
        event.preventDefault();
        onChange(
            {
                id: "planType",
                name: "planType",
                value: value,
            },
            "special"
        );
    };

    return (
        <div>
            <h2>
                Select your plan
                <span className="sr-only">
                    &nbsp;(Step {currentStep} of {totalSteps})
                </span>
            </h2>
            <p>You have the option of monthly or yearly billing.</p>
            <div className={appStyles.currentFormSet}>
                <div className={appStyles.planTypesContainer}>
                    <input
                        type="hidden"
                        id="planType"
                        name="planType"
                        value={formData["planType"]}
                    />
                    {planTypes.map((planType, index) => (
                        <Button
                            key={`plan-${index}`}
                            type="button"
                            customClasses={[appStyles.planTypeCard]}
                            onClick={(event) =>
                                handlePlanType(event, planType.value)
                            }
                        >
                            {planType.title}
                            <br />
                            {displayWithCurrency(
                                planType.cost.monthly,
                                formData["planFrequency"],
                                planType.cost.currency
                            )}
                        </Button>
                    ))}
                </div>
                <div>Monthly Yearly</div>
            </div>
        </div>
    );
};

PlanSelectionFormSet.propTypes = {
    formData: PropTypes.object,
    formErrors: PropTypes.object,
    onChange: PropTypes.func,
    currentStep: PropTypes.number,
    totalSteps: PropTypes.number,
};

export default PlanSelectionFormSet;
