<script>
    let contactInfo = [
        {
            icon: "bi bi-geo-alt",
            title: "Location",
            details: ["Mahenwaththa, Pitipana, Homagama, Sri Lanka"]
        },
        {
            icon: "bx bx-phone-call",
            title: "Phone",
            details: ["+94 11 544 5000", "+94 71 244 5000"]
        },
        {
            icon: "bx bx-envelope",
            title: "Email",
            details: ["inquiries@FrontEnd.com","inquiries@FrontEnd.com"]
        }
    ];
    
    let formData = {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    };

    let mapLink = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.575840369662!2d80.03899797565457!3d6.821329093176442!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2523b05555555%3A0x546c34cd99f6f488!2sNSBM%20Green%20University!5e0!3m2!1sen!2slk!4v1729494440101!5m2!1sen!2slk";
</script>

<div class="contact-section pt-120 pb-120">
    <!-- svelte-ignore a11y-img-redundant-alt -->
    <img alt="image" src="assets/images/bg/section-bg.png" class="img-fluid section-bg-top">
    <!-- svelte-ignore a11y-img-redundant-alt -->
    <img alt="image" src="assets/images/bg/section-bg.png" class="img-fluid section-bg-bottom">

    <div class="container">
        <div class="row pb-120 mb-70 g-4 d-flex justify-content-center">
            {#each contactInfo as info}
            <div class="col-lg-4 col-md-6 col-sm-8">
                <div class="contact-signle hover-border1 d-flex flex-row align-items-center wow fadeInDown">
                    <div class="icon">
                        <i class={info.icon}></i>
                    </div>
                    <div class="text">
                        <h4>{info.title}</h4>
                        {#each info.details as detail}
                            <p>{detail}</p>
                        {/each}
                    </div>
                </div>
            </div>
            {/each}
        </div>

        <div class="row g-4">
            <div class="col-lg-6">
                <div class="form-wrapper wow fadeInDown">
                    <div class="form-title2">
                        <h3>Get in Touch</h3>
                        <p class="para">Feel free to ask me any question or let's talk about our future collaboration.</p>
                    </div>

                    <form method="POST" action="?/feedback">
                        <div class="row">
                            <div class="col-xl-6 col-lg-12 col-md-6">
                                <div class="form-inner">
                                    <input type="text" name="name" bind:value={formData.name} placeholder="Your Name :" required>
                                </div>
                            </div>
                            <div class="col-xl-6 col-lg-12 col-md-6">
                                <div class="form-inner">
                                    <input type="email" name="email" bind:value={formData.email} placeholder="Your Email :" required>
                                </div>
                            </div>
                            <div class="col-xl-6 col-lg-12 col-md-6">
                                <div class="form-inner">
                                    <input type="text" name="phone" bind:value={formData.phone} placeholder="Your Phone :" required>
                                </div>
                            </div>
                            <div class="col-xl-6 col-lg-12 col-md-6">
                                <div class="form-inner">
                                    <input type="text" name="subject" bind:value={formData.subject} placeholder="Subject :" required>
                                </div>
                            </div>
                            <div class="col-12">
                                <textarea bind:value={formData.message} name="message" placeholder="Write Message :" rows="12" required></textarea>
                            </div>
                            <div class="col-12">
                                <button type="submit" class="eg-btn btn--primary btn--md form--btn">Send Message</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div class="col-lg-6">
                <div class="map-area wow fadeInUp">
                    <!-- svelte-ignore a11y-missing-attribute -->
                    <iframe
                        src={mapLink}
                        style="border:0;" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>
            </div>
        </div>
    </div>
</div>
