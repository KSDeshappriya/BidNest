<script>
    import MobileSearch from "$lib/components/MobileSearch.svelte";
    import TopBar from "$lib/components/TopBar.svelte";
    import Header from "$lib/components/Header.svelte";
    import InnerBanner from "$lib/components/auth/InnerBanner.svelte";
    import SignupSection from "$lib/components/auth/signupSection.svelte";
    import Counter from "$lib/components/homepage/CounterSection.svelte";
    import Footer from "$lib/components/Footer.svelte";

    let title = 'SignUP';
    let breadcrumbItems = [
        { href: '/', text: 'Home' },
        { text: 'SignUp', active: true }
    ];
</script>

<MobileSearch />
<TopBar />
<Header />
<InnerBanner {title} {breadcrumbItems} />
<SignupSection />
<Counter />
<Footer />