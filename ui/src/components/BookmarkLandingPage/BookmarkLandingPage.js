import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import Header from "./Header";
import Footer from "./Footer";
import pageStyles from "../../styles/bookmark-landing-page/page.module.scss";

const BookmarkLandingPage = ({ intl }) => {
    return (
        <React.Fragment>
            <Header />
            <main
                id="content"
                className={[pageStyles.content, "main"].join(" ")}
            >
                <div className={pageStyles.wrapper}>
                    <section className={pageStyles.section}>
                        <h1>A Simple Bookmark Manager</h1>
                        <p>
                            A clean and simple interface to organize your
                            favorites websites. Open a new browser tab and see
                            your sites load instantly. Try it for free.
                        </p>
                        <div>Get it on Chrome</div>
                        <div>Get it on Firefox</div>
                    </section>
                    <section className={pageStyles.section}>
                        <h2>Features</h2>
                        <p>
                            Our aim is to make it quick and easy for you to
                            access your favorites websites. Your bookmarks sync
                            between your devices so you can access them on the
                            go.
                        </p>
                        <ul>
                            <li>Simple Bookmarking</li>
                            <li>Sppedy Searching</li>
                            <li>Easy Sharing</li>
                        </ul>
                        <h3>Bookmark in one click</h3>
                        <p>
                            Organize your bookmarks however you like. Our simple
                            drag-and-drop interface gives you complete control
                            over how you manage your favorite sites.
                        </p>
                        <div>More Info</div>
                        <h3>Intelligent search</h3>
                        <p>
                            Our powerful search feature will help you find saved
                            sites in no time at all. No need to trawl through
                            all of your bookmarks.
                        </p>
                        <div>More Info</div>
                        <h3>Share your bookmarks</h3>
                        <p>
                            Easily share your bookmarks and collections with
                            others. Create a shareable link that you can send at
                            the click of a button.
                        </p>
                        <div>More Info</div>
                    </section>
                    <section className={pageStyles.section}>
                        <h2>Download the extension</h2>
                        <p>
                            We&apos;ve got more browsers in the pipeline. Please
                            do let us know if you&apos;ve got a favorite
                            you&apos;d like us to prioritize.
                        </p>
                        <h3>Add to Chrome</h3>
                        <p>Minimum version 62</p>
                        <div>Add &amp; Install Extension</div>
                        <h3>Add to Firefox</h3>
                        <p>Minimum version 55</p>
                        <div>Add &amp; Install Extension</div>
                        <h3>Add to Opera</h3>
                        <p>Minimum version 46</p>
                        <div>Add &amp; Install Extension</div>
                    </section>
                    <section className={pageStyles.section}>
                        <h2>Frequently Asked Questions</h2>
                        <p>
                            Here are some of our FAQs. If you have any other
                            questions you&apos;d like answered please feel free
                            to email us.
                        </p>
                        <ul>
                            <li>What is Bookmark?</li>
                            <li>How can I request a new browser?</li>
                            <li>Is there a mobile app?</li>
                            <li>What about other Chromium browsers?</li>
                        </ul>
                        <div>More Info</div>
                    </section>
                </div>
            </main>
            <Footer />
        </React.Fragment>
    );
};

BookmarkLandingPage.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(BookmarkLandingPage);
