<script>
    import MobileSearch from "$lib/components/MobileSearch.svelte";
    import TopBar from "$lib/components/TopBar.svelte";
    import Header from "$lib/components/Header.svelte";
    import InnerBanner from "$lib/components/blog/IB.svelte";
    import BDetails from "$lib/components/blog-details/BDetails.svelte";
    import Counter from "$lib/components/homepage/CounterSection.svelte";
    import Footer from "$lib/components/Footer.svelte";

    let title = 'Blog Details';
    let breadcrumbItems = [
        { href: '/', text: 'Home' },
        { text: 'Blog Details', active: true }
    ];
</script>

<MobileSearch />
<TopBar />
<Header />
<InnerBanner {title} {breadcrumbItems} />
<BDetails />
<Counter />
<Footer />