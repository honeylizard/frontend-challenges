import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import { Helmet } from "react-helmet";

import Footer from "./Footer";

import PersonalInfoFormSet from "./formSections/PersonalInfoFormSet";
import PlanSelectionFormSet from "./formSections/PlanSelectionFormSet";
import AddOnsFormSet from "./formSections/AddOnsFormSet";
import SummaryFormSet from "./formSections/SummaryFormSet";

import FormSuccessMessage from "./common/FormSuccessMessage";
import Button from "./common/Button";

import appStyles from "../../styles/multi-step-form/app.module.scss";

const MultiStepFormPage = ({ intl }) => {
    const [currentStepIndex, setCurrentStepIndex] = useState(null);
    const [currentStep, setCurrentStep] = useState(null);

    const initialFormData = {
        name: "",
        email: "",
        phone: "",
        planType: "",
        planFrequency: "",
    };
    const [formData, setFormData] = useState(initialFormData);
    const [formErrors, setFormErrors] = useState(null); // Set of form field errors

    const [formSubmitted, setFormSubmitted] = useState(false);

    const title = intl.formatMessage({
        id: "multiStepForm.title",
    });

    const steps = useMemo(() => {
        return [
            {
                title: "Your info",
                component: PersonalInfoFormSet,
                isCompleted: false,
            },
            {
                title: "Select plan",
                component: PlanSelectionFormSet,
                isCompleted: false,
            },
            {
                title: "Add-ons",
                component: AddOnsFormSet,
                isCompleted: false,
            },
            {
                title: "Summary",
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
    };

    const goToNextSection = () => {
        const newIndex =
            currentStepIndex < steps.length - 1
                ? currentStepIndex + 1
                : steps.length;
        setCurrentStep(steps[newIndex]);
        setCurrentStepIndex(newIndex);
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

    console.log("formData", formData);

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
                                        step.component ===
                                            currentStep?.component &&
                                        step.title === currentStep?.title;
                                    return (
                                        <li key={`step-${index}`}>
                                            {isCurrent && (
                                                <span className="sr-only">
                                                    Current:{" "}
                                                </span>
                                            )}
                                            {step.isCompleted && (
                                                <span className="sr-only">
                                                    Completed:{" "}
                                                </span>
                                            )}
                                            Step {index + 1}
                                            <br />
                                            {step.title}
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
                                        />
                                    )}
                                    <div className={buttonRowClasses.join(" ")}>
                                        {!isCurrentFirstInSet && (
                                            <Button onClick={goToPrevSection}>
                                                Go Back
                                            </Button>
                                        )}
                                        {!isCurrentLastInSet && (
                                            <Button onClick={goToNextSection}>
                                                Next Step
                                            </Button>
                                        )}
                                        {isCurrentLastInSet && (
                                            <Button onClick={handleSubmit}>
                                                Confirm
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