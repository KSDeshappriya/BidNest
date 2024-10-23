/**
 *  - This is the page that will be displayed when the bidder logs in
 *  - It will display currently bid items, items that the bidder has won, and items that the bidder has lost
 *  - The bidder can also remove their bid from an item
 *  - It will also display the bidder's profile information
 *  - The bidder can also update their profile information 
 *
 * * *API Urls:
 *      - PUT: http://localhost:5170/api/users/{id}
 *      - POST: http://localhost:5170/api/users/logout
 *      - GET: http://localhost:5170/api/items/{userId}/buyerBiddings
 *      - DELETE: http://localhost:5170/api/items/{itemId}/deleteBid/{bidId}
 */
/** @type {import('./$types').PageServerLoad} */

import { fail, redirect } from "@sveltejs/kit";

export async function load({ request, cookies}) {
    let userId = cookies.get('userId');
    const response = await fetch(`http://localhost:5170/api/items/${userId}/buyerBiddings`, {
        method: 'GET',
        headers: {
            'Accept': '*/*'
        }
    });

    // GET: http://localhost:5170/api/users/{id}
    const userProfile = await fetch(`http://localhost:5170/api/users/${userId}`, {
        method: 'GET',
        headers: {
            'Accept': '*/*'
        }
    });

    if (response.ok && userProfile.ok) {
        const data = await response.json();
        const profile = await userProfile.json();
        console.log("response: ", data);
        return {
            userId: cookies.get('userId'),
            status: 200,
            items: data,
            profile: profile
        };
    } else {
        // Handle errors
        console.log("response: ", response);
        console.log("userProfile: ", userProfile);
        // const errorData = await response.json();
        // return fail(400, { message: errorData.message || 'An error occurred while loading the bidder biddings.' });
    }
}

export const actions = {
    logout: async ({ request , cookies }) => {
        const response = await fetch('http://localhost:5170/api/users/logout', {
            method: 'POST',
            headers: {
                'Accept': '*/*'
            }
        });

        if (response.ok) {
            cookies.set('access', '', { path: '/' });
            cookies.set('userId', "", { path: '/' });
            cookies.set('role', "", { path: '/' });

            // Redirect to the login page or any other appropriate page after logout
            return redirect(303, '/login');
        } else {
            // Handle errors
            const errorData = await response.json();
            return fail(400, { message: errorData.message || 'An error occurred during logout.' });
        }
    },
    updateProfile: async ({ request, cookies}) => {
        // Get the userId from the cookies
        let userId = cookies.get('userId');
        const formData = await request.formData();
        // Get Form Data
        const userName = formData.get("userName")?.toString();
        const email = formData.get("email")?.toString();
        const phoneNumber = formData.get("phoneNumber")?.toString();
        const address = formData.get("address")?.toString();
        const dateOfBirth = formData.get("dateOfBirth")?.toString();
        const hiddenId = formData.get("hiddenId")?.toString() || userId;

        // Submit the form data
        const submitForm = await fetch(`http://localhost:5170/api/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Accept': '*/*'
            },
            body: formData
        });

        console.log("submitForm: ", submitForm.status);

        if (submitForm.ok) {
            return {
                status: 200,
                message: 'Profile updated successfully',
            };
        }

        // Handle errors
        const errorData = await submitForm.json();
        return fail(400, { message: errorData.message || 'An error occurred while updating the profile.' });
    },
    removeBid: async ({ request , cookies}) => {
        const formData = await request.formData();
        const itemId = formData.get('id')?.toString();
        const bidId = formData.get('bidId')?.toString();

        // Submit the form data
        const submitForm = await fetch(`http://localhost:5170/api/items/${Number(itemId)}/deleteBid/${Number(bidId)}`, {
            method: 'DELETE',
            headers: {
                'Accept': '*/*'
            }
        });

        console.log("submitForm: ", submitForm.status);

        if (submitForm.ok) {
            return {
                status: 200,
                message: 'Bid removed successfully',
            };
        }

        // Handle errors
        const errorData = await submitForm.json();
        return fail(400, { message: errorData.message || 'An error occurred while removing the bid.' });
    }
}

/**
 * 
  {
    "itemId": null,
    "itemName": "",
    "itemStartingPrice": null,
    "itemCurrentPrice": null,
    "itemEndTime": "",
    "itemImagePath": "",
    "sellerName": "",
    "sellerId": null,
    "latestBid": {
        "id": null,
        "amount": null,
        "bidTime": "",
        "isHighest": false
    }
}
 *
 */