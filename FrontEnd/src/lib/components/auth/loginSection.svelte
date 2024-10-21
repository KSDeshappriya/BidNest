<script lang="ts">
    let email = "";
    let password = "";
    let isLoggedIn = false;
    let loginError: string | null = null;

    // function openExternalLink(url: string) {
    //     window.open(url, "noopener,noreferrer");
    // }

    const handleLogin = async (event: Event) => {
        event.preventDefault();

        try {
            const response = await fetch('/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.data);
                isLoggedIn = true;
                // Redirect to a protected page or handle session storage
                alert(data.message);
            } else {
                const errorData = await response.json();
                loginError = errorData.message || "Login failed.";
            }
        } catch (error) {
            loginError = "An internal error occurred.";
            console.error(error);
        }
    };
</script>

<div class="login-section pt-120 pb-120">
    <img
        alt="imges"
        src="/assets/images/bg/section-bg.png"
        class="img-fluid section-bg-top"
    />
    <img
        alt="imges"
        src="/assets/images/bg/section-bg.png"
        class="img-fluid section-bg-bottom"
    />
    <div class="container">
        <div class="row d-flex justify-content-center g-4">
            <div class="col-xl-6 col-lg-8 col-md-10">
                <div
                    class="form-wrapper wow fadeInUp"
                    data-wow-duration="1.5s"
                    data-wow-delay=".2s"
                >
                    <div class="form-title">
                        <h3>Log In</h3>
                        <p>New Member? <a href="signup.html">signup here</a></p>
                    </div>
                    <form class="w-100" on:submit|preventDefault={handleLogin}>
                        <div class="row">
                            <div class="col-12">
                                <div class="form-inner">
                                    <label>Enter Your Email *</label>
                                    <input
                                        type="email"
                                        placeholder="Enter Your Email"
                                        bind:value={email}
                                    />
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="form-inner">
                                    <label>Password *</label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Password"
                                        bind:value={password}
                                    />
                                    <i
                                        class="bi bi-eye-slash"
                                        id="togglePassword"
                                    ></i>
                                </div>
                            </div>
                            <div class="col-12">
                                <div
                                    class="form-agreement form-inner d-flex justify-content-between flex-wrap"
                                >
                                    <div class="form-group">
                                        <input type="checkbox" id="html" />
                                        <label for="html"
                                            >I agree to the <a href="#"
                                                >Terms & Policy</a
                                            ></label
                                        >
                                    </div>
                                    <a href="#" class="forgot-pass"
                                        >Forgotten Password</a
                                    >
                                </div>
                            </div>
                        </div>
                        <button class="account-btn" disabled={isLoggedIn}
                            >Log in</button
                        >
                        {#if loginError}
                            <p class="error-message">{loginError}</p>
                        {/if}
                    </form>
                    <div class="alternate-signup-box">
                        <h6>or signup WITH</h6>
                        <div class="btn-group gap-4">
                            <a
                                class="eg-btn google-btn d-flex align-items-center"
                                ><i class="bx bxl-google"></i><span
                                    >signup whit google</span
                                ></a
                            >
                            <a
                                class="eg-btn facebook-btn d-flex align-items-center"
                                ><i class="bx bxl-facebook"></i>signup whit
                                facebook</a
                            >
                        </div>
                    </div>
                    <div class="form-poicy-area">
                        <p>
                            By clicking the "signup" button, you create a Cobiro
                            account, and you agree to Cobiro's
                            <a href="#">Terms & Conditions</a> &
                            <a href="#">Privacy Policy.</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
