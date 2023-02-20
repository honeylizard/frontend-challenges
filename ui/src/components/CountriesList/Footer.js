import React from "react";
import PropTypes from "prop-types";
import { injectIntl, FormattedMessage } from "react-intl";
import countriesApiStyle from "../../styles/countries-api/countries-api.module.scss";

const Footer = ({ intl }) => {
    const challengeLinkUrl = intl.formatMessage({ id: "footer.challenge.url" });
    const challengeLinkLabel = intl.formatMessage({
        id: "footer.challenge.name",
    });
    const codedBy = intl.formatMessage({ id: "footer.codedBy" });

    return (
        <footer className={countriesApiStyle.footer}>
            <div className={countriesApiStyle.wrapper}>
                <FormattedMessage
                    id="footer.challenge.link"
                    values={{
                        link: (
                            <a href={challengeLinkUrl} target="_blank" rel="noreferrer">
                                {challengeLinkLabel}
                            </a>
                        ),
                    }}
                />
                <br />
                {codedBy}
            </div>
        </footer>
    );
};

Footer.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(Footer);
