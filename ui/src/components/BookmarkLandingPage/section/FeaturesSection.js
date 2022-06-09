import React from "react";
import PropTypes from "prop-types";
import ButtonLink from "../common/ButtonLink";
import Tabs from "../common/Tabs";

import pageStyles from "../../../styles/bookmark-landing-page/page.module.scss";

const FeatureSection = ({ data }) => {
    const renderTab = (
        key,
        tabLabel,
        title,
        description,
        image,
        imageOrder = "left",
        label,
        url
    ) => {
        return (
            <div tabName={tabLabel} key={key}>
                <div
                    className={[
                        pageStyles.row,
                        pageStyles.featureTabContainer,
                        imageOrder === "left"
                            ? null
                            : pageStyles.featureTabContainerReverse,
                    ]
                        .filter(Boolean)
                        .join(" ")}
                >
                    <img
                        src={process.env.PUBLIC_URL + image}
                        alt=""
                        role="presentation"
                    />
                    <div className={pageStyles.featureTabContent}>
                        <h3>{title}</h3>
                        <p>{description}</p>
                        <ButtonLink url={url}>{label}</ButtonLink>
                    </div>
                </div>
            </div>
        );
    };

    // TODO: style the tab nav and border of tab content
    return (
        <section className={[pageStyles.section].join(" ")}>
            <div className={pageStyles.wrapper}>
                <h2 className={pageStyles.title}>{data.title}</h2>
                <p className={pageStyles.description}>{data.description}</p>
                <Tabs id="example-01">
                    {data.details &&
                        data.details.map((tab, index) =>
                            renderTab(
                                `features-tab-${index}`,
                                tab.label,
                                tab.title,
                                tab.description,
                                tab.image,
                                tab.imageOrder,
                                tab.link.label,
                                tab.link.url
                            )
                        )}
                </Tabs>
            </div>
        </section>
    );
};

FeatureSection.propTypes = {
    data: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        details: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string,
                title: PropTypes.string,
                description: PropTypes.string,
                link: PropTypes.shape({
                    label: PropTypes.string,
                    url: PropTypes.string,
                }),
                image: PropTypes.string,
                imageOrder: PropTypes.string,
            })
        ),
    }),
};

export default FeatureSection;
