import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";

import formFieldStyles from "@styles/countries-api/form.module.scss";

const FormInputLabel = ({ intl, id, label, required, hideLabel, ...attr }) => {
    const optionalLabel = intl.formatMessage({ id: "form.optional" });

    return (
        <label htmlFor={id} className={hideLabel ? "sr-only" : null} {...attr}>
            {label}
            {required ? (
                <span className={formFieldStyles.requiredText} aria-hidden="true">
                    {" "}
                    *
                </span>
            ) : (
                <span aria-hidden="true"> ({optionalLabel})</span>
            )}
        </label>
    );
};

FormInputLabel.propTypes = {
    intl: PropTypes.object.isRequired,
    id: PropTypes.string,
    label: PropTypes.string,
    hideLabel: PropTypes.bool,
    required: PropTypes.bool,
};

export default injectIntl(FormInputLabel);
