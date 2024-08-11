import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";

import CartButton from "./CartButton";
import AvatarButton from "./AvatarButton";
import NavList from "./NavList";
import MobileNavButton from "./MobileNavButton";

import appLogo from "../../../assets/e-commerce-product-page/logo.svg";
import appStyles from "../../../styles/e-commerce-product-page/app.module.scss";

const Header = ({ intl }) => {
    const title = intl.formatMessage({
        id: "eCommerceProductPage.title",
    });
    const skipToContentLabel = intl.formatMessage({ id: "app.skipToContent" });
    const headerLogoAlt = intl.formatMessage({
        id: "eCommerceProductPage.header.logoAlt",
    });

    return (
        <header className={appStyles.header}>
            <h1 className="sr-only">{title}</h1>
            <a className="sr-only sr-focusable" href="#content" title={skipToContentLabel}>
                {skipToContentLabel}
            </a>
            <div className={appStyles.leftGroup}>
                <MobileNavButton />
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid  */}
                <a href="#" className={appStyles.headerLogo}>
                    <img src={appLogo} alt={headerLogoAlt} />
                </a>
                <NavList />
            </div>
            <div className={appStyles.rightGroup}>
                <CartButton />
                <AvatarButton />
            </div>
        </header>
    );
};

Header.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(Header);
