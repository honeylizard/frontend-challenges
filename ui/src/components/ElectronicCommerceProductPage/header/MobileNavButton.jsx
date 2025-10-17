import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import ModalWrapper from "./ModalWrapper";
import NavList from "./NavList";

import buttonStyles from "../../../styles/e-commerce-product-page/mobile-nav-button.module.scss";

const MobileNavButton = ({ intl }) => {
    const headerNavOpenButtonLabel = intl.formatMessage({
        id: "eCommerceProductPage.nav.primary.open",
    });
    const headerTitleLabel = intl.formatMessage({
        id: "eCommerceProductPage.header.title",
    });

    return (
        <ModalWrapper
            id="header_nav_primary"
            triggerLabel={headerNavOpenButtonLabel}
            triggerIconOnly={true}
            triggerIcon={<FontAwesomeIcon icon={faBars} aria-hidden="true" />}
            customTriggerButtonClasses={[buttonStyles.headerNavMobileButton]}
            showConfirmButton={false}
            customContainerClasses={[buttonStyles.stickyLeft, buttonStyles.headerNavMobile]}
            title={<div className="sr-only">{headerTitleLabel}</div>}
        >
            <NavList mobile={true} />
        </ModalWrapper>
    );
};

MobileNavButton.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(MobileNavButton);
