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
    const now = new Date();
    const end = new Date(endDate);

    const totalMilliseconds = end.getTime() - now.getTime();

    let months = end.getMonth() - now.getMonth();
    let days = end.getDate() - now.getDate();
    let hours = end.getHours() - now.getHours();
    let minutes = end.getMinutes() - now.getMinutes();
    let seconds = end.getSeconds() - now.getSeconds();

    if (seconds < 0) {
      minutes--;
      seconds += 60;
    }
    if (minutes < 0) {
      hours--;
      minutes += 60;
    }
    if (hours < 0) {
      days--;
      hours += 24;
    }
    if (days < 0) {
      months--;
      const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += lastMonth.getDate();
    }
    if (months < 0) {
      months += 12;
    }

    return { months, days, hours, minutes, seconds, totalMilliseconds };
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



<div class="live-auction-section pt-120 pb-120">
  <!-- svelte-ignore a11y-img-redundant-alt -->
  <img
    alt="image"
    src="assets/images/bg/section-bg.png"
    class="img-fluid section-bg-top"
  />
  <!-- svelte-ignore a11y-img-redundant-alt -->
  <img
    alt="image"
    src="assets/images/bg/section-bg.png"
    class="img-fluid section-bg-bottom"
  />
  <div class="container">
    <div class="row gy-4 mb-60 d-flex justify-content-center">
      {#each displayedAuctions as auction, index}
        <div class="col-lg-4 col-md-6 col-sm-10">
          <div class="eg-card auction-card1 wow fadeInDown">
            <div class="auction-img">
              <!-- svelte-ignore a11y-img-redundant-alt -->
              <img alt="image" src={auction.image} style="height: 200px; object-fit: cover;"/>
              <div class="auction-timer">
                <div class="countdown">
                  <h4>
                    {#each timers as timer (timer.id)}
                      {#if timer.id === `auction-timer-${index}`}
                        <span>{timer.months.toString().padStart(2, "0")}</span>M
                        :
                        <span>{timer.days.toString().padStart(2, "0")}</span
                        >D<br />
                        <span>{timer.hours.toString().padStart(2, "0")}</span>H
                        :
                        <span>{timer.minutes.toString().padStart(2, "0")}</span
                        >M :
                        <span>{timer.seconds.toString().padStart(2, "0")}</span
                        >S
                      {/if}
                    {/each}
                  </h4>
                </div>
              </div>
              <div class="author-area">
                <div class="author-emo">
                  <!-- svelte-ignore a11y-img-redundant-alt -->
                  <img alt="image" src="assets/images/icons/smile-emo.svg" />
                </div>
                <div class="author-name">
                  <span>by {auction.author}</span>
                </div>
              </div>
            </div>
            <div class="auction-content">
              <h4>
                <a href={auction.link}>{auction.title}</a>
              </h4>
              <p>Bidding Price : <span>{auction.price}</span></p>
              <div class="auction-card-bttm">
                <a href={auction.link} class="eg-btn btn--primary btn--sm">
                  Place a Bid
                </a>
                <div class="share-area">
                  <ul class="social-icons d-flex">
                    <li>
                      <a href="https://www.facebook.com/"
                        ><i class="bx bxl-facebook"></i></a
                      >
                    </li>
                    <li>
                      <a href="https://www.twitter.com/"
                        ><i class="bx bxl-twitter"></i></a
                      >
                    </li>
                    <li>
                      <a href="https://www.pinterest.com/"
                        ><i class="bx bxl-pinterest"></i></a
                      >
                    </li>
                    <li>
                      <a href="https://www.instagram.com/"
                        ><i class="bx bxl-instagram"></i></a
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
        <ul class="pagination d-flex justify-content-center gap-md-3 gap-2">
          <li class="page-item" class:disabled={currentPage === 1}>
            <a
              class="page-link"
              href="#"
              on:click={() => changePage(currentPage - 1)}
              tabindex="-1">Prev</a
            >
          </li>

          {#each Array(totalPages) as _, page (page)}
            <li class="page-item" class:active={page + 1 === currentPage}>
              <a
                class="page-link"
                href="#"
                on:click={() => changePage(page + 1)}>{page + 1}</a
              >
            </li>
          {/each}

          <li class="page-item" class:disabled={currentPage === totalPages}>
            <a
              class="page-link"
              href="#"
              on:click={() => changePage(currentPage + 1)}>Next</a
            >
          </li>
        </ul>
      </nav>
    </div>
  </div>
</div>
