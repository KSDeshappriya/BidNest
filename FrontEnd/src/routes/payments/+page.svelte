<script lang="ts">
    import MobileSearch from "$lib/components/MobileSearch.svelte";
    import TopBar from "$lib/components/TopBar.svelte";
    import Header from "$lib/components/Header.svelte";
    import InnerBanner from "$lib/components/auth/InnerBanner.svelte";
    import Counter from "$lib/components/homepage/CounterSection.svelte";
    import Footer from "$lib/components/Footer.svelte";

    let title = "Payment";
    let breadcrumbItems = [
        { href: "/", text: "Home" },
        { text: "Payment", active: true },
    ];

    let cardNumber = "";
    let cardHolder = "";
    let expiryDate = "";
    let cvv = "";
    let cardType = "DB BANK";
    let cardError = "";
    let progress = 0;
    let paymentInProgress = false;
    let cvvInputFocused = false;

    const regexMap = {
        visa: /^4/,
        mastercard: /^5[1-5]/,
        amex: /^3[47]/,
        discover: /^6/,
    };

    const formatInput = (value: string, chunkSize: number) =>
        value
            .replace(/\s+/g, "")
            .replace(/[^0-9]/g, "")
            .match(new RegExp(`.{1,${chunkSize}}`, "g"))
            ?.join(" ") || "";

    const formatExpiryDate = (value: string) => {
        const v = value.replace(/\s+/g, "").replace(/[^0-9]/g, "");
        if (v.length >= 2) {
            return `${v.slice(0, 2)}/${v.slice(2, 4)}`;
        }
        return v;
    };

    const getCardType = (number: string) =>
        Object.keys(regexMap).find((card) =>
            regexMap[card as keyof typeof regexMap].test(number),
        ) || "unknown";

    const validateCardDetails = () => {
        const cardNumberValue = cardNumber.replace(/\s/g, "");
        const [month, year] = expiryDate.split("/");
        const currentYear = new Date().getFullYear().toString().slice(-2);

        return {
            isCardNumberValid: /^\d{16}$/.test(cardNumberValue),
            isExpiryDateValid:
                parseInt(month) > 0 &&
                parseInt(month) <= 12 &&
                parseInt(year) >= parseInt(currentYear),
        };
    };

    const handleSubmit = (event: Event) => {
        event.preventDefault();
        const { isCardNumberValid, isExpiryDateValid } = validateCardDetails();

        if (!isCardNumberValid) {
            cardError = "Invalid card number";
            return;
        }

        if (!isExpiryDateValid) {
            cardError = "Invalid expiry date";
            return;
        }

        cardError = "";
        paymentInProgress = true;
        progress = 0;

        const interval = setInterval(() => {
            if (progress >= 100) {
                clearInterval(interval);
                paymentInProgress = false;
                alert(
                    Math.random() > 0.3
                        ? "Payment processed successfully!"
                        : "Payment failed. Please try again.",
                );
            } else {
                progress += 10;
            }
        }, 300);
    };
</script>

<MobileSearch />
<TopBar />
<Header />
<InnerBanner {title} {breadcrumbItems} />

