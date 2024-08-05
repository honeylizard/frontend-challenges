import React from "react";
import { Helmet } from "react-helmet";

import appStyles from "../../styles/e-commerce-product-page/app.module.scss";

import Footer from "./Footer";
import Header from "./header/Header";

const ElectronicCommerceProductPage = () => {
    return (
        <React.Fragment>
            <Helmet>
                <body className={appStyles.solutionContainer} />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Kumbh+Sans:wght@400;700&display=swap"
                />
            </Helmet>
            <div className={appStyles.container}>
                <Header />
                <main id="content" className={appStyles.content} />
                <Footer />
            </div>
        </React.Fragment>
    );
};

export default ElectronicCommerceProductPage;
