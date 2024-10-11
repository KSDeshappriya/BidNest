import React from 'react';

const MobileSearch = () => {
    return (
        <div className="mobile-search">
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-11">
                        <label>What are you lookking for?</label>
                        <input type="text" placeholder="Search Products, Category, Brand" />
                    </div>
                    <div className="col-1 d-flex justify-content-end align-items-center">
                        <div className="search-cross-btn">
                            <i className="bi bi-x" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileSearch;
