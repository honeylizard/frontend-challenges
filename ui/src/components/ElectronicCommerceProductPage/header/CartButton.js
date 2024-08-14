import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";

import buttonStyles from "../../../styles/e-commerce-product-page/cart-button.module.scss";
import CartIcon from "../common/CartIcon";

const CartButton = ({ intl }) => {
    const cartAlt = intl.formatMessage({
        id: "eCommerceProductPage.header.cartAlt",
    });

    return (
        <button type="button" className={buttonStyles.cartImageButton} aria-label={cartAlt}>
            <CartIcon />
        </button>
    );
};

CartButton.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(CartButton);
