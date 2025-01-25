<script>
    let blogs = [
    {
        "date": "Jan 30, 2022",
        "title": "Still Has in Advertising Creative Digital Reviews",
        "author": "Johan Martin",
        "comments": 5,
        "image": "/assets/images/blog/blogstyle11.png"
    },
    {
        "date": "May 30, 2022",
        "title": "Our friend Johnny No-Job He’s a specialist in influencer.",
        "author": "Johan Martin",
        "comments": 5,
        "image": "/assets/images/blog/blogstyle12.png"
    },
    {
        "date": "Jan 30, 2022",
        "title": "While these are just estimates, they encouraging guide",
        "author": "Johan Martin",
        "comments": 5,
        "image": "/assets/images/blog/blogstyle13.png"
    },
    {
        "date": "May 30, 2022",
        "title": "What skills do you need marketing consultant?",
        "author": "Johan Martin",
        "comments": 5,
        "image": "/assets/images/blog/blogstyle14.png"
    },
    {
        "date": "Jan 30, 2022",
        "title": "If you feel the same way becoming a.",
        "author": "Johan Martin",
        "comments": 5,
        "image": "/assets/images/blog/blogstyle15.png"
    },
    {
        "date": "May 30, 2022",
        "title": "Creative Fashion Riboon Digital with rgb lights.",
        "author": "Johan Martin",
        "comments": 5,
        "image": "/assets/images/blog/blogstyle16.png"
    }
]

</script>

<div class="blog-section pt-120 pb-120">
    <div class="container">
        <div class="row d-flex justify-content-center g-4 mb-60">
            {#each blogs as blog}
                <div class="col-xl-4 col-lg-6 col-md-6 col-sm-10">
                    <div class="single-blog-style1 wow fadeInDown" data-wow-duration="1.5s">
                        <div class="blog-img">
                            <a href="#" class="blog-date"><i class="bi bi-calendar-check"></i>{blog.date}</a>
                            <img alt="image" src={blog.image}>
                        </div>
                        <div class="blog-content">
                            <h5><a href="blog-details.html">{blog.title}</a></h5>
                            <div class="blog-meta">
                                <div class="author">
                                    <img alt="image" src="/assets/images/blog/author1.png">
                                    <a href="blog-details.html" class="author-name">{blog.author}</a>
                                </div>
                                <div class="comment">
                                    <img alt="image" src="/assets/images/icons/comment-icon.svg">
                                    <a href="#" class="comment">{blog.comments} Comments</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
        <div class="row">
            <nav class="pagination-wrap">
                <ul class="pagination d-flex justify-content-center gap-md-3 gap-2">
                    <li class="page-item">
                        <a class="page-link" href="#" tabindex="-1">Prev</a>
                    </li>
                    <li class="page-item"><a class="page-link" href="#">01</a></li>
                    <li class="page-item active" aria-current="page">
                        <a class="page-link" href="#">02</a>
                    </li>
                    <li class="page-item"><a class="page-link" href="#">03</a></li>
                    <li class="page-item">
                        <a class="page-link" href="#">Next</a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</div>
