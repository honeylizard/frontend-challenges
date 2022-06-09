import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import ModalWrapper from "../common/ModalWrapper";
import HeaderNavList from "./NavList";

import pageStyles from "../../../styles/bookmark-landing-page/page.module.scss";

const Nav = ({ intl, navLabel }) => {
    const navItems = [
        {
            label: "Features",
            url: "#",
        },
        {
            label: "Pricing",
            url: "#",
        },
        {
            label: "Contact",
            url: "#",
        },
    ];

    // TODO: move navigation data
    // TODO: convert to translatable text

    return (
        <React.Fragment>
            <ModalWrapper
                id="header_nav_primary"
                triggerLabel="Open Primary Navigation"
                triggerIconOnly={true}
                triggerIcon={
                    <FontAwesomeIcon icon={faBars} aria-hidden="true" />
                }
                customTriggerButtonClasses={[pageStyles.headerNavMobileButton]}
                showConfirmButton={false}
            >
                <HeaderNavList
                    data={navItems}
                    label={navLabel}
                    listClasses={[pageStyles.headerNavMobile]}
                />
            </ModalWrapper>
            <HeaderNavList
                data={navItems}
                label={navLabel}
                listClasses={[pageStyles.headerNavDesktop]}
            />
        </React.Fragment>
    );
};

Nav.propTypes = {
    intl: PropTypes.object.isRequired,
    navLabel: PropTypes.string.isRequired,
};

export default injectIntl(Nav);
