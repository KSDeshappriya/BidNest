using BidNest.DTOs;
using BidNest.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BidNest.Controllers;


[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    // Constructor
    public UsersController(ApplicationDbContext context)
    {
        _context = context;
    }

    // POST /api/users/register
    [HttpPost("register")]
    public async Task<IActionResult> Register(UserRegisterDto dto)
    {
        // Check if an image file was provided
        if (dto.ImageFile == null || dto.ImageFile.Length == 0)
        {
            return BadRequest("An image file is required.");
        }

        // Generate a unique filename for the image
        var imageFileName = Guid.NewGuid() + Path.GetExtension(dto.ImageFile.FileName);

        // Define the path to save the image
        var imagePath = Path.Combine("wwwroot/images/profile", imageFileName);

        // Save the image file to the file system
        using (var stream = new FileStream(imagePath, FileMode.Create))
        {
            await dto.ImageFile.CopyToAsync(stream);
        }
        
        // Create the user object
        var user = new User
        {
            UserName = dto.UserName,
            Email = dto.Email,
            PhoneNumber = dto.PhoneNumber,
            Address = dto.Address,
            DateOfBirth = dto.DateOfBirth,
            ProfilePicturePath = $"/images/profile/{imageFileName}", // Store the relative path
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            Role = dto.Role
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return Ok(new { user.Id, user.UserName, user.Email });
    }

    // POST /api/users/login
    [HttpPost("login")]
    public async Task<IActionResult> Login(UserLoginDto dto)
    {
        var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == dto.Email);
        if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
        {
            return Unauthorized(new { message = "Invalid credentials" });
        }

        // Set user session
        HttpContext.Session.SetInt32("UserId", user.Id);
        HttpContext.Session.SetString("UserRole", user.Role);

        // Return a JSON response with a success message
        return Ok(new { message = "Login successful", userId = user.Id, role = user.Role });
    }

    // POST /api/users/logout
    [HttpPost("logout")]
    public IActionResult Logout()
    {
        // Clear the session
        HttpContext.Session.Clear();
        return Ok("Logout successful");
    }

    // GET /api/users/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        // // Get the logged-in user ID from the session
        // var userId = HttpContext.Session.GetInt32("UserId");

        // // Check if a user is logged in and if the requested ID matches the logged-in user ID
        // if (userId == null || id != userId)
        // {
        //     return Unauthorized(); 
        // }

        var user = await _context.Users.FindAsync(id);
        if (user == null)
        {
            return NotFound();
        }

        return Ok(user);
    }

    // PUT /api/users/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, UserUpdateDto dto)
    {
        // Get the logged-in user ID from the session
        var userId = HttpContext.Session.GetInt32("UserId");

        // Check if a user is logged in and if the requested ID matches the logged-in user ID
        if (userId == null || id != userId)
        {
            return Unauthorized(); 
        }

        var user = await _context.Users.FindAsync(id);
        if (user == null)
        {
            return NotFound();
        }

        // Update user properties
        user.UserName = dto.UserName;
        user.Email = dto.Email;
        user.PhoneNumber = dto.PhoneNumber;
        user.Address = dto.Address;
        user.DateOfBirth = dto.DateOfBirth;
        user.Role = dto.Role;

        // Handle image update
        if (dto.ImageFile != null && dto.ImageFile.Length > 0)
        {
            // Generate a unique filename
            var imageFileName = Guid.NewGuid() + Path.GetExtension(dto.ImageFile.FileName);

            // Define the path to save the image
            var imagePath = Path.Combine("wwwroot/images/profile", imageFileName);

            // Save the image file
            using (var stream = new FileStream(imagePath, FileMode.Create))
            {
                await dto.ImageFile.CopyToAsync(stream);
            }

            // Update the profile picture path
            user.ProfilePicturePath = $"/images/profile/{imageFileName}";
        }

        // Save changes to the database
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
