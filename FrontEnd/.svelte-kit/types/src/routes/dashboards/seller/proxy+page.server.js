// @ts-nocheck
/** @param {Parameters<import('./$types').PageServerLoad>[0]} event */

export async function load({ request }) {
    try {
        let userId = 1;
        // Forward the GET request to your .NET 8 API
        const apiResponse = await fetch(`http://localhost:5170/api/items/${userId}/sellerItems`, {
            method: 'GET' // Simply retrieve the auction items
        });

        // if (apiResponse.ok) {
            const items = await apiResponse.json();
            // Fetch user data
            const userResponse = await fetch(`http://localhost:5170/api/users/${userId}`, {
                method: 'GET' // Simply retrieve the auction items
            });
            let user = null;
            if (userResponse.ok) {
                user = await userResponse.json();
                return {
                    items: items,
                    user: user,
                };
            }
            return {
                items: items,
            };
        // }
    } catch (error) {
        return {
            status: 500,
            data: null,
            message: 'An internal error occurred: ' + (error instanceof Error ? error.message : 'Unknown error')
        };
    }
};

