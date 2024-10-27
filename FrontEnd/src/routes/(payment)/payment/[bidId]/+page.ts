// /** @type {import('./$types').PageLoad} */

// import { error } from '@sveltejs/kit';

// export async function load({ params, fetch }: { params: { bidId: string }, fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response> }) {
//     try {
//         // First, fetch the bid details
//         const bidResponse = await fetch(`http://localhost:5170/api/Bids/${params.bidId}`);
//         if (!bidResponse.ok) {
//             throw new Error('Failed to fetch bid details');
//         }
//         const bidDetails = await bidResponse.json();

//         // Then create payment intent with the bid amount
//         const paymentResponse = await fetch('http://localhost:5170/api/Payment/create-payment-intent', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 bidId: parseInt(params.bidId),
//                 amount: bidDetails.amount,
//                 currency: 'usd'
//             })
//         });

//         if (!paymentResponse.ok) {
//             const errorData = await paymentResponse.json();
//             throw new Error(errorData.error || 'Failed to create payment intent');
//         }
        
//         const paymentIntent = await paymentResponse.json();
//         return {
//             bidId: params.bidId,
//             bidDetails,
//             paymentIntent
//         };
//     } catch (e) {
//         throw error(500, {
//             message: e instanceof Error ? e.message : 'Failed to load payment details'
//         });
//     }
// };