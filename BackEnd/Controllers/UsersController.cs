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
        var user = new User
        {
            UserName = dto.UserName,
            Email = dto.Email,
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
            return Unauthorized("Invalid credentials");
        }

        // Set user session
        HttpContext.Session.SetInt32("UserId", user.Id);
        HttpContext.Session.SetString("UserRole", user.Role);

        return Ok("Login successful");
    }

    // POST /api/users/logout
    [HttpPost("logout")]
    public IActionResult Logout()
    {
        // Clear the session
        HttpContext.Session.Clear();
        return Ok("Logout successful");
    }
}
