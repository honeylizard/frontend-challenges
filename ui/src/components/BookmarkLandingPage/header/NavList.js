import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import ButtonLink from "../common/ButtonLink";
import HeaderNavItem from "./NavItem";

import pageStyles from "../../../styles/bookmark-landing-page/page.module.scss";

const NavList = ({ intl, label, listClasses = [], data = [] }) => {
    const loginLabel = intl.formatMessage({
        id: "bookmarkLanding.login",
    });

    return (
        <nav aria-label={label} className={pageStyles.headerNavContainer}>
            <ul className={listClasses.join(" ")}>
                {data &&
                    data.length > 0 &&
                    data.map((item, index) => (
                        <HeaderNavItem
                            url={item.url}
                            label={item.label}
                            key={`nav-item-${index}`}
                        />
                    ))}
                <li>
                    <ButtonLink url="#" type="tertiary">
                        {loginLabel}
                    </ButtonLink>
                </li>
            </ul>
        </nav>
    );
};

NavList.propTypes = {
    intl: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    listClasses: PropTypes.array,
    data: PropTypes.array,
};

export default injectIntl(NavList);
