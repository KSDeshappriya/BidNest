import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const LoadingWrapper = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        // Show loader on route change
        setLoading(true);

        // Simulate a data fetch or some loading process
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000); // Change this to your loading time

        return () => clearTimeout(timer); // Cleanup on unmount
    }, [location]);

    return (
        <div>
            {loading ? (
                <div className="preloader">
                <div className="loader">
                    <span />
                    <span />
                    <span />
                    <span />
                </div>
            </div>
            ) : children}
        </div>
    );
};
LoadingWrapper.propTypes = {
    children: PropTypes.node.isRequired,
};

export default LoadingWrapper;