<script>
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { writable } from "svelte/store";

    const liveAuctionPage = writable("live-auction");

    onMount(() => {
        liveAuctionPage.set("live-auction");
    });

    import MobileSearch from "$lib/components/MobileSearch.svelte";
    import TopBar from "$lib/components/TopBar.svelte";
    import Header from "$lib/components/Header.svelte";
    import InnerBanner from "$lib/components/live-auction/InnerBanner.svelte";
    import BiddingItems from "$lib/components/live-auction/BiddingItems.svelte";
    import Counter from "$lib/components/homepage/CounterSection.svelte";
    import Footer from "$lib/components/Footer.svelte";
</script>

<MobileSearch />
<TopBar />
<Header />
<InnerBanner />
<BiddingItems data={$page.data} />
<Counter />
<Footer />
