<script>
    export let title = "How It Works"; // Default title
    export let breadcrumbItems = [
        { text: "Home", link: "index-2.html" },
        { text: "How It Works", active: true }
    ];
</script>

<div class="inner-banner">
    <div class="container">
        <h2 class="inner-banner-title wow fadeInLeft" data-wow-duration="1.5s" data-wow-delay=".2s">{title}</h2>
        
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                {#each breadcrumbItems as item}
                    <li class="breadcrumb-item" class:active={item.active}>
                        {#if item.active}
                            <span>{item.text}</span>
                        {:else}
                            <a href={item.link}>{item.text}</a>
                        {/if}
                    </li>
                {/each}
            </ol>
        </nav>
    </div>
</div>
