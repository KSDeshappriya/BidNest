<script>
  export let isLoading = false;
</script>

{#if isLoading}
  <div class="preloader">
    <div class="loader">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
{/if}
