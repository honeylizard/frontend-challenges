import React from "react";
import PropTypes from "prop-types";

import FormInputCheckboxSet from "../common/FormInputCheckboxSet";
import data from "../../../assets/multi-step-form/data.json";

import appStyles from "../../../styles/multi-step-form/app.module.scss";
import AddOnItemLabel from "../common/AddOnItemLabel";

const AddOnsFormSet = ({
    formData,
    formErrors,
    onChangeSet,
    currentStep = 3,
    totalSteps = 4,
}) => {
    return (
        <div>
            <h2>
                Pick add-ons
                <span className="sr-only">
                    &nbsp;(Step {currentStep} of {totalSteps})
                </span>
            </h2>
            <p>Add-ons help enhance your gaming experience.</p>
            <div className={appStyles.currentFormSet}>
                <FormInputCheckboxSet
                    id="addOns"
                    name="addOns"
                    label="Add-ons"
                    required={false}
                    errorMessage={formErrors && formErrors["addOns"]}
                    values={formData["addOns"]}
                    options={data.addOns}
                    helpMessage="Example Help Text"
                    onChange={onChangeSet}
                    classNames={[appStyles.addOnsContainer]}
                    optionClassNames={[appStyles.addOnCard]}
                    labelComponent={AddOnItemLabel}
                />
            </div>
        </div>
    );
};

AddOnsFormSet.propTypes = {
    formData: PropTypes.object,
    formErrors: PropTypes.object,
    onChangeSet: PropTypes.func,
    currentStep: PropTypes.number,
    totalSteps: PropTypes.number,
};

export default AddOnsFormSet;
