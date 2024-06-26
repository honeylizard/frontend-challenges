import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import { Helmet } from "react-helmet";
import validator from "validator";

import Footer from "./Footer";

import PersonalInfoFormSet from "./formSections/PersonalInfoFormSet";
import PlanSelectionFormSet from "./formSections/PlanSelectionFormSet";
import AddOnsFormSet from "./formSections/AddOnsFormSet";
import SummaryFormSet from "./formSections/SummaryFormSet";

import FormSuccessMessage from "./common/FormSuccessMessage";
import Button from "./common/Button";
import StepNavItem from "./common/StepNavItem";

import appStyles from "../../styles/multi-step-form/app.module.scss";

const MultiStepFormPage = ({ intl }) => {
    const [currentStepIndex, setCurrentStepIndex] = useState(null);
    const [currentStep, setCurrentStep] = useState(null);

    const initialFormData = {
        name: "",
        email: "",
        phone: "",
        planType: "arcade",
        planFrequency: "monthly",
        addOns: {
            online: "",
            storage: "",
            customization: "",
        },
    };
    const [formData, setFormData] = useState(initialFormData);
    const [formErrors, setFormErrors] = useState(null); // Set of form field errors

    const [formSubmitted, setFormSubmitted] = useState(false);

    const title = intl.formatMessage({
        id: "multiStepForm.title",
    });
    const prevButtonLabel = intl.formatMessage({
        id: "multiStepForm.prevStep",
    });
    const nextButtonLabel = intl.formatMessage({
        id: "multiStepForm.nextStep",
    });
    const submitButtonLabel = intl.formatMessage({
        id: "multiStepForm.submit",
    });

    const validatePersonalInfo = (data) => {
        let validForm = true;

        setFormErrors({}); // Reset form errors

        const tempFormErrors = {};

        if (!data?.name || data?.name === "") {
            tempFormErrors["name"] = intl.formatMessage({
                id: "multiStepForm.form.error.required",
            });
            validForm = false;
        } else if (!data?.email || data?.email === "" || !validator.isEmail(data?.email)) {
            tempFormErrors["email"] = intl.formatMessage({
                id: "multiStepForm.form.email.error.invalid",
            });
            validForm = false;
        } else if (!data?.phone || data?.phone === "" || !validator.isMobilePhone(data?.phone)) {
            tempFormErrors["phone"] = intl.formatMessage({
                id: "multiStepForm.form.phone.error.invalid",
            });
            validForm = false;
        }

        if (!validForm) {
            setFormErrors(tempFormErrors);
        }

        return validForm;
    };

    const validatePlanSelection = (data) => {
        let validForm = true;

        setFormErrors({}); // Reset form errors

        const tempFormErrors = {};

        if (!data?.planType || data?.planType === "") {
            tempFormErrors["planType"] = intl.formatMessage({
                id: "multiStepForm.form.error.required",
            });
            validForm = false;
        } else if (!data?.planFrequency || data?.planFrequency === "") {
            tempFormErrors["planFrequency"] = intl.formatMessage({
                id: "multiStepForm.form.error.required",
            });
            validForm = false;
        }

        if (!validForm) {
            setFormErrors(tempFormErrors);
        }

        return validForm;
    };

    const steps = useMemo(() => {
        return [
            {
                key: "personalInfo",
                titleKey: "multiStepForm.personalInfo.label",
                component: PersonalInfoFormSet,
                isCompleted: false,
            },
            {
                key: "plan",
                titleKey: "multiStepForm.planSelection.label",
                component: PlanSelectionFormSet,
                isCompleted: false,
            },
            {
                key: "addOns",
                titleKey: "multiStepForm.addOns.label",
                component: AddOnsFormSet,
                isCompleted: false,
            },
            {
                key: "summary",
                titleKey: "multiStepForm.summary.label",
                component: SummaryFormSet,
                isCompleted: false,
            },
        ];
    }, []);

    useEffect(() => {
        if (steps && steps.length > 0) {
            setCurrentStep(steps[0]);
            setCurrentStepIndex(0);
        }
    }, [steps]);

    const goToPrevSection = () => {
        const newIndex = currentStepIndex > 1 ? currentStepIndex - 1 : 0;
        setCurrentStep(steps[newIndex]);
        setCurrentStepIndex(newIndex);
        // TODO: get the focus to change to the top of the new section
    };

    const goToNextSection = () => {
        let validForm = true;
        if (currentStep.key === "personalInfo") {
            validForm = validatePersonalInfo(formData);
        } else if (currentStep.key === "plan") {
            validForm = validatePlanSelection(formData);
        }

        if (validForm) {
            const newIndex = currentStepIndex < steps.length - 1 ? currentStepIndex + 1 : steps.length;
            setCurrentStep(steps[newIndex]);
            setCurrentStepIndex(newIndex);
            // TODO: get the focus to change to the top of the new section
        }
    };

    const goToPlanSelectionStep = () => {
        const planStep = steps.find((elem) => elem.key === "plan");
        const planIndex = steps.indexOf(planStep);
        if (planStep && planIndex) {
            setCurrentStep(planStep);
            setCurrentStepIndex(planIndex);
            // TODO: get the focus to change to the top of the new section
        }
    };

    const updateValue = (event, type = "general") => {
        if (type === "general") {
            const { id, name, value: newValue } = event.target;

            setFormData((prevState) => ({
                ...prevState,
                [name || id]: newValue,
            }));
        } else {
            const { id, name, value: newValue } = event;

            setFormData((prevState) => ({
                ...prevState,
                [name || id]: newValue,
            }));
        }
    };

    /**
     * Updates the form data with a new value for a specific form field set.
     *
     * @param {Object} event
     */
    const updateValueSet = (event) => {
        const { name, type } = event.target;

        const nameExploded = name.split("-");
        const parentName = nameExploded[0];
        const optionName = nameExploded[1];

        if (type === "checkbox") {
            setFormData((prevState) => {
                const newValues = prevState[parentName];
                newValues[optionName] = !prevState[parentName][optionName];
                return {
                    ...prevState,
                    [parentName]: newValues,
                };
            });
        }
    };

    const handleSubmit = () => {
        console.log("Handle submission of the form here...");
        setFormSubmitted(true);
    };

    const CurrentStepComponent = currentStep?.component;
    const isCurrentFirstInSet = currentStepIndex === 0;
    const isCurrentLastInSet = currentStepIndex === steps.length - 1;

    const buttonRowClasses = [appStyles.buttonRow];

    if (isCurrentFirstInSet) {
        buttonRowClasses.push(appStyles.buttonRowSingle);
    }

    return (
        <React.Fragment>
            <Helmet>
                <body className={appStyles.solutionContainer} />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap"
                />
            </Helmet>
            <div className={appStyles.centerBox}>
                <div className={appStyles.container}>
                    <main id="content" className={appStyles.content}>
                        <h1 className="sr-only">{title}</h1>
                        <div className={appStyles.sidebar}>
                            <ol>
                                {steps.map((step, index) => {
                                    const isCurrent =
                                        (step.component === currentStep?.component &&
                                            step.key === currentStep?.key &&
                                            !formSubmitted) ||
                                        (formSubmitted && index + 1 === steps.length);
                                    const stepTitle = intl.formatMessage({
                                        id: step.titleKey,
                                    });

                                    return (
                                        <li key={`step-${index}`} className={appStyles.sidebarNavItem}>
                                            <StepNavItem
                                                title={stepTitle}
                                                number={index + 1}
                                                isCurrent={isCurrent}
                                                isCompleted={step.isCompleted}
                                            />
                                        </li>
                                    );
                                })}
                            </ol>
                        </div>
                        <div className={appStyles.currentStep}>
                            {formSubmitted ? (
                                <FormSuccessMessage />
                            ) : (
                                <React.Fragment>
                                    {CurrentStepComponent && (
                                        <CurrentStepComponent
                                            formData={formData}
                                            formErrors={formErrors}
                                            onChange={updateValue}
                                            onChangeSet={updateValueSet}
                                            goToPlanSelectionStep={goToPlanSelectionStep}
                                        />
                                    )}
                                    <div className={buttonRowClasses.join(" ")}>
                                        {!isCurrentFirstInSet && (
                                            <Button onClick={goToPrevSection} customClasses={[appStyles.textButton]}>
                                                {prevButtonLabel}
                                            </Button>
                                        )}
                                        {!isCurrentLastInSet && (
                                            <Button onClick={goToNextSection}>{nextButtonLabel}</Button>
                                        )}
                                        {isCurrentLastInSet && (
                                            <Button
                                                onClick={handleSubmit}
                                                type="submit"
                                                customClasses={[appStyles.submitButton]}
                                            >
                                                {submitButtonLabel}
                                            </Button>
                                        )}
                                    </div>
                                </React.Fragment>
                            )}
                        </div>
                    </main>
                    <Footer />
                </div>
            </div>
        </React.Fragment>
    );
};

MultiStepFormPage.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(MultiStepFormPage);
