import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";

const CountryDataPoint = ({ intl, label, value, labelIntlId }) => {
    const labelIntl = labelIntlId ? intl.formatMessage({ id: labelIntlId }) : null;

    return (
        <div>
            <strong>{labelIntl || label}</strong>: {value}
        </div>
    );
};

CountryDataPoint.propTypes = {
    intl: PropTypes.object.isRequired,
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    labelIntlId: PropTypes.string,
};

export default injectIntl(CountryDataPoint);
