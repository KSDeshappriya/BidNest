<script>
    // Define the sponsor image data
    const sponsors = [
        "assets/images/bg/sponsor1.png",
        "assets/images/bg/sponsor2.png",
        "assets/images/bg/sponsor3.png",
        "assets/images/bg/sponsor4.png",
        "assets/images/bg/sponsor5.png",
        "assets/images/bg/sponsor6.png",
        "assets/images/bg/sponsor7.png",
        "assets/images/bg/sponsor8.png",
        "assets/images/bg/sponsor9.png",
    ];
</script>

<!-- Sponsor Section -->
<div class="sponsor-section style-1 pb-4">
    <div class="container">
        <div class="row d-flex justify-content-center">
            <div class="col-sm-12 col-md-10 col-lg-8 col-xl-6">
                <div class="section-title1">
                    <h2>Trusted By 500+ Businesses.</h2>
                    <p class="mb-0">Explore on the world's best & largest Bidding marketplace with our beautiful Bidding products. We want to be a part of your smile, success, and future growth.</p>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="slick-wrapper wow fadeInUp" data-wow-duration="1.5s" data-wow-delay="0.2s">
                <div id="slick1">
                    {#each sponsors as sponsor}
                        <div class="slide-item">
                            <img alt="Sponsor logo" src={sponsor}>
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    </div>
</div>
