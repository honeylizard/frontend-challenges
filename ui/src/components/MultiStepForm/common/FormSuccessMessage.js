import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";

import thankYouImage from "../../../assets/multi-step-form/icon-thank-you.svg";
import appStyles from "../../../styles/multi-step-form/app.module.scss";

const FormSuccessMessage = ({ intl }) => {
    const title = intl.formatMessage({
        id: "multiStepForm.success.title",
    });
    const description = intl.formatMessage({
        id: "multiStepForm.success.description",
    });

    return (
        <div>
            <img src={thankYouImage} alt="" role="presentation" />
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    );
};

FormSuccessMessage.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(FormSuccessMessage);
