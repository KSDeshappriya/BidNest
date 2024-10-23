<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
</script>

<div class="success-container">
    <div class="success-card">
        <div class="success-icon">✓</div>
        <h1>Payment Successful!</h1>
        <p>Thank you for your purchase. Your transaction has been completed successfully.</p>
        <button on:click={() => goto('/')}>Return to Home</button>
    </div>
</div>

<style>
    .success-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 80vh;
        padding: 2rem;
    }

    .success-card {
        background: white;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        text-align: center;
        max-width: 400px;
    }

    .success-icon {
        width: 64px;
        height: 64px;
        background: #4CAF50;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 32px;
        margin: 0 auto 1rem;
    }

    h1 {
        color: #32325d;
        margin-bottom: 1rem;
    }

    p {
        color: #525f7f;
        margin-bottom: 2rem;
    }

    button {
        background: #5469d4;
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 4px;
        font-size: 16px;
        cursor: pointer;
        transition: background-color 0.15s ease;
    }

    button:hover {
        background: #4a5fc1;
    }
</style>