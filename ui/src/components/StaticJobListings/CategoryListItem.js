import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import removeIcon from "../../assets/static-job-listings/icon-remove.svg";
import categoryListItemStyle from "../../styles/static-job-listings/category-list-item.module.scss";

const CategoryListItem = ({
    intl,
    name,
    currentFilters = [],
    showX = false,
    ...attrs
}) => {
    const isSelected = currentFilters.includes(name);

    const addLabel = intl.formatMessage(
        {
            id: "staticJobListings.jobs.categories.addTooltip",
        },
        {
            name,
        }
    );
    const removeLabel = intl.formatMessage(
        {
            id: "staticJobListings.jobs.categories.removeTooltip",
        },
        {
            name,
        }
    );
    const classes = [
        showX
            ? categoryListItemStyle.lightPillWithX
            : categoryListItemStyle.lightPill,
    ];
    if (isSelected) {
        classes.push(categoryListItemStyle.lightPillSelected);
    }
    return (
        <button
            className={classes.join(" ")}
            title={isSelected ? removeLabel : addLabel}
            {...attrs}
        >
            <span className={categoryListItemStyle.pillContent}>{name}</span>
            {showX && (
                <span
                    className={categoryListItemStyle.pillSuffix}
                    aria-hidden={true}
                >
                    <img src={removeIcon} alt="" role="presentation" />
                </span>
            )}
        </button>
    );
};

CategoryListItem.propTypes = {
    intl: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    currentFilters: PropTypes.arrayOf(PropTypes.string),
    showX: PropTypes.bool,
};

export default injectIntl(CategoryListItem);
