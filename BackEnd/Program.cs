using BidNest.Services;
using Microsoft.EntityFrameworkCore;
using BidNest.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"), ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))));

// Read SMTP settings from configuration
var smtpSettings = builder.Configuration.GetSection("SmtpSettings").Get<SmtpSettings>();

// Register NotificationService with SMTP settings
builder.Services.AddScoped<NotificationService>(sp => new NotificationService(
    smtpSettings.Host,
    smtpSettings.Port,
    smtpSettings.Username,
    smtpSettings.Password
));

builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30); // Set session timeout
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});

builder.Services.AddScoped<AuctionService>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseSession(); // Enable session
app.UseAuthorization();

app.MapControllers();

app.Run();
