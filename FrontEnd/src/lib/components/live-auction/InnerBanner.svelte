<script lang="ts">
  import { page } from '$app/stores';

  let title: string;
  let breadcrumbItems: { href?: string; text: string; active?: boolean }[];

  $: {
    const data = $page.data; // Assuming your data is provided in the page's data property
    title = data.title || 'Live Auction'; 
    breadcrumbItems = data.breadcrumbItems || [
      { href: '/', text: 'Home' },
      { text: 'Live Auction', active: true }
    ];
  }
</script>

<div class="inner-banner">
    <div class="container">
    <h2 class="inner-banner-title wow fadeInLeft" data-wow-duration="1.5s" data-wow-delay=".2s">
      {title}
        </h2>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
        {#each breadcrumbItems as item}
          <li class="breadcrumb-item {item.active ? 'active' : ''}">
            {#if item.href}
              <a href={item.href}>{item.text}</a>
            {:else}
              {item.text}
            {/if}
          </li>
        {/each}
      </ol>
    </nav>
</div>
</div>