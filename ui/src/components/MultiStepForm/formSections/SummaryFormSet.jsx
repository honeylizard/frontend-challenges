import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";

import SummaryAddOnRow from "../common/SummaryAddOnRow";
import Price from "../common/Price";
import Button from "../common/Button";

import data from "@resources/multi-step-form/data.json";

import appStyles from "@styles/multi-step-form/app.module.scss";

const SummaryFormSet = ({ intl, formData, formErrors, currentStep = 4, totalSteps = 4, goToPlanSelectionStep }) => {
    const [total, setTotal] = useState(0);
    const [addOns, setAddOns] = useState([]);
    const [planType, setPlanType] = useState({});
    const [frequency, setFrequency] = useState({});
    const [currency, setCurrency] = useState("USD");

    const sectionTitle = intl.formatMessage({
        id: "multiStepForm.summary.title",
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
        id: "multiStepForm.summary.description",
    });
    const changeLabel = intl.formatMessage({
        id: "multiStepForm.summary.change",
    });
    const totalLabel = intl.formatMessage(
        {
            id: "multiStepForm.summary.totalLabel",
        },
        {
            frequency: frequency?.altLabel || "",
        }
    );

    useEffect(() => {
        const mappedAddOns = Object.keys(formData["addOns"])
            .map((key) => {
                return formData["addOns"][key]
                    ? {
                          id: key,
                          value: formData["addOns"][key],
                      }
                    : null;
            })
            .filter(Boolean);
        setAddOns(mappedAddOns);

        const mappedPlanType = data.planTypes.find((elem) => elem.value === formData["planType"]);
        const mappedFrequency = data.frequencies.find((elem) => elem.value === formData["planFrequency"]);

        const addOnTotal = mappedAddOns.reduce((subtotal, elem) => {
            const addOnData = data.addOns.find((item) => item.name === elem.id);
            if (addOnData) {
                return (subtotal = subtotal + addOnData.cost[mappedFrequency.value]);
            }
            return subtotal;
        }, 0);

        if (mappedPlanType && mappedFrequency) {
            setTotal(mappedPlanType.cost[mappedFrequency.value] + addOnTotal || 0);
            setPlanType(mappedPlanType);
            setCurrency(mappedPlanType.cost.currency);
            setFrequency(mappedFrequency);
        }
    }, [formData]);

    // TODO: show errors or success after submission

    return (
        <div>
            <h2 className={appStyles.currentFormTitle}>
                {sectionTitle}
                <span className="sr-only">&nbsp;({sectionStep})</span>
            </h2>
            <p className={appStyles.currentFormDescription}>{sectionDescription}</p>
            <div className={appStyles.currentFormSet}>
                {planType?.title && frequency?.value && currency && (
                    <div className={appStyles.summaryBlock}>
                        <div className={[appStyles.summaryRow, appStyles.summaryPlan].join(" ")}>
                            <div>
                                <div className={appStyles.summaryPlanTitle}>
                                    {planType?.title} ({frequency?.label})
                                </div>
                                <Button onClick={goToPlanSelectionStep} customClasses={[appStyles.linkButton]}>
                                    {changeLabel}
                                </Button>
                            </div>
                            <div className={appStyles.summaryPrice}>
                                <Price
                                    amount={planType?.cost[frequency?.value]}
                                    frequency={frequency?.value}
                                    currency={currency}
                                />
                            </div>
                        </div>
                        {addOns?.length > 0 && (
                            <div className={appStyles.summaryAddOns}>
                                {addOns.map((addOn, index) => (
                                    <SummaryAddOnRow key={`addon-${index}`} item={addOn} frequency={frequency} />
                                ))}
                            </div>
                        )}
                    </div>
                )}
                {total > 0 && (
                    <div className={appStyles.summaryTotal}>
                        <div className={appStyles.summaryRow}>
                            <div>{totalLabel}</div>
                            <div className={appStyles.summaryTotalPrice}>
                                +
                                <Price amount={total} frequency={frequency?.value} currency={currency} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

SummaryFormSet.propTypes = {
    intl: PropTypes.object.isRequired,
    formData: PropTypes.object,
    formErrors: PropTypes.object,
    onChange: PropTypes.func,
    currentStep: PropTypes.number,
    totalSteps: PropTypes.number,
    goToPlanSelectionStep: PropTypes.func,
};

export default injectIntl(SummaryFormSet);
