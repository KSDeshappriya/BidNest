<script>
  import { page } from "$app/stores";

  import MobileSearch from "$lib/components/MobileSearch.svelte";
  import TopBar from "$lib/components/TopBar.svelte";
  import Header from "$lib/components/Header.svelte";
  import InnerBanner from "$lib/components/faq/InnerBanner.svelte";
  import QAnswer from "$lib/components/faq/QAnswer.svelte";
  import Counter from "$lib/components/homepage/CounterSection.svelte";
  import Footer from "$lib/components/Footer.svelte";
</script>

<MobileSearch />
<TopBar />
<Header />
<InnerBanner />
<QAnswer data={$page.data} />
<Counter />
<Footer />