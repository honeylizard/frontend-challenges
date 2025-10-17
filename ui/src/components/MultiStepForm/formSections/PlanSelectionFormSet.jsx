import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";

import PlanCard from "../common/PlanCard";
import FormInputSwitch from "../common/FormInputSwitch";

import data from "@resources/multi-step-form/data.json";

import appStyles from "@styles/multi-step-form/app.module.scss";

const PlanSelectionFormSet = ({ intl, formData, formErrors, onChange, currentStep = 2, totalSteps = 4 }) => {
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
            <h2 className={appStyles.currentFormTitle}>
                {sectionTitle}
                <span className="sr-only">&nbsp;({sectionStep})</span>
            </h2>
            <p className={appStyles.currentFormDescription}>{sectionDescription}</p>
            <div className={appStyles.currentFormSet}>
                <div className={appStyles.planTypesContainer}>
                    {formErrors["planType"] && (
                        <div id="planType-error" className={appStyles.alertError} role="alert" aria-atomic="true">
                            {formErrors["planType"]}
                        </div>
                    )}
                    <input
                        type="hidden"
                        id="planType"
                        name="planType"
                        value={formData["planType"]}
                        aria-describedby={formErrors["planType"] ? "planType-error" : null}
                        aria-invalid={formErrors["planType"] ? true : false}
                    />
                    {data.planTypes.map((planType, index) => (
                        <PlanCard
                            key={`plan-${index}`}
                            title={planType.title}
                            imageSrc={planType.imageSrc}
                            value={planType.value}
                            frequency={formData["planFrequency"]}
                            costOptions={[
                                {
                                    amount: planType.cost.monthly,
                                    frequency: "monthly",
                                    currency: planType.cost.currency,
                                },
                                {
                                    amount: planType.cost.annual,
                                    frequency: "annual",
                                    currency: planType.cost.currency,
                                    description: planType.cost.annualDescription,
                                },
                            ]}
                            onChange={(event) => handlePlanType(event, planType.value)}
                            isCurrent={formData["planType"] === planType.value}
                        />
                    ))}
                </div>
                <div className={appStyles.planFrequencyContainer}>
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
                        classNames={[appStyles.planFrequencyField]}
                        errorMessage={formErrors["planFrequency"]}
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
