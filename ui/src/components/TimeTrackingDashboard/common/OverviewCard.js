import React, { useContext } from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";

import FilterButton from "./FilterButton";
import { GlobalContext } from "../../../GlobalStateProvider";
import data from "../../../assets/time-tracking-dashboard/data.json";

import appStyles from "../../../styles/time-tracking-dashboard/overview-card.module.scss";

const OverviewCard = ({ intl }) => {
    const { timeTrackingDashboard: globalData } = useContext(GlobalContext);

    return (
        <div className={appStyles.overviewCard}>
            <div className={appStyles.profile}>
                <img
                    src={process.env.PUBLIC_URL + data.profile.avatar}
                    alt={`Avatar of ${data.profile.name}`}
                />
                <h2 className={appStyles.name}>
                    <div>Report for</div>
                    <div>{data.profile.name}</div>
                </h2>
            </div>
            <div className={appStyles.filters}>
                <h3 className="sr-only">View As</h3>
                <ul>
                    <li>
                        <FilterButton
                            label="Daily"
                            filterCode={globalData.DAILY_KEY}
                        />
                    </li>
                    <li>
                        <FilterButton
                            label="Weekly"
                            filterCode={globalData.WEEKLY_KEY}
                        />
                    </li>
                    <li>
                        <FilterButton
                            label="Monthly"
                            filterCode={globalData.MONTHLY_KEY}
                        />
                    </li>
                </ul>
            </div>
        </div>
    );
};

OverviewCard.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(OverviewCard);
