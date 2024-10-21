/** @type {import('./$types').PageServerLoad} */

import { fail, redirect } from "@sveltejs/kit";

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


export const actions = {
    createItem: async ({ request }) => {
        const formData = await request.formData();

        // Get Form Data
        const title = formData.get("title")?.toString();
        const description = formData.get("description")?.toString();
        const startingPrice = formData.get("startingPrice")?.toString();
        const startTime = formData.get("startTime")?.toString();
        const endTime = formData.get("endTime")?.toString();
        const imageFile = formData.get('imageFile') as File;

        if (!imageFile) {
        return fail(400, { message: 'No file uploaded' });
        }

        // Check if the file is an image
        if (!imageFile.type.startsWith('image/')) {
        return fail(400, { message: 'Uploaded file is not an image' });
        }

        // Validate required fields
        if (!title || !description || !startingPrice || !startTime || !endTime || !imageFile) {
            return fail(400, { message: 'All fields are required' });
        }

        // Create a FormData object
        const nData = new FormData();
        nData.append('Title', title);
        nData.append('Description', description);
        nData.append('StartingPrice', startingPrice);
        nData.append('EndTime', endTime);
        nData.append('SellerId', '1');
        nData.append('ImageFile', imageFile);
        nData.append('ImagePath', imageFile.name);

        console.log("data to send: ", nData);

        // Submit the form data
        const submitForm = await fetch(`http://localhost:5170/api/Items`, {
            method: 'POST',
            headers: {
                'Accept': '*/*'
            },
            body: nData
        });

        console.log("submitForm: ", submitForm.status);

        if (submitForm.ok) {
            return {
                status: 200,
                message: 'Item created successfully',
            };
        }

        // Handle errors
        const errorData = await submitForm.json();
        return fail(400, { message: errorData.message || 'An error occurred while creating the item.' });
    },

    editItem: async ({ request }) => {
        const formData = await request.formData();

        // Get Form Data
        const id = formData.get("hiddenId")?.toString();
        const title = formData.get("title")?.toString();
        const description = formData.get("description")?.toString();
        const startingPrice = parseFloat(formData.get("startingPrice")?.toString() || '0');
        const endTime = formData.get("endTime")?.toString();
        const imageFile = formData.get('imageFile') as File;

        // Validate required fields
        if (!id || !title || !description || !startingPrice || !endTime) {
            return fail(400, { message: 'All fields are required' });
        }

        // Create a FormData object
        const nData = new FormData();
        // nData.append('Id', id);
        nData.append('Title', title);
        nData.append('Description', description);
        nData.append('StartingPrice', startingPrice.toString());
        nData.append('EndTime', endTime);
        nData.append('SellerId', '1'); 

        if (imageFile) {
            nData.append('ImageFile', imageFile);
            nData.append('ImagePath', imageFile.name);
        }

        // Submit the form data
        const submitForm = await fetch(`http://localhost:5170/api/Items/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': '*/*'
            },
            body: nData
        });

        console.log("submitForm: ", submitForm.status);

        if (submitForm.ok) {
            return {
                status: 200,
                message: 'Item updated successfully',
            };
        }

        // Handle errors
        const errorData = await submitForm.json();
        return fail(400, { message: errorData.message || 'An error occurred while updating the item.' });
    },

    updateProfile: async ({ request }) => {
        const formData = await request.formData();

        // Get Form Data
        const id = formData.get("hiddenId")?.toString();
        const userName = formData.get("userName")?.toString();
        const email = formData.get("email")?.toString();
        const phoneNumber = formData.get("phoneNumber")?.toString();
        const address = formData.get("address")?.toString();
        const dateOfBirth = formData.get("dateOfBirth")?.toString();
        const profilePicture = formData.get('profilePicture') as File;

        // Validate required fields
        if (!id || !userName || !email || !phoneNumber || !address || !dateOfBirth) {
            console.log("all fields are required");
            return fail(400, { message: 'All fields are required' });
        }

        // Create a FormData object
        const nData = new FormData();
        // nData.append('Id', id);
        nData.append('UserName', userName);
        nData.append('Email', email);
        nData.append('PhoneNumber', phoneNumber);
        nData.append('Address', address);
        nData.append('DateOfBirth', dateOfBirth);

        if (profilePicture) {
            nData.append('ImageFile', profilePicture);
            nData.append('ProfilePicturePath', profilePicture.name);
        }

        console.log("data to send: ", nData);

        // Submit the form data
        const submitForm = await fetch(`http://localhost:5170/api/users/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': '*/*'
            },
            body: nData
        });

        console.log("submitForm: ", submitForm);

        if (submitForm.ok) {
            return {
                status: 200,
                message: 'Profile updated successfully',
            };
        }

        // Handle errors
        const errorData = await submitForm.json();
        return fail(400, { message: errorData.message || 'An error occurred while updating the profile.' });
    }
};