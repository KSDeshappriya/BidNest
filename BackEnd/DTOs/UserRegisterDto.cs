using System.ComponentModel.DataAnnotations.Schema;

namespace BidNest.DTOs;

public class UserRegisterDto
{
    public string UserName { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string PhoneNumber { get; set; }
    public string Address { get; set; }
    public DateTime DateOfBirth { get; set; }
    public string Role { get; set; }
    
    [NotMapped] // Tell EF Core to ignore this property
    public IFormFile ImageFile { get; set; }

    public string ProfilePicturePath { get; set; }
}
