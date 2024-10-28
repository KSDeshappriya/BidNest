/** @type {import('./$types').PageServerLoad} */
import { json } from '@sveltejs/kit';

export const actions = {
    submit: async ({ request }) => {
        const formData = await request.formData();

        // Get Form Data
        const userName = formData.get("userName")?.toString();
        const email = formData.get("email")?.toString();
        const phoneNumber = formData.get("phoneNumber")?.toString();
        const address = formData.get("address")?.toString();
        const dateOfBirth = formData.get("dateOfBirth")?.toString();
        const role = formData.get("role")?.toString();
        const password = formData.get("password")?.toString();
        const profilePicture = formData.get('profilePicture') as File;

        // Validate required fields
        if (!userName || !email || !phoneNumber || !address || !dateOfBirth || !role || !password || !profilePicture) {
            return json({ message: 'All fields are required' }, { status: 400 });
        }

        // Create a FormData object
        const nData = new FormData();
        nData.append('UserName', userName);
        nData.append('Email', email);
        nData.append('PhoneNumber', phoneNumber);
        nData.append('Address', address);
        nData.append('DateOfBirth', dateOfBirth);
        nData.append('Role', role);
        nData.append('Password', password);
        if (profilePicture) {
            nData.append('ImageFile', profilePicture);
            nData.append('ProfilePicturePath', profilePicture.name);
        }

        // Submit the form data
        try {
            const submitForm = await fetch(`http://localhost:5170/api/users/register`, {
                method: 'POST',
                body: nData
            });

            console.log("submitForm: ", submitForm.status);
            console.log(submitForm)
            
        } catch (error) {
            console.error('Profile create Error2:', (error as Error).message);
            return json({ message: 'An internal error occurred.' }, { status: 500 });
        }
    }
};
