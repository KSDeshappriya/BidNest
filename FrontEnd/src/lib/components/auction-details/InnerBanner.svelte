<script>
    let breadcrumbItems = [
        { name: "Home", link: "/index-2.html" },
        { name: "Auction Details", active: true }
    ];
</script>

<div class="inner-banner">
    <div class="container">
        <h2 class="inner-banner-title wow fadeInLeft" data-wow-duration="1.5s" data-wow-delay=".4s">Auction Details</h2>
        
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                {#each breadcrumbItems as item}
                    {#if item.active}
                        <li class="breadcrumb-item active" aria-current="page">{item.name}</li>
                    {:else}
                        <li class="breadcrumb-item">
                            <a href={item.link}>{item.name}</a>
                        </li>
                    {/if}
                {/each}
            </ol>
        </nav>
    </div>
</div>
