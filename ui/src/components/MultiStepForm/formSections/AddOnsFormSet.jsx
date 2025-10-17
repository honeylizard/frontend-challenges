import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";

import FormInputCheckboxSet from "../common/FormInputCheckboxSet";
import AddOnItemLabel from "../common/AddOnItemLabel";

import data from "@resources/multi-step-form/data.json";

import appStyles from "@styles/multi-step-form/app.module.scss";

const AddOnsFormSet = ({ intl, formData, formErrors, onChangeSet, currentStep = 3, totalSteps = 4 }) => {
    const sectionTitle = intl.formatMessage({
        id: "multiStepForm.addOns.title",
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
        id: "multiStepForm.addOns.description",
    });
    const addOnsLabel = intl.formatMessage({
        id: "multiStepForm.addOns.label",
    });

    return (
        <div>
            <h2 className={appStyles.currentFormTitle}>
                {sectionTitle}
                <span className="sr-only">&nbsp;({sectionStep})</span>
            </h2>
            <p className={appStyles.currentFormDescription}>{sectionDescription}</p>
            <div className={appStyles.currentFormSet}>
                <FormInputCheckboxSet
                    id="addOns"
                    name="addOns"
                    label={addOnsLabel}
                    required={false}
                    errorMessage={formErrors && formErrors["addOns"]}
                    values={formData["addOns"]}
                    options={data.addOns}
                    onChange={onChangeSet}
                    classNames={[appStyles.addOnsContainer]}
                    optionClassNames={[appStyles.addOnCard]}
                    optionCheckedClassNames={[appStyles.addOnCardChecked]}
                    planFrequency={formData["planFrequency"]}
                    labelComponent={AddOnItemLabel}
                />
            </div>
        </div>
    );
};

AddOnsFormSet.propTypes = {
    intl: PropTypes.object.isRequired,
    formData: PropTypes.object,
    formErrors: PropTypes.object,
    onChangeSet: PropTypes.func,
    currentStep: PropTypes.number,
    totalSteps: PropTypes.number,
};

export default injectIntl(AddOnsFormSet);
