using System.ComponentModel.DataAnnotations.Schema;

namespace BidNest.DTOs;

public class ItemCreateDto
{
    public string Title { get; set; }
    public string Description { get; set; }
    public decimal StartingPrice { get; set; }
    public DateTime EndTime { get; set; }
    public int SellerId { get; set; }
    
    [NotMapped] // Tell EF Core to ignore this property
    public IFormFile ImageFile { get; set; }
    public string ImagePath { get; set; } // Add this line
}
