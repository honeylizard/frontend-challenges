import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import lodash from "lodash";
import data from "../../assets/static-job-listings/data.json";
import JobListItem from "./JobListItem";
import jobListStyle from "../../styles/static-job-listings/job-list.module.scss";
import JobsListFiltersList from "./JobsListFiltersList";

const JobsList = ({ intl }) => {
    const [currentFilters, setCurrentFilters] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState(data);

    const emptyListLabel = intl.formatMessage({
        id: "staticJobListings.jobs.emptyList",
    });

    const handleFilterClick = (newFilter) => {
        if (!currentFilters.includes(newFilter)) {
            setCurrentFilters([...currentFilters, newFilter]);
        } else {
            setCurrentFilters(
                currentFilters.filter((element) => element !== newFilter)
            );
        }
    };

    const handleClearCategories = () => {
        setCurrentFilters([]);
    };

    useEffect(() => {
        let filteredData = data;
        if (currentFilters && currentFilters.length > 0) {
            filteredData = data.filter((job) =>
                currentFilters.every((filter) =>
                    [job.role, job.level, ...job.languages].includes(filter)
                )
            );
        }
        setFilteredJobs(
            lodash.orderBy(
                filteredData,
                ["featured", "new", "position"],
                ["desc", "desc", "desc"]
            )
        );
    }, [currentFilters]);

    return (
        <React.Fragment>
            <JobsListFiltersList
                filters={currentFilters}
                clearFilters={handleClearCategories}
                onFilterClick={handleFilterClick}
            />
            {filteredJobs && filteredJobs.length > 0 ? (
                <ul className={jobListStyle.list}>
                    {filteredJobs.map((element, index) => (
                        <li key={`job-${index}`}>
                            <JobListItem
                                data={element}
                                onCategoryClick={handleFilterClick}
                                currentFilters={currentFilters}
                            />
                        </li>
                    ))}
                </ul>
            ) : (
                <div>{emptyListLabel}</div>
            )}
        </React.Fragment>
    );
};

JobsList.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(JobsList);
