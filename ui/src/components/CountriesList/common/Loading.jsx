import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";

const Loading = ({ intl, customClasses, customMessage }) => {
    const loadingLabel = intl.formatMessage({ id: "app.loading" });
    return <div className={customClasses}>{customMessage || loadingLabel}</div>;
};

Loading.propTypes = {
    intl: PropTypes.object.isRequired,
    customClasses: PropTypes.string,
    customMessage: PropTypes.string,
};

export default injectIntl(Loading);
