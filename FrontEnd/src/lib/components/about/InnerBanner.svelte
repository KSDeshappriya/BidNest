<script>
    let title = "About Us"; // Default title
    let breadcrumbItems = [
        { label: "Home", link: "index-2.html" },
        { label: "About Us", active: true }
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
                            <span>{item.label}</span>
                        {:else}
                            <a href={item.link}>{item.label}</a>
                        {/if}
                    </li>
                {/each}
            </ol>
        </nav>
    </div>
</div>
