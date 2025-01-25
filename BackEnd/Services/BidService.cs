using BidNest.Models;
using Microsoft.EntityFrameworkCore;

namespace BidNest.Services;

public interface IBidService
{
    Task<Bid> GetBidById(int bidId);
    // Add other bid-related methods as needed
}

public class BidService : IBidService
{
    private readonly ApplicationDbContext _context;

    public BidService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Bid> GetBidById(int bidId)
    {
        var bid = await _context.Bids
            .Include(b => b.Item) // Include item details if needed
            .FirstOrDefaultAsync(b => b.Id == bidId);

        if (bid == null)
        {
            throw new Exception($"Bid with ID {bidId} not found.");
        }

        return bid;
    }
}