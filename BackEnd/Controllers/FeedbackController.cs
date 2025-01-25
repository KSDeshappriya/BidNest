using BidNest.DTOs;
using BidNest.Models;
using Microsoft.AspNetCore.Mvc;

namespace BidNest.Controllers;

[Route("api/[controller]")]
[ApiController]
public class FeedbackController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public FeedbackController(ApplicationDbContext context)
    {
        _context = context;
    }

    // Submit feedback for a item's bid
    // POST: api/Feedback/{item-id}
    [HttpPost("{itemId}")]
    public async Task<IActionResult> SubmitFeedback(int itemId, FeedbackCreateDto feedbackDto)
    {
        var userId = HttpContext.Session.GetInt32("UserId");
        if (userId == null)
        {
            return Unauthorized("You must be logged in to submit feedback.");
        }

        var iId = _context.Items.Find(itemId);
        if (iId == null)
        {
            return NotFound("Item's Bid not found.");
        }

        var feedback = new Feedback
        {
            ItemId = itemId,
            UserId = (int)userId,
            Rating = feedbackDto.Rating,
            Comments = feedbackDto.Comments,
            DateGiven = DateTime.UtcNow
        };

        _context.Feedbacks.Add(feedback);
        await _context.SaveChangesAsync();
        
        return Ok(new { Message = "Feedback submitted successfully!" });
    }

    // Get feedback for a item's bid
    // GET: api/Feedback/{item-id}
    [HttpGet("{itemId}")]
    public IActionResult GetFeedback(int itemId)
    {
        var feedbacks = _context.Feedbacks
            .Where(f => f.ItemId == itemId)
            .Select(f => new
            {
                f.Rating,
                f.Comments,
                f.DateGiven,
                UserName = f.User.UserName
            }).ToList();

        if (feedbacks == null || feedbacks.Count == 0)
        {
            return NotFound("No feedback found for this item's bid.");
        }

        return Ok(feedbacks);
    }
}
