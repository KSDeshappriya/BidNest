<script lang="ts">
    import MobileSearch from "$lib/components/MobileSearch.svelte";
    import TopBar from "$lib/components/TopBar.svelte";
    import Header from "$lib/components/Header.svelte";
    import InnerBanner from "$lib/components/auth/InnerBanner.svelte";
    import LoginSection from "$lib/components/auth/loginSection.svelte";
    import Counter from "$lib/components/homepage/CounterSection.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    export let data;
    const role = data.role;

    onMount(() => {
        if (role === "Buyer") {
            goto("/dashboards/buyer");
        } else if (role === "Seller") {
            goto("/dashboards/seller");
        }
    });
</script>

<MobileSearch />
<TopBar />
<Header />
<InnerBanner />
<LoginSection />
<Counter />
<Footer />
