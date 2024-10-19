<script lang="ts">
  export let title: string = 'Blog';
  export let breadcrumbItems: { href?: string; text: string; active?: boolean }[] = [
    { href: '/', text: 'Home' },
    { text: 'Blog', active: true }
  ];

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