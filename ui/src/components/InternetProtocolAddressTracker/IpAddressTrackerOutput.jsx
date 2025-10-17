import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";

import OutputBlock from "./common/OutputBlock";

import outputStyles from "../../styles/ip-address-tracker/output.module.scss";

const IpAddressTrackerOutput = ({ intl, results }) => {
    const defaultCountry = "US"; // TODO: move somewhere else?

    const timezoneLabel = intl.formatMessage({
        id: "ipAddressTracker.timezone",
    });
    const locationLabel = intl.formatMessage({
        id: "ipAddressTracker.location",
    });
    const ispLabel = intl.formatMessage({
        id: "ipAddressTracker.isp",
    });
    const ispFull = intl.formatMessage({
        id: "ipAddressTracker.isp.full",
    });
    const ipAddressLabel = intl.formatMessage({
        id: "ipAddressTracker.ipAddress",
    });
    const ipAddressFull = intl.formatMessage({
        id: "ipAddressTracker.ipAddress.full",
    });

    return (
        <div className={outputStyles.outputContainer}>
            <OutputBlock label={<abbr title={ipAddressFull}>{ipAddressLabel}</abbr>} value={results?.ip_address} />
            <OutputBlock
                label={locationLabel}
                value={results?.location}
                value2={results?.country === defaultCountry ? null : results.country}
            />
            <OutputBlock label={timezoneLabel} value={results?.timezone} />
            <OutputBlock label={<abbr title={ispFull}>{ispLabel}</abbr>} value={results?.provider} />
        </div>
    );
};

IpAddressTrackerOutput.propTypes = {
    intl: PropTypes.object.isRequired,
    results: PropTypes.shape({
        ip_address: PropTypes.string,
        location: PropTypes.string,
        country: PropTypes.string,
        timezone: PropTypes.string,
        provider: PropTypes.string,
    }),
};

export default injectIntl(IpAddressTrackerOutput);
