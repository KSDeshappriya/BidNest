<script lang="ts">
    import { onMount } from "svelte";
    export let data;

    let auctions = data.auctions;

    // Pagination Variables
    let currentPage = 1;
    let itemsPerPage = 6;
    let totalPages = Math.ceil(auctions.length / itemsPerPage);

    // Function to calculate remaining time
    function calculateTimeLeft(endDate: string) {
        const auctionEndDate = new Date(endDate);
        const now = new Date();

        // Get time components for both dates
        let sec = now.getSeconds();
        let min = now.getMinutes();
        let hr = now.getHours();
        let D = now.getDate();
        let M = now.getMonth();
        let Y = now.getFullYear();

        let aSec = auctionEndDate.getSeconds();
        let aMin = auctionEndDate.getMinutes();
        let aHr = auctionEndDate.getHours();
        let aD = auctionEndDate.getDate();
        let aM = auctionEndDate.getMonth();
        let aY = auctionEndDate.getFullYear();

        // Adjust time components if current time is ahead of auction end time
        if (aSec < sec) {
            aSec += 60;
            aMin -= 1;
        }
        if (aMin < min) {
            aMin += 60;
            aHr -= 1;
        }
        if (aHr < hr) {
            aHr += 24;
            aD -= 1;
        }
        if (aD < D) {
            aD += 30;
            aM -= 1;
        }
        if (aM < M) {
            aM += 12;
            aY -= 1;
        }

        // Calculate time differences
        let seconds = aSec - sec;
        let minutes = aMin - min;
        let hours = aHr - hr;
        let days = aD - D;
        let months = aM - M;
        let years = aY - Y;

        // Return the time differences
        return {
            seconds,
            minutes,
            hours,
            days,
            months,
            years,
        };
    }

    // Timer updating logic
    interface Auction {
        endDate: string;
        image: string;
        author: string;
        link: string;
        title: string;
        price: string;
    }

    let timers = auctions.map((auction: Auction, index: number) => ({
        id: `auction-timer-${index}`, // Automatically generated ID
        ...calculateTimeLeft(auction.endDate),
    }));
    onMount(() => {
        const updateCountdowns = setInterval(() => {
            timers = auctions.map((auction: Auction, index: number) => ({
                id: `auction-timer-${index}`, // Automatically generated ID
                ...calculateTimeLeft(auction.endDate),
            }));
        }, 1000);

        return () => clearInterval(updateCountdowns); // Clear the interval when component unmounts
    });

    // Pagination helper function
    function paginate(
        auctions: Auction[],
        currentPage: number,
        itemsPerPage: number,
    ) {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return auctions.slice(startIndex, endIndex);
    }

    let displayedAuctions = paginate(auctions, currentPage, itemsPerPage);

    // Change page
    function changePage(page: number) {
        currentPage = page;
        displayedAuctions = paginate(auctions, currentPage, itemsPerPage);
    }

    $: totalPages = Math.ceil(auctions.length / itemsPerPage);
</script>

