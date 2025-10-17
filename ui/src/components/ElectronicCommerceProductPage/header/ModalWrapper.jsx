import React, { useState } from "react";
import PropTypes from "prop-types";
import AriaModal from "react-aria-modal";
import { injectIntl } from "react-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import modalStyles from "@styles/e-commerce-product-page/modal-wrapper.module.scss";

const ModalWrapper = ({
    intl,
    id,
    triggerLabel,
    title,
    showTitle = true,
    children,
    confirmLabel,
    showCloseHeaderButton = true,
    showConfirmButton = true,
    confirmAndCancelSet = false,
    cancelLabel,
    customConfirmFunction,
    customCancelFunction,
    customTriggerButtonClasses = [],
    triggerIconOnly = false,
    triggerIcon,
    customContainerClasses = [],
    customCloseClasses = [],
    customFooter,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const cancelLabelDefault = intl.formatMessage({
        id: "eCommerceProductPage.cancel",
    });

    const closeLabelDefault = intl.formatMessage({
        id: "eCommerceProductPage.close",
    });

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const getApplicationNode = () => {
        return document.getElementById("root");
    };

    const handleConfirmFunction = () => {
        if (typeof customConfirmFunction === "function") {
            customConfirmFunction();
        }
        handleModalClose();
    };

    const handleCancelFunction = () => {
        if (typeof customCancelFunction === "function") {
            customCancelFunction();
        }
        handleModalClose();
    };

    const modalContainerClasses = [modalStyles.modalContainer, ...customContainerClasses].filter(Boolean);

    const modalCloseClasses = [modalStyles.headerCloseButton, ...customCloseClasses].filter(Boolean);

    return (
        <React.Fragment>
            <button
                type="button"
                onClick={handleModalOpen}
                className={customTriggerButtonClasses.join(" ")}
                title={triggerIconOnly ? triggerLabel : null}
            >
                {triggerIconOnly ? triggerIcon : triggerLabel}
            </button>

            {isModalOpen ? (
                <AriaModal
                    // initialFocus={`${id}_label`}
                    focusDialog={true}
                    titleId={`${id}_label`}
                    onExit={handleModalClose}
                    getApplicationNode={getApplicationNode}
                    verticallyCenter={true}
                    dialogClass={modalContainerClasses.join(" ")}
                    aria-describedby={`${id}_desc`}
                >
                    <div className={modalStyles.modal}>
                        <div className={!showTitle ? modalStyles.modalHeaderNoTitle : modalStyles.modalHeader}>
                            <h2 id={`${id}_label`} className={!showTitle ? "sr-only" : ""}>
                                {title}
                            </h2>
                            {showCloseHeaderButton ? (
                                <button
                                    type="button"
                                    onClick={handleModalClose}
                                    title={closeLabelDefault}
                                    aria-label={closeLabelDefault}
                                    className={modalCloseClasses.join(" ")}
                                >
                                    <FontAwesomeIcon icon={faXmark} aria-hidden="true" />
                                </button>
                            ) : null}
                        </div>
                        <div id={`${id}_desc`} className={modalStyles.modalContent}>
                            {children}
                        </div>
                        <div className={modalStyles.modalFooter}>
                            {customFooter ? customFooter : null}
                            {confirmAndCancelSet ? (
                                <button type="button" onClick={handleCancelFunction}>
                                    {cancelLabel || cancelLabelDefault}
                                </button>
                            ) : null}
                            {showConfirmButton ? (
                                <button type="button" onClick={handleConfirmFunction}>
                                    {confirmLabel || closeLabelDefault}
                                </button>
                            ) : null}
                        </div>
                    </div>
                </AriaModal>
            ) : null}
        </React.Fragment>
    );
};

ModalWrapper.propTypes = {
    intl: PropTypes.object.isRequired,
    id: PropTypes.string,
    triggerLabel: PropTypes.string,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.object]),
    showTitle: PropTypes.bool,
    children: PropTypes.node,
    confirmLabel: PropTypes.string,
    showCloseHeaderButton: PropTypes.bool,
    showConfirmButton: PropTypes.bool,
    confirmAndCancelSet: PropTypes.bool,
    cancelLabel: PropTypes.string,
    customConfirmFunction: PropTypes.func,
    customCancelFunction: PropTypes.func,
    customTriggerButtonClasses: PropTypes.array,
    triggerIconOnly: PropTypes.bool,
    triggerIcon: PropTypes.node,
    customContainerClasses: PropTypes.array,
    customCloseClasses: PropTypes.array,
    customFooter: PropTypes.node,
};

export default injectIntl(ModalWrapper);
