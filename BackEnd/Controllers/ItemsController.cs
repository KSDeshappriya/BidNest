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

    // POST Create Item
    // POST /api/items
    [HttpPost]
    public async Task<IActionResult> CreateItem([FromForm] ItemCreateDto dto)
    {
        // // Check if user is logged in
        // var userId = HttpContext.Session.GetInt32("UserId");
        // if (userId == null)
        // {
        //     return Unauthorized("You must be logged in to create an item.");
        // }

        // Validate seller
        var seller = await _context.Users.FindAsync(dto.SellerId);
        if (seller == null || seller.Role != "Seller")
        {
            return BadRequest("Invalid seller");
        }

        // Check if an image file was provided
        if (dto.ImageFile == null || dto.ImageFile.Length == 0)
        {
            return BadRequest("An image file is required.");
        }

        // // Generate a unique filename for the image
        // var imageFileName = Guid.NewGuid() + Path.GetExtension(dto.ImageFile.FileName);

        // Generate a unique filename for the image using the username and a timestamp
        var timestamp = DateTime.UtcNow.ToString("yyyyMMddHHmmss");
        var imageFileName = $"{dto.Title}_{timestamp}{Path.GetExtension(dto.ImageFile.FileName)}";

        // Define the path to save the image
        var imagePath = Path.Combine("wwwroot/images/items", imageFileName);

        // Save the image file to the file system
        using (var stream = new FileStream(imagePath, FileMode.Create))
        {
            await dto.ImageFile.CopyToAsync(stream);
        }

        // Create and save the item
        var item = new Item
        {
            Title = dto.Title,
            Description = dto.Description,
            StartingPrice = dto.StartingPrice,
            StartTime = DateTime.UtcNow,
            EndTime = dto.EndTime,
            IsAuctionLive = true,
            Seller = seller,
            ImagePath = $"/images/items/{imageFileName}" // Save the image path in the database
        };

        _context.Items.Add(item);
        await _context.SaveChangesAsync();

        return Ok(new { item.Id, item.Title });
    }

    // Edit Items
    // PUT /api/items/{itemId}
    [HttpPut("{itemId}")]
    public async Task<IActionResult> EditItem(int itemId, ItemCreateDto dto)
    {
        // // Check if user is logged in
        // var userId = HttpContext.Session.GetInt32("UserId");
        // if (userId == null)
        // {
        //     return Unauthorized("You must be logged in to edit an item.");
        // }

        // Validate seller
        var seller = await _context.Users.FindAsync(dto.SellerId);
        if (seller == null || seller.Role != "Seller")
        {
            return BadRequest("Invalid seller");
        }

        // Check if an image file was provided
        if (dto.ImageFile == null || dto.ImageFile.Length == 0)
        {
            return BadRequest("An image file is required.");
        }

        // Generate a unique filename for the image using the username and a timestamp
        var timestamp = DateTime.UtcNow.ToString("yyyyMMddHHmmss");
        var imageFileName = $"{dto.Title}_{timestamp}{Path.GetExtension(dto.ImageFile.FileName)}";

        // Define the path to save the image
        var imagePath = Path.Combine("wwwroot/images/items", imageFileName);

        // Save the image file to the file system
        using (var stream = new FileStream(imagePath, FileMode.Create))
        {
            await dto.ImageFile.CopyToAsync(stream);
        }

        // Find the item
        var item = await _context.Items.FindAsync(itemId);
        if (item == null)
        {
            return BadRequest("Invalid item");
        }

        // Update the item
        item.Title = dto.Title;
        item.Description = dto.Description;
        item.StartingPrice = dto.StartingPrice;
        item.EndTime = dto.EndTime;
        item.Seller = seller;
        item.ImagePath = $"/images/items/{imageFileName}"; // Save the image path in the database

        await _context.SaveChangesAsync();

        return Ok(new { item.Id, item.Title });
    }

    // DELETE Items
    // DELETE /api/items/{itemId}
    [HttpDelete("{itemId}")]
    public async Task<IActionResult> DeleteItem(int itemId)
    {
        // // Check if user is logged in
        // var userId = HttpContext.Session.GetInt32("UserId");
        // if (userId == null)
        // {
        //     return Unauthorized("You must be logged in to delete an item.");
        // }

        var item = await _context.Items.FindAsync(itemId);
        if (item == null)
        {
            return BadRequest("Invalid item");
        }

        _context.Items.Remove(item);
        await _context.SaveChangesAsync();

        return Ok(new { item.Id, item.Title });
    }

    // GET All Items
    // GET /api/items
    [HttpGet]
    public async Task<IActionResult> GetItems()
    {
        var items = await _context.Items
            .Select(i => new
            {
                i.Id,
                i.Title,
                i.Description,
                i.StartingPrice,
                i.StartTime,
                i.EndTime,
                i.ImagePath,
                i.IsAuctionLive,
                SellerName = i.Seller.UserName,
                SellerId = i.Seller.Id,
                CurrentPrice = i.Bids
                    .Where(b => b.IsHighest)
                    .Select(b => b.Amount)
                    .FirstOrDefault() // Get the amount of the highest bid
            })
            .ToListAsync();

        return Ok(items);
    }

    // Get Item's bid history
    // GET /api/items/{itemId}/itemBidHistory
    [HttpGet("{itemId}/itemBidHistory")]
    public IActionResult GetItemBidHistory(int itemId)
    {
        var item = _context.Items.Find(itemId);
        if (item == null)
        {
            return BadRequest("Invalid item");
        }

        var bids = _context.Bids
            .Where(b => b.ItemId == itemId)
            .Select(b => new
            {
                b.Id,
                b.Amount,
                b.BidTime,
                BidderName = b.Bidder.UserName,
                BidderId = b.Bidder.Id,
                b.IsHighest
            })
            .ToList();

        if (bids == null || bids.Count == 0)
        {
            return NotFound("No bids found for this item.");
        }

        return Ok(bids);
    }

    // GET Seller's Items
    // GET /api/items/{userId}/sellerItems
    [HttpGet("{userId}/sellerItems")]
    public async Task<IActionResult> GetSellerItems(int userId)
    {
        var seller = await _context.Users.FindAsync(userId);
        if (seller == null || seller.Role != "Seller")
        {
            return BadRequest("Invalid seller");
        }

        var items = await _context.Items
            .Where(i => i.SellerId == userId)
            .Select(i => new
            {
                i.Id,
                i.Title,
                i.Description,
                i.StartingPrice,
                i.StartTime,
                i.EndTime,
                i.ImagePath,
                i.IsAuctionLive,
                CurrentPrice = i.Bids
                    .Where(b => b.IsHighest)
                    .Select(b => b.Amount)
                    .FirstOrDefault() // Get the amount of the highest bid
            })
            .ToListAsync();

        return Ok(items);
    }

    // POST Bids for an item
    // POST /api/items/{id}/placeBid
    [HttpPost("{id}/placeBid")]
    public async Task<IActionResult> PlaceBid(int id, BidCreateDto dto)
    {
        // // Check if user is logged in
        // var userId = HttpContext.Session.GetInt32("UserId");
        // if (userId == null)
        // {
        //     return Unauthorized("You must be logged in to place a bid.");
        // }

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
    // GET: api/items/{id}/buyerBidHistory
    [HttpGet("{id}/buyerBidHistory")]
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

}
