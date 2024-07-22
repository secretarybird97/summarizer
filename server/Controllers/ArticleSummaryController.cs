using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.Data;
using server.Services;

namespace server.Controllers;

[ApiController]
[Route("[controller]")]
public class ArticleSummaryController : ControllerBase
{
    private readonly SummarizerDbContext _context;
    private readonly ArticleSummarizationService _summarizationService;

    public ArticleSummaryController(SummarizerDbContext context, ArticleSummarizationService summarizationService)
    {
        _context = context;
        _summarizationService = summarizationService;
    }

    [HttpGet(Name = "GetArticleSummaries")]
    public IEnumerable<ArticleSummary> Get()
    {
        return Enumerable.Range(1, 5).Select(index => new ArticleSummary
        {
            Id = index,
            Title = $"Article {index}",
            Summary = "This is a summary of the article.",
            Url = $"https://example.com/article/{index}",
            UserId = 1
        })
        .ToArray();
    }

    [HttpPost(Name = "SummarizeArticle")]
    public async Task<ActionResult> SummarizeArticle([FromBody] string url)
    {
        var summary = await _summarizationService.SummarizeArticle(url);
        var articleSummary = new ArticleSummary
        {
            Title = "Article",
            Summary = summary,
            Url = url,
            UserId = 1
        };

        // _context.ArticleSummaries.Add(articleSummary);
        // await _context.SaveChangesAsync();

        return Ok(new { articleSummary });
    }
}
