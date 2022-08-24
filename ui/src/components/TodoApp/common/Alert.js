import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import alertStyles from "../../../styles/todo-app/alert.module.scss";

const Alert = ({ intl, id, type = "general", message, ...attrs }) => {
    let typeStyle = null;
    let prefix = null;

    if (type === "success") {
        typeStyle = alertStyles.formGeneralSuccessAlert;
        prefix = intl.formatMessage({ id: "form.alert.prefix.success" }) + ": ";
    } else if (type === "error") {
        typeStyle = alertStyles.formGeneralErrorAlert;
        prefix = intl.formatMessage({ id: "form.alert.prefix.error" }) + ": ";
    } else if (type === "warning") {
        typeStyle = alertStyles.formGeneralWarningAlert;
        prefix = intl.formatMessage({ id: "form.alert.prefix.warning" }) + ": ";
    } else if (type === "info") {
        typeStyle = alertStyles.formGeneralInfoAlert;
        prefix = intl.formatMessage({ id: "form.alert.prefix.info" }) + ": ";
    }

    return (
        <div
            id={id}
            role="alert"
            className={`${alertStyles.formGeneralAlert} ${typeStyle}`}
            {...attrs}
        >
            {prefix} {message}
        </div>
    );
};

Alert.propTypes = {
    intl: PropTypes.object.isRequired,
    id: PropTypes.string,
    type: PropTypes.string,
    message: PropTypes.string,
};

export default injectIntl(Alert);
