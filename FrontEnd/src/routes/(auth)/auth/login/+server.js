import { json } from '@sveltejs/kit';

export const POST = async ({ request }) => {
    try {
        const { email, password } = await request.json();

        // Forward the request to your .NET 8 API
        const apiResponse = await fetch('http://localhost:5170/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Email: email, Password: password })
        });

        if (apiResponse.ok) {
            const data = await apiResponse.json(); // Parse the JSON response
            return json({ data: data, message: data.message, token: data.token }, { status: 200 });
        } else {
            const errorData = await apiResponse.json();
            return json({ message: errorData.message || 'Login failed' }, { status: apiResponse.status });
        }
    } catch (error) {
        return json({ message: 'An internal error occurred' }, { status: 500 });
    }
};