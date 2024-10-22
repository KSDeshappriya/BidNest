// @ts-nocheck
// - This is the page that will be displayed when the bidder logs in
// - It will display currently bid items, items that the bidder has won, and items that the bidder has lost
// - The bidder can also remove their bid from an item
// - It will also display the bidder's profile information
// - The bidder can also update their profile information


// src/routes/dashboard/+page.server.ts
import { fail } from "@sveltejs/kit";

/** @param {Parameters<import('./$types').PageServerLoad>[0]} event */
export async function load({ fetch }) {
    const userId = 1; // Assume a default user ID for now

    // Fetch the bidder's bid history from the backend
    const bidsResponse = await fetch(`http://localhost:5170/api/items/${userId}/buyerBidHistory`);
    const profileResponse = await fetch(`http://localhost:5170/api/users/${userId}`);

    if (!bidsResponse.ok || !profileResponse.ok) {
        return fail(500, { message: 'Failed to load data from the server' });
    }

    const bids = await bidsResponse.json();
    const userProfile = await profileResponse.json();

    return { bids, userProfile };
}

// src/routes/dashboard/+page.server.ts
export const actions = {
    updateProfile: async ({ request }) => {
        const formData = await request.formData();
        const userId = 1; // Assume a default user ID for now

        if (!userId) {
            return fail(401, { message: 'Unauthorized' });
        }
        const response = await fetch(`http://localhost:5170/api/users/${userId}`, {
            method: 'PUT',
            body: formData
        });

        if (!response.ok) {
            if (response.status === 400) {
                const errorData = await response.json();
                return fail(400, { message: errorData.message });
            }
            return fail(500, { message: 'Failed to update profile' });
        }

        const updatedProfile = await response.json();
        return { success: true, updatedProfile };
    },

    removeBid: async ({ request }) => {
        const { itemId } = await request.json();

        const response = await fetch(`http://localhost:5170/api/items/${itemId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            return fail(400, { message: 'Failed to remove bid' });
        }

        return { success: true };
    }
};
