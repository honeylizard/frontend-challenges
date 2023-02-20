import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";

import Button from "../common/Button";
import Price from "../common/Price";
import FormInputSwitch from "../common/FormInputSwitch";

import data from "../../../assets/multi-step-form/data.json";

import appStyles from "../../../styles/multi-step-form/app.module.scss";

const PlanSelectionFormSet = ({ intl, formData, onChange, currentStep = 2, totalSteps = 4 }) => {
    const sectionTitle = intl.formatMessage({
        id: "multiStepForm.planSelection.title",
    });
    const sectionStep = intl.formatMessage(
        {
            id: "multiStepForm.step",
        },
        {
            current: currentStep,
            total: totalSteps,
        }
    );
    const sectionDescription = intl.formatMessage({
        id: "multiStepForm.planSelection.description",
    });
    const frequencyLabel = intl.formatMessage({
        id: "multiStepForm.planSelection.planFrequency",
    });
    const frequencyMonthlyLabel = intl.formatMessage({
        id: "multiStepForm.planSelection.planFrequency.monthly",
    });
    const frequencyAnnualLabel = intl.formatMessage({
        id: "multiStepForm.planSelection.planFrequency.annual",
    });

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

    const handlePlanFrequency = (event, value) => {
        event.preventDefault();
        onChange(
            {
                id: "planFrequency",
                name: "planFrequency",
                value: value,
            },
            "special"
        );
    };

    return (
        <div>
            <h2>
                {sectionTitle}
                <span className="sr-only">&nbsp;({sectionStep})</span>
            </h2>
            <p>{sectionDescription}</p>
            <div className={appStyles.currentFormSet}>
                <div className={appStyles.planTypesContainer}>
                    <input type="hidden" id="planType" name="planType" value={formData["planType"]} />
                    {/* TODO: convert to component and handle frequency toggling */}
                    {data.planTypes.map((planType, index) => (
                        <Button
                            key={`plan-${index}`}
                            type="button"
                            customClasses={[appStyles.planTypeCard]}
                            onClick={(event) => handlePlanType(event, planType.value)}
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
                <div>
                    <FormInputSwitch
                        id="planFrequency"
                        name="planFrequency"
                        value={formData["planFrequency"]}
                        label={frequencyLabel}
                        labelOff={frequencyMonthlyLabel}
                        valueOff="monthly"
                        labelOn={frequencyAnnualLabel}
                        valueOn="annual"
                        onChange={handlePlanFrequency}
                    />
                </div>
            </div>
        </div>
    );
};

PlanSelectionFormSet.propTypes = {
    intl: PropTypes.object.isRequired,
    formData: PropTypes.object,
    formErrors: PropTypes.object,
    onChange: PropTypes.func,
    currentStep: PropTypes.number,
    totalSteps: PropTypes.number,
};

export default injectIntl(PlanSelectionFormSet);
