import React, { useContext } from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";

import data from "../../../assets/time-tracking-dashboard/data.json";
import { GlobalContext } from "../../../GlobalStateProvider";
import FilterButton from "./FilterButton";

import appStyles from "../../../styles/time-tracking-dashboard/overview-card.module.scss";

const OverviewCard = ({ intl }) => {
    const { timeTrackingDashboard: globalData } = useContext(GlobalContext);

    const avatarOfLabel = intl.formatMessage({
        id: "timeTrackingDashboard.avatarOf",
    });
    const reportForLabel = intl.formatMessage({
        id: "timeTrackingDashboard.reportFor",
    });
    const viewAsLabel = intl.formatMessage({
        id: "timeTrackingDashboard.viewAs",
    });
    const dailyLabel = intl.formatMessage({
        id: "timeTrackingDashboard.daily",
    });
    const weeklyLabel = intl.formatMessage({
        id: "timeTrackingDashboard.weekly",
    });
    const monthlyLabel = intl.formatMessage({
        id: "timeTrackingDashboard.monthly",
    });

    return (
        <div className={appStyles.overviewCard}>
            <div className={appStyles.profile}>
                <img
                    src={process.env.PUBLIC_URL + data.profile.avatar}
                    alt={avatarOfLabel}
                    aria-describedby="profileName"
                />
                <h2 className={appStyles.name}>
                    <span>{reportForLabel}</span>
                    <span id="profileName">{data.profile.name}</span>
                </h2>
            </div>
            <div className={appStyles.filters}>
                <h3 className="sr-only">{viewAsLabel}</h3>
                <ul>
                    <li>
                        <FilterButton
                            label={dailyLabel}
                            filterCode={globalData.DAILY_KEY}
                        />
                    </li>
                    <li>
                        <FilterButton
                            label={weeklyLabel}
                            filterCode={globalData.WEEKLY_KEY}
                        />
                    </li>
                    <li>
                        <FilterButton
                            label={monthlyLabel}
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
