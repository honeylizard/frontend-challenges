import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import Header from "./Header";
import Footer from "./Footer";
import pageTemplateStyle from "../../styles/countries-api/countries-api.module.scss";

const PageTemplate = ({ intl, children }) => {
    return (
        <React.Fragment>
            <Header />
            <main id="content" className={[pageTemplateStyle.content, "main"].join(" ")}>
                <div className={pageTemplateStyle.wrapper}>{children}</div>
            </main>
            <Footer />
        </React.Fragment>
    );
};

PageTemplate.propTypes = {
    intl: PropTypes.object.isRequired,
    children: PropTypes.node,
};

export default injectIntl(PageTemplate);
