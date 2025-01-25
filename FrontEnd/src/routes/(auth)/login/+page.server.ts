/** @type {import('./$types').PageServerLoad} */

// export const actions = {
//     default: async ({ cookies }) => {
//       cookies.set("access", "true", { path: '/' });
//     },
//   };

export function load({ cookies }) {
	const role = cookies.get('role');

	return {
		role: role
	};
}

export const actions = {
  submit: async ({ request, cookies }) => {
    // Extract form data
    const data = await request.formData();
    const email = data.get('email')?.toString(); // Use optional chaining
    const password = data.get('password')?.toString(); // Use optional chaining

    // Validate input
    if (!email || !password) {
      return {
        status: 400,
        body: { message: 'Email and password are required.' },
      };
    }

    // Prepare the request payload
    const payload = {
      Email: email,
      Password: password,
    };

    try {
      // Send login request to the API
      const apiResponse = await fetch('http://localhost:5170/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json', // Specify the expected response type
        },
        body: JSON.stringify(payload),
      });

      // Check if the response is successful
      if (!apiResponse.ok) {
        const errorResponse = await apiResponse.json();
        return {
          status: apiResponse.status,
          body: {
            message: errorResponse.error || 'Login failed. Please try again later.',
          },
        };
      }

      // Parse the successful response
      const loginResult = await apiResponse.json();

      // Set cookies for authentication
      cookies.set('access', 'true', { path: '/' });
      cookies.set('userId', loginResult.userId, { path: '/' });
      cookies.set('role', loginResult.role, { path: '/' });

      console.log(loginResult)

      // Redirect to the home page
      // openExternalLink('/');

      return {
        status: 200,
        body: { message: 'Login successful!' },
      };
    } catch (error) {
      // Handle network or unexpected errors
      console.error('Login error:', error);
      return {
        status: 500,
        body: { message: 'An unexpected error occurred. Please try again later.' },
      };
    }
  },
};
