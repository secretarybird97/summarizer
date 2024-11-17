using Microsoft.AspNetCore.Mvc;
using server.Services;
using server.Models;
using Microsoft.EntityFrameworkCore;
using server.Data;

namespace server.Controllers;

[ApiController]
[Route("[controller]")]
[Produces("application/json")]
public class SummarizeController(SummarizerDbContext dbContext, SummaryService summaryService, UserAccessService userAccessService, ILogger<SummarizeController> logger) : BaseController<SummarizeController>(logger, dbContext)
{
    private readonly SummaryService _summaryService = summaryService;
    private readonly UserAccessService _userAccessService = userAccessService;

    [HttpPost("text", Name = "SummarizeText")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [ProducesResponseType(StatusCodes.Status429TooManyRequests)]
    public async Task<ActionResult> SummarizeText([FromBody] TextSummaryRequest request)
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

        _logger.LogInformation($"Summarizing article: {request.Text}");
        try
        {
            var summary = await _summaryService.GetTextSummaryAsync(request.Text);
            var existingSummary = await _dbContext.Summaries
                .SingleOrDefaultAsync(s => s.Input == request.Text && s.Output == summary.SummaryText && s.Type == SummaryType.Text);

            Summary summaryEntity;
            if (existingSummary != null)
            {
                summaryEntity = existingSummary;
            }
            else
            {
                summaryEntity = CreateSummary(request.Text, summary.SummaryText, SummaryType.Text);
                await _dbContext.Summaries.AddAsync(summaryEntity);
            }

            if (user != null)
            {
                var userSummaryExists = await _dbContext.UserSummaries
                    .AnyAsync(us => us.UserId == user.Id && us.SummaryId == summaryEntity.Id);

                if (!userSummaryExists)
                {
                    await _dbContext.UserSummaries.AddAsync(new UserSummary { User = user, Summary = summaryEntity });
                }
            }

            return Ok(new { type = "text", input_text = request.Text, summary_text = summary.SummaryText });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error summarizing text: {request.Text}");
            return StatusCode(StatusCodes.Status500InternalServerError, new ProblemDetails
            {
                Title = "Error summarizing text.",
                Detail = ex.Message,
                Status = StatusCodes.Status500InternalServerError
            });
        }
        finally
        {
            await _dbContext.SaveChangesAsync();
        }
    }

    [HttpPost("article", Name = "SummarizeArticle")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [ProducesResponseType(StatusCodes.Status429TooManyRequests)]
    public async Task<ActionResult> SummarizeArticle([FromBody] ArticleSummaryRequest request)
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

        _logger.LogInformation($"Summarizing article: {request.Url}");
        try
        {
            var summary = await _summaryService.GetArticleSummaryAsync(request.Url);
            var existingSummary = await _dbContext.Summaries
                .SingleOrDefaultAsync(s => s.Input == summary.ArticleText && s.Output == summary.SummaryText && s.Type == SummaryType.Article);

            Summary summaryEntity;
            if (existingSummary != null)
            {
                summaryEntity = existingSummary;
            }
            else
            {
                summaryEntity = CreateSummary(summary.ArticleText, summary.SummaryText, SummaryType.Article, url: request.Url, title: summary.Title);
                await _dbContext.Summaries.AddAsync(summaryEntity);
            }

            if (user != null)
            {
                var userSummaryExists = await _dbContext.UserSummaries
                    .AnyAsync(us => us.UserId == user.Id && us.SummaryId == summaryEntity.Id);

                if (!userSummaryExists)
                {
                    await _dbContext.UserSummaries.AddAsync(new UserSummary { User = user, Summary = summaryEntity });
                }
            }

            await _dbContext.SaveChangesAsync();
            return Ok(new { type = "article", input_text = summary.ArticleText, summary_text = summary.SummaryText });
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
        finally
        {
            await _dbContext.SaveChangesAsync();
        }
    }

    private async Task<GuestUser> HandleGuestRequestAsync(string ipAddress)
    {
        var guestSummary = await _dbContext.GuestSummaries.SingleOrDefaultAsync(gs => gs.IpAddress == ipAddress);
        if (guestSummary == null)
        {
            guestSummary = new GuestUser { IpAddress = ipAddress, RequestCount = 1, Date = DateTime.UtcNow };
            await _dbContext.GuestSummaries.AddAsync(guestSummary);
        }
        else
        {
            guestSummary.RequestCount++;
            _dbContext.GuestSummaries.Update(guestSummary);
        }
        return guestSummary;
    }

    private bool IsRequestLimitExceeded(User? user, GuestUser? guestSummary, string identifier)
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

    private static Summary CreateSummary(string input, string summaryText, SummaryType type, string url = "", string title = "")
    {
        if (type == SummaryType.Article)
        {
            return new Summary
            {
                Title = title,
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
