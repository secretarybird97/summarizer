using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using server.Models;
using server.Data;
using Microsoft.EntityFrameworkCore;

namespace server.Controllers;

[ApiController]
[Route("[controller]")]
[Produces("application/json")]
public class UserController(ILogger<UserController> logger, SummarizerDbContext dbContext, SignInManager<User> signInManager) : BaseController<UserController>(logger, dbContext)
{
    private readonly SignInManager<User> _signInManager = signInManager;

    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [HttpGet("info", Name = "GetUserInfo")]
    public async Task<ActionResult<UserInfoResponse>> GetUserInfo()
    {
        var user = await GetAuthenticatedUserAsync();

        if (user == null) return Unauthorized();

        return Ok(new UserInfoResponse
        {
            Username = user.UserName ?? "",
            CreatedAt = user.CreatedAt,
            SubscriptionTier = user.SubscriptionTier,
            DailyRequestCount = user.DailyRequestCount,
            LastRequestAt = user.LastRequestAt
        });
    }

    [AllowAnonymous]
    [HttpPost("logout", Name = "Logout")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> Logout()
    {
        _logger.LogInformation("Logging out user: {username}", User.Identity?.Name);

        await _signInManager.SignOutAsync();
        return Ok();
    }

    [Authorize]
    [HttpGet("summaries", Name = "GetUserSummaries")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<ActionResult<IEnumerable<SummaryResponse>>> GetUserSummaries()
    {
        var user = await GetAuthenticatedUserAsync();
        if (user == null)
        {
            return Unauthorized();
        }

        var userSummaries = await _dbContext.UserSummaries
            .Where(us => us.UserId == user.Id)
            .Select(us => new SummaryResponse
            {
                Id = us.SummaryId,
                Title = us.Summary.Title,
                Content = us.Summary.Output,
                CreatedAt = us.CreatedAt
            }).ToListAsync();

        return Ok(userSummaries);
    }

    [Authorize]
    [HttpDelete("summaries/{id}", Name = "DeleteUserSummary")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> DeleteUserSummary(string id)
    {
        var user = await GetAuthenticatedUserAsync();
        if (user == null)
        {
            return Unauthorized();
        }

        var userSummary = await _dbContext.UserSummaries
            .SingleOrDefaultAsync(us => us.UserId == user.Id && us.SummaryId == id);
        if (userSummary == null)
        {
            return NotFound();
        }

        _dbContext.UserSummaries.Remove(userSummary);
        await _dbContext.SaveChangesAsync();

        return Ok();
    }

    [Authorize]
    [HttpPut("subscription", Name = "ChangeSubscriptionTier")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> ChangeSubscriptionTier([FromBody] ChangeSubcriptionRequest request)
    {
        var user = await GetAuthenticatedUserAsync();
        if (user == null)
        {
            return Unauthorized();
        }

        if (!Enum.IsDefined(typeof(SubscriptionTier), request.NewSubscriptionTier))
        {
            return BadRequest("Invalid subscription tier specified.");
        }

        user.SubscriptionTier = request.NewSubscriptionTier;
        _dbContext.Users.Update(user);
        await _dbContext.SaveChangesAsync();

        _logger.LogInformation("User {username} changed their subscription tier to {tier}", user.UserName, user.SubscriptionTier);

        return Ok(new { message = "Subscription tier updated successfully." });
    }
}

public class SummaryResponse()
{
    public string Id { get; set; } = null!;
    public string Title { get; set; } = null!;
    public string Content { get; set; } = null!;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class ChangeSubcriptionRequest()
{
    public SubscriptionTier NewSubscriptionTier { get; set; }
}

public class UserInfoResponse()
{
    public DateTime CreatedAt { get; set; }

    public SubscriptionTier SubscriptionTier { get; set; }

    public int DailyRequestCount { get; set; }

    public DateTime LastRequestAt { get; set; }

    public string Username { get; set; } = string.Empty;
}
