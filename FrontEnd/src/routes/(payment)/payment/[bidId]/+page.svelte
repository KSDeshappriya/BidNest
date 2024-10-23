<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { loadStripe } from '@stripe/stripe-js';
    import { paymentStatus } from '$lib/stores/payment';
    // import type { PageData } from './$types';
    import { goto } from '$app/navigation';

    /** @type {import('./$types').PageData} */
    export let data: any;

    let stripe: any;
    let elements: any;
    let card: any;
    let cardError: string = '';
    let loading = false;

    // Format amount to display (assuming amount is in cents)
    $: formattedAmount = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(data.bidDetails.amount / 100);

    const STRIPE_PUBLIC_KEY = 'your_stripe_publishable_key';

    onMount(async () => {
        try {
            stripe = await loadStripe(STRIPE_PUBLIC_KEY);
            elements = stripe.elements();
            
            card = elements.create('card', {
                style: {
                    base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                            color: '#aab7c4'
                        }
                    },
                    invalid: {
                        color: '#9e2146'
                    }
                }
            });

            card.mount('#card-element');

            card.addEventListener('change', (event: any) => {
                cardError = event.error ? event.error.message : '';
            });
        } catch (e) {
            console.error('Failed to load Stripe:', e);
            cardError = 'Failed to load payment system';
        }
    });

    onDestroy(() => {
        if (card) {
            card.unmount();
            card.removeAllEventListeners();
        }
    });

    async function handleSubmit() {
        if (!stripe || !elements) {
            return;
        }

        loading = true;
        paymentStatus.set('processing');

        try {
            const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
                data.paymentIntent.clientSecret,
                {
                    payment_method: {
                        card: card,
                    },
                }
            );

            if (stripeError) {
                cardError = stripeError.message;
                paymentStatus.set('error');
            } else if (paymentIntent.status === 'succeeded') {
                paymentStatus.set('success');
                await goto('/payment-success');
            }
        } catch (e) {
            console.error('Payment error:', e);
            cardError = 'An error occurred while processing your payment.';
            paymentStatus.set('error');
        } finally {
            loading = false;
        }
    }
</script>

<div class="payment-container">
    <header>
        <h1>Complete Your Payment</h1>
        <div class="payment-summary">
            <div class="amount-display">
                <span class="amount-label">Amount to Pay:</span>
                <span class="amount-value">{formattedAmount}</span>
            </div>
            {#if data.bidDetails.itemTitle}
                <div class="item-details">
                    <p>For: {data.bidDetails.itemTitle}</p>
                </div>
            {/if}
        </div>
    </header>

    <form on:submit|preventDefault={handleSubmit} class="payment-form">
        <div class="form-group">
            <label for="card-element">
                Credit or debit card
            </label>
            <div id="card-element" class="card-element">
                <!-- Stripe Card Element will be inserted here -->
            </div>
            {#if cardError}
                <div class="error-message">{cardError}</div>
            {/if}
        </div>

        <button 
            type="submit" 
            class="pay-button" 
            disabled={loading || !stripe || !elements}
        >
            {#if loading}
                <span class="spinner"></span>
                Processing...
            {:else}
                Pay {formattedAmount}
            {/if}
        </button>
    </form>
</div>

<style>
    /* Previous styles remain the same */

    .payment-summary {
        background: #f8f9fa;
        padding: 1rem;
        border-radius: 6px;
        margin: 1rem 0;
    }

    .amount-display {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid #e6e6e6;
    }

    .amount-label {
        color: #6b7c93;
        font-size: 16px;
    }

    .amount-value {
        color: #32325d;
        font-size: 24px;
        font-weight: bold;
    }

    .item-details {
        color: #525f7f;
        font-size: 14px;
    }

    .item-details p {
        margin: 0;
    }
</style>