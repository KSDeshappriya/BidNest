<script>
    let searchQuery = '';

    function handleSearch() {
        // Implement search functionality here
        console.log('Searching for:', searchQuery);
    }

    function clearSearch() {
        searchQuery = '';
    }
</script>

<div class="mobile-search">
    <div class="container">
        <div class="row d-flex justify-content-center">
            <div class="col-md-11">
                <!-- svelte-ignore a11y-label-has-associated-control -->
                <label>What are you looking for?</label>
                <input 
                    type="text" 
                    placeholder="Search Products, Category, Brand" 
                    bind:value={searchQuery} 
                    on:keydown={event => event.key === 'Enter' && handleSearch()}
                />
            </div>
            <div class="col-1 d-flex justify-content-end align-items-center">
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <div class="search-cross-btn" on:click={clearSearch}>
                    <i class="bi bi-x"></i>
                </div>
            </div>
        </div>
    </div>
</div>
