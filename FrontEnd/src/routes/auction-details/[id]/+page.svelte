<script lang="ts">
  import MobileSearch from "$lib/components/MobileSearch.svelte";
  import TopBar from '$lib/components/TopBar.svelte';
  import Header from "$lib/components/Header.svelte";
  import InnerBanner from '$lib/components/auction-details/InnerBanner.svelte';
  import Details from '$lib/components/auction-details/Details.svelte';
  import Counter from '$lib/components/homepage/CounterSection.svelte';
  import Footer from '$lib/components/Footer.svelte';

  export let data;

  let dataArray = {
    item: data.item,
    itemBidHistory: data.itemBidHistory,
    auctions: data.auctions
  };

  // console.log(dataArray);
</script>

<MobileSearch />
<TopBar />
<Header />
<InnerBanner />
<Details data={dataArray} />
<Counter />
<Footer />