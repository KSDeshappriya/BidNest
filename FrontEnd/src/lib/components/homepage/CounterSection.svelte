<script>
    // Define the counter data
    const counters = [
        {
            finalValue: 5400,
            label: "Happy Customer",
            icon: "assets/images/icons/employee.svg",
            delay: 0.2
        },
        {
            finalValue: 1250,
            label: "Good Reviews",
            icon: "assets/images/icons/review.svg",
            delay: 0.4
        },
        {
            finalValue: 4250,
            label: "Winner Customer",
            icon: "assets/images/icons/smily.svg",
            delay: 0.6
        },
        {
            finalValue: 500,
            label: "New Comments",
            icon: "assets/images/icons/comment.svg",
            delay: 0.8
        }
    ];
    
</script>

<!-- container Section -->
<div class="about-us-counter pt-100 pb-120">
    <div class="container">
        <div class="row g-4 d-flex justify-content-center">
            {#each counters as counter}
                <div class="col-xl-3 col-lg-4 col-md-6 col-sm-10 col-10">
                    <div class="counter-single text-center d-flex flex-row hover-border1 wow animate fadeInDown"
                        data-wow-duration="1.5s" data-wow-delay="{counter.delay}s">
                        <div class="counter-icon"> 
                            <img alt="{counter.label} icon" src={counter.icon}> 
                        </div>
                        <div class="coundown d-flex flex-column">
                            <h3 class="odometer" data-odometer-final={counter.finalValue}>&nbsp;</h3>
                            <p>{counter.label}</p>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>