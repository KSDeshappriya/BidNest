/** @type {import('./$types').PageServerLoad} */

export async function load() {
    const response = await fetch('http://localhost:5170/api/Items');
    const auctions = await response.json();

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