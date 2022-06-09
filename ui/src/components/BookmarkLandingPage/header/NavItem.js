import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import pageStyles from "../../../styles/bookmark-landing-page/page.module.scss";

const HeaderNavItem = ({ url, label, ...attr }) => {
    return (
        <li {...attr}>
            <Link to={url} className={pageStyles.basicLink}>
                {label}
            </Link>
        </li>
    );
};

HeaderNavItem.propTypes = {
    url: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
};

export default HeaderNavItem;
