import React, { useState } from "react";
import PropTypes from "prop-types";

import tabStyles from "../../../styles/bookmark-landing-page/tab.module.scss";

const Tabs = ({ id, children, ...attrs }) => {
    const tabPanelRef = React.useRef();
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    const handleTabChange = (event) => {
        const newActiveIndex = parseInt(
            event.target.parentElement.dataset.index
        );
        setActiveTabIndex(newActiveIndex);
        event.currentTarget.blur();
        tabPanelRef.current.focus();
    };

    const renderTabNavItem = (id, index, name, activeIndex, onClick) => {
        return (
            <button
                id={`${id}-tab-${index}`}
                role="tab"
                aria-selected={index === activeIndex}
                aria-controls={`${id}-tab-section-${index}`}
                onClick={onClick}
                data-index={index}
            >
                <span className={tabStyles.tabButtonContent}>{name}</span>
            </button>
        );
    };

    const renderTabContent = (id, index, children, activeIndex) => {
        return (
            <div
                id={`${id}-tab-section-${index}`}
                aria-labelledby={`${id}-tab-${index}`}
                role="tabpanel"
                key={index}
                // aria-hidden={index !== activeIndex}
                hidden={index !== activeIndex}
            >
                {children}
            </div>
        );
    };

    return (
        <div className={[tabStyles.tabsContainer].join(" ")}>
            <ul role="tablist" className={tabStyles.tabsList}>
                {children.map((item, index) => (
                    <li
                        key={index}
                        role="presentation"
                        className={`${tabStyles.tabsListItem} ${
                            index === activeTabIndex &&
                            tabStyles.tabsListItemActive
                        }`}
                    >
                        {renderTabNavItem(
                            id,
                            index,
                            item.props["data-tabName"],
                            activeTabIndex,
                            handleTabChange
                        )}
                    </li>
                ))}
            </ul>
            <div
                ref={tabPanelRef}
                autoFocus={true} // eslint-disable-line jsx-a11y/no-autofocus
                tabIndex={-1}
                className={tabStyles.tabsPanel}
            >
                {children.map((item, index) =>
                    renderTabContent(
                        id,
                        index,
                        item.props.children,
                        activeTabIndex
                    )
                )}
            </div>
        </div>
    );
};

Tabs.propTypes = {
    id: PropTypes.string,
    children: PropTypes.node,
};

export default Tabs;
