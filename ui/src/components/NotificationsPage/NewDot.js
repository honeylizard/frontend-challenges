import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";

import newDotStyles from "../../styles/notifications-page/newDot.module.scss";

const NewDot = ({ intl, isNew = false, customClasses = [], ...props }) => {
    const dotLabel = intl.formatMessage({
        id: "notificationsPage.newDot",
    });
    const dotClasses = [newDotStyles.dot];

    if (customClasses) {
        dotClasses.push(...customClasses);
    }

    return isNew ? (
        <span className={dotClasses.join(" ")} title={dotLabel} {...props}>
            &nbsp;
        </span>
    ) : null;
};

NewDot.propTypes = {
    intl: PropTypes.object.isRequired,
    isNew: PropTypes.bool,
    customClasses: PropTypes.arrayOf(PropTypes.string),
};

export default injectIntl(NewDot);
