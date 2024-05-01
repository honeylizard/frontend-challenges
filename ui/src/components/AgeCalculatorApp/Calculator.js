import React, { useState } from "react";
import PropTypes from "prop-types";
import { injectIntl, FormattedPlural } from "react-intl";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { debounce } from "lodash";

import Button from "../CountriesList/common/Button";

import arrowIcon from "../../assets/age-calculator-app/icon-arrow.svg";

import styles from "../../styles/age-calculator-app/app.module.scss";

const INITIAL_RESULTS = { days_ago: "--", months_ago: "--", years_ago: "--" };

const Calculator = ({ intl }) => {
    dayjs.extend(relativeTime);
    dayjs.extend(customParseFormat);

    // Set of form fields and "hidden" fields that will be passed through when submitted
    const [formData, setFormData] = useState({ day: null, month: null, year: null });
    const [formErrors, setFormErrors] = useState({}); // Set of form field errors
    const [results, setResults] = useState(INITIAL_RESULTS);
    const formFields = [
        {
            id: "day",
            type: "number",
            label: intl.formatMessage({ id: "ageCalculatorApp.day" }),
            placeholder: "DD",
            required: true,
        },
        {
            id: "month",
            type: "number",
            label: intl.formatMessage({ id: "ageCalculatorApp.month" }),
            placeholder: "MM",
            required: true,
        },
        {
            id: "year",
            type: "number",
            label: intl.formatMessage({ id: "ageCalculatorApp.year" }),
            placeholder: "YYYY",
            required: true,
        },
    ];
    const outputFields = [
        {
            id: 1,
            value: results.years_ago,
            label: {
                zero: intl.formatMessage({ id: "ageCalculatorApp.years" }),
                one: intl.formatMessage({ id: "ageCalculatorApp.year" }),
                other: intl.formatMessage({ id: "ageCalculatorApp.years" }),
            },
        },
        {
            id: 2,
            value: results.months_ago,
            label: {
                zero: intl.formatMessage({ id: "ageCalculatorApp.months" }),
                one: intl.formatMessage({ id: "ageCalculatorApp.month" }),
                other: intl.formatMessage({ id: "ageCalculatorApp.months" }),
            },
        },
        {
            id: 3,
            value: results.days_ago,
            label: {
                zero: intl.formatMessage({ id: "ageCalculatorApp.days" }),
                one: intl.formatMessage({ id: "ageCalculatorApp.day" }),
                other: intl.formatMessage({ id: "ageCalculatorApp.days" }),
            },
        },
    ];
    const submitButtonLabel = intl.formatMessage({
        id: "ageCalculatorApp.submit.label",
    });

    const updateValue = (event) => {
        const { id, name, value: newValue } = event.target;

        setFormData((prevState) => ({
            ...prevState,
            [name || id]: newValue.replace(/^0+/, ""), // trim leading zeroes
        }));
    };

    const validateForm = () => {
        let validForm = true;
        setFormErrors({}); // Reset form errors

        const tempFormErrors = {};

        if (formData?.day === "" || formData?.day === null) {
            tempFormErrors["day"] = intl.formatMessage({
                id: "ageCalculatorApp.form.error.required",
            });
        } else if (Number(formData?.day) <= 0 || Number(formData?.day) > 31) {
            tempFormErrors["day"] = intl.formatMessage({
                id: "ageCalculatorApp.form.day.error.invalid",
            });
        }

        if (formData?.month === "" || formData?.month === null) {
            tempFormErrors["month"] = intl.formatMessage({
                id: "ageCalculatorApp.form.error.required",
            });
        } else if (Number(formData?.month) <= 0 || Number(formData?.month) > 12) {
            tempFormErrors["month"] = intl.formatMessage({
                id: "ageCalculatorApp.form.month.error.invalid",
            });
        }

        if (formData?.year === "" || formData?.year === null) {
            tempFormErrors["year"] = intl.formatMessage({
                id: "ageCalculatorApp.form.error.required",
            });
        } else if (Number(formData?.year) <= 0) {
            tempFormErrors["year"] = intl.formatMessage({
                id: "ageCalculatorApp.form.year.error.invalid",
            });
        } else if (Number(formData?.year) > dayjs().year()) {
            tempFormErrors["year"] = intl.formatMessage({
                id: "ageCalculatorApp.form.error.future",
            });
        }

        if (formData.year && formData.month && formData.day) {
            const now = dayjs();
            const dateRaw = [formData.day, formData.month, formData.year].join("-");
            const formDate = dayjs(dateRaw, "D-M-YYYY", true);

            if (formDate.isAfter(now)) {
                tempFormErrors["general"] = intl.formatMessage({
                    id: "ageCalculatorApp.form.error.future",
                });
            }

            if (!formDate.isValid()) {
                tempFormErrors["general"] = intl.formatMessage({
                    id: "ageCalculatorApp.form.error.invalid",
                });
            }
        }

        if (Object.keys(tempFormErrors).length > 0) {
            validForm = false;
            setFormErrors(tempFormErrors);
        }

        return validForm;
    };

    const handleSubmit = (event) => {
        if (event) {
            event.preventDefault();
        }

        if (validateForm()) {
            const now = dayjs();
            const dateRaw = [formData.day, formData.month, formData.year].join("-");
            const formDate = dayjs(dateRaw, "D-M-YYYY", true);

            const diffInYears = now.diff(formDate, "year", true);
            const yearsRemainder = diffInYears > 1 ? diffInYears - Math.floor(diffInYears) : diffInYears;

            const yearsRemainderAsMonths = yearsRemainder * 12; // remainder in months
            const monthsRemainder =
                yearsRemainderAsMonths > 1
                    ? yearsRemainderAsMonths - Math.floor(yearsRemainderAsMonths)
                    : yearsRemainderAsMonths;
            const monthsRemainderAsDays = (monthsRemainder / 12) * 365; // remainder of months (outside of the floored years)

            /*
            // const daysRemainder = monthsRemainderAsDays - Math.floor(monthsRemainderAsDays);

            console.log("data", {
                formDate,
                now,
                difference: now.diff(formDate),
                diffInYears: Math.floor(diffInYears),
                yearsRemainder,
                diffRemainingMonths: Math.floor(yearsRemainderAsMonths),
                monthsRemainder,
                diffRemainingDays: Math.floor(monthsRemainderAsDays),
                // daysRemainder,
                test: formDate
                    .add(diffInYears, "year")
                    .add(Math.floor(yearsRemainderAsMonths), "month")
                    .add(Math.floor(monthsRemainderAsDays), "day"),
            });
            */

            setResults({
                days_ago: monthsRemainderAsDays > 1 ? Math.floor(monthsRemainderAsDays) : monthsRemainderAsDays,
                months_ago: Math.floor(yearsRemainderAsMonths),
                years_ago: Math.floor(diffInYears),
            });
            setFormErrors({});
        } else {
            if (results !== INITIAL_RESULTS) {
                setResults(INITIAL_RESULTS);
            }
        }
    };

    return (
        <div className={styles.card}>
            <form onSubmit={handleSubmit}>
                {formErrors && Object.keys(formErrors).includes("general") && (
                    <div id="generalError" role="alert" className={styles.generalError}>
                        {formErrors["general"]}
                    </div>
                )}
                <div className={styles.form}>
                    {formFields.map((field) => {
                        const hasError = formErrors && formErrors[field.id] ? true : false;
                        const describedByList = [hasError ? `${field.id}-error` : null].filter(Boolean);
                        const parentLevelClasses = [styles.field, hasError ? styles.invalidField : null].filter(
                            Boolean
                        );
                        return (
                            <div key={`input-${field.id}`} className={parentLevelClasses.join(" ")}>
                                <label className={styles.label} htmlFor={field.id}>
                                    {field.label}
                                </label>
                                <input
                                    id={field.id}
                                    className={styles.input}
                                    type={field.type || "text"}
                                    onChange={debounce(updateValue, 500)}
                                    placeholder={field.placeholder}
                                    required={field.required}
                                    aria-invalid={hasError}
                                    aria-describedby={describedByList.length > 0 ? describedByList.join(" ") : null}
                                />
                                {hasError && (
                                    <div
                                        id={`${field.id}-error`}
                                        className={styles.fieldErrorText}
                                        role="alert"
                                        aria-atomic="true"
                                    >
                                        {formErrors[field.id]}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
                <div className={styles.divider}>
                    <div className={styles.lineBefore} />
                    <Button type="submit" customClasses={[styles.submitButton]} aria-label={submitButtonLabel}>
                        <img src={arrowIcon} alt="" role="presentation" />
                    </Button>
                    <div className={styles.lineAfter} />
                </div>
            </form>
            <output className={styles.output} htmlFor={formFields.map((field) => field.id).join(" ")}>
                {outputFields.length > 0 &&
                    outputFields.map((field) => (
                        <div key={`output-${field.id}`}>
                            <span className={styles.number}>{field.value}</span>
                            &nbsp;
                            <span className={styles.label}>
                                <FormattedPlural
                                    value={field.value}
                                    one={field.label.one}
                                    other={field.label.other}
                                    zero={field.label.zero}
                                />
                            </span>
                        </div>
                    ))}
            </output>
        </div>
    );
};

Calculator.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(Calculator);
