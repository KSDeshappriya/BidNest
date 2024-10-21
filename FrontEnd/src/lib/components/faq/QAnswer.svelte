<script lang="ts">
    // Data for FAQ questions
    // let faqs = [
    //     {
    //         question: "Where on your site can I access AI for Blog Ideas/Titles?",
    //         answer: "Morbi aliquam quis quam in luctus. Nullam tincidunt pulvinar imperdiet. Sed varius, diam vitae posuere semper, libero ex hendrerit nunc, ac sagittis eros metus ut diam."
    //     },
    //     {
    //         question: "What if I don't have a company name?",
    //         answer: "Morbi aliquam quis quam in luctus. Nullam tincidunt pulvinar imperdiet. Sed varius, diam vitae posuere semper, libero ex hendrerit nunc, ac sagittis eros metus ut diam."
    //     },
    //     {
    //         question: "What is the best way to get my blog title noticed?",
    //         answer: "Morbi aliquam quis quam in luctus. Nullam tincidunt pulvinar imperdiet. Sed varius, diam vitae posuere semper, libero ex hendrerit nunc, ac sagittis eros metus ut diam."
    //     },
    //     {
    //         question: "Okay, I'm afraid to ask but... what is SEO?",
    //         answer: "Morbi aliquam quis quam in luctus. Nullam tincidunt pulvinar imperdiet. Sed varius, diam vitae posuere semper, libero ex hendrerit nunc, ac sagittis eros metus ut diam."
    //     },
    //     {
    //         question: "Why are you getting rejected shares?",
    //         answer: "Morbi aliquam quis quam in luctus. Nullam tincidunt pulvinar imperdiet. Sed varius, diam vitae posuere semper, libero ex hendrerit nunc, ac sagittis eros metus ut diam."
    //     },
    //     {
    //         question: "Which miners are supported?",
    //         answer: "Morbi aliquam quis quam in luctus. Nullam tincidunt pulvinar imperdiet. Sed varius, diam vitae posuere semper, libero ex hendrerit nunc, ac sagittis eros metus ut diam."
    //     },
    //     {
    //         question: "What happens when there are no orders?",
    //         answer: "Morbi aliquam quis quam in luctus. Nullam tincidunt pulvinar imperdiet. Sed varius, diam vitae posuere semper, libero ex hendrerit nunc, ac sagittis eros metus ut diam."
    //     }
    // ];

    export let data;
    let faqs = data.faqs;

    let formData = {
        name: '',
        email: '',
        subject: '',
        message: ''
    };

    function handleSubmit() {
        console.log('Form Submitted:', formData);
        // Handle form submission logic here
    }
</script>

<div class="faq-section pt-120 pb-120">
    <div class="container">
        <div class="row d-flex justify-content-center gy-5">
            <!-- FAQ Form -->
            <div class="col-lg-4 col-md-12 order-lg-1 order-2">
                <div class="faq-form-area wow fadeInDown">
                    <h5>Ask Any Question?</h5>
                    <p class="para">Your email address will not be published. Required fields are marked *</p>
                    <form class="faq-form" method="POST" action="?/submitted">
                        <div class="form-inner">
                            <label>Your Full Name *</label>
                            <input type="text" name="name" placeholder="Enter your name" bind:value={formData.name} required>
                        </div>
                        <div class="form-inner">
                            <label>Your Email *</label>
                            <input type="email" name="email" placeholder="Enter your email" bind:value={formData.email} required>
                        </div>
                        <div class="form-inner">
                            <label>Subject *</label>
                            <input type="text" name="subject" placeholder="Subject" bind:value={formData.subject} required>
                        </div>
                        <div class="form-inner">
                            <label>Your Message *</label>
                            <textarea placeholder="Your message" name="message" rows="5" bind:value={formData.message} required></textarea>
                        </div>
                        <button type="submit" class="eg-btn btn--primary btn--md mt-1" style="border: none;">Send Now</button>
                    </form>
                </div>
            </div>

            <!-- FAQ Accordion -->
            <div class="col-lg-8 col-md-12 text-center order-lg-2 order-1">
                <h2 class="section-title3">General FAQ’s</h2>
                <div class="faq-wrap wow fadeInUp">
                    <div class="accordion" id="accordionExample">
                        {#each faqs as faq, index}
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="heading{index}">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse{index}" aria-expanded="false" aria-controls="collapse{index}">
                                        {faq.question}
                                    </button>
                                </h2>
                                <div id="collapse{index}" class="accordion-collapse collapse" aria-labelledby="heading{index}" data-bs-parent="#accordionExample">
                                    <div class="accordion-body">
                                        <p>{faq.answer}</p>
                                    </div>
                                </div>
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
