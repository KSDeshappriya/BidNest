<!-- src/routes/+layout.svelte -->
<script lang="ts">
    import { onMount } from "svelte";
    import { beforeNavigate, afterNavigate } from "$app/navigation";
    import { tick } from "svelte";
    import Preloader from "$lib/components/Loader.svelte";

    let isLoading = true;

    // Ensure the preloader stays until the entire page is fully loaded
    onMount(() => {
        // Set isLoading to true on page refresh
        isLoading = true;

        // Listen for the window load event to determine when the full page has loaded
        window.addEventListener("load", () => {
            isLoading = false; // Hide the preloader after everything is loaded
        });
    });

    // Show preloader before navigation
    beforeNavigate(() => {
        isLoading = true;
    });
</script>

<Preloader {isLoading} />

<slot />
