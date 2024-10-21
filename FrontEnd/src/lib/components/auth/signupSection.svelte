<!-- <script lang="ts">
    import axios from "axios";

    let firstName = "";
    let lastName = "";
    let email = "";
    let password = "";
    let agreeToTerms = false;

    function openExternalLink(url: string) {
        window.open(url, "noopener,noreferrer");
    }

    const handleSubmit = async (event: Event) => {
        event.preventDefault();

        axios
            .post(
                "http://localhost:5170/api/users/register",
                {
                    UserName: `${firstName} ${lastName}`,
                    Email: email,
                    Password: password,
                    Role: document.querySelector("select")?.value,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: false, // Set this to true if you're using credentials like cookies/tokens
                },
            )
            .then((response) => {
                console.log(response.data);
                openExternalLink("/login");
            })
            .catch((error) => {
                console.error("An error occurred during signup:", error);
            });
    };
</script> -->

<script lang="ts">
    let firstName = "";
    let lastName = "";
    let email = "";
    let password = "";
    let agreeToTerms = false;
    let errorMessage = '';

    function openExternalLink(url: string) {
        window.open(url, "noopener,noreferrer");
    }

    const handleSubmit = async (event: Event) => {
        event.preventDefault();

        try {
            const response = await fetch('/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    password,
                    role: document.querySelector('select')?.value,
                    agreeToTerms
                })
            });

            if (response.ok) {
                const data = await response.json();
                // Redirect to login after successful registration
                console.log(data);
                openExternalLink("/login");
            } else {
                const errorData = await response.json();
                errorMessage = errorData.message || "Signup failed!";
            }
        } catch (error) {
            errorMessage = "An error occurred during signup!";
            console.error(error);
        }
    };
</script>

<div class="signup-section pt-120 pb-120">
    <img
        alt="image"
        src="/assets/images/bg/section-bg.png"
        class="section-bg-top"
    />
    <img
        alt="image"
        src="/assets/images/bg/section-bg.png"
        class="section-bg-bottom"
    />
    <div class="container">
        <div class="row d-flex justify-content-center">
            <div class="col-xl-6 col-lg-8 col-md-10">
                <div
                    class="form-wrapper wow fadeInUp"
                    data-wow-duration="1.5s"
                    data-wow-delay=".2s"
                >
                    <div class="form-title">
                        <h3>Sign Up</h3>
                        <p>
                            Do you already have an account? <a href="login.html"
                                >Log in here</a
                            >
                        </p>
                    </div>
                    <form on:submit={handleSubmit} class="w-100">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-inner">
                                    <label>First Name *</label>
                                    <input
                                        type="text"
                                        placeholder="First Name"
                                        bind:value={firstName}
                                    />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-inner">
                                    <label>Last Name *</label>
                                    <input
                                        type="text"
                                        placeholder="Last Name"
                                        bind:value={lastName}
                                    />
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-inner">
                                    <label>Role *</label>
                                    <select>
                                        <option value="0">Select Role</option>
                                        <option value="Buyer">Buyer</option>
                                        <option value="Seller">Seller</option>
                                    </select>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-inner">
                                        <label>Enter Your Email *</label>
                                        <input
                                            type="email"
                                            placeholder="Enter Your Email"
                                            bind:value={email}
                                        />
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-inner">
                                        <label>Password *</label>
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            placeholder="Create A Password"
                                            bind:value={password}
                                        />
                                        <i
                                            class="bi bi-eye-slash"
                                            id="togglePassword"
                                        ></i>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div
                                        class="form-agreement form-inner d-flex justify-content-between flex-wrap"
                                    >
                                        <div class="form-group">
                                            <input
                                                type="checkbox"
                                                id="html"
                                                bind:checked={agreeToTerms}
                                            />
                                            <label for="html"
                                                >I agree to the Terms & Policy</label
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button class="account-btn">Create Account</button>
                        </div>
                    </form>
                    <div class="alternate-signup-box">
                        <h6>or signup WITH</h6>
                        <div class="btn-group gap-4">
                            <a
                                class="eg-btn google-btn d-flex align-items-center"
                                href="#"
                            >
                                <i class="bx bxl-google"></i>
                                <span>signup whit google</span>
                            </a>
                            <a
                                class="eg-btn facebook-btn d-flex align-items-center"
                                href="#"
                            >
                                <i class="bx bxl-facebook"></i>
                                signup whit facebook
                            </a>
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

<style>
    .form-inner select {
        width: 100%;
        border-radius: 5px;
        border: 1px solid #eee;
        padding: 11px 15px;
        transition: all 0.42s ease;
    }
</style>
