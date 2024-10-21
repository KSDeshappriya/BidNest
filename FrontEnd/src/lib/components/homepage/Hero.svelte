<script>
  let currentSlide = 0;
  const slides = [
    {
      title: "Build, sell & collect digital items.",
      subtitle: "Welcome To Auction House",
      description:
        "Nulla facilisi. Maecenas ac tellus ut ligula interdum convallis. Nullam dapibus on erat in dolor posuere, none hendrerit lectus ornare. Suspendisse sit amet turpina sagittis, ultrices dui et, aliquam none hendrerit lectus.",
      backgroundClass: "slider-bg-1",
      link: "/live-auction",
    },
    {
      title: "Purchase Dream Product & Try.",
      subtitle: "Welcome To Auction House",
      description:
        "Nulla facilisi. Maecenas ac tellus ut ligula interdum convallis. Nullam dapibus on erat in dolor posuere, none hendrerit lectus ornare. Suspendisse sit amet turpina sagittis, ultrices dui et, aliquam none hendrerit lectus.",
      backgroundClass: "slider-bg-2",
      link: "/live-auction",
    },
  ];

  /**
   * @param {number} index
   */
  function goToSlide(index) {
    currentSlide = index;
  }
</script>

<div class="hero-area hero-style-one">
  <div class="hero-main-wrapper position-relative">
    <div class="swiper banner1">
      <div class="swiper-wrapper">
        {#each slides as slide, index}
          <div
            class="swiper-slide {slide.backgroundClass} {index === currentSlide? 'active': ''}"
            aria-hidden={index !== currentSlide}
            style="display: {index === currentSlide ? 'block' : 'none'}"
          >
            <div class="container">
              <div class="row d-flex justify-content-center align-items-center">
                <div class="col-xl-10 col-lg-10">
                  <div class="banner1-content">
                    <span>{slide.subtitle}</span>
                    <h1>{slide.title}</h1>
                    <p>{slide.description}</p>
                    <a href={slide.link} rel="external" class="eg-btn btn--primary btn--lg"
                      >Start Exploring</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <!-- Manual navigation for slides -->
    <div
      class="hero-one-pagination d-flex justify-content-center flex-column align-items-center gap-3"
    >
      {#each slides as _, index}
        <button
          class={index === currentSlide ? "active" : ""}
          on:click={() => goToSlide(index)}
          aria-label={`Go to slide ${index + 1}`}
        >
        </button>
      {/each}
    </div>
  </div>
</div>
