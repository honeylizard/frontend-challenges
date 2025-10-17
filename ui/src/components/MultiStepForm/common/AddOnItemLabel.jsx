import React from "react";
import PropTypes from "prop-types";

import Price from "./Price";

import appStyles from "@styles/multi-step-form/app.module.scss";

const AddOnItemLabel = ({ data = {}, planFrequency = "" }) => {
    const currentAmount = data.cost[planFrequency] || 0;
    return (
        <div className={appStyles.addOnLabel}>
            <div>
                <div className={appStyles.addOnTitle}>{data.label}</div>
                <div className={appStyles.addOnDesc}>{data.subLabel}</div>
            </div>
            <div className={appStyles.addOnPrice}>
                <Price amount={currentAmount} frequency={planFrequency} currency={data.cost.currency} />
            </div>
        </div>
    );
};

AddOnItemLabel.propTypes = {
    data: PropTypes.shape({
        cost: PropTypes.object,
        label: PropTypes.string,
        subLabel: PropTypes.string,
    }),
    planFrequency: PropTypes.string,
};

export default AddOnItemLabel;
