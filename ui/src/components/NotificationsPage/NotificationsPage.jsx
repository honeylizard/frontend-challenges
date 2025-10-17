import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import { Helmet } from "react-helmet";

import Footer from "./Footer";

import data from "../../assets/notifications-page/data.json";

import appStyles from "../../styles/notifications-page/app.module.scss";
import NotificationListItem from "./NotificationListItem";

const NotificationsPage = ({ intl }) => {
    const [unreadCount, setUnreadCount] = useState(0);
    const [records, setRecords] = useState([]);

    const title = intl.formatMessage({
        id: "notificationsPage.title",
    });
    const unreadBadgePrefix = intl.formatMessage({
        id: "notificationsPage.unread",
    });
    const markAllReadButtonLabel = intl.formatMessage({
        id: "notificationsPage.markAllAsRead",
    });
    const emptyListLabel = intl.formatMessage({
        id: "notificationsPage.emptyListLabel",
    });

    useEffect(() => {
        const { notifications = [] } = data;
        if (notifications) {
            setRecords(notifications.reverse());
            setUnreadCount(notifications.filter((elem) => elem.read === "false").length);
        }
    }, []);

    const handleMarkAllRead = () => {
        setRecords(
            records.map((elem) => ({
                ...elem,
                read: "true",
            }))
        );
        setUnreadCount(0);
    };

    return (
        <React.Fragment>
            <Helmet>
                <body className={appStyles.solutionContainer} />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;800&display=swap"
                />
            </Helmet>
            <div className={appStyles.centerBox}>
                <div className={appStyles.container}>
                    <header>
                        <div className={appStyles.headerLeft}>
                            <h1 className={appStyles.title}>{title}</h1>
                            <div className={appStyles.badge} title={unreadBadgePrefix}>
                                <span className="sr-only">{unreadBadgePrefix}: </span>
                                {unreadCount}
                            </div>
                        </div>
                        <div className={appStyles.headerRight}>
                            <button onClick={handleMarkAllRead} className={appStyles.textButton}>
                                {markAllReadButtonLabel}
                            </button>
                        </div>
                    </header>
                    <main id="content" className={appStyles.content}>
                        {records && records.length > 0 ? (
                            <ul className={appStyles.list}>
                                {records.map((notification, index) => (
                                    <li key={`notification-${index}`} className={appStyles.listItem}>
                                        <NotificationListItem data={notification} />
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className={appStyles.listEmpty}>{emptyListLabel}</div>
                        )}
                    </main>
                    <Footer />
                </div>
            </div>
        </React.Fragment>
    );
};

NotificationsPage.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(NotificationsPage);
