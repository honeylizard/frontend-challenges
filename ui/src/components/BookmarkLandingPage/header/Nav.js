import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import {
    faFacebookSquare,
    faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import ModalWrapper from "../common/ModalWrapper";
import appLogo from "../../../assets/bookmark-landing-page/logo-bookmark-white.svg";

import pageStyles from "../../../styles/bookmark-landing-page/page.module.scss";
import NavList from "../common/NavList";

const Nav = ({ intl, navLabel, data = {} }) => {
    const headerLogoAlt = intl.formatMessage({
        id: "bookmarkLanding.header.logoAlt",
    });
    const headerNavOpenButtonLabel = intl.formatMessage({
        id: "bookmarkLanding.nav.primary.open",
    });
    const headerSocialNavLabel = intl.formatMessage({
        id: "bookmarkLanding.nav.social.header",
    });

    const navItems = data.nav;
    const socialNavItems = data.socialNav.map((item) => {
        return {
            ...item,
            icon:
                item.iconType === "facebook"
                    ? faFacebookSquare
                    : item.iconType === "twitter"
                    ? faTwitter
                    : null,
        };
    });

    return (
        <React.Fragment>
            <ModalWrapper
                id="header_nav_primary"
                triggerLabel={headerNavOpenButtonLabel}
                triggerIconOnly={true}
                triggerIcon={
                    <FontAwesomeIcon icon={faBars} aria-hidden="true" />
                }
                customTriggerButtonClasses={[pageStyles.headerNavMobileButton]}
                showConfirmButton={false}
                customContainerClasses={[pageStyles.headerNavModal]}
                customCloseClasses={[pageStyles.headerNavModalClose]}
                title={
                    <img
                        src={appLogo}
                        alt={headerLogoAlt}
                        className={pageStyles.headerNavMobileLogo}
                    />
                }
                customFooter={
                    <NavList
                        label={headerSocialNavLabel}
                        navClasses={pageStyles.headerNavSocialMobileContainer}
                        listClasses={pageStyles.headerNavSocialMobile}
                        data={socialNavItems}
                        itemKeyPrefix="header-social-nav-item-"
                        itemCustomClasses={pageStyles.socialMediaLink}
                        itemIconOnly={true}
                    />
                }
            >
                <div className={pageStyles.headerNavMobileContainer}>
                    <NavList
                        label={navLabel}
                        listClasses={pageStyles.headerNavMobile}
                        data={navItems}
                        itemKeyPrefix="nav-item-"
                        itemCustomClasses={pageStyles.basicLink}
                        includeLoginButton={true}
                        loginButtonType={"mobile"}
                    />
                </div>
            </ModalWrapper>
            <NavList
                label={navLabel}
                data={navItems}
                navClasses={pageStyles.headerNavContainer}
                listClasses={[pageStyles.headerNavDesktop].join(" ")}
                itemKeyPrefix="nav-item-"
                itemCustomClasses={pageStyles.basicLink}
                includeLoginButton={true}
            />
        </React.Fragment>
    );
};

Nav.propTypes = {
    intl: PropTypes.object.isRequired,
    navLabel: PropTypes.string.isRequired,
    data: PropTypes.shape({
        nav: PropTypes.array,
        socialNav: PropTypes.array,
    }),
};

export default injectIntl(Nav);
