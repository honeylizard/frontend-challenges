import React from "react";
import PropTypes from "prop-types";

import pageStyles from "../../../styles/bookmark-landing-page/page.module.scss";

const DownloadSection = ({ data }) => {
    const renderItem = (key, title, description, image, label, url) => {
        return (
            <li key={key}>
                <img
                    src={process.env.PUBLIC_URL + image}
                    alt=""
                    role="presentation"
                />
                <h3>{title}</h3>
                <p>{description}</p>
                <div>{label}</div>
            </li>
        );
    };

    return (
        <section className={pageStyles.section}>
            <h2>{data.title}</h2>
            <p>{data.description}</p>
            <ul className={pageStyles.row}>
                {data.details &&
                    data.details.map((item, index) =>
                        renderItem(
                            `downloads-item-${index}`,
                            item.title,
                            item.description,
                            item.image,
                            item.link.label
                        )
                    )}
            </ul>
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
