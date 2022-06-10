import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import ButtonLink from "./ButtonLink";
import NavListItem from "./NavListItem";

const NavList = ({
    intl,
    navClasses,
    label,
    data = [],
    listClasses,
    itemKeyPrefix,
    itemCustomClasses,
    itemIconOnly = false,
    includeLoginButton = false,
    loginButtonType = "tertiary",
}) => {
    const loginLabel = intl.formatMessage({
        id: "bookmarkLanding.login",
    });

    return (
        <nav className={navClasses} aria-label={label}>
            <ul className={listClasses}>
                {data &&
                    data.length > 0 &&
                    data.map((item, index) => (
                        <NavListItem
                            key={`${itemKeyPrefix}${index}`}
                            data={item}
                            linkClasses={itemCustomClasses}
                            iconOnly={itemIconOnly}
                        />
                    ))}
                {includeLoginButton && (
                    <ButtonLink url="#" type={loginButtonType}>
                        {loginLabel}
                    </ButtonLink>
                )}
            </ul>
        </nav>
    );
};

NavList.propTypes = {
    intl: PropTypes.object.isRequired,
    navClasses: PropTypes.string,
    label: PropTypes.string.isRequired,
    data: PropTypes.array,
    listClasses: PropTypes.string,
    itemKeyPrefix: PropTypes.string,
    itemCustomClasses: PropTypes.string,
    itemIconOnly: PropTypes.bool,
    includeLoginButton: PropTypes.bool,
    loginButtonType: PropTypes.string,
};

export default injectIntl(NavList);
