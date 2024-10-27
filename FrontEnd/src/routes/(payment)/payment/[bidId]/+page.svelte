<script lang="ts">
    import { loadStripe } from "@stripe/stripe-js";
    import { onMount } from "svelte";
    import { writable } from "svelte/store";
    import type { StripeCardElement, StripeElements } from "@stripe/stripe-js";

    const stripePromise = loadStripe(
        "pk_test_51QEUnJGCRwvvwSv0aiMWcgRzn4XzhevKjyAuehTkTWSMCgWeEdIUTZpj4SJkfgIqoHWDpA1pwiXK0rVknwkBZ8AK00juz8IqgE",
    );

    const amount = writable(0);
    let bidId = 8;
    let userId = "2"; // Set your user ID here as per backend requirements
    let elements: StripeElements;
    let card: StripeCardElement;
    let message = writable("");
    let isProcessing = writable(false);

    onMount(async () => {
        const stripe = await stripePromise;
        if (stripe) {
            elements = stripe.elements();
            card = elements.create("card");
            card.mount("#card-element");
        }
    });

    async function handlePayment() {
        const stripe = await stripePromise;
        if (!stripe) return;

        isProcessing.set(true); // Disable button during processing

        const payload = {
            itemId: 3, // Specify the correct ItemId
            bidId: String(bidId),
            userId: userId,
            amount: Number($amount),
            currency: "usd"
        };

        const response = await fetch(
            "http://localhost:5170/api/payment/create-payment-intent",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            },
        );

        if (!response.ok) {
            const result = await response.json();
            message.set(result.error || "Failed to create payment intent");
            isProcessing.set(false);
            return;
        }

        const result = await response.json();
        const clientSecret = result.clientSecret;

        if (!clientSecret) {
            message.set(result.error || "Failed to retrieve client secret");
            isProcessing.set(false);
            return;
        }

        const { error } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card,
                billing_details: {
                    name: "Test User",
                },
            },
        });

        if (error) {
            message.set(`Payment failed: ${error.message}`);
        } else {
            message.set("Payment successful!");
        }

        isProcessing.set(false); // Re-enable button after processing
    }
</script>

<form on:submit|preventDefault={handlePayment}>
    <label>Bid Amount</label>
    <input type="number" bind:value={$amount} min="0" />

    <div id="card-element"></div>

    <button type="submit" disabled={$isProcessing}>Pay</button>
</form>

{#if $message}
    <p>{$message}</p>
{/if}
