<script>
    // Auction details data
    let galleryImages = [
        "assets/images/bg/prod-gallery1.png",
        "assets/images/bg/prod-gallery2.png",
        "assets/images/bg/prod-gallery3.png"
    ];

    let bidders = [
        { name: "Robart FOX", bid: "24.50 ETH", time: "4 Hours Ago", image: "assets/images/bg/bidder1.png" },
        { name: "Jane Cooper", bid: "224.5 ETH", time: "5 Hours Ago", image: "assets/images/bg/bidder2.png" },
        { name: "Guy Hawkins", bid: "34.5 ETH", time: "6 Hours 45 minutes Ago", image: "assets/images/bg/bidder3.png" },
        { name: "Robart FOX", bid: "24.50 ETH", time: "4 Hours Ago", image: "assets/images/bg/bidder1.png" },
        { name: "Jane Cooper", bid: "224.5 ETH", time: "5 Hours Ago", image: "assets/images/bg/bidder2.png" },
        { name: "Guy Hawkins", bid: "34.5 ETH", time: "6 Hours 45 minutes Ago", image: "assets/images/bg/bidder3.png" }
    ];

    let otherAuctions = [
        {
            title: "Brand New Royal Enfield 250 CC For Sale",
            price: "$85.9",
            image: "assets/images/bg/live-auc1.png",
            author: "@robatfox"
        },
        {
            title: "Wedding Special Exclusive Couple Ring (S2022)",
            price: "$85.9",
            image: "assets/images/bg/live-auc2.png",
            author: "@robatfox"
        }
    ];
</script>

