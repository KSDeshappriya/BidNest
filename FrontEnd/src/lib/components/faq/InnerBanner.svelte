<script>
    let title = "FAQ"; // Title of the page
    let breadcrumbItems = [
        { text: "Home", href: "index-2.html" }, // Breadcrumb links
        { text: "Faq's", active: true }
    ];
</script>

<div class="inner-banner">
    <div class="container">
        <h2 class="inner-banner-title wow fadeInLeft" data-wow-duration="1.5s" data-wow-delay=".2s">{title}</h2>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                {#each breadcrumbItems as item, index}
                    <li class="breadcrumb-item" class:active={item.active}>
                        {#if item.active}
                            <span aria-current="page">{item.text}</span>
                        {:else}
                            <a href={item.href}>{item.text}</a>
                        {/if}
                    </li>
                {/each}
            </ol>
        </nav>
    </div>
</div>
