using Microsoft.AspNetCore.Mvc;
using server.Services;
using server.Models;
using Microsoft.EntityFrameworkCore;
using server.Data;

namespace server.Controllers;

[ApiController]
[Route("[controller]")]
[Produces("application/json")]
public class SummarizeController(SummarizerDbContext dbContext, SummaryService summaryService, UserAccessService userAccessService, ILogger<SummarizeController> logger) : ControllerBase
{
    private readonly SummaryService _summaryService = summaryService;
    private readonly ILogger<SummarizeController> _logger = logger;
    private readonly UserAccessService _userAccessService = userAccessService;
    private readonly SummarizerDbContext _dbContext = dbContext;

    [HttpPost("text", Name = "SummarizeText")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<SuccessDetails>> SummarizeText([FromBody] TextSummaryRequest request)
    {
        if (!ModelState.IsValid)
        {
            _logger.LogWarning("Invalid model state: {errors}", ModelState);
            return BadRequest(ModelState);
        }

        var user = await GetAuthenticatedUserAsync();
        var guestSummary = user == null ? await HandleGuestRequestAsync(request.IpAddress) : null;

        if (IsRequestLimitExceeded(user, guestSummary, user?.UserName ?? request.IpAddress))
        {
            return StatusCode(StatusCodes.Status429TooManyRequests, new ProblemDetails
            {
                Title = "Daily request limit exceeded.",
                Detail = "Users and guests are limited to 5 requests per day.",
                Status = StatusCodes.Status429TooManyRequests
            });
        }

        await _dbContext.SaveChangesAsync();
        _logger.LogInformation("Summarizing text: {text}", request.Text);

        try
        {
            var summary = await _summaryService.GetTextSummaryAsync(request.Text);
            var summaryEntity = CreateSummary(request.Text, summary.SummaryText, SummaryType.Text);

            if (user != null)
            {
                await _dbContext.UserSummaries.AddAsync(new UserSummary { User = user, Summary = summaryEntity });
            }

            return Ok(new SuccessDetails
            {
                Data = new DataSchema
                {
                    Type = "text",
                    Extensions = new Dictionary<string, object> { { "input_text", request.Text }, { "summary_text", summary.SummaryText } }
                }
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error summarizing text: {text}", request.Text);
            return StatusCode(StatusCodes.Status500InternalServerError, new ProblemDetails
            {
                Title = "Error summarizing text.",
                Detail = ex.Message,
                Status = StatusCodes.Status500InternalServerError
            });
        }
    }

    [HttpPost("article", Name = "SummarizeArticle")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<SuccessDetails>> SummarizeArticle([FromBody] ArticleSummaryRequest request)
    {
        if (!ModelState.IsValid)
        {
            _logger.LogWarning("Invalid model state: {errors}", ModelState);
            return BadRequest(ModelState);
        }

        var user = await GetAuthenticatedUserAsync();
        var guestSummary = user == null ? await HandleGuestRequestAsync(request.IpAddress) : null;

        if (IsRequestLimitExceeded(user, guestSummary, user?.UserName ?? request.IpAddress))
        {
            return StatusCode(StatusCodes.Status429TooManyRequests, new ProblemDetails
            {
                Title = "Daily request limit exceeded.",
                Detail = "Users and guests are limited to 5 requests per day.",
                Status = StatusCodes.Status429TooManyRequests
            });
        }

        await _dbContext.SaveChangesAsync();
        _logger.LogInformation($"Summarizing article: {request.Url}");

        try
        {
            var summary = await _summaryService.GetArticleSummaryAsync(request.Url);
            var summaryEntity = CreateSummary(summary.ArticleText, summary.SummaryText, SummaryType.Article, url: request.Url);

            if (user != null)
            {
                await _dbContext.UserSummaries.AddAsync(new UserSummary { User = user, Summary = summaryEntity });
            }

            return Ok(new SuccessDetails
            {
                Data = new DataSchema
                {
                    Type = "text",
                    Extensions = new Dictionary<string, object> { { "input_text", summary.ArticleText }, { "summary_text", summary.SummaryText } }
                }
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error summarizing article: {request.Url}");
            return StatusCode(StatusCodes.Status500InternalServerError, new ProblemDetails
            {
                Title = "Error summarizing text.",
                Detail = ex.Message,
                Status = StatusCodes.Status500InternalServerError
            });
        }
    }

    private async Task<User?> GetAuthenticatedUserAsync()
    {
        if (User.Identity != null && User.Identity.IsAuthenticated)
        {
            return await _dbContext.Users.FirstOrDefaultAsync(u => u.UserName == User.Identity.Name);
        }
        return null;
    }

    private async Task<GuestSummary> HandleGuestRequestAsync(string ipAddress)
    {
        var guestSummary = await _dbContext.GuestSummaries.FirstOrDefaultAsync(gs => gs.IpAddress == ipAddress);
        if (guestSummary == null)
        {
            guestSummary = new GuestSummary { IpAddress = ipAddress, RequestCount = 1, Date = DateTime.UtcNow };
            await _dbContext.GuestSummaries.AddAsync(guestSummary);
        }
        else
        {
            guestSummary.RequestCount++;
            _dbContext.GuestSummaries.Update(guestSummary);
        }
        return guestSummary;
    }

    private bool IsRequestLimitExceeded(User? user, GuestSummary? guestSummary, string identifier)
    {
        if (user != null && !_userAccessService.CanSummarize(user))
        {
            _logger.LogWarning("User exceeded daily request limit: {identifier}", identifier);
            return true;
        }
        if (guestSummary != null && !_userAccessService.CanSummarize(guestSummary))
        {
            _logger.LogWarning("Guest exceeded daily request limit: {identifier}", identifier);
            return true;
        }
        return false;
    }

    private static Summary CreateSummary(string input, string summaryText, SummaryType type, string url = "")
    {
        if (type == SummaryType.Article)
        {
            return new Summary
            {
                Url = url,
                Input = input,
                Output = summaryText,
                Type = type
            };
        }
        return new Summary
        {
            Input = input,
            Output = summaryText,
            Type = type
        };
    }
}
