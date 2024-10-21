// export const actions = {
//     default: async (event) => {
//         console.log(event);
//     },
// };

import { fail } from '@sveltejs/kit';

export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const email = formData.get("email");
        const name = formData.get("name");
        const message = formData.get("message");

        console.log({name, email, message});

        // form data validate with sveltekit
        if(!name){
            return fail(400, {status:"Name is required", email, message});
        }

        return {
            status: "Form is submitted",
        };
    },
};