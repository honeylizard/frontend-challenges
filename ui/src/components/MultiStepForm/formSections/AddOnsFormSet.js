import React from "react";
import PropTypes from "prop-types";

import FormInput from "../common/FormInput";

import appStyles from "../../../styles/multi-step-form/app.module.scss";

const AddOnsFormSet = ({
    formData,
    formErrors,
    onChange,
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
                <div>
                    <div>Online service Access to multiplayer games +$1/mo</div>
                    <div>Larger storage Extra 1TB of cloud save +$2/mo</div>
                    <div>
                        Customizable Profile Custom theme on your profile +$2/mo
                    </div>
                </div>
            </div>
        </div>
    );
};

AddOnsFormSet.propTypes = {
    formData: PropTypes.object,
    formErrors: PropTypes.object,
    onChange: PropTypes.func,
    currentStep: PropTypes.number,
    totalSteps: PropTypes.number,
};

export default AddOnsFormSet;
