import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";

import thankYouImage from "../../../assets/multi-step-form/icon-thank-you.svg";
import appStyles from "../../../styles/multi-step-form/app.module.scss";

const FormSuccessMessage = ({ intl }) => {
    return (
        <div>
            <img src={thankYouImage} alt="" role="presentation" />
            <h2>Thank you!</h2>
            <p>
                Thanks for confirming your subscription! We hope you have fun
                using our platform. If you ever need support, please feel free
                to email us at support@loremgaming.com.
            </p>
        </div>
    );
};

FormSuccessMessage.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(FormSuccessMessage);
