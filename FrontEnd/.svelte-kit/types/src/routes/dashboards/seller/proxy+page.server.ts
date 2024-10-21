// @ts-nocheck
/** @type {import('./$types').PageServerLoad} */

import { fail, redirect } from "@sveltejs/kit";
import fs from "fs";
import path from "path";

import type { Action, Actions } from '@sveltejs/kit';
// import { fail } from '@sveltejs/kit';

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
    default: (async ({ request }) => {
        const formData = await request.formData();

        const title = formData.get('title');
        const description = formData.get('description');
        const startingPrice = formData.get('startingPrice');
        const endTime = formData.get('endTime');
        const sellerId = formData.get('sellerId');
        const imageFile = formData.get('imageFile');
        const imagePath = 'string';


        // Validate the form data
        if (!title || !description || !startingPrice || !endTime || !sellerId || !imageFile) {
            return fail(400, { error: 'Missing required fields' });
        }

        // Create a FormData object
        const nData = new FormData();
        nData.append('Title', title);
        nData.append('Description', description);
        nData.append('StartingPrice', startingPrice);
        nData.append('EndTime', endTime);
        nData.append('SellerId', sellerId);
        nData.append('ImageFile', imageFile);
        nData.append('ImagePath', imagePath);

        console.log("nData: ", nData);
        
        try {
            const response = await fetch('http://localhost:5170/api/Items', {
                method: 'POST',
                body: nData,
                headers: {
                    'Accept': '*/*'
                }
            });

            console.log("response: ", response);

            if (response.ok) {
                const jsonResponse = await response.json();
                console.log('Success:', jsonResponse);
                return { success: true, data: jsonResponse };
            } else {
                console.error('Error:', response.status, response.statusText);
                return fail(response.status, { error: response.statusText });
            }
        } catch (error) {
            console.error('Fetch error:', error);
            return fail(500, { error: 'Internal server error' });
        }
    }) satisfies Action
};

// export const actions = {
//     default: async ({ request }) => {
//         const formData = await request.formData();

//         // Get Form Data
//         const title = formData.get("title")?.toString();
//         const description = formData.get("description")?.toString();
//         const startingPrice = formData.get("startingPrice")?.toString();
//         const startTime = formData.get("startTime")?.toString();
//         const endTime = formData.get("endTime")?.toString();
//         const imageFile1 = formData.get('imageFile');

//         // Verify image is valid
//         if (!(imageFile1 instanceof File)) {
//             return fail(400, { message: 'File must be a valid file' });
//         }

//         if (imageFile1.size === 0) {
//             return fail(400, { message: 'File cannot be empty' });
//         }

//         // Prepare the file path
//         const dirname = process.cwd();
//         const fileName = path.join(dirname, "files", imageFile1.name);

//         // Read the image file as an ArrayBuffer
//         const imageFileBuffer = await imageFile1.arrayBuffer();

//         // Validate required fields
//         if (!title || !description || !startingPrice || !startTime || !endTime || !imageFile1) {
//             return fail(400, { message: 'All fields are required' });
//         }

//         // Prepare data for submission
//         const data = {
//             Title: title,
//             Description: description,
//             StartingPrice: parseFloat(startingPrice),
//             StartTime: new Date(startTime).toISOString(),
//             EndTime: new Date(endTime).toISOString(),
//             ImageFile: imageFileBuffer, // Note: You may need to handle this differently
//             ImagePath: fileName,
//             IsAuctionLive: true,
//             SellerId: 1
//         };

//         console.log("data to send: ", JSON.stringify(data));

//         // Submit the form data
//         const submitForm = await fetch(`http://localhost:5170/api/Items`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(data)
//         });

//         console.log("submitForm: ", submitForm.status);

//         if (submitForm.ok) {
//             return {
//                 status: 200,
//                 message: 'Item created successfully',
//             };
//         }

//         // Handle errors
//         const errorData = await submitForm.json();
//         return fail(400, { message: errorData.message || 'An error occurred while creating the item.' });
//     }
// };

// async function createItem() {
//     const url = 'http://localhost:5170/api/Items';
    
//     // Create a FormData object
//     const formData = new FormData();
//     formData.append('Title', 'new');
//     formData.append('Description', 'ooooooooooooo');
//     formData.append('StartingPrice', '80');
//     formData.append('EndTime', '2024-11-05T01:44:00.000Z');
//     formData.append('SellerId', '1');
    
//     // Append the image file (make sure to have the file available)
//     const imageFile = document.querySelector('input[type="file" name="imageFile"]').files[0]; // Assuming you have an <input type="file">
//     formData.append('ImageFile', imageFile);
    
//     // Append ImagePath if needed
//     formData.append('ImagePath', 'string');

//     try {
//         const response = await fetch(url, {
//             method: 'POST',
//             body: formData,
//             headers: {
//                 'Accept': '*/*'
//             }
//         });

//         if (response.ok) {
//             const jsonResponse = await response.json();
//             console.log('Success:', jsonResponse);
//         } else {
//             console.error('Error:', response.status, response.statusText);
//         }
//     } catch (error) {
//         console.error('Fetch error:', error);
//     }
// }

// Call the function to create an item
// createItem();;null as any as Actions;