import React, { useState } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { injectIntl } from "react-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

import appStyles from "../../../styles/todo-app/app.module.scss";

const ThemeToggleButton = ({ intl }) => {
    const [isDarkTheme, setIsDarkTheme] = useState(true);
    const toLightLabel = intl.formatMessage({
        id: "todoApp.theme.toggleAlt.toLight",
    });
    const toDarkLabel = intl.formatMessage({
        id: "todoApp.theme.toggleAlt.toDark",
    });

    const bodyClasses = [
        appStyles.solutionContainer,
        isDarkTheme
            ? appStyles.solutionContainerDark
            : appStyles.solutionContainerLight,
    ].filter(Boolean);

    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    };

    return (
        <React.Fragment>
            <Helmet>
                <body className={bodyClasses.join(" ")} />
            </Helmet>
            <button
                onClick={toggleTheme}
                title={isDarkTheme ? toLightLabel : toDarkLabel}
            >
                <FontAwesomeIcon
                    icon={isDarkTheme ? faSun : faMoon}
                    aria-hidden="true"
                />
            </button>
        </React.Fragment>
    );
};

ThemeToggleButton.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(ThemeToggleButton);