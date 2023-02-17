import React from "react";
import PropTypes from "prop-types";

import Price from "./Price";

import appStyles from "../../../styles/multi-step-form/app.module.scss";

const AddOnItemLabel = ({ data }) => (
    <div className={appStyles.addOnLabel}>
        <div>
            <div className={appStyles.addOnTitle}>{data.label}</div>
            <div className={appStyles.addOnDesc}>{data.subLabel}</div>
        </div>
        <div className={appStyles.addOnPrice}>
            <Price
                amount={data.price}
                frequency={data.priceFrequency}
                currency={data.currency}
            />
        </div>
    </div>
);

AddOnItemLabel.propTypes = {
    data: PropTypes.object,
};

export default AddOnItemLabel;
