import React, { useState } from "react";
import PropTypes from "prop-types";
import { injectIntl, FormattedPlural } from "react-intl";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { debounce } from "lodash";

import Button from "../CountriesList/common/Button";

import arrowIcon from "../../assets/age-calculator-app/icon-arrow.svg";

import styles from "../../styles/age-calculator-app/app.module.scss";

const INITIAL_RESULTS = { days_ago: "--", months_ago: "--", years_ago: "--" };

const Calculator = ({ intl }) => {
    // Set of form fields and "hidden" fields that will be passed through when submitted
    const [formData, setFormData] = useState({ day: null, month: null, year: null });
    const [results, setResults] = useState(INITIAL_RESULTS);
    const formFields = [
        {
            id: "day",
            type: "number",
            label: intl.formatMessage({ id: "ageCalculatorApp.day" }),
            placeholder: "DD",
        },
        {
            id: "month",
            type: "number",
            label: intl.formatMessage({ id: "ageCalculatorApp.month" }),
            placeholder: "MM",
        },
        {
            id: "year",
            type: "number",
            label: intl.formatMessage({ id: "ageCalculatorApp.year" }),
            placeholder: "YYYY",
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
            [name || id]: newValue,
        }));
    };

    const handleSubmit = () => {
        if (formData.year > 0 && formData.month > 0 && formData.day > 0) {
            dayjs.extend(relativeTime);

            const formDate = dayjs().set("year", formData.year).set("month", formData.month).set("day", formData.day);
            const now = dayjs();

            const diffInYears = now.diff(formDate, "year", true);
            const yearsRemainder = diffInYears - Math.floor(diffInYears);
            const yearsRemainderAsMonths = yearsRemainder * 12; // remainder in months
            const monthsRemainder = yearsRemainderAsMonths - Math.floor(yearsRemainderAsMonths);
            const monthsRemainderAsDays = (monthsRemainder / 12) * 365; // remainder of months (outside of the floored years)

            /*
            const daysRemainder = monthsRemainderAsDays - Math.floor(monthsRemainderAsDays);

            console.log("data", {
                formDate,
                now,
                difference: now.diff(formDate),
                diffInYears: Math.floor(diffInYears),
                yearsRemainder,
                diffRemainingMonths: Math.floor(yearsRemainderAsMonths),
                monthsRemainder,
                diffRemainingDays: Math.floor(monthsRemainderAsDays),
                daysRemainder,
                test: formDate
                    .add(diffInYears, "year")
                    .add(Math.floor(yearsRemainderAsMonths), "month")
                    .add(Math.floor(monthsRemainderAsDays), "day"),
            });
            */

            setResults({
                days_ago: Math.floor(monthsRemainderAsDays),
                months_ago: Math.floor(yearsRemainderAsMonths),
                years_ago: Math.floor(diffInYears),
            });
        } else {
            if (results !== INITIAL_RESULTS) {
                console.log("reset results");
                setResults(INITIAL_RESULTS);
            }
        }
    };

    return (
        <div className={styles.card}>
            <form>
                <div className={styles.form}>
                    {formFields.map((field) => (
                        <div key={`input-${field.id}`} className={styles.field}>
                            <label className={styles.label} htmlFor={field.id}>
                                {field.label}
                            </label>
                            <input
                                id={field.id}
                                className={styles.input}
                                type={field.type || "text"}
                                onChange={debounce(updateValue, 500)}
                                placeholder={field.placeholder}
                            />
                        </div>
                    ))}
                </div>
                <div className={styles.divider}>
                    <div className={styles.lineBefore} />
                    <Button
                        type="submit"
                        customClasses={[styles.submitButton]}
                        aria-label={submitButtonLabel}
                        onClick={handleSubmit}
                    >
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
