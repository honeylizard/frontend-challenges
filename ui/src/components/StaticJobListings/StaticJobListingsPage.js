import React from "react";
import PropTypes from "prop-types";
import { injectIntl, FormattedMessage } from "react-intl";
import { Helmet } from "react-helmet";
import staticJobListingsStyle from "../../styles/static-job-listings/static-job-listings.module.scss";
import JobsList from "./JobsList";

const StaticJobListingsPage = ({ intl }) => {
    const title = intl.formatMessage({ id: "header.appTitle" });
    const subtitle = intl.formatMessage({ id: "staticJobListings.subtitle" });
    const skipToContentLabel = intl.formatMessage({ id: "app.skipToContent" });
    const challengeLinkUrl = intl.formatMessage({ id: "footer.challenge.url" });
    const challengeLinkLabel = intl.formatMessage({
        id: "footer.challenge.name",
    });
    const codedBy = intl.formatMessage({ id: "footer.codedBy" });
    return (
        <React.Fragment>
            <Helmet
                bodyAttributes={{
                    class: staticJobListingsStyle.solutionContainer,
                }}
            />
            <a
                className="sr-only sr-focusable"
                href="#content"
                title={skipToContentLabel}
            >
                {skipToContentLabel}
            </a>
            <header role="banner" className={staticJobListingsStyle.header} />
            <div
                id="content"
                className={[staticJobListingsStyle.content, "main"].join(" ")}
                role="main"
            >
                <div className="wrapper">
                    <section className={staticJobListingsStyle.section}>
                        <h1 className={"sr-only"}>{title}</h1>
                        <h2 className="sr-only">{subtitle}</h2>
                        <JobsList />
                    </section>
                </div>
            </div>
            <footer
                role="contentinfo"
                className={staticJobListingsStyle.footer}
            >
                <div className="wrapper">
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

StaticJobListingsPage.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(StaticJobListingsPage);
