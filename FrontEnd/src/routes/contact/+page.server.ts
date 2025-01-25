/** @type {import('./$types').PageServerLoad} */

export const actions = {
    feedback: async ({ request }) => {
        const formData = await request.formData();
        
        const name = formData.get('name')?.toString();
        const email = formData.get('email')?.toString();
        const phone = formData.get('phone')?.toString();
        const subject = formData.get('subject')?.toString();
        const message = formData.get('message')?.toString();

        // ... (Logic to handle the feedback data, e.g., send an email, store in a database, etc.)
        console.log({ name, email, phone, subject, message });

        return {
            success: true // Or set to false if there's an error
        };
    }
};