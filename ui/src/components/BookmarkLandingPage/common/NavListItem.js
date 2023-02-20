import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavListItem = ({ data = {}, linkClasses, iconOnly = false, ...attr }) => {
    return (
        <li {...attr}>
            <Link to={data.url} className={linkClasses} title={iconOnly ? data.label : null}>
                {iconOnly ? <FontAwesomeIcon icon={data.icon} aria-hidden="true" /> : data.label}
            </Link>
        </li>
    );
};

NavListItem.propTypes = {
    navClasses: PropTypes.string,
    data: PropTypes.shape({
        url: PropTypes.string,
        label: PropTypes.string,
        icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    }),
    linkClasses: PropTypes.string,
    iconOnly: PropTypes.bool,
};

export default NavListItem;
