import React from "react";
import PropTypes from "prop-types";
import Tabs from "../common/Tabs";

import pageStyles from "../../../styles/bookmark-landing-page/page.module.scss";

const FeatureSection = ({ data }) => {
    const renderTab = (
        key,
        tabLabel,
        title,
        description,
        image,
        label,
        url
    ) => {
        return (
            <div tabName={tabLabel} key={key}>
                <h3>{title}</h3>
                <p>{description}</p>
                <div>{label}</div>
                <img
                    src={process.env.PUBLIC_URL + image}
                    alt=""
                    role="presentation"
                />
            </div>
        );
    };

    return (
        <section className={pageStyles.section}>
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
                            tab.link.label
                        )
                    )}
            </Tabs>
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
            })
        ),
    }),
};

export default FeatureSection;
