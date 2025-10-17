import React from "react";
import PropTypes from "prop-types";
import ButtonLink from "../common/ButtonLink";

import pageStyles from "../../../styles/bookmark-landing-page/page.module.scss";

const DownloadSection = ({ data }) => {
    const renderItem = (key, title, description, image, label, url) => {
        return (
            <li key={key} className={pageStyles.card}>
                <div className={pageStyles.cardContent}>
                    <img src={image} alt="" role="presentation" />
                    <h3>{title}</h3>
                    <p>{description}</p>
                    <div className={pageStyles.cardDivider} aria-hidden="true">
                        &nbsp;
                    </div>
                    <ButtonLink url={url}>{label}</ButtonLink>
                </div>
            </li>
        );
    };

    return (
        <section className={pageStyles.section}>
            <div className={pageStyles.wrapper}>
                <h2 className={pageStyles.title}>{data.title}</h2>
                <p className={pageStyles.description}>{data.description}</p>
                <ul className={[pageStyles.row, pageStyles.cardOffsetList].join(" ")}>
                    {data.details &&
                        data.details.map((item, index) =>
                            renderItem(
                                `downloads-item-${index}`,
                                item.title,
                                item.description,
                                item.image,
                                item.link.label,
                                item.link.url
                            )
                        )}
                </ul>
            </div>
        </section>
    );
};

DownloadSection.propTypes = {
    data: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        details: PropTypes.arrayOf(
            PropTypes.shape({
                title: PropTypes.string,
                description: PropTypes.string,
                link: PropTypes.shape({
                    label: PropTypes.string,
                    url: PropTypes.string,
                }),
            })
        ),
    }),
};

export default DownloadSection;
