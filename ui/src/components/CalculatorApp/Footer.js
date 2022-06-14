import React, { useContext } from "react";
import PropTypes from "prop-types";
import { injectIntl, FormattedMessage } from "react-intl";

import { GlobalContext } from "../../GlobalStateProvider";

import appStyles from "../../styles/calculator-app/app.module.scss";

const Footer = ({ intl }) => {
    const { calculatorApp: globalData } = useContext(GlobalContext);
    const currentTheme = globalData.theme;

    const challengeLinkUrl = intl.formatMessage({ id: "footer.challenge.url" });
    const challengeLinkLabel = intl.formatMessage({
        id: "footer.challenge.name",
    });
    const codedBy = intl.formatMessage({ id: "footer.codedBy" });

    const themeLabel = intl.formatMessage({
        id: "calculatorApp.theme",
    });

    return (
        <footer className={[appStyles.wrapper, appStyles.footer].join(" ")}>
            {themeLabel}: {currentTheme}
            <br />
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
        </footer>
    );
};

Footer.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(Footer);