<div class="payments">
    <div class="container mt-5 payment-box">
        <div class="row">
            <div class="col-md-6 mb-4 cardView">
                <div class="card-container">
                    <div class="credit-card" class:flipped={cvvInputFocused}>
                        <div class="front">
                            <div class="d-flex justify-content-between">
                                <div class="chip"></div>
                                <div class="logo">{cardType.toUpperCase()}</div>
                            </div>
                            <div class="number">
                                {cardNumber || "•••• •••• •••• ••••"}
                            </div>
                            <div class="name-date">
                                <div class="name">
                                    {cardHolder || "CARD HOLDER"}
                                </div>
                                <div class="date">{expiryDate || "MM/YY"}</div>
                            </div>
                        </div>
                        <div class="back">
                            <div class="stripe"></div>
                            <div class="cvv">{cvv || "CVV"}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6 pdetails">
                <h3><b>Payment Details</b></h3>
                <form on:submit={handleSubmit}>
                    <div id="card-error" class="text-danger mb-3">
                        {cardError}
                    </div>
                    <div class="mb-3">
                        <input
                            type="text"
                            class="form-control"
                            bind:value={cardNumber}
                            on:input={() =>
                                (cardNumber = formatInput(cardNumber, 4))}
                            placeholder="Card Number"
                            required
                            maxlength="19"
                        />
                    </div>
                    <div class="mb-3">
                        <input
                            type="text"
                            class="form-control"
                            bind:value={cardHolder}
                            placeholder="Card Holder Name"
                            required
                        />
                    </div>
                    <div class="row">
                        <div class="col-6 mb-3">
                            <input
                                type="text"
                                class="form-control"
                                bind:value={expiryDate}
                                on:input={() =>
                                    (expiryDate = formatExpiryDate(expiryDate))}
                                placeholder="MM/YY"
                                required
                                maxlength="5"
                            />
                        </div>
                        <div class="col-6 mb-3">
                            <input
                                type="text"
                                class="form-control"
                                bind:value={cvv}
                                placeholder="CVV"
                                required
                                maxlength="3"
                                on:focus={() => (cvvInputFocused = true)}
                                on:blur={() => (cvvInputFocused = false)}
                            />
                        </div>
                    </div>
                    <div class="form-check mb-3">
                        <input
                            type="checkbox"
                            class="form-check-input"
                            id="save-card"
                        />
                        <label class="form-check-label" for="save-card"
                            >Save card for future payments</label
                        >
                    </div>
                    <div class="d-flex justify-content-between">
                        <button
                            type="submit"
                            class="eg-btn btn--primary"
                            style="border: none; color:whitesmoke"
                            >PAY $22.88</button
                        >
                        <button type="button" class="btn btn-outline-secondary"
                            >Cancel</button
                        >
                    </div>
                </form>
                {#if paymentInProgress}
                    <div class="progress">
                        <div
                            class="progress-bar progress-bar-striped progress-bar-animated"
                            style="width: {progress}%"
                        ></div>
                    </div>
                {/if}
            </div>
        </div>
    </div>
</div>

<Counter />
<Footer />

<style>
    .payments {
        background-image: url("assets/images/bg/section-bg.png");
        transform: scale(1.15);
        margin-top: 80px;
        margin-bottom: 80px;
    }
    .card-container {
        /* perspective: 1000px; */
        width: 350px;
        height: 200px;
    }

    .credit-card {
        width: 100%;
        height: 100%;
        position: relative;
        transform-style: preserve-3d;
        transition: transform 0.8s;
    }

    .credit-card.flipped {
        transform: rotateY(180deg);
    }

    .credit-card .front,
    .credit-card .back {
        position: absolute;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
        border-radius: 15px;
        padding: 20px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .credit-card .front {
        background: linear-gradient(45deg, #0d6efd, #0dcaf0);
        /* background: linear-gradient(45deg, #32c36c, #0bf36898); */
        color: white;
    }

    .credit-card .back {
        background: linear-gradient(45deg, #6c757d, #495057);
        color: white;
        transform: rotateY(180deg);
    }

    .credit-card .chip {
        width: 50px;
        height: 40px;
        background: linear-gradient(135deg, #ffd700, #ffec8b);
        border-radius: 8px;
    }

    .credit-card .logo {
        font-size: 24px;
        font-weight: bold;
    }

    .credit-card .number {
        font-size: 1.4em;
        margin-top: 20px;
        letter-spacing: 2px;
    }

    .credit-card .name-date {
        display: flex;
        justify-content: space-between;
        margin-top: 30px;
    }

    .credit-card .stripe {
        background-color: #000;
        height: 40px;
        margin: 20px 0;
    }

    .credit-card .cvv {
        background-color: #fff;
        color: #000;
        padding: 5px;
        text-align: right;
    }

    input.form-control {
        font-size: 16px;
        padding: 10px 15px;
    }

    .progress {
        height: 20px;
        margin-top: 20px;
        display: none;
    }

    /* Payment Box */
    .payment-box {
        margin-top: -200px;
        max-width: 820px;
        min-width: 340px;
        background: rgba(255, 255, 255, 0.1);
        padding: 20px;
        border-radius: 15px;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    }

    .cardView {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .pdetails {
        background: rgba(255, 255, 255, 0.1);
        padding: 20px;
        border-radius: 15px;
        box-shadow: 0 8px 20px #0000001f;
    }

    .form-check-input:checked {
        background-color: #32c36c;
        border-color: #32c36c;
    }
</style>
