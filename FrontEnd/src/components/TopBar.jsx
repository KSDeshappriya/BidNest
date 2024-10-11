import React from 'react';
import { Link } from 'react-router-dom';

const TopBar = () => {
    // data
    let socialLinks = [
        {
            icon: 'facebook',
            url: 'https://www.facebook.com/'
        },
        {
            icon: 'twitter',
            url: 'https://twitter.com/'
        },
        {
            icon: 'instagram',
            url: 'https://www.instagram.com/'
        },
        {
            icon: 'linkedin',
            url: 'https://www.linkedin.com/'
        },
        {
            icon: 'youtube',
            url: 'https://www.youtube.com/'
        }
    ];

    let languages = [
        {
            name: 'English',
            flag: 'assets/images/icons/flag-eng.png'
        },
        {
            name: 'German',
            flag: 'assets/images/icons/flag-germeny.svg'
        },
        {
            name: 'French',
            flag: 'assets/images/icons/flag-french.svg'
        }
    ];

    let currencies = [
        {
            icon: 'fas fa-dollar-sign',
            symbol: 'USD',
            link: '#'
        },
        {
            icon: 'fas fa-euro-sign',
            symbol: 'EUR',
            link: '#'
        },
        {
            icon: 'fas fa-pound-sign',
            symbol: 'GBP',
            link: '#'
        },
        {
            icon: 'fas fa-yen-sign',
            symbol: 'JPY',
            link: '#'
        }
    ];

    const email = 'example@gmail.com';

    return (
        <div className="topbar">
            <div className="topbar-left d-flex flex-row align-items-center">
                <h6>Follow Us</h6>
                <ul className="topbar-social-list gap-2">
                    {socialLinks.map((link, index) => (
                        <li key={index}>
                            <a href={link.url} target="_blank" rel="noopener noreferrer">
                                <i className={`bx bxl-${link.icon}`}></i>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="email-area">
                <h6>Email: <a href={`mailto:${email}`}>{email}</a></h6>
            </div>
            <div className="topbar-right">
                <ul className="topbar-right-list">
                    <li>
                        <span>Language</span>
                        <img src="assets/images/icons/flag-eng.png" alt="image" />
                        <ul className="topbar-sublist">
                            {languages.map((lang, index) => (
                                <li key={index}>
                                    <span>{lang.name}</span>
                                    <img src={lang.flag} alt={lang.name} />
                                </li>
                            ))}
                        </ul>
                    </li>
                    <li>
                        Currency
                        <ul className="topbar-sublist">
                            {currencies.map((currency, index) => (
                                <li key={index}>
                                    <a href={currency.link}>
                                        <i className={currency.icon}></i>
                                        {currency.symbol}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default TopBar;
