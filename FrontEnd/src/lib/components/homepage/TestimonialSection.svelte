<script>
    // Define the testimonial data
    const testimonials = [
        {
            quote: "The Pacific Grove Chamber of Commerce would like to thank eLab Communications and Mr. Will Elkadi for all the efforts that assisted me nicely manners.",
            name: "Johan Martin",
            designation: "CEO",
            imgSrc: "assets/images/bg/testi1.png",
            quoteIcon: "assets/images/icons/quote-green.svg",
        },
        {
            quote: "Nullam cursus tempor ex. Nullam nec dui id metus consequat congue ac at est. Pellentesque blandit neque at elit tristique tincidunt.",
            name: "Jamie Anderson",
            designation: "Manager",
            imgSrc: "assets/images/bg/testi2.png",
            quoteIcon: "assets/images/icons/quote-green.svg",
        },
        {
            quote: "Maecenas vitae porttitor neque, ac porttitor nunc. Duis venenatis lacinia libero. Nam nec augue ut nunc vulputate tincidunt at suscipit nunc.",
            name: "John Peter",
            designation: "Area Manager",
            imgSrc: "assets/images/bg/testi3.png",
            quoteIcon: "assets/images/icons/quote-green.svg",
        },
    ];
</script>

<!-- Testimonial Section -->
<div class="testimonial-section pt-80 pb-80">
    <img alt="image" src="assets/images/bg/client-right.png" class="client-right-vector">
    <img alt="image" src="assets/images/bg/client-left.png" class="client-left-vector">
    <img alt="image" src="assets/images/bg/clent-circle1.png" class="client-circle1">
    <img alt="image" src="assets/images/bg/clent-circle2.png" class="client-circle2">
    <img alt="image" src="assets/images/bg/clent-circle3.png" class="client-circle3">
    <div class="container">
        <div class="row d-flex justify-content-center">
            <div class="col-sm-12 col-md-10 col-lg-8 col-xl-6">
                <div class="section-title1">
                    <h2>What Client Say</h2>
                    <p class="mb-0">Explore on the world's best & largest Bidding marketplace with our beautiful Bidding products. We want to be a part of your smile, success, and future growth.</p>
                </div>
            </div>
        </div>
        <div class="row justify-content-center position-relative">
            <div class="swiper testimonial-slider">
                <div class="swiper-wrapper">
                    {#each testimonials as testimonial}
                        <div class="swiper-slide">
                            <div class="testimonial-single hover-border1 wow fadeInDown" data-wow-duration="1.5s" data-wow-delay=".2s">
                                <img alt="quote icon" src={testimonial.quoteIcon} class="quote-icon">
                                <div class="testi-img">
                                    <img alt="client image" src={testimonial.imgSrc}>
                                </div>
                                <div class="testi-content">
                                    <p class="para">{testimonial.quote}</p>
                                    <div class="testi-designation">
                                        <h5><a href="#">{testimonial.name}</a></h5>
                                        <p>{testimonial.designation}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
            <div class="slider-arrows testimonial2-arrow d-flex justify-content-between gap-3">
                <div class="testi-prev1 swiper-prev-arrow" tabindex="0" role="button" aria-label="Previous slide"><i class="bi bi-arrow-left"></i></div>
                <div class="testi-next1 swiper-next-arrow" tabindex="0" role="button" aria-label="Next slide"><i class="bi bi-arrow-right"></i></div>
            </div>
        </div>
    </div>
</div>
