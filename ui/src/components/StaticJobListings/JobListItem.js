import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import jobListItemStyle from "../../styles/static-job-listings/job-list-item.module.scss";
import CategoryListItem from "./CategoryListItem";

const JobListItem = ({ intl, data, onCategoryClick, currentFilters }) => {
    const categories = [data.role, data.level, ...data.languages];
    const isFeatured = data.featured;
    const isNew = data.new;

    const classes = [jobListItemStyle.listItemContainer];
    if (isFeatured) {
        classes.push(jobListItemStyle.isFeatured);
    }

    const companyLabel = intl.formatMessage({
        id: "staticJobListings.jobs.company",
    });
    const newLabel = intl.formatMessage({
        id: "staticJobListings.jobs.new",
    });
    const featuredLabel = intl.formatMessage({
        id: "staticJobListings.jobs.featured",
    });
    const postedAtLabel = intl.formatMessage({
        id: "staticJobListings.jobs.postedAt",
    });
    const contractLabel = intl.formatMessage({
        id: "staticJobListings.jobs.contract",
    });
    const locationLabel = intl.formatMessage({
        id: "staticJobListings.jobs.location",
    });
    const categoriesLabel = intl.formatMessage({
        id: "staticJobListings.jobs.categories",
    });
    const categoriesEmptyListLabel = intl.formatMessage({
        id: "staticJobListings.jobs.categories.emptyList",
    });

    return (
        <div className={classes.join(" ")}>
            <div className={jobListItemStyle.listItemCompanyLogo}>
                <img src={process.env.PUBLIC_URL + data.logo} alt={data.company} />
            </div>
            <div className={jobListItemStyle.listItemDetailsContainer}>
                <div className={jobListItemStyle.listItemCompanyDetails}>
                    <div>
                        <span className="sr-only">{companyLabel}:&nbsp;</span>
                        {data.company}
                    </div>
                    {isNew && <div className={jobListItemStyle.primaryPill}>{newLabel}</div>}
                    {isFeatured && <div className={jobListItemStyle.secondaryPill}>{featuredLabel}</div>}
                </div>
                <div className={jobListItemStyle.listItemTitle}>{data.position}</div>
                <div className={jobListItemStyle.listItemPositionDetails}>
                    <div>
                        <span className="sr-only">{postedAtLabel}:&nbsp;</span>
                        {data.postedAt}
                    </div>
                    <div>
                        <span className="sr-only">{contractLabel}:&nbsp;</span>
                        {data.contract}
                    </div>
                    <div>
                        <span className="sr-only">{locationLabel}:&nbsp;</span>
                        {data.location}
                    </div>
                </div>
            </div>
            <div>
                <span className="sr-only">{categoriesLabel}:&nbsp;</span>
                {categories && categories.length > 0 ? (
                    <ul className={jobListItemStyle.listItemCategories}>
                        {categories.map((category, index) => (
                            <li key={`category-${index}`}>
                                <CategoryListItem
                                    name={category}
                                    onClick={() => onCategoryClick(category)}
                                    currentFilters={currentFilters}
                                />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <span className="sr-only">{categoriesEmptyListLabel}</span>
                )}
            </div>
        </div>
    );
};

JobListItem.propTypes = {
    intl: PropTypes.object.isRequired,
    data: PropTypes.shape({
        logo: PropTypes.string,
        company: PropTypes.string,
        new: PropTypes.bool,
        featured: PropTypes.bool,
        position: PropTypes.string,
        postedAt: PropTypes.string,
        contract: PropTypes.string,
        location: PropTypes.string,
        role: PropTypes.string,
        level: PropTypes.string,
        languages: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    onCategoryClick: PropTypes.func,
    currentFilters: PropTypes.arrayOf(PropTypes.string),
};

export default injectIntl(JobListItem);