<div class="live-auction pb-120">
    <!-- svelte-ignore a11y-img-redundant-alt -->
    <img
        alt="image"
        src="/assets/images/bg/section-bg.png"
        class="img-fluid section-bg"
    />
    <div class="container position-relative"  id="#liveAuction">
        <!-- svelte-ignore a11y-img-redundant-alt -->
        <img alt="image" src="/assets/images/bg/dotted1.png" class="dotted1" />
        <!-- svelte-ignore a11y-img-redundant-alt -->
        <img alt="image" src="/assets/images/bg/dotted1.png" class="dotted2" />

        <div class="row d-flex justify-content-center">
            <div class="col-sm-12 col-md-10 col-lg-8 col-xl-6">
                <div class="section-title1">
                    <h2>Live Auction</h2>
                    <p class="mb-0">
                        Explore on the world's best & largest Bidding
                        marketplace with our beautiful Bidding products. We want
                        to be a part of your smile, success and future growth.
                    </p>
                </div>
            </div>
        </div>
        <div class="row gy-4 mb-60 d-flex justify-content-center">
            {#each displayedAuctions as auction, index}
                <div class="col-lg-4 col-md-6 col-sm-10">
                    <div class="eg-card auction-card1 wow fadeInDown">
                        <div class="auction-img">
                            <!-- svelte-ignore a11y-img-redundant-alt -->
                            <img
                                alt="image"
                                src={auction.image}
                                style="height: 200px; object-fit: cover;"
                            />
                            <div class="auction-timer">
                                <div class="countdown">
                                    <h4>
                                        {#each timers as timer (timer.id)}
                                            {#if timer.id === `auction-timer-${index}`}
                                                <span
                                                    >{timer.months
                                                        .toString()
                                                        .padStart(2, "0")}</span
                                                >M :
                                                <span
                                                    >{timer.days
                                                        .toString()
                                                        .padStart(2, "0")}</span
                                                >D<br />
                                                <span
                                                    >{timer.hours
                                                        .toString()
                                                        .padStart(2, "0")}</span
                                                >H :
                                                <span
                                                    >{timer.minutes
                                                        .toString()
                                                        .padStart(2, "0")}</span
                                                >M :
                                                <span
                                                    >{timer.seconds
                                                        .toString()
                                                        .padStart(2, "0")}</span
                                                >S
                                            {/if}
                                        {/each}
                                    </h4>
                                </div>
                            </div>
                            <div class="author-area">
                                <div class="author-emo">
                                    <!-- svelte-ignore a11y-img-redundant-alt -->
                                    <img
                                        alt="image"
                                        src="/assets/images/icons/smile-emo.svg"
                                    />
                                </div>
                                <div class="author-name">
                                    <span>by {auction.author}</span>
                                </div>
                            </div>
                        </div>
                        <div class="auction-content">
                            <h4>
                                <a href={auction.link} rel="external"
                                    >{auction.title}</a
                                >
                            </h4>
                            <p>Bidding Price : <span>{auction.price}</span></p>
                            <div class="auction-card-bttm">
                                <a
                                    href={auction.link}
                                    rel="external"
                                    class="eg-btn btn--primary btn--sm"
                                >
                                    Place a Bid
                                </a>
                                <div class="share-area">
                                    <ul class="social-icons d-flex">
                                        <li>
                                            <a href="https://www.facebook.com/"
                                                ><i class="bx bxl-facebook"
                                                ></i></a
                                            >
                                        </li>
                                        <li>
                                            <a href="https://www.twitter.com/"
                                                ><i class="bx bxl-twitter"
                                                ></i></a
                                            >
                                        </li>
                                        <li>
                                            <a href="https://www.pinterest.com/"
                                                ><i class="bx bxl-pinterest"
                                                ></i></a
                                            >
                                        </li>
                                        <li>
                                            <a href="https://www.instagram.com/"
                                                ><i class="bx bxl-instagram"
                                                ></i></a
                                            >
                                        </li>
                                    </ul>
                                    <div>
                                        <a href="#" class="share-btn"
                                            ><i class="bx bxs-share-alt"></i></a
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            {/each}
        </div>

        <!-- Pagination -->
        <div class="row">
            <nav class="pagination-wrap">
                <ul
                    class="pagination d-flex justify-content-center gap-md-3 gap-2"
                >
                    <li class="page-item" class:disabled={currentPage === 1}>
                        <a
                            class="page-link"
                            href="#liveAuction"
                            on:click={() => changePage(currentPage - 1)}
                            tabindex="-1">Prev</a
                        >
                    </li>

                    {#each Array(totalPages) as _, page (page)}
                        <li
                            class="page-item"
                            class:active={page + 1 === currentPage}
                        >
                            <a
                                class="page-link"
                                href="#liveAuction"
                                on:click={() => changePage(page + 1)}
                                >{page + 1}</a
                            >
                        </li>
                    {/each}

                    <li
                        class="page-item"
                        class:disabled={currentPage === totalPages}
                    >
                        <a
                            class="page-link"
                            href="#liveAuction"
                            on:click={() => changePage(currentPage + 1)}>Next</a
                        >
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</div>
