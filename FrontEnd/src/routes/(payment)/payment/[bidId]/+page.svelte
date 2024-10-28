<script lang="ts">
    import { loadStripe } from "@stripe/stripe-js";
    import { onMount } from "svelte";
    import { writable } from "svelte/store";
    import type { StripeCardElement, StripeElements } from "@stripe/stripe-js";
    import { redirect } from "@sveltejs/kit";

    const stripePromise = loadStripe("pk_test_51QEUnJGCRwvvwSv0aiMWcgRzn4XzhevKjyAuehTkTWSMCgWeEdIUTZpj4SJkfgIqoHWDpA1pwiXK0rVknwkBZ8AK00juz8IqgE");

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
            card = elements.create("card", {
                style: {
                    base: {
                        iconColor: '#666666',
                        color: '#31325F',
                        fontWeight: '500',
                        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                        fontSize: '16px',
                        fontSmoothing: 'antialiased',
                        lineHeight: '1.5',
                        letterSpacing: '0.025em',
                        padding: '10px',
                    },
                    invalid: {
                        iconColor: '#fa755a',
                        color: '#fa755a',
                    },
                },
            });
            card.mount("#card-element");
        }
    });

    function openExternalLink(url: string) {
        window.open(url, "noopener,noreferrer");
    }

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

        const response = await fetch("http://localhost:5170/api/payment/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

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
            // Payment successful
            message.set("Payment successful!");
            // Redirect to a confirmation page after a successful payment
            openExternalLink("/payment/confirmation");
        }

        isProcessing.set(false); // Re-enable button after processing
    }
</script>

<style>
    .payment-container {
        max-width: 500px;
        margin: auto;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        background: white;
    }

    h1 {
        text-align: center;
        color: #333;
    }

    label {
        font-weight: bold;
        margin-bottom: 10px;
        display: block;
    }

    input[type="number"] {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        margin-bottom: 20px;
    }

    #card-element {
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        margin-bottom: 20px;
    }

    button {
        width: 100%;
        padding: 10px;
        border: none;
        border-radius: 5px;
        background-color: #0d6efd;
        color: white;
        font-size: 16px;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    button:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }

    button:hover:not(:disabled) {
        background-color: #0056b3;
    }

    p {
        color: #ff0000;
        text-align: center;
    }
</style>

<div class="payment-container">
    <h1>Payment</h1>
    <form on:submit|preventDefault={handlePayment}>
        <label>Bid Amount</label>
        <input type="number" bind:value={$amount} min="0" placeholder="Enter your bid amount" />

        <div id="card-element"></div>

        <button type="submit" disabled={$isProcessing}>Pay</button>
    </form>

    {#if $message}
        <p>{$message}</p>
    {/if}
</div>
