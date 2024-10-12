using BidNest.DTOs;
using BidNest.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BidNest.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ItemsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    // Constructor
    public ItemsController(ApplicationDbContext context)
    {
        _context = context;
    }

    // POST /api/items
    [HttpPost]
    public async Task<IActionResult> CreateItem(ItemCreateDto dto)
    {
        // Check if user is logged in
        var userId = HttpContext.Session.GetInt32("UserId");
        if (userId == null)
        {
            return Unauthorized("You must be logged in to create an item.");
        }

        var seller = await _context.Users.FindAsync(dto.SellerId);
        if (seller == null || seller.Role != "Seller")
        {
            return BadRequest("Invalid seller");
        }

        var item = new Item
        {
            Title = dto.Title,
            Description = dto.Description,
            StartingPrice = dto.StartingPrice,
            StartTime = DateTime.UtcNow,
            EndTime = dto.EndTime,
            IsAuctionLive = true,
            Seller = seller
        };

        _context.Items.Add(item);
        await _context.SaveChangesAsync();

        return Ok(new { item.Id, item.Title });
    }

    // GET /api/items/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> GetItem(int id)
    {
        var item = await _context.Items.Include(i => i.Bids).FirstOrDefaultAsync(i => i.Id == id);
        if (item == null)
        {
            return NotFound();
        }

        return Ok(new
        {
            item.Id,
            item.Title,
            item.Description,
            item.StartingPrice,
            item.StartTime,
            item.EndTime,
            item.IsAuctionLive,
            Bids = item.Bids.Select(b => new
            {
                b.Id,
                b.Amount,
                b.BidTime,
                b.BidderId,
                b.IsHighest
            })
        });
    }

    // POST /api/items/{id}/bids
    [HttpPost("{id}/bids")]
    public async Task<IActionResult> PlaceBid(int id, BidCreateDto dto)
    {
        // Check if user is logged in
        var userId = HttpContext.Session.GetInt32("UserId");
        if (userId == null)
        {
            return Unauthorized("You must be logged in to place a bid.");
        }

        var item = await _context.Items.Include(i => i.Bids).FirstOrDefaultAsync(i => i.Id == id);
        if (item == null || !item.IsAuctionLive)
        {
            return BadRequest("Invalid item or auction is not live");
        }

        var bidder = await _context.Users.FindAsync(dto.BidderId);
        if (bidder == null || bidder.Role != "Buyer")
        {
            return BadRequest("Invalid bidder");
        }

        var highestBid = item.Bids.OrderByDescending(b => b.Amount).FirstOrDefault();
        if (highestBid != null && dto.Amount <= highestBid.Amount)
        {
            return BadRequest("Bid amount must be higher than the current highest bid");
        }

        var bid = new Bid
        {
            Amount = dto.Amount,
            BidTime = DateTime.UtcNow,
            Bidder = bidder,
            Item = item,
            IsHighest = true
        };

        if (highestBid != null)
        {
            highestBid.IsHighest = false;
        }

        _context.Bids.Add(bid);
        await _context.SaveChangesAsync();

        return Ok(new { bid.Id, bid.Amount, bid.BidderId, bid.ItemId });
    }


    // Get buyer's bid items history
    // GET: api/items/{id}/bidhistory
    [HttpGet("{id}/bidhistory")]
    public IActionResult GetBuyerBidItems(int id)
    {
        var buyer = _context.Users.Find(id);
        if (buyer == null || buyer.Role != "Buyer")
        {
            return BadRequest("Invalid buyer");
        }

        var bids = _context.Bids
            .Where(b => b.BidderId == id)
            .Select(b => new
            {
                b.Id,
                b.Amount,
                b.BidTime,
                ItemId = b.Item.Id,
                ItemName = b.Item.Title,
                b.IsHighest
            })
            .ToList();

        if (bids == null || bids.Count == 0)
        {
            return NotFound("No bids found for this buyer.");
        }

        return Ok(bids);
    }

    // Get bid history for an item
    // GET: api/items/{itemId}/bids
    [HttpGet("{itemId}/bids")]
    public IActionResult GetBidHistory(int itemId)
    {
        var bids = _context.Bids
            .Where(b => b.ItemId == itemId)
            .Select(b => new
            {
                b.Amount,
                b.BidTime,
                BidderName = b.Bidder.UserName,
                b.IsHighest
            }).ToList();

        if (bids == null || bids.Count == 0)
        {
            return NotFound("No bids found for this item.");
        }

        return Ok(bids);
    }
}
