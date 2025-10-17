import React from "react";

import avatarImage from "@resources/e-commerce-product-page/image-avatar.png";
import buttonStyles from "@styles/e-commerce-product-page/avatar-button.module.scss";

const AvatarButton = () => {
    return (
        <button type="button" className={buttonStyles.avatarImageButton}>
            {/* avatar and alt text would be dynamic in a real application */}
            <img src={avatarImage} alt="John Doe" />
        </button>
    );
};

export default AvatarButton;
