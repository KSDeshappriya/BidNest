<script>
    let title = "Why Choose Us"; // Default title
    let description = "Explore on the world's best & largest Bidding marketplace with our beautiful Bidding products. We want to be a part of your smile, success and future growth.";
    
    // Default features array
    let features = [
        {
            number: "01",
            title: "High Quality Products",
            description: "Voluptate aut blanditiis accusantium offic expedita dolorem inventore",
            icon: "assets/images/chooseUs/HQProducts.svg",
        },
        {
            number: "02",
            title: "Creator’s Royalty",
            description: "Voluptate aut blanditiis accusantium offic expedita dolorem inventore",
            icon: "assets/images/chooseUs/Royalty.svg",
        },
        {
            number: "03",
            title: "Top Class Product Price",
            description: "Voluptate aut blanditiis accusantium offic expedita dolorem inventore",
            icon: "assets/images/chooseUs/TopClass.svg",
        },
        {
            number: "04",
            title: "Support Multiple Currency",
            description: "Voluptate aut blanditiis accusantium offic expedita dolorem inventore",
            icon: "assets/images/chooseUs/MultiCurr.svg",
        },
        {
            number: "05",
            title: "Show All Bidders History",
            description: "Voluptate aut blanditiis accusantium offic expedita dolorem inventore",
            icon: "assets/images/chooseUs/BidHistory.svg",
        },
        {
            number: "06",
            title: "100% Happy Customer",
            description: "Voluptate aut blanditiis accusantium offic expedita dolorem inventore",
            icon: "assets/images/chooseUs/HappyCus.svg",
        }
    ];
</script>

<div class="choose-us-section pb-120" id="choose-us">
    <img src="assets/images/bg/section-bg.png" class="section-bg-bottom" alt="Section Background">
    <div class="container position-relative">
        <img src="assets/images/bg/angle-vector.png" class="img-fluid angle-vector" alt="Angle Vector">
        <div class="row d-flex justify-content-center">
            <div class="col-sm-12 col-md-10 col-lg-8 col-xl-6">
                <div class="section-title1">
                    <h2>{title}</h2>
                    <p class="mb-0">{description}</p>
                </div>
            </div>
        </div>
        <div class="row d-flex justify-content-center g-4">
            {#each features as feature, index}
                <div class="col-lg-4 col-md-6 col-sm-10">
                    <div class="single-feature hover-border1 wow fadeInDown" data-wow-duration="1.5s" data-wow-delay="{(index + 1) * 0.2}s">
                        <span class="sn">{feature.number}</span>
                        <div class="icon">
                            <img src={feature.icon} alt={feature.title} srcset="">
                        </div>
                        <div class="content">
                            <h5><a href="#">{feature.title}</a></h5>
                            <p class="para">{feature.description}</p>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>
