import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

const LazyImage = ({ placeholderImage, alt = "", ...props }) => {
    const [inView, setInView] = useState(false);
    const placeholderRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver((entries, obs) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    setInView(true);
                    obs.disconnect();
                }
            }
        }, {});
        observer.observe(placeholderRef.current);
        return () => {
            observer.disconnect();
        };
    }, []);

    return inView ? (
        <img alt={alt} loading="lazy" {...props} />
    ) : (
        <img
            ref={placeholderRef}
            src={placeholderImage}
            alt={alt}
            loading="lazy"
            {...props}
        />
    );
};

LazyImage.propTypes = {
    placeholderImage: PropTypes.string.isRequired,
    alt: PropTypes.string,
};

export default LazyImage;
