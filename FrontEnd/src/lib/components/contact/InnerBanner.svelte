<script>
    let title = "Contact Us"; // Default title
    let breadcrumbItems = [
        { text: "Home", href: "index-2.html" },
        { text: "Contact Us", href: "#" } // Current page, so no link
    ];
</script>

<div class="inner-banner">
    <div class="container">
        <h2 class="inner-banner-title wow fadeInLeft" data-wow-duration="1.5s" data-wow-delay=".2s">{title}</h2>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                {#each breadcrumbItems as item, index}
                    <li class="breadcrumb-item">
                        {#if index === breadcrumbItems.length - 1}
                            <span class="active" aria-current="page">{item.text}</span>
                        {:else}
                            <a href={item.href}>{item.text}</a>
                        {/if}
                    </li>
                {/each}
            </ol>
        </nav>
    </div>
</div>
