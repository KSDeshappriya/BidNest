<script>
  import { onMount } from 'svelte';

  let auctions = [
    {
      image: 'assets/images/bg/live-auc1.png',
      title: 'Brand New royal Enfield 250 CC For Sale',
      price: '$85.9',
      author: '@robatfox',
      timer: 'timer1',
      link: 'auction-details.html'
    },
    {
      image: 'assets/images/bg/live-auc2.png',
      title: 'Wedding Special Exclusive Cupple Ring (S2022)',
      price: '$85.9',
      author: '@robatfox',
      timer: 'timer2',
      link: 'auction-details.html'
    },
    {
      image: 'assets/images/bg/live-auc3.png',
      title: 'Brand New Honda CBR 600 RR For Sale (2022)',
      price: '$85.9',
      author: '@robatfox',
      timer: 'timer3',
      link: 'auction-details.html'
    },
    {
      image: 'assets/images/bg/live-auc4.png',
      title: 'Toyota AIGID A Class Hatchback Sale (2017 - 2021)',
      price: '$85.9',
      author: '@robatfox',
      timer: 'timer4',
      link: 'auction-details.html'
    },
    {
      image: 'assets/images/bg/live-auc5.png',
      title: 'Havit HV-G61 USB Black Double Game Pad With Vibrat',
      price: '$85.9',
      author: '@robatfox',
      timer: 'timer5',
      link: 'auction-details.html'
    },
    {
      image: 'assets/images/bg/live-auc6.png',
      title: 'IPhone 11 Pro Max All Variants Available For Sale',
      price: '$85.9',
      author: '@robatfox',
      timer: 'timer6',
      link: 'auction-details.html'
    },
    {
      image: 'assets/images/bg/live-auc7.png',
      title: 'Blue ray filter All Variants Available For Sale',
      price: '$85.9',
      author: '@robatfox',
      timer: 'timer7',
      link: 'auction-details.html'
    },
    {
      image: 'assets/images/bg/live-auc8.png',
      title: 'Pure leather All Variants Available For Sale',
      price: '$85.9',
      author: '@robatfox',
      timer: 'timer8',
      link: 'auction-details.html'
    },
    {
      image: 'assets/images/bg/live-auc9.png',
      title: 'Water resist All Variants Available For Sale',
      price: '$85.9',
      author: '@robatfox',
      timer: 'timer9',
      link: 'auction-details.html'
    }
  ];

  // Function to handle countdown timers
  onMount(() => {
    auctions.forEach((auction, index) => {
      const timerId = auction.timer;
      const hours = document.getElementById(`${timerId} hours${index + 1}`);
      const minutes = document.getElementById(`${timerId} minutes${index + 1}`);
      const seconds = document.getElementById(`${timerId} seconds${index + 1}`);

      // You can replace this with your actual countdown logic
      let countDownDate = new Date("Jan 5, 2024 15:37:25").getTime();

      const updateCountdown = setInterval(() => {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hoursLeft = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutesLeft = Math.floor(
          (distance % (1000 * 60 * 60)) / (1000 * 60)
        );
        const secondsLeft = Math.floor((distance % (1000 * 60)) / 1000);

        if(hours && minutes && seconds){
        // Display the result in the element with id="demo"
        hours.innerHTML = hoursLeft.toString().padStart(2, "0");
        minutes.innerHTML = minutesLeft.toString().padStart(2, "0");
        seconds.innerHTML = secondsLeft.toString().padStart(2, "0");

        // If the count down is over, write some text
        if (distance < 0) {
          clearInterval(updateCountdown);
          hours.innerHTML = "00";
          minutes.innerHTML = "00";
          seconds.innerHTML = "00";
        }
    }
      }, 1000);
    });
  });
</script>

<div class="live-auction-section pt-120 pb-120">
  <img alt="image" src="assets/images/bg/section-bg.png" class="img-fluid section-bg-top" />
  <img alt="image" src="assets/images/bg/section-bg.png" class="img-fluid section-bg-bottom" />
    <div class="container">
        <div class="row gy-4 mb-60 d-flex justify-content-center">
      {#each auctions as auction, index}
        <div class="col-lg-4 col-md-6 col-sm-10">
          <div
            data-wow-duration="1.5s"
            data-wow-delay={`${(index + 1) * 0.2}s`}
            class="eg-card auction-card1 wow fadeInDown"
          >
                    <div class="auction-img">
              <img alt="image" src={auction.image} />
                        <div class="auction-timer">
                <div class="countdown" id={auction.timer}>
                  <h4>
                    <span id={`${auction.timer} hours${index + 1}`}>05</span>H :
                    <span id={`${auction.timer} minutes${index + 1}`}>52</span>M :
                    <span id={`${auction.timer} seconds${index + 1}`}>32</span>S
                  </h4>
                            </div>
                            </div>
              <div class="author-area">
                <div class="author-emo">
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