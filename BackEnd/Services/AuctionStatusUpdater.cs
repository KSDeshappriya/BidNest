using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;

public class AuctionStatusUpdater : BackgroundService
{
    private readonly IServiceProvider _serviceProvider;
    private readonly ILogger<AuctionStatusUpdater> _logger;

    public AuctionStatusUpdater(IServiceProvider serviceProvider, ILogger<AuctionStatusUpdater> logger)
    {
        _serviceProvider = serviceProvider;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            await UpdateAuctionStatus();
            await Task.Delay(TimeSpan.FromMinutes(1), stoppingToken); // Check every minute
        }
    }

    private async Task UpdateAuctionStatus()
    {
        using (var scope = _serviceProvider.CreateScope())
        {
            var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
            var now = DateTime.UtcNow;
            var itemsToUpdate = await context.Items
                .Where(i => i.EndTime < now && i.IsAuctionLive)
                .ToListAsync();

            foreach (var item in itemsToUpdate)
            {
                item.IsAuctionLive = false;
            }

            await context.SaveChangesAsync();
            _logger.LogInformation("Updated auction status for {Count} items.", itemsToUpdate.Count);
        }
    }
}
