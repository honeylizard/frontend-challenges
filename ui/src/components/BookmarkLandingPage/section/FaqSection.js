import React from "react";
import PropTypes from "prop-types";
import Accordion from "../common/Accordion";

import pageStyles from "../../../styles/bookmark-landing-page/page.module.scss";

const FaqSection = ({ data }) => {
    const renderQuestion = (key, title, description) => {
        return (
            <li key={key}>
                <Accordion id={key} title={title}>
                    <p>{description}</p>
                </Accordion>
            </li>
        );
    };

    return (
        <section className={pageStyles.section}>
            <h2>{data.title}</h2>
            <p>{data.description}</p>
            <ul className={pageStyles.listNoStyle}>
                {data.details &&
                    data.details.map((item, index) =>
                        renderQuestion(
                            `faq-item-${index}`,
                            item.title,
                            item.description
                        )
                    )}
            </ul>
            <div>{data.link.label}</div>
        </section>
    );
};

FaqSection.propTypes = {
    data: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        details: PropTypes.arrayOf(
            PropTypes.shape({
                title: PropTypes.string,
                description: PropTypes.string,
            })
        ),
        link: PropTypes.shape({
            label: PropTypes.string,
            url: PropTypes.string,
        }),
    }),
};

export default FaqSection;
