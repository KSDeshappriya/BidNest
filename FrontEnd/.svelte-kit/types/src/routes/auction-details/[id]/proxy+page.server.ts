// @ts-nocheck
/** @param {Parameters<import('./$types').PageServerLoad>[0]} event */


export async function load({ params }) {
    // GET: http://localhost:5170/api/Items
    const response1 = await fetch('http://localhost:5170/api/Items');
    const auctions = await response1.json();

    // GET: http://localhost:5170/api/Items (with query params for filtering item now showing in this page- ex: /auction-details/[id]/ using get item id from [id]) )


    return {
        auctions: auctions
            .filter((auction: any) => auction.isAuctionLive) // Filter only live auctions
            .map((auction: any) => ({
                image: `http://localhost:5170/${auction.imagePath}`,
                title: auction.title,
                price: `$${auction.currentPrice || auction.startingPrice}`,
                author: auction.sellerName,
                endDate: auction.endTime,
                link: `/auction-details/${auction.id}` // Assuming you have an auction detail page
            }))
    };
};

// GET: http://localhost:5170/api/Items (with query params for filtering item now showing in this page- ex: /auction-details/[id]/ using get item id from [id]) )
// GET: http://localhost:5170/api/items/{itemId}/itemBidHistory
// POST: htpp://localhost:5170/api/items/{id}/placeBid
