/** @type {import('./$types').PageServerLoad} */

import { error } from '@sveltejs/kit';

export async function load({ params }) {
    const response = await fetch('http://localhost:5170/api/Items');
    const auctions = await response.json();

    const bidHistory = await fetch(`http://localhost:5170/api/items/${params.id}/itemBidHistory`); // Fetch item bid history
    const itemBidHistory = await bidHistory.json();

    return {
        item: auctions.filter((item: any) => item.id == params.id)[0],
        itemBidHistory: itemBidHistory,
        auctions: auctions
            .filter((auction: any) => auction.isAuctionLive) // Filter only live auctions
            .filter((auction: any) => auction.id != params.id) // Filter out the current auction
            .map((auction: any) => ({
                id: auction.id,
                image: `http://localhost:5170/${auction.imagePath}`,
                title: auction.title,
                price: `$${auction.currentPrice || auction.startingPrice}`,
                author: auction.sellerName,
                endDate: auction.endTime,
                link: `/auction-details/${auction.id}` // Assuming you have an auction detail page
            }))
    };
};


export const actions = {
    placeBid: async ({ request, params }) => {
        const data = await request.formData();
        const bidPrice = data.get('bidPrice');
        const itemId = params.id;
        const bidderId = 2;

        if (!bidPrice || isNaN(Number(bidPrice))) {
            return error(400, { message: 'Invalid bid price' });
        }

        const response = await fetch(`http://localhost:5170/api/items/${itemId}/placeBid`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                Amount: bidPrice,
                BidderId: bidderId
            })
        });

        if (!response.ok) {
            return error(500, { message: 'Failed to place bid' });
        }

        // Redirect after successful bid (optional)
        return {
            success: true
        };
    }
};