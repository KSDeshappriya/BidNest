import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    // const [menuItems, setMenuItems] = useState([]);

    // useEffect(() => {
    //     // Fetch menu items from an API or a local JSON file
    //     const fetchMenuItems = async () => {
    //         try {
    //             const response = await fetch('/api/menu-items'); // Replace with your API endpoint
    //             const data = await response.json();
    //             setMenuItems(data);
    //         } catch (error) {
    //             console.error('Error fetching menu items:', error);
    //         }
    //     };

    //     fetchMenuItems();
    // }, []);

    const menuItems = [
        {
            "id": 1,
            "name": "Home",
            "link": "/",
            "submenu": [
                { "id": 1, "name": "Home 1", "link": "/home1" },
                { "id": 2, "name": "Home 2", "link": "/home2" },
                { "id": 3, "name": "Home 3", "link": "/home3" }
            ]
        },
        {
            "id": 2,
            "name": "About Us",
            "link": "/about"
        },
        {
            "id": 3,
            "name": "How It Works",
            "link": "/how-works"
        },
        {
            "id": 4,
            "name": "Browse Product",
            "link": "/live-auction"
        },
        {
            "id": 5,
            "name": "News",
            "link": "/news",
            "submenu": [
                { "id": 1, "name": "Blog", "link": "/news/blog" },
                { "id": 2, "name": "Blog Details", "link": "/news/blog-details" }
            ]
        },
        {
            "id": 6,
            "name": "Pages",
            "link": "/pages",
            "submenu": [
                { "id": 1, "name": "Auction Details", "link": "/auction-details" },
                { "id": 2, "name": "FAQ", "link": "/faq" },
                { "id": 3, "name": "Dashboard", "link": "/dashboard" },
                { "id": 4, "name": "Login", "link": "/auth/login" },
                { "id": 5, "name": "SignUp", "link": "/auth/signup" },
                { "id": 6, "name": "404", "link": "/e404" }
            ]
        },
        {
            "id": 7,
            "name": "Contact",
            "link": "/contact"
        }
    ];

    return (
        <header className="header-area style-1">
            <div className="header-logo">
                <Link to="/"><img alt="image" src="assets/images/bg/header-logo.png" /></Link>
            </div>
            <div className="main-menu">
                <div className="mobile-logo-area d-lg-none d-flex justify-content-between align-items-center">
                    <div className="mobile-logo-wrap">
                        <Link to="/"><img alt="image" src="assets/images/bg/header-logo.png" /></Link>
                    </div>
                    <div className="menu-close-btn">
                        <i className="bi bi-x-lg" />
                    </div>
                </div>
                <ul className="menu-list">
                    {menuItems.map((item) => (
                        <li key={item.id} className={item.submenu ? "menu-item-has-children" : ""}>
                            <Link to={item.link} className={item.submenu ? "drop-down" : ""}>{item.name}</Link>
                            {item.submenu && <i className="bx bx-plus dropdown-icon" />}
                            {item.submenu && (
                                <ul className="submenu">
                                    {item.submenu.map((subItem) => (
                                        <li key={subItem.id}>
                                            <Link to={subItem.link}>{subItem.name}</Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
                <div className="d-lg-none d-block">
                    <form className="mobile-menu-form mb-5">
                        <div className="input-with-btn d-flex flex-column">
                            <input type="text" placeholder="Search here..." />
                            <button type="submit" className="eg-btn btn--primary btn--sm">Search</button>
                        </div>
                    </form>
                    <div className="hotline two">
                        <div className="hotline-info">
                            <span>Click To Call</span>
                            <h6><a href="tel:347-274-8816">+347-274-8816</a></h6>
                        </div>
                    </div>
                </div>
            </div>
            <div className="nav-right d-flex align-items-center">
                <div className="hotline d-xxl-flex d-none">
                    <div className="hotline-icon">
                        <img alt="image" src="assets/images/icons/header-phone.svg" />
                    </div>
                    <div className="hotline-info">
                        <span>Click To Call</span>
                        <h6><a href="tel:347-274-8816">+347-274-8816</a></h6>
                    </div>
                </div>
                <div className="search-btn">
                    <i className="bi bi-search" />
                </div>
                <div className="eg-btn btn--primary header-btn">
                    <Link to="/dashboard">My Account</Link>
                </div>
                <div className="mobile-menu-btn d-lg-none d-block">
                    <i className="bx bx-menu" />
                </div>
            </div>
        </header>
    );
}

export default Header;
