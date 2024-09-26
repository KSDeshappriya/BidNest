using BidNest.Models;
using Microsoft.EntityFrameworkCore;
using BidNest.Services;
using System.Threading.Tasks;

namespace BidNest.Services
{
    public class AuctionService
    {
        private readonly ApplicationDbContext _context;
        private readonly NotificationService _notificationService;

        public AuctionService(ApplicationDbContext context, NotificationService notificationService)
        {
            _context = context;
            _notificationService = notificationService;
        }

        public async Task EndAuction(int itemId)
        {
            var item = await _context.Items.Include(i => i.Bids).FirstOrDefaultAsync(i => i.Id == itemId);
            if (item == null || !item.IsAuctionLive)
            {
                throw new InvalidOperationException("Invalid auction");
            }

            item.IsAuctionLive = false;

            var highestBid = item.Bids.OrderByDescending(b => b.Amount).FirstOrDefault();
            if (highestBid != null)
            {
                // Process payment and delivery
                var payment = new Payment
                {
                    Amount = highestBid.Amount,
                    PaymentTime = DateTime.UtcNow,
                    PayerId = highestBid.BidderId,
                    ItemId = item.Id
                };

                _context.Payments.Add(payment);

                // Send email to the winner
                var winner = await _context.Users.FindAsync(highestBid.BidderId);
                await _notificationService.SendEmailAsync(winner.Email, "Auction Won!", "Congratulations! You have won the auction for item " + item.Title);

                // Send email to the seller
                var seller = await _context.Users.FindAsync(item.SellerId);
                await _notificationService.SendEmailAsync(seller.Email, "Auction Ended", "The auction for item " + item.Title + " has ended.");
            }

            await _context.SaveChangesAsync();
        }

        public async Task PlaceBid(int itemId, int bidderId, decimal amount)
        {
            var item = await _context.Items.Include(i => i.Bids).FirstOrDefaultAsync(i => i.Id == itemId);
            if (item == null || !item.IsAuctionLive)
            {
                throw new InvalidOperationException("Invalid auction");
            }

            var bid = new Bid
            {
                ItemId = itemId,
                BidderId = bidderId,
                Amount = amount,
                BidTime = DateTime.UtcNow
            };

            _context.Bids.Add(bid);
            await _context.SaveChangesAsync();

            // Send notification to the seller
            var seller = await _context.Users.FindAsync(item.SellerId);
            await _notificationService.SendEmailAsync(seller.Email, "New Bid Received", "A new bid has been placed on your item " + item.Title + ". The new bid amount is " + amount);
        }
    }
}