// @ts-nocheck
/** */
// import { json } from '@sveltejs/kit';

export const actions = {
    submit:/** @param {import('./$types').RequestEvent} event */  async ({ request }) => {
        try {
            const data = await request.formData();

            const firstName = data.get('firstName')?.toString();
            const lastName = data.get('lastName')?.toString();
            const email = data.get('email')?.toString();
            const password = data.get('password')?.toString();
            const agreeToTerms = data.get('agreeToTerms')?.toString() === 'true'; // Assuming 'agreeToTerms' is a checkbox
            const role = data.get('role')?.toString();

            // Basic validation (add more as needed)
            if (!firstName || !lastName || !email || !password || !role || !agreeToTerms) {
                return json({ message: "Please fill in all required fields." }, { status: 400 });
            }

            // Call your .NET 8 Web API for registration
            const apiResponse = await fetch('http://localhost:5170/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json', // Specify the expected response type
                },
                body: JSON.stringify({
                    UserName: `${firstName} ${lastName}`,
                    Email: email,
                    Password: password,
                    Role: role,
                    PhoneNumber: 1234567890, // Add more fields as needed 
                    Address: '123 Main St',
                    DateOfBirth: '01/01/2000',
                    ProfilePicturePath: '/images/profiles/johndoe.jpg',
                })
            });

            if (apiResponse.ok) {
                const data = await apiResponse.json();
                return json({ message: "Registration successful" }, { status: 200 });
            } else {
                const errorData = await apiResponse.json();
                // Assuming your API returns an error object with a message
                return json({ message: errorData.message || "Registration failed" }, { status: apiResponse.status });
            }
        } catch (error) {
            console.error('Registration Error:', error);
            return json({ message: 'An internal error occurred.' }, { status: 500 });
        }
    }
};
