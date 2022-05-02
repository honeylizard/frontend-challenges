import React from "react";
import PropTypes from "prop-types";
import Accordion from "../common/Accordion";

import pageStyles from "../../../styles/bookmark-landing-page/page.module.scss";

const FaqSection = ({ data }) => {
    const renderQuestion = (key, title, description) => {
        return (
            <li key={key} className={pageStyles.faqListItem}>
                <Accordion
                    id={key}
                    title={title}
                    customTitleClasses={[pageStyles.faqQuestion]}
                >
                    <p>{description}</p>
                </Accordion>
            </li>
        );
    };

    return (
        <section className={pageStyles.section}>
            <h2 className={pageStyles.title}>{data.title}</h2>
            <p className={pageStyles.description}>{data.description}</p>
            <ul
                className={[pageStyles.listNoStyle, pageStyles.faqList].join(
                    " "
                )}
            >
                {data.details &&
                    data.details.map((item, index) =>
                        renderQuestion(
                            `faq-item-${index}`,
                            item.title,
                            item.description
                        )
                    )}
            </ul>
            <div className={pageStyles.sectionLink}>{data.link.label}</div>
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
