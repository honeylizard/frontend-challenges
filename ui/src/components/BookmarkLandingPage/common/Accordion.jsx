import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import arrowUp from "../../../assets/bookmark-landing-page/icon-arrow-up.svg";
import arrowDown from "../../../assets/bookmark-landing-page/icon-arrow.svg";

import accordionStyles from "../../../styles/bookmark-landing-page/accordion.module.scss";

const Accordion = ({ id, title, children, customClasses = [], customTitleClasses = [], ...attrs }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleContent = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div id={id} className={[accordionStyles.accordionContainer, ...customClasses].join(" ")} {...attrs}>
            <Button
                id={`${id}-title`}
                customClasses={[accordionStyles.accordionTitle, ...customTitleClasses]}
                onClick={toggleContent}
                aria-controls={`${id}-content`}
            >
                {title}
                <img src={isExpanded ? arrowUp : arrowDown} alt="" role="presentation" />
            </Button>
            <div
                id={`${id}-content`}
                className={accordionStyles.accordionContent}
                aria-labelledby={`${id}-title`}
                // aria-hidden={!isExpanded}
                hidden={!isExpanded}
                aria-expanded={isExpanded}
            >
                {children}
            </div>
        </div>
    );
};

Accordion.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.node,
    customClasses: PropTypes.array,
    customTitleClasses: PropTypes.array,
};

export default Accordion;
