import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { debounce } from "lodash";

const INITIAL_RESULTS = { days_ago: "-", months_ago: "-", years_ago: "-" };

const Calculator = ({ intl }) => {
    // Set of form fields and "hidden" fields that will be passed through when submitted
    const [formData, setFormData] = useState({ day: null, month: null, year: null });
    const [results, setResults] = useState(INITIAL_RESULTS);

    const updateValue = (event) => {
        const { id, name, value: newValue } = event.target;

        setFormData((prevState) => ({
            ...prevState,
            [name || id]: newValue,
        }));
    };

    const formFields = [
        {
            id: "day",
            type: "number",
            label: intl.formatMessage({ id: "ageCalculatorApp.day" }),
        },
        {
            id: "month",
            type: "number",
            label: intl.formatMessage({ id: "ageCalculatorApp.month" }),
        },
        {
            id: "year",
            type: "number",
            label: intl.formatMessage({ id: "ageCalculatorApp.year" }),
        },
    ];

    useEffect(() => {
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

            console.log("new results");

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
    }, [formData]); // eslint-disable-line react-hooks/exhaustive-deps

    console.log("results", results);

    return (
        <div>
            <form>
                {formFields.map((field) => (
                    <div key={`input-${field.id}`}>
                        <label htmlFor={field.id}>{field.label}</label>
                        <input id={field.id} type={field.type || "text"} onChange={debounce(updateValue, 500)} />
                    </div>
                ))}
            </form>

            <output htmlFor={formFields.map((field) => field.id).join(" ")}>
                <div>
                    {results.years_ago} {intl.formatMessage({ id: "ageCalculatorApp.years" })}
                </div>
                <div>
                    {results.months_ago} {intl.formatMessage({ id: "ageCalculatorApp.months" })}
                </div>
                <div>
                    {results.days_ago} {intl.formatMessage({ id: "ageCalculatorApp.days" })}
                </div>
            </output>
        </div>
    );
};

Calculator.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(Calculator);
