/** @type {import('./$types').PageServerLoad} */

export async function load({ request }) {
    try {
        // Forward the GET request to your .NET 8 API
        const apiResponse = await fetch('http://localhost:5170/api/items', {
            method: 'GET' // Simply retrieve the auction items
        });

        if (apiResponse.ok) {
            const data = await apiResponse.json();
            return {
                status: 200,
                data: data,
                message: 'Items retrieved successfully'
            };
        } else {
            let errorData = { message: '' };
            try {
                errorData = await apiResponse.json();
            } catch (e) {
                errorData = { message: `API returned an error: ${apiResponse.status}` };
            }
            return {
                status: apiResponse.status,
                data: null,
                message: errorData.message || 'Failed to retrieve items'
            };
        }
    } catch (error) {
        return {
            status: 500,
            data: null,
            message: 'An internal error occurred: ' + (error instanceof Error ? error.message : 'Unknown error')
        };
    }
};

