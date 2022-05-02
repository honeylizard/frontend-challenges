import React from "react";
import PropTypes from "prop-types";

import pageStyles from "../../../styles/bookmark-landing-page/page.module.scss";

const OverviewSection = ({ data }) => {
    const renderCallToAction = (key, label, url) => {
        return <li key={key}>{label}</li>;
    };

    return (
        <section
            className={[
                pageStyles.section,
                pageStyles.overview,
                pageStyles.row,
            ].join(" ")}
        >
            <div className={pageStyles.overviewContent}>
                <h1 className={pageStyles.title}>{data.title}</h1>
                <p className={pageStyles.description}>{data.description}</p>
                <ul className={pageStyles.row}>
                    {data.callToActions &&
                        data.callToActions.map((item, index) =>
                            renderCallToAction(
                                `overview-cta-${index}`,
                                item.label
                            )
                        )}
                </ul>
            </div>
            <div>
                <img
                    src={process.env.PUBLIC_URL + data.image}
                    alt=""
                    role="presentation"
                />
            </div>
        </section>
    );
};

OverviewSection.propTypes = {
    data: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        callToActions: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string,
                url: PropTypes.string,
            })
        ),
        image: PropTypes.string,
    }),
};

export default OverviewSection;
