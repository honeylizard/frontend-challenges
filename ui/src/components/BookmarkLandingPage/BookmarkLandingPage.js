import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import OverviewSection from "./section/OverviewSection";
import FeatureSection from "./section/FeaturesSection";
import DownloadSection from "./section/DownloadSection";
import FaqSection from "./section/FaqSection";

import data from "../../assets/bookmark-landing-page/data.json";

import pageStyles from "../../styles/bookmark-landing-page/page.module.scss";

const BookmarkLandingPage = () => {
    return (
        <React.Fragment>
            <Header />
            <main
                id="content"
                className={[pageStyles.content, "main"].join(" ")}
            >
                <div className={pageStyles.wrapper}>
                    <OverviewSection data={data.overview} />
                    <FeatureSection data={data.features} />
                    <DownloadSection data={data.download} />
                    <FaqSection data={data.faq} />
                </div>
            </main>
            <Footer />
        </React.Fragment>
    );
};

export default BookmarkLandingPage;
