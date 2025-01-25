/** @type {import('./$types').PageServerLoad} */

export async function load() {
    return {
        faqs: [
            {
                question: "Where on your site can I access AI for Blog Ideas/Titles?",
                answer: "Morbi aliquam quis quam in luctus. Nullam tincidunt pulvinar imperdiet. Sed varius, diam vitae posuere semper, libero ex hendrerit nunc, ac sagittis eros metus ut diam."
            },
            {
                question: "What if I don't have a company name?",
                answer: "Morbi aliquam quis quam in luctus. Nullam tincidunt pulvinar imperdiet. Sed varius, diam vitae posuere semper, libero ex hendrerit nunc, ac sagittis eros metus ut diam."
            },
            {
                question: "What is the best way to get my blog title noticed?",
                answer: "Morbi aliquam quis quam in luctus. Nullam tincidunt pulvinar imperdiet. Sed varius, diam vitae posuere semper, libero ex hendrerit nunc, ac sagittis eros metus ut diam."
            },
            {
                question: "Okay, I'm afraid to ask but... what is SEO?",
                answer: "Morbi aliquam quis quam in luctus. Nullam tincidunt pulvinar imperdiet. Sed varius, diam vitae posuere semper, libero ex hendrerit nunc, ac sagittis eros metus ut diam."
            },
            {
                question: "Why are you getting rejected shares?",
                answer: "Morbi aliquam quis quam in luctus. Nullam tincidunt pulvinar imperdiet. Sed varius, diam vitae posuere semper, libero ex hendrerit nunc, ac sagittis eros metus ut diam."
            },
            {
                question: "Which miners are supported?",
                answer: "Morbi aliquam quis quam in luctus. Nullam tincidunt pulvinar imperdiet. Sed varius, diam vitae posuere semper, libero ex hendrerit nunc, ac sagittis eros metus ut diam."
            },
            {
                question: "What happens when there are no orders?",
                answer: "Morbi aliquam quis quam in luctus. Nullam tincidunt pulvinar imperdiet. Sed varius, diam vitae posuere semper, libero ex hendrerit nunc, ac sagittis eros metus ut diam."
            }
        ]
    }
};


export const actions = {
    submitted: async ({ request }) => {
        const formData = await request.formData();

        const name = formData.get('name')?.toString();
        const email = formData.get('email')?.toString();
        const subject = formData.get('subject')?.toString();
        const message = formData.get('message')?.toString();

        // ... (Logic to handle the feedback data, e.g., send an email, store in a database, etc.)
        console.log({ name, email, subject, message });

        return {
            success: true // Or set to false if there's an error
        };
    }
};