<div class="auction-details-section pt-120">
    <img alt="image" src="assets/images/bg/section-bg.png" class="img-fluid section-bg-top">
    <img alt="image" src="assets/images/bg/section-bg.png" class="img-fluid section-bg-bottom">

    <div class="container">
        <div class="row g-4 mb-50">
            <div class="col-xl-6 col-lg-7 d-flex flex-row align-items-start justify-content-lg-start justify-content-center flex-md-nowrap flex-wrap gap-4">
                <!-- Image Gallery -->
                <ul class="nav small-image-list d-flex flex-md-column flex-row justify-content-center gap-4">
                    {#each galleryImages as img, index}
                        <li class="nav-item">
                            <div id="details-img{index + 1}" data-bs-toggle="pill" data-bs-target="#gallery-img{index + 1}">
                                <img alt="image" src={img} class="img-fluid">
                            </div>
                        </li>
                    {/each}
                </ul>

                <!-- Big Image Display -->
                <div class="tab-content mb-4 d-flex justify-content-lg-start justify-content-center">
                    {#each galleryImages as img, index}
                        <div class="tab-pane big-image fade show {index === 0 ? 'active' : ''}" id="gallery-img{index + 1}">
                            <div class="auction-gallery-timer d-flex align-items-center justify-content-center flex-wrap">
                                <h3 id="countdown-timer-{index + 1}">&nbsp;</h3>
                            </div>
                            <img alt="image" src={img} class="img-fluid">
                        </div>
                    {/each}
                </div>
            </div>

            <div class="col-xl-6 col-lg-5">
                <div class="product-details-right">
                    <h3>Creative Fashion Ribbon Digital Watch Little Elegant</h3>
                    <p class="para">Korem ipsum dolor amet, consectetur adipiscing elit. Maece nas in pulvinar neque. Nulla finibus lobortis pulvinar. Donec a consectetur nulla.</p>
                    <h4>Bidding Price: <span>$465.00</span></h4>

                    <div class="bid-form">
                        <div class="form-title">
                            <h5>Bid Now</h5>
                            <p>Bid Amount: Minimum Bid $20.00</p>
                        </div>
                        <form>
                            <div class="form-inner gap-2">
                                <input type="text" placeholder="$00.00">
                                <button class="eg-btn btn--primary btn--sm" type="submit">Place Bid</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- Tab Content for Description, Bidding History, and Other Auctions -->
        <div class="row d-flex justify-content-center g-4">
            <div class="col-lg-8">
                <ul class="nav nav-pills d-flex flex-row justify-content-start gap-sm-4 gap-3 mb-45" id="pills-tab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active details-tab-btn" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab">Description</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link details-tab-btn" id="pills-bid-tab" data-bs-toggle="pill" data-bs-target="#pills-bid" type="button" role="tab">Bidding History</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link details-tab-btn" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab">Other Auction</button>
                    </li>
                </ul>

                <div class="tab-content" id="pills-tabContent">
                    <!-- Description Tab -->
                    <div class="tab-pane fade show active" id="pills-home" role="tabpanel">
                        <div class="describe-content">
                            <h4>How can you have anything you want in life?</h4>
                            <p class="para">If you’ve been following the crypto space, you’ve likely heard of Non-Fungible Tokens (NFTs), more popularly referred to as ‘Crypto Collectibles.’ The world of NFTs is growing rapidly. It seems there is no slowing down...</p>
                            <ul class="describe-list">
                                <li><a href="#">Amet consectetur adipisicing elit. Maxime reprehenderit quaerat, velit rem atque vel impedit!</a></li>
                                <li><a href="#">Consectetur adipisicing elit. Maxime reprehenderit quaerat</a></li>
                                <li><a href="#">Fuga magni veritatis ad temporibus atque adipisci nisi rerum...</a></li>
                            </ul>
                        </div>
                    </div>

                    <!-- Bidding History Tab -->
                    <div class="tab-pane fade" id="pills-bid" role="tabpanel">
                        <div class="bid-list-area">
                            <ul class="bid-list">
                                {#each bidders as bidder}
                                    <li>
                                        <div class="row d-flex align-items-center">
                                            <div class="col-7">
                                                <div class="bidder-area">
                                                    <div class="bidder-img">
                                                        <img alt="image" src={bidder.image}>
                                                    </div>
                                                    <div class="bidder-content">
                                                        <a href="#"><h6>{bidder.name}</h6></a>
                                                        <p>{bidder.bid}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-5 text-end">
                                                <div class="bid-time">
                                                    <p>{bidder.time}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                {/each}
                            </ul>
                        </div>
                    </div>

                    <!-- Other Auction Tab -->
                    <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                        <div class="row d-flex justify-content-center g-4">
                            {#each otherAuctions as auction, index}
                                <div class="col-lg-6 col-md-4 col-sm-10">
                                    <div class="eg-card auction-card1 wow fadeInDown">
                                        <div class="auction-img">
                                            <img alt="image" src={auction.image}>
                                            <div class="auction-timer">
                                                <div class="countdown" id={`timer${index + 1}`}>
                                                    <h4>
                                                        <span id={`hours${index + 1}`}>05</span>H : 
                                                        <span id={`minutes${index + 1}`}>52</span>M : 
                                                        <span id={`seconds${index + 1}`}>32</span>S
                                                    </h4>
                                                </div>
                                            </div>
                                            <div class="author-area">
                                                <div class="author-emo">
                                                    <img alt="image" src="assets/images/icons/smile-emo.svg">
                                                </div>
                                                <div class="author-name">
                                                    <span>by {auction.author}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="auction-content">
                                            <h4><a href="auction-details.html">{auction.title}</a></h4>
                                            <p>Bidding Price : <span>{auction.price}</span> </p>
                                            <div class="auction-card-bttm">
                                                <a href="auction-details.html" class="eg-btn btn--primary btn--sm">Place a Bid</a>
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
                </div>
            </div>
            <div class="col-lg-4">
                <div class="blog-sidebar">
                    <div class="sidebar-banner wow fadeInUp" data-wow-duration="1.5s" data-wow-delay="1s">
                        <div class="banner-content">
                            <span>CARS</span>
                            <h3>Toyota AIGID A Clasis Cars Sale</h3>
                            <a href="auction-details.html" class="eg-btn btn--primary card--btn">Details</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
