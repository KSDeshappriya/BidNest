<script>
    // Sample data for upcoming auctions
    let auctions = [
        {
            id: 1,
            title: "Michael Korian Gold Special Watch m20L6 Bidding",
            image: "/assets/images/bg/umcoming1.png",
            category: "Time Zone",
            price: "$15.99",
            author: "@robatfox",
            authorImage: "/assets/images/bg/upcoming-author1.png",
            countdown: { days: 7, hours: 5, minutes: 56, seconds: 8 },
        },
        {
            id: 2,
            title: "Watercolor Special Lighter 2.2 For Saleing Offer",
            image: "/assets/images/bg/umcoming2.png",
            category: "Lit Gaslight",
            price: "$15.99",
            author: "@robatfox",
            authorImage: "/assets/images/bg/upcoming-author2.png",
            countdown: { days: 7, hours: 5, minutes: 56, seconds: 8 },
        },
        {
            id: 3,
            title: "BMW AIGID A Class Hatch M26 Motor Bike",
            image: "/assets/images/bg/umcoming3.png",
            category: "Motor Bike",
            price: "$15.99",
            author: "@robatfox",
            authorImage: "/assets/images/bg/upcoming-author3.png",
            countdown: { days: 7, hours: 5, minutes: 56, seconds: 8 },
        },
        {
            id: 4,
            title: "Microlab Amazing Head-phone With Adapter",
            image: "/assets/images/bg/umcoming4.png",
            category: "Test Watch",
            price: "$15.99",
            author: "@robatfox",
            authorImage: "/assets/images/bg/upcoming-author1.png",
            countdown: { days: 7, hours: 5, minutes: 56, seconds: 8 },
        },
    ];
</script>


<div class="upcoming-seciton pb-120">
    <!-- svelte-ignore a11y-img-redundant-alt -->
    <img alt="image" src="/assets/images/bg/section-bg.png" class="img-fluid section-bg">
    <div class="container">
        <div class="row d-flex justify-content-center">
            <div class="col-sm-12 col-md-10 col-lg-8 col-xl-6">
                <div class="section-title1">
                    <h2>Upcoming Auction</h2>
                    <p class="mb-0">
                        Explore on the world's best & largest Bidding marketplace with our beautiful Bidding products. We want to be a part of your smile, success, and future growth.
                    </p>
                </div>
            </div>
        </div>
        <div class="row d-flex justify-content-center">
            <div class="swiper upcoming-slider">
                <div class="swiper-wrapper">
                    {#each auctions as auction}
                        <div class="swiper-slide">
                            <div class="eg-card c-feature-card1">
                                <div class="auction-img">
                                    <!-- svelte-ignore a11y-img-redundant-alt -->
                                    <img alt="image" src={auction.image}>
                                    <div class="auction-timer2 gap-lg-3 gap-md-2 gap-1">
                                        <div class="countdown-single">
                                            <h5>{auction.countdown.days}</h5>
                                            <span>Days</span>
                                        </div>
                                        <div class="countdown-single">
                                            <h5>{auction.countdown.hours}</h5>
                                            <span>Hours</span>
                                        </div>
                                        <div class="countdown-single">
                                            <h5>{auction.countdown.minutes}</h5>
                                            <span>Mins</span>
                                        </div>
                                        <div class="countdown-single">
                                            <h5>{auction.countdown.seconds}</h5>
                                            <span>Secs</span>
                                        </div>
                                    </div>
                                    <div class="author-area2">
                                        <div class="author-name">
                                            <span>by {auction.author}</span>
                                        </div>
                                        <div class="author-emo">
                                            <!-- svelte-ignore a11y-img-redundant-alt -->
                                            <img alt="image" src={auction.authorImage}>
                                        </div>
                                    </div>
                                </div>
                                <div class="c-feature-content">
                                    <div class="c-feature-category">{auction.category}</div>
                                    <a href="auction-details.html">
                                        <h4>{auction.title}</h4>
                                    </a>
                                    <p>Bidding Price: <span>{auction.price}</span></p>
                                    <div class="auction-card-bttm">
                                        <a href="auction-details.html" class="eg-btn btn--primary btn--sm">View Details</a>
                                        <div class="share-area">
                                            <ul class="social-icons d-flex">
                                                <li><a href="https://www.facebook.com/"><i class="bx bxl-facebook"></i></a></li>
                                                <li><a href="https://www.twitter.com/"><i class="bx bxl-twitter"></i></a></li>
                                                <li><a href="https://www.pinterest.com/"><i class="bx bxl-pinterest"></i></a></li>
                                                <li><a href="https://www.instagram.com/"><i class="bx bxl-instagram"></i></a></li>
                                            </ul>
                                            <div>
                                                <a href="#" class="share-btn"><i class="bx bxs-share-alt"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
            <div class="slider-bottom d-flex justify-content-between align-items-center">
                <a  rel="external" href="/live-auction" class="eg-btn btn--primary btn--md">View ALL</a>
                <div class="swiper-pagination style-3 d-lg-block d-none"></div>
                <div class="slider-arrows coming-arrow d-flex gap-3">
                    <div class="coming-prev1 swiper-prev-arrow" tabindex="0" role="button" aria-label="Previous slide">
                        <i class="bi bi-arrow-left"></i>
                    </div>
                    <div class="coming-next1 swiper-next-arrow" tabindex="0" role="button" aria-label="Next slide">
                        <i class="bi bi-arrow-right"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
