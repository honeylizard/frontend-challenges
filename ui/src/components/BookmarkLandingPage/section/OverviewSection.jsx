import React from "react";
import PropTypes from "prop-types";
import ButtonLink from "../common/ButtonLink";

import pageStyles from "../../../styles/bookmark-landing-page/page.module.scss";

const OverviewSection = ({ data }) => {
    const renderCallToAction = (key, label, url, type) => {
        return (
            <li key={key}>
                <ButtonLink url={url} type={type}>
                    {label}
                </ButtonLink>
            </li>
        );
    };

    return (
        <section className={[pageStyles.section].join(" ")}>
            <div className={[pageStyles.wrapper, pageStyles.overview, pageStyles.row].join(" ")}>
                <div className={pageStyles.overviewContent}>
                    <h1 className={pageStyles.title}>{data.title}</h1>
                    <p className={pageStyles.description}>{data.description}</p>
                    <ul className={[pageStyles.row, pageStyles.buttonRow].join(" ")}>
                        {data.callToActions &&
                            data.callToActions.map((item, index) =>
                                renderCallToAction(`overview-cta-${index}`, item.label, item.url, item.type)
                            )}
                    </ul>
                </div>
                <div>
                    <img src={data.image} alt="" role="presentation" />
                </div>
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
                type: PropTypes.string,
            })
        ),
        image: PropTypes.string,
    }),
};

export default OverviewSection;
