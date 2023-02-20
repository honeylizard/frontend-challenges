import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import CategoryListItem from "./CategoryListItem";
import jobListStyle from "../../styles/static-job-listings/job-list.module.scss";

const JobsListFiltersList = ({ intl, filters, clearFilters, onFilterClick }) => {
    const filtersLabel = intl.formatMessage({
        id: "staticJobListings.jobs.filters",
    });
    const clearFiltersLabel = intl.formatMessage({
        id: "staticJobListings.jobs.filters.clear",
    });

    return filters && filters.length > 0 ? (
        <div className={jobListStyle.listFiltersContainer}>
            <span className="sr-only">{filtersLabel}: &nbsp;</span>
            <ul className={jobListStyle.filterList}>
                {filters.map((filter, index) => (
                    <li key={`job-filter-${index}`}>
                        <CategoryListItem name={filter} onClick={() => onFilterClick(filter)} showX={true} />
                    </li>
                ))}
            </ul>
            <button className={jobListStyle.clearFiltersButton} onClick={clearFilters}>
                {clearFiltersLabel}
            </button>
        </div>
    ) : null;
};

JobsListFiltersList.propTypes = {
    intl: PropTypes.object.isRequired,
    filters: PropTypes.arrayOf(PropTypes.string),
    clearFilters: PropTypes.func,
    onFilterClick: PropTypes.func,
};

export default injectIntl(JobsListFiltersList);
