import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MobileSearch from '../components/MobileSearch'
import TopBar from '../components/TopBar'
import Header from '../components/Header'

class Home extends Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <div>
                <MobileSearch />
                <TopBar />
                <Header />
                {/* Hero Area */}
                <div className="hero-area hero-style-one">
                    <div className="hero-main-wrapper position-relative">
                        <div className="swiper banner1">
                            <div className="swiper-wrapper">
                                {this.props.sliderData.map((slide, index) => (
                                    <div key={index} className="swiper-slide">
                                        <div className={`slider-bg-${index + 1}`}>
                                            <div className="container">
                                                <div className="row d-flex justify-content-center align-items-center">
                                                    <div className="col-xl-10 col-lg-10">
                                                        <div className="banner1-content">
                                                            <span>{slide.title}</span>
                                                            <h1>{slide.heading}</h1>
                                                            <p>{slide.description}</p>
                                                            <a href={slide.link} className="eg-btn btn--primary btn--lg">Start
                                                                Exploring</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="hero-one-pagination d-flex justify-content-center flex-column align-items-center gap-3" />
                    </div>
                </div>
                {/* Category Section */}
                <div className="category-section pt-120 pb-120">
                    <div className="container position-relative">
                        <div className="row d-flex justify-content-center">
                            <div className="swiper category1-slider">
                                <div className="swiper-wrapper">
                                    {this.props.categoryData.map((category, index) => (
                                        <div key={index} className="swiper-slide">
                                            <div className="eg-card category-card1 wow animate fadeInDown" data-wow-duration="1500ms" data-wow-delay={`${(index + 1) * 200}ms`}>
                                                <div className="cat-icon">
                                                    <img src={category.icon} alt={category.title} />
                                                </div>
                                                <a href={category.link}>
                                                    <h5>{category.title}</h5>
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="slider-arrows text-center d-xl-flex d-none  justify-content-end">
                            <div className="category-prev1 swiper-prev-arrow" tabIndex={0} role="button" aria-label="Previous slide"> <i className="bx bx-chevron-left"></i></div>
                            <div className="category-next1 swiper-next-arrow" tabIndex={0} role="button" aria-label="Next slide"> <i className="bx bx-chevron-right"></i></div>
                        </div>
                    </div>
                </div>

                {/* Live Auction */}
                <div className="live-auction pb-120">
                    <img alt="image" src="assets/images/bg/section-bg.png" className="img-fluid section-bg" />
                    <div className="container position-relative">
                        <img alt="image" src="assets/images/bg/dotted1.png" className="dotted1" />
                        <img alt="image" src="assets/images/bg/dotted1.png" className="dotted2" />
                        <div className="row d-flex justify-content-center">
                            <div className="col-sm-12 col-md-10 col-lg-8 col-xl-6">
                                <div className="section-title1">
                                    <h2>Live Auction</h2>
                                    <p className="mb-0">Explore on the world&apos;s best &amp; largest Bidding marketplace with our beautiful
                                        Bidding
                                        products. We want to be a part of your smile, success and future growth.</p>
                                </div>
                            </div>
                        </div>
                        <div className="row gy-4 mb-60 d-flex justify-content-center">
                            <div className="col-lg-4 col-md-6 col-sm-10 ">
                                <div data-wow-duration="1.5s" data-wow-delay="0.2s" className="eg-card auction-card1 wow animate fadeInDown">
                                    <div className="auction-img">
                                        <img alt="image" src="assets/images/bg/live-auc1.png" />
                                        <div className="auction-timer">
                                            <div className="countdown" id="timer1">
                                                <h4><span id="hours1">05</span>H : <span id="minutes1">52</span>M : <span id="seconds1">32</span>S</h4>
                                            </div>
                                        </div>
                                        <div className="author-area">
                                            <div className="author-emo">
                                                <img alt="image" src="assets/images/icons/smile-emo.svg" />
                                            </div>
                                            <div className="author-name">
                                                <span>by @robatfox</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="auction-content">
                                        <h4><a href="auction-details.html">Brand New royal Enfield 250 CC For Sale</a></h4>
                                        <p>Bidding Price : <span><span>$85.9</span></span></p>
                                        <div className="auction-card-bttm">
                                            <a href="auction-details.html" className="eg-btn btn--primary btn--sm">Place a Bid</a>
                                            <div className="share-area">
                                                <ul className="social-icons d-flex">
                                                    <li><a href="https://www.facebook.com/"><i className="bx bxl-facebook" /></a></li>
                                                    <li><a href="https://www.twitter.com/"><i className="bx bxl-twitter" /></a></li>
                                                    <li><a href="https://www.pinterest.com/"><i className="bx bxl-pinterest" /></a>
                                                    </li>
                                                    <li><a href="https://www.instagram.com/"><i className="bx bxl-instagram" /></a>
                                                    </li>
                                                </ul>
                                                <div>
                                                    <div className="share-btn"><i className="bx bxs-share-alt" /></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-10 ">
                                <div data-wow-duration="1.5s" data-wow-delay="0.4s" className="eg-card auction-card1 wow animate fadeInDown">
                                    <div className="auction-img">
                                        <img alt="image" src="assets/images/bg/live-auc2.png" />
                                        <div className="auction-timer">
                                            <div className="countdown" id="timer2">
                                                <h4><span id="hours2">05</span>H : <span id="minutes2">52</span>M : <span id="seconds2">32</span>S</h4>
                                            </div>
                                        </div>
                                        <div className="author-area">
                                            <div className="author-emo">
                                                <img alt="image" src="assets/images/icons/smile-emo.svg" />
                                            </div>
                                            <div className="author-name">
                                                <span>by @robatfox</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="auction-content">
                                        <h4><a href="auction-details.html">Wedding Special Exclusive Cupple Ring (S2022)</a></h4>
                                        <p>Bidding Price : <span>$85.9</span></p>
                                        <div className="auction-card-bttm">
                                            <a href="auction-details.html" className="eg-btn btn--primary btn--sm">Place a Bid</a>
                                            <div className="share-area">
                                                <ul className="social-icons d-flex">
                                                    <li><a href="https://www.facebook.com/"><i className="bx bxl-facebook" /></a></li>
                                                    <li><a href="https://www.twitter.com/"><i className="bx bxl-twitter" /></a></li>
                                                    <li><a href="https://www.pinterest.com/"><i className="bx bxl-pinterest" /></a>
                                                    </li>
                                                    <li><a href="https://www.instagram.com/"><i className="bx bxl-instagram" /></a>
                                                    </li>
                                                </ul>
                                                <div>
                                                    <div className="share-btn"><i className="bx bxs-share-alt" /></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-10 ">
                                <div data-wow-duration="1.5s" data-wow-delay="0.6s" className="eg-card auction-card1 wow animate fadeInDown">
                                    <div className="auction-img">
                                        <img alt="image" src="assets/images/bg/live-auc3.png" />
                                        <div className="auction-timer">
                                            <div className="countdown" id="timer3">
                                                <h4><span id="hours3">05</span>H : <span id="minutes3">52</span>M : <span id="seconds3">32</span>S</h4>
                                            </div>
                                        </div>
                                        <div className="author-area">
                                            <div className="author-emo">
                                                <img alt="image" src="assets/images/icons/smile-emo.svg" />
                                            </div>
                                            <div className="author-name">
                                                <span>by @robatfox</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="auction-content">
                                        <h4><a href="auction-details.html">Brand New Honda CBR 600 RR For Special Sale (2022)</a>
                                        </h4>
                                        <p>Bidding Price : <span>$85.9</span></p>
                                        <div className="auction-card-bttm">
                                            <a href="auction-details.html" className="eg-btn btn--primary btn--sm">Place a Bid</a>
                                            <div className="share-area">
                                                <ul className="social-icons d-flex">
                                                    <li><a href="https://www.facebook.com/"><i className="bx bxl-facebook" /></a></li>
                                                    <li><a href="https://www.twitter.com/"><i className="bx bxl-twitter" /></a></li>
                                                    <li><a href="https://www.pinterest.com/"><i className="bx bxl-pinterest" /></a>
                                                    </li>
                                                    <li><a href="https://www.instagram.com/"><i className="bx bxl-instagram" /></a>
                                                    </li>
                                                </ul>
                                                <div>
                                                    <div className="share-btn"><i className="bx bxs-share-alt" /></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-10 ">
                                <div data-wow-duration="1.5s" data-wow-delay=".2s" className="eg-card auction-card1 wow animate fadeInDown">
                                    <div className="auction-img">
                                        <img alt="image" src="assets/images/bg/live-auc4.png" />
                                        <div className="auction-timer">
                                            <div className="countdown" id="timer4">
                                                <h4><span id="hours4">05</span>H : <span id="minutes4">52</span>M : <span id="seconds4">32</span>S</h4>
                                            </div>
                                        </div>
                                        <div className="author-area">
                                            <div className="author-emo">
                                                <img alt="image" src="assets/images/icons/smile-emo.svg" />
                                            </div>
                                            <div className="author-name">
                                                <span>by @robatfox</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="auction-content">
                                        <h4><a href="auction-details.html">Toyota AIGID A Class Hatchback Sale (2017 - 2021)</a>
                                        </h4>
                                        <p>Bidding Price : <span>$85.9</span></p>
                                        <div className="auction-card-bttm">
                                            <a href="auction-details.html" className="eg-btn btn--primary btn--sm">Place a Bid</a>
                                            <div className="share-area">
                                                <ul className="social-icons d-flex">
                                                    <li><a href="https://www.facebook.com/"><i className="bx bxl-facebook" /></a></li>
                                                    <li><a href="https://www.twitter.com/"><i className="bx bxl-twitter" /></a></li>
                                                    <li><a href="https://www.pinterest.com/"><i className="bx bxl-pinterest" /></a>
                                                    </li>
                                                    <li><a href="https://www.instagram.com/"><i className="bx bxl-instagram" /></a>
                                                    </li>
                                                </ul>
                                                <div>
                                                    <div className="share-btn"><i className="bx bxs-share-alt" /></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-10 ">
                                <div data-wow-duration="1.5s" data-wow-delay=".4s" className="eg-card auction-card1 wow animate fadeInDown">
                                    <div className="auction-img">
                                        <img alt="image" src="assets/images/bg/live-auc5.png" />
                                        <div className="auction-timer">
                                            <div className="countdown" id="timer5">
                                                <h4><span id="hours5">05</span>H : <span id="minutes5">52</span>M : <span id="seconds5">32</span>S</h4>
                                            </div>
                                        </div>
                                        <div className="author-area">
                                            <div className="author-emo">
                                                <img alt="image" src="assets/images/icons/smile-emo.svg" />
                                            </div>
                                            <div className="author-name">
                                                <span>by @robatfox</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="auction-content">
                                        <h4><a href="auction-details.html">Havit HV-G61 USB Black Double Game Pad With Vibrat</a>
                                        </h4>
                                        <p>Bidding Price : <span>$85.9</span></p>
                                        <div className="auction-card-bttm">
                                            <a href="auction-details.html" className="eg-btn btn--primary btn--sm">Place a Bid</a>
                                            <div className="share-area">
                                                <ul className="social-icons d-flex">
                                                    <li><a href="https://www.facebook.com/"><i className="bx bxl-facebook" /></a></li>
                                                    <li><a href="https://www.twitter.com/"><i className="bx bxl-twitter" /></a></li>
                                                    <li><a href="https://www.pinterest.com/"><i className="bx bxl-pinterest" /></a>
                                                    </li>
                                                    <li><a href="https://www.instagram.com/"><i className="bx bxl-instagram" /></a>
                                                    </li>
                                                </ul>
                                                <div>
                                                    <div className="share-btn"><i className="bx bxs-share-alt" /></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-10 ">
                                <div data-wow-duration="1.5s" data-wow-delay=".4s" className="eg-card auction-card1 wow animate fadeInDown">
                                    <div className="auction-img">
                                        <img alt="image" src="assets/images/bg/live-auc6.png" />
                                        <div className="auction-timer">
                                            <div className="countdown" id="timer6">
                                                <h4><span id="hours6">05</span>H : <span id="minutes6">52</span>M : <span id="seconds6">32</span>S</h4>
                                            </div>
                                        </div>
                                        <div className="author-area">
                                            <div className="author-emo">
                                                <img alt="image" src="assets/images/icons/smile-emo.svg" />
                                            </div>
                                            <div className="author-name">
                                                <span>by @robatfox</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="auction-content">
                                        <h4><a href="auction-details.html">IPhone 11 Pro Max All Variants Available For Special
                                            Sale</a>
                                        </h4>
                                        <p>Bidding Price : <span>$85.9</span></p>
                                        <div className="auction-card-bttm">
                                            <a href="auction-details.html" className="eg-btn btn--primary btn--sm">Place a Bid</a>
                                            <div className="share-area">
                                                <ul className="social-icons d-flex">
                                                    <li><a href="https://www.facebook.com/"><i className="bx bxl-facebook" /></a></li>
                                                    <li><a href="https://www.twitter.com/"><i className="bx bxl-twitter" /></a></li>
                                                    <li><a href="https://www.pinterest.com/"><i className="bx bxl-pinterest" /></a>
                                                    </li>
                                                    <li><a href="https://www.instagram.com/"><i className="bx bxl-instagram" /></a>
                                                    </li>
                                                </ul>
                                                <div>
                                                    <div className="share-btn"><i className="bx bxs-share-alt" /></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-4 text-center">
                                <a href="live-auction.html" className="eg-btn btn--primary btn--md mx-auto">View All</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Counter */}
                <div className="about-us-counter pb-120">
                    <div className="container">
                        <div className="row g-4 d-flex justify-content-center">
                            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-10 col-10">
                                <div className="counter-single text-center d-flex flex-row hover-border1 wow animate fadeInDown" data-wow-duration="1.5s" data-wow-delay="0.2s">
                                    <div className="counter-icon"> <img alt="image" src="assets/images/icons/employee.svg" /> </div>
                                    <div className="coundown d-flex flex-column">
                                        <h3 className="odometer" data-odometer-final={5400}>&nbsp;</h3>
                                        <p>Happy Customer</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-10 col-10">
                                <div className="counter-single text-center d-flex flex-row hover-border1 wow animate fadeInDown" data-wow-duration="1.5s" data-wow-delay="0.4s">
                                    <div className="counter-icon"> <img alt="image" src="assets/images/icons/review.svg" /> </div>
                                    <div className="coundown d-flex flex-column">
                                        <h3 className="odometer" data-odometer-final={1250}>&nbsp;</h3>
                                        <p>Good Reviews</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-10 col-10">
                                <div className="counter-single text-center d-flex flex-row hover-border1 wow animate fadeInDown" data-wow-duration="1.5s" data-wow-delay="0.6s">
                                    <div className="counter-icon"> <img alt="image" src="assets/images/icons/smily.svg" /> </div>
                                    <div className="coundown d-flex flex-column">
                                        <h3 className="odometer" data-odometer-final={4250}>&nbsp;</h3>
                                        <p>Winner Customer</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-10 col-10">
                                <div className="counter-single text-center d-flex flex-row hover-border1 wow animate fadeInDown" data-wow-duration="1.5s" data-wow-delay="0.8s">
                                    <div className="counter-icon"> <img alt="image" src="assets/images/icons/comment.svg" /> </div>
                                    <div className="coundown d-flex flex-column">
                                        <h3 className="odometer" data-odometer-final={500}>&nbsp;</h3>
                                        <p>New Comments</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        );
    }
}

Home.propTypes = {
    sliderData: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            heading: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            link: PropTypes.string.isRequired
        })
    ).isRequired,
    categoryData: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            icon: PropTypes.string.isRequired,
            link: PropTypes.string.isRequired
        })
    ).isRequired
};


Home.defaultProps = {
    sliderData: [
        {
            title: 'Welcome to',
            heading: 'The Best Place to Find Your Dream Home',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor. Nulla vel turpis ac dolor mollis t incidunt. Cras tincidunt.',
            link: '/properties'
        },
        {
            title: 'Welcome to',
            heading: 'The Best Place to Find Your Dream Home',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor. Nulla vel turpis ac dolor mollis t incidunt. Cras tincidunt.',
            link: '/properties'
        }
    ],
    categoryData: [
        { title: 'Digital Art', icon: '/assets/images/slider/digitalArt.svg', link: '/live-auction' },
        { title: 'Music', icon: '/assets/images/slider/music.svg', link: '/live-auction' },
        { title: 'Motor Bike', icon: '/assets/images/slider/motorbike.svg', link: '/live-auction' },
        { title: 'Game Pad', icon: '/assets/images/slider/gamepad.svg', link: '/live-auction' },
        { title: 'Real Estate', icon: '/assets/images/slider/realEstate.svg', link: '/live-auction' },
        { title: 'Collectibles', icon: '/assets/images/slider/collectibles.svg', link: '/live-auction' }
    ]
};

export default Home;