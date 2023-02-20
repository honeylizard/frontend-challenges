import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";

import formFieldStyles from "../../../styles/multi-step-form/form.module.scss";

const FormInputCheckboxSet = ({
    intl,
    id,
    label,
    name,
    values = [],
    required = false,
    classNames = [],
    optionClassNames = [],
    options = [],
    errorMessage,
    helpMessage,
    labelComponent,
    ...attrs
}) => {
    const optionalLabel = intl.formatMessage({ id: "form.optional" });

    const renderOption = (option, index) => {
        const optionKey = option.key || index;
        const optionId = `${id}-${optionKey}`;
        const optionName = `${name}-${option.name}`;

        const optionLevelClasses = [formFieldStyles.horizontalRow, ...optionClassNames].filter(Boolean);

        const CustomComponent = labelComponent;

        return (
            <div key={optionKey} className={optionLevelClasses.join(" ")}>
                <input
                    {...attrs}
                    type="checkbox"
                    name={optionName}
                    id={optionId}
                    checked={values[option.name] === true ? "checked" : false}
                />
                {labelComponent ? (
                    <label htmlFor={optionId}>
                        <CustomComponent data={option} />
                    </label>
                ) : (
                    <label htmlFor={optionId}>{option.label}</label>
                )}
            </div>
        );
    };

    const parentLevelClasses = [
        formFieldStyles.fieldWrapper,
        errorMessage ? formFieldStyles.invalidField : null,
        ...classNames,
    ].filter(Boolean);

    return (
        <div className={parentLevelClasses.join(" ")}>
            <fieldset>
                <legend className="sr-only">
                    {label}
                    {required ? (
                        <span className={formFieldStyles.requiredText} aria-hidden="true">
                            {" "}
                            *
                        </span>
                    ) : (
                        <span aria-hidden="true"> ({optionalLabel})</span>
                    )}
                </legend>
                {options && options.map((opt, index) => renderOption(opt, index))}
            </fieldset>
            {errorMessage && (
                <div id={`${id}-error`} className={formFieldStyles.fieldErrorText} role="alert">
                    {errorMessage}
                </div>
            )}
            {helpMessage && (
                <div id={`${id}-help`} className={formFieldStyles.fieldHelpText}>
                    {helpMessage}
                </div>
            )}
        </div>
    );
};

FormInputCheckboxSet.propTypes = {
    intl: PropTypes.object.isRequired,
    id: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    values: PropTypes.object,
    required: PropTypes.bool,
    classNames: PropTypes.array,
    optionClassNames: PropTypes.array,
    options: PropTypes.array,
    errorMessage: PropTypes.string,
    helpMessage: PropTypes.string,
    labelComponent: PropTypes.func,
};

export default injectIntl(FormInputCheckboxSet);
