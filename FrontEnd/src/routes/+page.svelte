<script>
  // import Loader from "$lib/components/Loader.svelte";
  import MobileSearch from "$lib/components/MobileSearch.svelte";
  import TopBar from '$lib/components/TopBar.svelte';
  import Header from "$lib/components/Header.svelte";
  import Hero from "$lib/components/homepage/Hero.svelte";
  import Category from "$lib/components/homepage/Category.svelte";
  import LiveAuction from '$lib/components/homepage/LiveAuction.svelte';
  import UpcomingAuction from '$lib/components/homepage/UpcomingAuction.svelte';
  import Testimonial from '$lib/components/homepage/TestimonialSection.svelte';
  import Sponsor from '$lib/components/homepage/SponsorSection.svelte';
  import RecentNews from '$lib/components/homepage/RecentNewsSection.svelte';
  import Counter from '$lib/components/homepage/CounterSection.svelte';
  import Footer from '$lib/components/Footer.svelte';

  import { page } from "$app/stores";
</script>

<!-- <Loader /> -->
<MobileSearch />
<TopBar />
<Header />
<Hero />
<Category />
<LiveAuction  data={$page.data}/>
<UpcomingAuction />
<Testimonial />
<Sponsor />
<RecentNews />
<Counter />
<Footer />