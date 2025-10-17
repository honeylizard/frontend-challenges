import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";

import listStyles from "../../../styles/e-commerce-product-page/nav-list.module.scss";

const NavList = ({ intl, mobile = false }) => {
    const primaryNavLabel = intl.formatMessage({
        id: "eCommerceProductPage.nav.primary",
    });
    const collectionsNavLabel = intl.formatMessage({
        id: "eCommerceProductPage.nav.collections",
    });
    const menNavLabel = intl.formatMessage({
        id: "eCommerceProductPage.nav.men",
    });
    const womenNavLabel = intl.formatMessage({
        id: "eCommerceProductPage.nav.women",
    });
    const aboutNavLabel = intl.formatMessage({
        id: "eCommerceProductPage.nav.about",
    });
    const contactNavLabel = intl.formatMessage({
        id: "eCommerceProductPage.nav.contact",
    });

    const classes = [listStyles.navList];

    if (mobile) {
        classes.push(listStyles.navListMobile);
    }

    return (
        <nav aria-label={primaryNavLabel} className={classes.join(" ")}>
            <ul>
                <li>
                    <a href="#">{collectionsNavLabel}</a> {/* eslint-disable-line jsx-a11y/anchor-is-valid  */}
                </li>
                <li>
                    <a href="#">{menNavLabel}</a> {/* eslint-disable-line jsx-a11y/anchor-is-valid  */}
                </li>
                <li>
                    <a href="#">{womenNavLabel}</a> {/* eslint-disable-line jsx-a11y/anchor-is-valid  */}
                </li>
                <li>
                    <a href="#">{aboutNavLabel}</a> {/* eslint-disable-line jsx-a11y/anchor-is-valid  */}
                </li>
                <li>
                    <a href="#">{contactNavLabel}</a> {/* eslint-disable-line jsx-a11y/anchor-is-valid  */}
                </li>
            </ul>
        </nav>
    );
};

NavList.propTypes = {
    intl: PropTypes.object.isRequired,
    mobile: PropTypes.bool,
};

export default injectIntl(NavList);
