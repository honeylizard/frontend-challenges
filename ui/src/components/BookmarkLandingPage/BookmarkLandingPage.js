import React from "react";
import Header from "./header/Header";
import Footer from "./Footer";
import OverviewSection from "./section/OverviewSection";
import FeatureSection from "./section/FeaturesSection";
import DownloadSection from "./section/DownloadSection";
import FaqSection from "./section/FaqSection";

import data from "../../assets/bookmark-landing-page/data.json";

import pageStyles from "../../styles/bookmark-landing-page/page.module.scss";

const BookmarkLandingPage = () => {
    const navData = {
        nav: data.nav,
        socialNav: data.socialNav,
    };

    return (
        <React.Fragment>
            <Header data={navData} />
            <main
                id="content"
                className={[pageStyles.content, "main"].join(" ")}
            >
                <OverviewSection data={data.overview} />
                <FeatureSection data={data.features} />
                <DownloadSection data={data.download} />
                <FaqSection data={data.faq} />
            </main>
            <Footer data={navData} />
        </React.Fragment>
    );
};

export default BookmarkLandingPage;
