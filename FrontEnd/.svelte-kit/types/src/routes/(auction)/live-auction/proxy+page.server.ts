// @ts-nocheck
/** */

// export async function load() {
//     return {
//         auctions: [
//             {
//                 image: 'assets/images/bg/live-auc1.png',
//                 title: 'Brand New royal Enfield 250 CC For Sale',
//                 price: '$85.9',
//                 author: '@robatfox',
//                 endDate: 'Dec 5, 2024 10:37:25',
//                 timer: 'timer1',
//                 link: 'auction-details.html'
//             },
//             {
//                 image: 'assets/images/bg/live-auc2.png',
//                 title: 'Wedding Special Exclusive Cupple Ring (S2022)',
//                 price: '$85.9',
//                 author: '@robatfox',
//                 endDate: 'Dec 5, 2024 15:37:25',
//                 timer: 'timer2',
//                 link: 'auction-details.html'
//             },
//             {
//                 image: 'assets/images/bg/live-auc3.png',
//                 title: 'Brand New Honda CBR 600 RR For Sale (2022)',
//                 price: '$85.9',
//                 author: '@robatfox',
//                 endDate: 'Dec 5, 2024 20:37:25',
//                 timer: 'timer3',
//                 link: 'auction-details.html'
//             },
//             {
//                 image: 'assets/images/bg/live-auc4.png',
//                 title: 'Toyota AIGID A Class Hatchback Sale (2017 - 2021)',
//                 price: '$85.9',
//                 author: '@robatfox',
//                 endDate: 'Dec 5, 2024 00:37:25',
//                 timer: 'timer4',
//                 link: 'auction-details.html'
//             },
//             {
//                 image: 'assets/images/bg/live-auc5.png',
//                 title: 'Havit HV-G61 USB Black Double Game Pad With Vibrat',
//                 price: '$85.9',
//                 author: '@robatfox',
//                 endDate: 'Dec 5, 2024 05:37:25',
//                 timer: 'timer5',
//                 link: 'auction-details.html'
//             },
//             {
//                 image: 'assets/images/bg/live-auc6.png',
//                 title: 'IPhone 11 Pro Max All Variants Available For Sale',
//                 price: '$85.9',
//                 author: '@robatfox',
//                 endDate: 'Dec 5, 2024 10:37:25',
//                 timer: 'timer6',
//                 link: 'auction-details.html'
//             },
//             {
//                 image: 'assets/images/bg/live-auc7.png',
//                 title: 'Blue ray filter All Variants Available For Sale',
//                 price: '$85.9',
//                 author: '@robatfox',
//                 endDate: 'Dec 5, 2024 15:37:25',
//                 timer: 'timer7',
//                 link: 'auction-details.html'
//             },
//             {
//                 image: 'assets/images/bg/live-auc8.png',
//                 title: 'Pure leather All Variants Available For Sale',
//                 price: '$85.9',
//                 author: '@robatfox',
//                 endDate: 'Dec 5, 2024 15:37:25',
//                 timer: 'timer8',
//                 link: 'auction-details.html'
//             },
//             {
//                 image: 'assets/images/bg/live-auc9.png',
//                 title: 'Water resist All Variants Available For Sale',
//                 price: '$85.9',
//                 author: '@robatfox',
//                 endDate: 'Dec 5, 2024 15:37:25',
//                 timer: 'timer9',
//                 link: 'auction-details.html'
//             }
//         ]
//     }
// };


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