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
[Authorize]
public class UserController(ILogger<UserController> logger, SummarizerDbContext dbContext, SignInManager<User> signInManager) : BaseController<UserController>(logger, dbContext)
{
    private readonly SignInManager<User> _signInManager = signInManager;

    [ProducesResponseType(StatusCodes.Status200OK)]
    [HttpGet("info", Name = "GetUserInfo")]
    public IActionResult GetUserInfo()
    {
        var username = User.Identity?.Name;
        return Ok(new { username });
    }

    [HttpPost("logout", Name = "Logout")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<ActionResult> Logout()
    {
        _logger.LogInformation("Logging out user: {username}", User.Identity?.Name);

        await _signInManager.SignOutAsync();
        return Ok();
    }

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
}

public class SummaryResponse()
{
    public string Id { get; set; } = null!;
    public string Title { get; set; } = null!;
    public string Content { get; set; } = null!;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
