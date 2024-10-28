<script>
  let mobileMenuOpen = false;

  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }
</script>

<header class="header-area style-1">
  <div class="header-logo">
    <a rel="external" href="/">
      <img alt="BidNest Header Logo" src="/assets/images/bg/header-logo.png" />
    </a>
  </div>

  <div class="main-menu" class:open={mobileMenuOpen}>
    <div
      class="mobile-logo-area d-lg-none d-flex justify-content-between align-items-center"
    >
      <div class="mobile-logo-wrap">
        <a rel="external" href="/">
          <img
            alt="BidNest Header Logo"
            src="/assets/images/bg/header-logo.png"
          />
        </a>
      </div>
      <button
        type="button"
        class="menu-close-btn"
        on:click={toggleMobileMenu}
        aria-label="Close menu"
      >
        <i class="bi bi-x-lg"></i>
      </button>
    </div>

    <ul class="menu-list">
      <li><a rel="external" href="/" class="drop-down">Home</a></li>
      <li><a rel="external" href="/about">About Us</a></li>
      <li><a rel="external" href="/how-works">How It Works</a></li>
      <li><a rel="external" href="/live-auction">Browse Product</a></li>
      <li class="menu-item-has-children">
        <a rel="external" href="/news">News</a>
        <i class="bx bx-plus dropdown-icon"></i>
        <ul class="submenu">
          <li><a rel="external" href="/blog">Blog</a></li>
          <li><a rel="external" href="/blog-details">Blog Details</a></li>
        </ul>
      </li>
      <li class="menu-item-has-children">
        <a rel="external" href="#" class="drop-down">Pages</a>
        <i class="bx bx-plus dropdown-icon"></i>
        <ul class="submenu">
          <li><a rel="external" href="/auction-details">Auction Details</a></li>
          <li><a rel="external" href="/faq">Faq</a></li>
          <li><a rel="external" href="/dashboard">Dashboard</a></li>
          <li><a rel="external" href="/login">Login</a></li>
          <li><a rel="external" href="/signup">Sign Up</a></li>
          <li><a rel="external" href="/404">404</a></li>
        </ul>
      </li>
      <li><a rel="external" href="/contact">Contact</a></li>
    </ul>

    <div class="d-lg-none d-block">
      <form class="mobile-menu-form mb-5">
        <div class="input-with-btn d-flex flex-column">
          <input type="text" placeholder="Search here..." />
          <button type="submit" class="eg-btn btn--primary btn--sm"
            >Search</button
          >
        </div>
      </form>

      <div class="hotline two">
        <div class="hotline-info">
          <span>Click To Call</span>
          <h6><a href="tel:+3472748816">+347-274-8816</a></h6>
        </div>
      </div>
    </div>
  </div>

  <div class="nav-right d-flex align-items-center">
    <div class="hotline d-xxl-flex d-none">
      <div class="hotline-icon">
        <img alt="" src="/assets/images/icons/header-phone.svg" />
      </div>
      <div class="hotline-info">
        <span>Click To Call</span>
        <h6><a href="tel:+3472748816">+347-274-8816</a></h6>
      </div>
    </div>

    <div class="search-btn">
      <i class="bi bi-search"></i>
    </div>

    <div class="eg-btn btn--primary header-btn">
      <a rel="external" href="/login">My Account</a>
    </div>

    <button
      type="button"
      class="mobile-menu-btn d-lg-none d-block"
      on:click={toggleMobileMenu}
      aria-label="Open mobile menu"
    >
      <i class="bx bx-menu"></i>
    </button>
  </div>
</header>

<style>
  /* Add your styles here */
  .main-menu.open {
    display: block;
  }
</style>
