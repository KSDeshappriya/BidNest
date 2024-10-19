<script>
    let totalRaised = "$45,390.00"; // Default total raised amount
    let title = "We Work for Your Incredible Success"; // Default title
    let description1 = "Auction sites present consumers with a thrilling, competitive way to buy the goods and services they need most.";
    let description2 = "But getting your own auction site up and running has always required learning complex coding languages, or hiring an expensive design firm for thousands of dollars and months of work.";
    let aboutList = [
        { text: "Have enough food for life.", link: "#" },
        { text: "Poor children can return to school.", link: "#" },
        { text: "Fuga magni veritatis ad temporibus atque adipisci nisi rerum...", link: "#" }
    ];
</script>

<div class="about-section pt-120 pb-120">
    <img src="assets/images/bg/section-bg.png" class="img-fluid section-bg-top" alt="section-bg">
    <div class="container">
        <div class="row d-flex justify-content-center g-4">
            <div class="col-lg-6 col-md-10">
                <div class="about-img-area">
                    <div class="total-tag">
                        <img src="assets/images/bg/total-tag.png" alt="total-tag">
                        <h6>Total Raised</h6>
                        <h5>{totalRaised}</h5>
                    </div>
                    <img src="assets/images/bg/about-img.png" class="img-fluid about-img wow fadeInUp" data-wow-duration="1.5s" data-wow-delay=".2s" alt="about-img">
                    <img src="assets/images/bg/about-linear.png" class="img-fluid about-linear" alt="about-linear">
                    <img src="assets/images/bg/about-vector.png" class="img-fluid about-vector" alt="about-vector">
                </div>
            </div>
            <div class="col-lg-6 col-md-10">
                <div class="about-content wow fadeInDown" data-wow-duration="1.5s" data-wow-delay=".2s">
                    <span>Who we are!</span>
                    <h2>{title}</h2>
                    <p class="para">{description1}</p>
                    <p class="para">{description2}</p>
                    <ul class="about-list">
                        {#each aboutList as item}
                            <li><a href={item.link}>{item.text}</a></li>
                        {/each}
                    </ul>
                    <a href="#choose-us" class="eg-btn btn--primary btn--md">More About</a>
                </div>
            </div>
        </div>
    </div>
</div>
