<script>
    // Define the news data
    const newsItems = [
        {
            date: "Jan 30, 2022",
            imgSrc: "/assets/images/blog/blogstyle11.png",
            title: "David Droga Still Has Faith in Online Advertising Creative Digital Reviews",
            authorImg: "/assets/images/blog/author1.png",
            authorName: "Johan Martin",
            commentsCount: 5,
            link: "blog-details.html"
        },
        {
            date: "May 30, 2022",
            imgSrc: "/assets/images/blog/blogstyle12.png",
            title: "Take our friend Johnny No-Job, for example. He’s a specialist in influencer.",
            authorImg: "/assets/images/blog/author1.png",
            authorName: "Johan Martin",
            commentsCount: 5,
            link: "blog-details.html"
        }
    ];
</script>

<!-- Recent News Section -->
<div class="recent-news-section pt-120 pb-120">
    <img alt="Background" src="/assets/images/bg/section-bg.png" class="img-fluid section-bg">
    <img alt="Dot Circle" src="/assets/images/icons/dot-circle.svg" class="dot-circle">
    <div class="container">
        <div class="row d-flex justify-content-center">
            <div class="col-sm-12 col-md-10 col-lg-8 col-xl-6">
                <div class="section-title1">
                    <h2>Our Recent News</h2>
                    <p class="mb-0">Explore on the world's best & largest Bidding marketplace with our beautiful Bidding products. We want to be a part of your smile, success, and future growth.</p>
                </div>
            </div>
        </div>
        <div class="row d-flex justify-content-center g-4">
            {#each newsItems as newsItem, index}
                <div class="col-md-6 col-sm-10">
                    <div class="single-blog-style1 wow animate fadeInDown" data-wow-duration="1.5s" data-wow-delay="{index * 0.2}s">
                        <div class="blog-img">
                            <a href="#" class="blog-date"><i class="bi bi-calendar-check"></i>{newsItem.date}</a>
                            <img alt="Blog image" src={newsItem.imgSrc}>
                        </div>
                        <div class="blog-content">
                            <h5><a href={newsItem.link}>{newsItem.title}</a></h5>
                            <div class="blog-meta">
                                <div class="author">
                                    <img alt="Author image" src={newsItem.authorImg}>
                                    <a href="blog.html" class="author-name">{newsItem.authorName}</a>
                                </div>
                                <div class="comment">
                                    <img alt="Comment icon" src="/assets/images/icons/comment-icon.svg">
                                    <a href="#" class="comment">{newsItem.commentsCount} Comments</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>
