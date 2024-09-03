using BidNest.Models;
using Microsoft.EntityFrameworkCore;

namespace BidNest.Services;

public class AuctionService
{
    private readonly ApplicationDbContext _context;

    public AuctionService(ApplicationDbContext context)
    {
        _context = context;
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

            // You can also trigger an email to the winner/seller here
        }

        await _context.SaveChangesAsync();
    }
}
