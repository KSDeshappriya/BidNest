<script>
    // Data for "How It Works" steps
    let steps = [
        {
            number: "01.",
            title: "Register Now & Start Selling Your Things",
            description1: "One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections.",
            description2: "One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin.",
            image: "assets/images/bg/how-work1.png",
            buttonText: "Register Account",
            buttonLink: "signup.html",
            imagePosition: "right"
        },
        {
            number: "02.",
            title: "Select Your Item",
            description1: "One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections.",
            description2: "One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin.",
            image: "assets/images/bg/how-work2.png",
            buttonText: "Add Your Item",
            buttonLink: "live-auction.html",
            imagePosition: "left"
        },
        {
            number: "03.",
            title: "Purchase Items",
            description1: "One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections.",
            description2: "One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin.",
            image: "assets/images/bg/how-work3.png",
            buttonText: "Purchase Item",
            buttonLink: "live-auction.html",
            imagePosition: "right"
        }
    ];
</script>

<div class="how-work-section pt-120 pb-120">
    <img alt="section background" src="assets/images/bg/section-bg.png" class="section-bg-top">
    <div class="container">
        {#each steps as step, index}
            <div class="row g-4 mb-60">
                {#if step.imagePosition === 'right'}
                    <div class="col-xl-6 col-lg-6">
                        <div class="how-work-content wow fadeInUp" data-wow-duration="1.5s" data-wow-delay=".2s">
                            <span>{step.number}</span>
                            <h3>{step.title}</h3>
                            <p class="para">{step.description1}</p>
                            <p class="para">{step.description2}</p>
                            <a href={step.buttonLink} class="eg-btn btn--primary btn--md">{step.buttonText}</a>
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 d-flex justify-content-lg-end justify-content-center">
                        <div class="how-work-img wow fadeInDown" data-wow-duration="1.5s" data-wow-delay=".2s">
                            <img alt="work image" src={step.image} class="work-img">
                        </div>
                    </div>
                {:else}
                    <div class="col-xl-6 col-lg-6 d-flex justify-content-lg-start justify-content-center order-lg-1 order-2">
                        <div class="how-work-img wow fadeInDown" data-wow-duration="1.5s" data-wow-delay=".2s">
                            <img alt="work image" src={step.image} class="work-img">
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 order-lg-2 order-1">
                        <div class="how-work-content wow fadeInUp" data-wow-duration="1.5s" data-wow-delay=".2s">
                            <span>{step.number}</span>
                            <h3>{step.title}</h3>
                            <p class="para">{step.description1}</p>
                            <p class="para">{step.description2}</p>
                            <a href={step.buttonLink} class="eg-btn btn--primary btn--md">{step.buttonText}</a>
                        </div>
                    </div>
                {/if}
            </div>
        {/each}
    </div>
</div>
