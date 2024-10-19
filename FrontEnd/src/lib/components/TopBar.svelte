<script>
    // Data for social links, languages, and currencies
    const socialLinks = [
        { name: 'Facebook', url: 'https://www.facebook.com/', icon: 'bx bxl-facebook' },
        { name: 'Twitter', url: 'https://www.twitter.com/', icon: 'bx bxl-twitter' },
        { name: 'Instagram', url: 'https://www.instagram.com/', icon: 'bx bxl-instagram' },
        { name: 'Pinterest', url: 'https://www.pinterest.com/', icon: 'bx bxl-pinterest-alt' },
    ];

    const languages = [
        { name: 'English', flag: 'assets/images/icons/flag-eng.png' },
        { name: 'French', flag: 'assets/images/icons/flag-french.svg' },
        { name: 'Bengali', flag: 'assets/images/icons/flag-bangla.svg' },
    ];

    const currencies = [
        { name: 'USD', icon: 'bi bi-currency-dollar', link: 'login.html' },
        { name: 'Euro', icon: 'bi bi-currency-euro', link: 'register.html' },
        { name: 'Pound', icon: 'bi bi-currency-pound', link: 'register.html' },
    ];

    // Email address (you can replace this with a more secure method if needed)
    const email = 'example@example.com';
</script>

<div class="topbar">
    <div class="topbar-left d-flex flex-row align-items-center">
        <h6>Follow Us</h6>
        <ul class="topbar-social-list gap-2">
            {#each socialLinks as { name, url, icon }}
                <li><a href={url} target="_blank" rel="noopener noreferrer"><i class={icon}></i></a></li>
            {/each}
        </ul>
    </div>
    <div class="email-area">
        <h6>Email: <a href="mailto:{email}">{email}</a></h6>
    </div>
    <div class="topbar-right">
        <ul class="topbar-right-list">
            <li>
                <span>Language</span>
                <!-- svelte-ignore a11y-img-redundant-alt -->
                <img src={languages[0].flag} alt="image">
                <ul class="topbar-sublist">
                    {#each languages as { name, flag }}
                        <!-- svelte-ignore a11y-img-redundant-alt -->
                        <li><span>{name}</span><img src={flag} alt="image"></li>
                    {/each}
                </ul>
            </li>
            <li>
                Currency
                <ul class="topbar-sublist">
                    {#each currencies as { name, icon, link }}
                        <li><a href={link}><i class={icon}></i> {name}</a></li>
                    {/each}
                </ul>
            </li>
        </ul>
    </div>
</div>
