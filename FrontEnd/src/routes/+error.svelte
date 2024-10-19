<script>
    import MobileSearch from "$lib/components/MobileSearch.svelte";
    import TopBar from '$lib/components/TopBar.svelte';
    import Header from "$lib/components/Header.svelte";
    import Footer from '$lib/components/Footer.svelte';
  </script>

  <MobileSearch />
  <TopBar />
  <Header />
    <div class="inner-banner">
        <div class="container">
            <h2 class="inner-banner-title wow fadeInLeft" data-wow-duration="1.5s" data-wow-delay=".2s">404</h2>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="index-2.html">Home</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Error Page</li>
                </ol>
            </nav>
        </div>
    </div>

    <div class="error-section pt-120 pb-120">
        <img src="assets/images/bg/section-bg.png" class="img-fluid section-bg-top" alt="Section background">
        <img src="assets/images/bg/section-bg.png" class="img-fluid section-bg-bottom" alt="Section background">
        <img src="assets/images/bg/e-vector1.svg" class="evector1" alt="e-vector1">
        <img src="assets/images/bg/e-vector2.svg" class="evector2" alt="e-vector2">
        <img src="assets/images/bg/e-vector3.svg" class="evector3" alt="e-vector3">
        <img src="assets/images/bg/e-vector4.svg" class="evector4" alt="e-vector4">
        <div class="container">
            <div class="row d-flex justify-content-center g-4">
                <div class="col-lg-6 col-md-8 text-center">
                    <div class="error-wrapper">
                        <img src="assets/images/bg/error-bg.png" class="error-bg img-fluid" alt="error-bg">
                        <div class="error-content wow fadeInDown" data-wow-duration="1.5s" data-wow-delay=".2s">
                            <h2>Sorry we can’t find that page</h2>
                            <p class="para">The page you are looking for was moved, removed, renamed or never existed</p>
                            <a href="/" rel="external" class="eg-btn btn--primary btn--md">Back Home</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  <Footer />