import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";

import formFieldStyles from "../../../styles/multi-step-form/form.module.scss";
import FormInputCheckboxSetOption from "./FormInputCheckboxSetOption";

const FormInputCheckboxSet = ({
    intl,
    id,
    label,
    name,
    values = [],
    required = false,
    classNames = [],
    optionClassNames = [],
    optionCheckedClassNames = [],
    options = [],
    errorMessage,
    helpMessage,
    labelComponent,
    onChange,
    ...attrs
}) => {
    const optionalLabel = intl.formatMessage({ id: "form.optional" });

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
                {options?.length > 0 &&
                    options.map((opt, index) => (
                        <FormInputCheckboxSetOption
                            key={opt.key || index}
                            id={id}
                            name={name}
                            values={values}
                            option={opt}
                            classNames={optionClassNames}
                            checkedClassNames={optionCheckedClassNames}
                            labelComponent={labelComponent}
                            onChange={onChange}
                            {...attrs}
                        />
                    ))}
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
    classNames: PropTypes.arrayOf(PropTypes.string),
    optionClassNames: PropTypes.arrayOf(PropTypes.string),
    optionCheckedClassNames: PropTypes.arrayOf(PropTypes.string),
    options: PropTypes.array,
    errorMessage: PropTypes.string,
    helpMessage: PropTypes.string,
    labelComponent: PropTypes.func,
    onChange: PropTypes.func,
};

export default injectIntl(FormInputCheckboxSet);
