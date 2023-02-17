import React from "react";
import PropTypes from "prop-types";

import Button from "../common/Button";
import FormInput from "../common/FormInput";
import Price from "../common/Price";

import data from "../../../assets/multi-step-form/data.json";

import appStyles from "../../../styles/multi-step-form/app.module.scss";

const PlanSelectionFormSet = ({
    formData,
    onChange,
    currentStep = 2,
    totalSteps = 4,
}) => {
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
                    {data.planTypes.map((planType, index) => (
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
                            <Price
                                amount={planType.cost.monthly}
                                frequency={formData["planFrequency"]}
                                currency={planType.cost.currency}
                            />
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
