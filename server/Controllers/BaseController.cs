using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Controllers;

public abstract class BaseController<T>(ILogger<T> logger, SummarizerDbContext dbContext) : ControllerBase where T : class
{
    protected readonly SummarizerDbContext _dbContext = dbContext;
    protected readonly ILogger<T> _logger = logger;

    protected async Task<User?> GetAuthenticatedUserAsync()
    {
        if (User.Identity != null && User.Identity.IsAuthenticated)
        {
            return await _dbContext.Users.SingleOrDefaultAsync(u => u.UserName == User.Identity.Name);
        }
        return null;
    }
}
