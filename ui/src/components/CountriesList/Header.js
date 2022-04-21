import React, { useContext } from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { GlobalContext } from "../../GlobalStateProvider";
import countriesApiStyle from "../../styles/countries-api/countries-api.module.scss";

const Header = ({ intl }) => {
    const { updateCountriesData, countriesApi: globalData } =
        useContext(GlobalContext);
    const currentTheme = globalData.darkMode;

    const skipToContentLabel = intl.formatMessage({ id: "app.skipToContent" });

    const headerTitle = intl.formatMessage({ id: "countriesApi.header.title" });
    const darkModeLabal = intl.formatMessage({ id: "countriesApi.mode.dark" });
    const lightModeLabel = intl.formatMessage({
        id: "countriesApi.mode.light",
    });

    const bodyClasses = [
        countriesApiStyle.solutionContainer,
        currentTheme
            ? countriesApiStyle.solutionContainerDark
            : countriesApiStyle.solutionContainerLight,
    ].filter(Boolean);

    const changeTheme = () => {
        updateCountriesData({
            darkMode: !currentTheme,
        });
    };

    return (
        <React.Fragment>
            <Helmet>
                <body className={bodyClasses.join(" ")} />
            </Helmet>
            <a
                className="sr-only sr-focusable"
                href="#content"
                title={skipToContentLabel}
            >
                {skipToContentLabel}
            </a>
            <header role="banner" className={countriesApiStyle.header}>
                <span className={countriesApiStyle.headerTitle}>
                    {headerTitle}
                </span>

                <button
                    className={countriesApiStyle.themeModeButton}
                    onClick={changeTheme}
                >
                    <FontAwesomeIcon
                        icon={currentTheme ? faSun : faMoon}
                        aria-hidden="true"
                    />
                    &nbsp;
                    {currentTheme ? lightModeLabel : darkModeLabal}
                </button>
            </header>
        </React.Fragment>
    );
};

Header.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(Header);