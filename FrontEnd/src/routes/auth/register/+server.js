import { json } from '@sveltejs/kit';

export const POST = async ({ request }) => {
    try {
        const { firstName, lastName, email, password, role, agreeToTerms } = await request.json();

        if (!agreeToTerms) {
            return json({ message: "You must agree to the terms and conditions." }, { status: 400 });
        }

        // Call your .NET 8 Web API for registration
        const apiResponse = await fetch('http://localhost:5170/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                UserName: `${firstName} ${lastName}`,
                Email: email,
                Password: password,
                Role: role
            })
        });

        if (apiResponse.ok) {
            const data = await apiResponse.json();
            return json({ message: "Registration successful" }, { status: 200 });
        } else {
            const errorData = await apiResponse.json();
            return json({ message: errorData.message || "Registration failed" }, { status: apiResponse.status });
        }
    } catch (error) {
        return json({ message: 'An internal error occurred.' }, { status: 500 });
    }
};
