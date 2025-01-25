<!-- Category Section -->
<script>
    const categories = [
        { name: 'Digital Art', image: '/assets/images/slider/digitalArt.svg', link: '/live-auction' },
        { name: 'Music', image: '/assets/images/slider/music.svg', link: '/live-auction' },
        { name: 'Motor Bike', image: '/assets/images/slider/motorbike.svg', link: '/live-auction' },
        { name: 'Game Pad', image: '/assets/images/slider/gamepad.svg', link: '/live-auction' },
        { name: 'Real Estate', image: '/assets/images/slider/realEstate.svg', link: '/live-auction' },
        { name: 'Collectibles', image: '/assets/images/slider/collectibles.svg', link: '/live-auction' },
    ];

    let currentIndex = 0;

    function nextSlide() {
        currentIndex = (currentIndex + 1) % categories.length;
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + categories.length) % categories.length;
    }
</script>

<div class="category-section pt-120 pb-120">
    <div class="container position-relative">
        <div class="row d-flex justify-content-center">
            <div class="swiper category1-slider">
                <div class="swiper-wrapper">
                    {#each categories as category, index}
                        <div class="swiper-slide" class:active={index === currentIndex}>
                            <div class="eg-card category-card1 wow animate fadeInDown" data-wow-duration="1500ms" data-wow-delay="{(index + 1) * 200}ms">
                                <div class="cat-icon">
                                    <img src={category.image} alt={category.name} />
                                </div>
                                <a href={category.link}>
                                    <h5>{category.name}</h5>
                                </a>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        </div>
        <div class="slider-arrows text-center d-xl-flex d-none justify-content-end">
            <button style="background-color: transparent; border: none;" class="category-prev1 swiper-prev-arrow" on:click={prevSlide} tabindex="0"  aria-label="Previous slide">
                <i class="bx bx-chevron-left"></i>
            </button>
            <button style="background-color: transparent; border: none;" class="category-next1 swiper-next-arrow" on:click={nextSlide} tabindex="0" type="button" aria-label="Next slide">
                <i class="bx bx-chevron-right"></i>
            </button>
        </div>
    </div>
</div>
