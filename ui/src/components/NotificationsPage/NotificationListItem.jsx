import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FormattedMessage, injectIntl } from "react-intl";

import listItemStyles from "@styles/notifications-page/listItem.module.scss";
import NewDot from "./NewDot";

const NotificationListItem = ({ intl, data = {} }) => {
    const {
        username = "",
        userAvatar = "",
        action = "",
        groupName = "",
        postTitle = "",
        read = "",
        photoThumbnail = "",
        photoAlt = "",
        message = "",
        date = "",
    } = data;
    const [actionText, setActionText] = useState("");
    const [isRead, setIsRead] = useState(false);
    const avatarUrl = `/frontend-challenges/assets/user-avatars/${userAvatar}`;
    const avatarAltText = intl.formatMessage(
        {
            id: "notificationsPage.avatarAlt",
        },
        {
            name: username || "",
        }
    );

    useEffect(() => {
        let text = action;
        switch (action) {
            case "leftGroup":
            case "joinedGroup":
                text = (
                    <FormattedMessage id={"notificationsPage.action." + action}>
                        {(txt) => (
                            <>
                                {txt}{" "}
                                <a href="/" className={listItemStyles.link}>
                                    {groupName}
                                </a>
                            </>
                        )}
                    </FormattedMessage>
                );
                break;
            case "postReaction":
                text = (
                    <FormattedMessage id={"notificationsPage.action." + action}>
                        {(txt) => (
                            <>
                                {txt}{" "}
                                <a href="/" className={listItemStyles.linkVisited}>
                                    {postTitle}
                                </a>
                            </>
                        )}
                    </FormattedMessage>
                );
                break;
            case "photoComment":
            case "privateMessage":
            case "followedYou":
                text = intl.formatMessage({
                    id: "notificationsPage.action." + action,
                });
                break;
            default:
                break;
        }
        setActionText(text);
    }, [action, groupName, postTitle, intl]);

    useEffect(() => {
        if (read === "true") {
            setIsRead(true);
        }
    }, [read]);

    const listItemClasses = [listItemStyles.container];

    if (isRead) {
        listItemClasses.push(listItemStyles.readNotification);
    }

    const isPhotoComment = action === "photoComment" && photoThumbnail && photoAlt;
    const isPrivateMessage = action === "privateMessage" && message;

    return (
        <div className={listItemClasses.join(" ")}>
            <div className={listItemStyles.row}>
                <div className={listItemStyles.avatar}>
                    <img src={avatarUrl} alt={avatarAltText} />
                </div>
                <div className={listItemStyles.details}>
                    <div className={listItemStyles.meta}>
                        <a href="/" className={listItemStyles.user}>
                            {username}
                        </a>
                        &nbsp;
                        <span className={listItemStyles.action}>{actionText}</span>
                        &nbsp;
                        <NewDot isNew={!(read === "true")} customClasses={[listItemStyles.readDot]} />
                    </div>
                    <div className={listItemStyles.date}>{date}</div>
                    {isPrivateMessage && (
                        <a href="/" className={listItemStyles.message}>
                            {message}
                        </a>
                    )}
                </div>
                {isPhotoComment && (
                    <a href="/" className={listItemStyles.photo}>
                        <img src={`/frontend-challenges/assets/photos/${photoThumbnail}`} alt={photoAlt} />
                    </a>
                )}
            </div>
        </div>
    );
};

NotificationListItem.propTypes = {
    intl: PropTypes.object.isRequired,
    data: PropTypes.shape(),
};

export default injectIntl(NotificationListItem);
