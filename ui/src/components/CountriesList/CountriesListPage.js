import React, { useState } from "react";
import PropTypes from "prop-types";
import { injectIntl, FormattedMessage } from "react-intl";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import CountriesList from "./CountriesList";
import countriesApiStyle from "../../styles/countries-api/countries-api.module.scss";

const CountriesListPage = ({ intl }) => {
    const [darkMode, setDarkMode] = useState(true);

    const title = intl.formatMessage({ id: "header.appTitle" });
    const subtitle = intl.formatMessage({ id: "countriesApi.subtitle" });
    const skipToContentLabel = intl.formatMessage({ id: "app.skipToContent" });
    const challengeLinkUrl = intl.formatMessage({ id: "footer.challenge.url" });
    const challengeLinkLabel = intl.formatMessage({
        id: "footer.challenge.name",
    });
    const codedBy = intl.formatMessage({ id: "footer.codedBy" });

    const headerTitle = intl.formatMessage({ id: "countriesApi.header.title" });
    const darkModeLabal = intl.formatMessage({ id: "countriesApi.mode.dark" });
    const lightModeLabel = intl.formatMessage({
        id: "countriesApi.mode.light",
    });

    const bodyClasses = [
        countriesApiStyle.solutionContainer,
        darkMode
            ? countriesApiStyle.solutionContainerDark
            : countriesApiStyle.solutionContainerLight,
    ].filter(Boolean);

    const handleThemeToggle = () => {
        setDarkMode(!darkMode);
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
                    onClick={handleThemeToggle}
                >
                    <FontAwesomeIcon
                        icon={darkMode ? faSun : faMoon}
                        aria-hidden="true"
                    />
                    &nbsp;
                    {darkMode ? lightModeLabel : darkModeLabal}
                </button>
            </header>
            <div
                id="content"
                className={[countriesApiStyle.content, "main"].join(" ")}
                role="main"
            >
                <div className={countriesApiStyle.wrapper}>
                    <section className={countriesApiStyle.section}>
                        <h1 className="sr-only">{title}</h1>
                        <h2 className="sr-only">{subtitle}</h2>
                        <CountriesList darkMode={darkMode} />
                    </section>
                </div>
            </div>
            <footer role="contentinfo" className={countriesApiStyle.footer}>
                <div className={countriesApiStyle.wrapper}>
                    <FormattedMessage
                        id="footer.challenge.link"
                        values={{
                            link: (
                                <a
                                    href={challengeLinkUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {challengeLinkLabel}
                                </a>
                            ),
                        }}
                    />
                    <br />
                    {codedBy}
                </div>
            </footer>
        </React.Fragment>
    );
};

CountriesListPage.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(CountriesListPage);
