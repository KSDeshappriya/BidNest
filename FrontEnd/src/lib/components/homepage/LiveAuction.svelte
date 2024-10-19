<script>
 import { onMount } from 'svelte';

let startDate = new Date('2024-09-03 08:23:55.947151'); // Replace with user input
let endDate = new Date('2024-12-31 23:59:59.000000'); // Replace with user input
let hours1 = 0, minutes1 = 0, seconds1 = 0;
let hours2 = 0, minutes2 = 0, seconds2 = 0;
let hours3 = 0, minutes3 = 0, seconds3 = 0;
let hours4 = 0, minutes4 = 0, seconds4 = 0;
let hours5 = 0, minutes5 = 0, seconds5 = 0;
let hours6 = 0, minutes6 = 0, seconds6 = 0;

function updateTimers() {
  const now = new Date();
  if (now >= endDate) {
    // If the auction has ended, set all timers to 0
    hours1 = minutes1 = seconds1 = 0;
    hours2 = minutes2 = seconds2 = 0;
    hours3 = minutes3 = seconds3 = 0;
    hours4 = minutes4 = seconds4 = 0;
    hours5 = minutes5 = seconds5 = 0;
    hours6 = minutes6 = seconds6 = 0;
    return;
  }

  // Calculate time remaining for each auction
  const timeRemaining1 = endDate.getTime() - now.getTime();
  const timeRemaining2 = endDate.getTime() - now.getTime();
  const timeRemaining3 = endDate.getTime() - now.getTime();
  const timeRemaining4 = endDate.getTime() - now.getTime();
  const timeRemaining5 = endDate.getTime() - now.getTime();
  const timeRemaining6 = endDate.getTime() - now.getTime();

  // Convert time remaining to hours, minutes, and seconds
  hours1 = Math.floor(timeRemaining1 / (1000 * 60 * 60));
  minutes1 = Math.floor((timeRemaining1 % (1000 * 60 * 60)) / (1000 * 60));
  seconds1 = Math.floor((timeRemaining1 % (1000 * 60)) / 1000);

  hours2 = Math.floor(timeRemaining2 / (1000 * 60 * 60));
  minutes2 = Math.floor((timeRemaining2 % (1000 * 60 * 60)) / (1000 * 60));
  seconds2 = Math.floor((timeRemaining2 % (1000 * 60)) / 1000);

  hours3 = Math.floor(timeRemaining3 / (1000 * 60 * 60));
  minutes3 = Math.floor((timeRemaining3 % (1000 * 60 * 60)) / (1000 * 60));
  seconds3 = Math.floor((timeRemaining3 % (1000 * 60)) / 1000);

  hours4 = Math.floor(timeRemaining4 / (1000 * 60 * 60));
  minutes4 = Math.floor((timeRemaining4 % (1000 * 60 * 60)) / (1000 * 60));
  seconds4 = Math.floor((timeRemaining4 % (1000 * 60)) / 1000);

  hours5 = Math.floor(timeRemaining5 / (1000 * 60 * 60));
  minutes5 = Math.floor((timeRemaining5 % (1000 * 60 * 60)) / (1000 * 60));
  seconds5 = Math.floor((timeRemaining5 % (1000 * 60)) / 1000);

  hours6 = Math.floor(timeRemaining6 / (1000 * 60 * 60));
  minutes6 = Math.floor((timeRemaining6 % (1000 * 60 * 60)) / (1000 * 60));
  seconds6 = Math.floor((timeRemaining6 % (1000 * 60)) / 1000);
}

onMount(() => {
  updateTimers();
  const interval = setInterval(updateTimers, 1000);
  return () => clearInterval(interval);
});
</script>

<div class="live-auction pb-120">
    <!-- svelte-ignore a11y-img-redundant-alt -->
    <img alt="image" src="/assets/images/bg/section-bg.png" class="img-fluid section-bg">
    <div class="container position-relative">
        <!-- svelte-ignore a11y-img-redundant-alt -->
        <img alt="image" src="/assets/images/bg/dotted1.png" class="dotted1">
        <!-- svelte-ignore a11y-img-redundant-alt -->
        <img alt="image" src="/assets/images/bg/dotted1.png" class="dotted2">

        <div class="row d-flex justify-content-center">
            <div class="col-sm-12 col-md-10 col-lg-8 col-xl-6">
                <div class="section-title1">
                    <h2>Live Auction</h2>
                    <p class="mb-0">
                        Explore on the world's best & largest Bidding marketplace with our beautiful Bidding products.
                        We want to be a part of your smile, success and future growth.
                    </p>
                </div>
            </div>
        </div>

        <div class="row gy-4 mb-60 d-flex justify-content-center">
            {#each [
                { img: 'live-auc1.png', hours: hours1, minutes: minutes1, seconds: seconds1, name: 'Brand New royal Enfield 250 CC For Sale', price: 85.9 },
                { img: 'live-auc2.png', hours: hours2, minutes: minutes2, seconds: seconds2, name: 'Wedding Special Exclusive Couple Ring (S2022)', price: 85.9 },
                { img: 'live-auc3.png', hours: hours3, minutes: minutes3, seconds: seconds3, name: 'Brand New Honda CBR 600 RR For Special Sale (2022)', price: 85.9 },
                { img: 'live-auc4.png', hours: hours4, minutes: minutes4, seconds: seconds4, name: 'Toyota AIGID A Class Hatchback Sale (2017 - 2021)', price: 85.9 },
                { img: 'live-auc5.png', hours: hours5, minutes: minutes5, seconds: seconds5, name: 'Havit HV-G61 USB Black Double Game Pad With Vibrat', price: 85.9 },
                { img: 'live-auc6.png', hours: hours6, minutes: minutes6, seconds: seconds6, name: 'IPhone 11 Pro Max All Variants Available For Special Sale', price: 85.9 }
            ] as auction}
            <div class="col-lg-4 col-md-6 col-sm-10">
                <div class="eg-card auction-card1">
                    <div class="auction-img">
                        <!-- svelte-ignore a11y-img-redundant-alt -->
                        <img alt="image" src={`/assets/images/bg/${auction.img}`}>
                        <div class="auction-timer">
                            <div class="countdown">
                                <h4><span>{auction.hours}</span>H : <span>{auction.minutes}</span>M : <span>{auction.seconds}</span>S</h4>
                            </div>
                        </div>
                    </div>
                    <div class="auction-content">
                        <h4><a  rel="external" href="/auction-details">{auction.name}</a></h4>
                        <p>Bidding Price: <span>{auction.price}</span></p>
                        <div class="auction-card-bttm">
                            <a  rel="external" href="/auction-details" class="eg-btn btn--primary btn--sm">Place a Bid</a>
                            <div class="share-area">
                                <ul class="social-icons d-flex">
                                    <li><a href="https://www.facebook.com/"><i class="bx bxl-facebook"></i></a></li>
                                    <li><a href="https://www.twitter.com/"><i class="bx bxl-twitter"></i></a></li>
                                    <li><a href="https://www.pinterest.com/"><i class="bx bxl-pinterest"></i></a></li>
                                    <li><a href="https://www.instagram.com/"><i class="bx bxl-instagram"></i></a></li>
                                </ul>
                                <div>
                                    <div class="share-btn"><i class="bx bxs-share-alt"></i></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/each}
        </div>

        <div class="row d-flex justify-content-center">
            <div class="col-md-4 text-center">
                <a rel="external" href="/live-auction" class="eg-btn btn--primary btn--md mx-auto">View All</a>
            </div>
        </div>
    </div>
</div>
