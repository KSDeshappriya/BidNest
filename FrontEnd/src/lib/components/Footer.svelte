<script>
    // Define the recent feeds data
    const recentFeeds = [
        {
            date: "January 31, 2022",
            title: "Grant Distributions Continue to Increase.",
            imgSrc: "assets/images/blog/recent-feed1.png",
            link: "blog-details.html"
        },
        {
            date: "February 21, 2022",
            title: "Seminar for Children to Learn About.",
            imgSrc: "assets/images/blog/recent-feed2.png",
            link: "blog-details.html"
        },
        {
            date: "March 22, 2022",
            title: "Education and teacher for all African Children.",
            imgSrc: "assets/images/blog/recent-feed3.png",
            link: "blog-details.html"
        }
    ];
</script>

<footer>
    <div class="footer-top">
        <div class="container">
            <div class="row gy-5">
                <div class="col-lg-3 col-md-6">
                    <div class="footer-item">
                        <a href="index-2.html">
                            <img alt="footer logo" src="assets/images/bg/footer-logo.png">
                        </a>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.</p>
                        <form>
                            <div class="input-with-btn d-flex justify-content-start align-items-stretch">
                                <input type="text" placeholder="Enter your email">
                                <button type="submit">
                                    <img alt="send icon" src="assets/images/icons/send-icon.svg">
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 d-flex justify-content-lg-center">
                    <div class="footer-item">
                        <h5>Navigation</h5>
                        <ul class="footer-list">
                            <li><a href="live-auction.html">All Product</a></li>
                            <li><a href="how-works.html">How It Works</a></li>
                            <li><a href="dashboard.html">My Account</a></li>
                            <li><a href="about.html">About Company</a></li>
                            <li><a href="blog.html">Our News Feed</a></li>
                        </ul>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 d-flex justify-content-lg-center">
                    <div class="footer-item">
                        <h5>Help & FAQs</h5>
                        <ul class="footer-list">
                            <li><a href="product.html">Help Center</a></li>
                            <li><a href="faq.html">Customer FAQs</a></li>
                            <li><a href="login.html">Terms and Conditions</a></li>
                            <li><a href="about.html">Security Information</a></li>
                            <li><a href="blog.html">Merchant Add Policy</a></li>
                        </ul>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="footer-item">
                        <h5>Latest Feed</h5>
                        <ul class="recent-feed-list">
                            {#each recentFeeds as feed}
                                <li class="single-feed">
                                    <div class="feed-img">
                                        <a href={feed.link}>
                                            <img alt="recent feed image" src={feed.imgSrc}>
                                        </a>
                                    </div>
                                    <div class="feed-content">
                                        <span>{feed.date}</span>
                                        <h6>
                                            <a href={feed.link}>{feed.title}</a>
                                        </h6>
                                    </div>
                                </li>
                            {/each}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="footer-bottom">
        <div class="container">
            <div class="row d-flex align-items-center g-4">
                <div class="col-lg-6 d-flex justify-content-lg-start justify-content-center">
                    <p>Copyright 2022 <a href="#">Bid Out</a> | Design By <a href="https://www.egenslab.com/" class="egns-lab">Egens Lab</a></p>
                </div>
                <div class="col-lg-6 d-flex justify-content-lg-end justify-content-center align-items-center flex-sm-nowrap flex-wrap">
                    <p class="d-sm-flex d-none">We Accepts:</p>
                    <ul class="footer-logo-list">
                        <li><a href="#"><img alt="payment method" src="assets/images/bg/footer-pay1.png"></a></li>
                        <li><a href="#"><img alt="payment method" src="assets/images/bg/footer-pay2.png"></a></li>
                        <li><a href="#"><img alt="payment method" src="assets/images/bg/footer-pay3.png"></a></li>
                        <li><a href="#"><img alt="payment method" src="assets/images/bg/footer-pay4.png"></a></li>
                        <li><a href="#"><img alt="payment method" src="assets/images/bg/footer-pay5.png"></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</footer>
