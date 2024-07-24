using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.Data;
using server.Services;

namespace server.Controllers;

[ApiController]
[Route("[controller]")]
public class ArticleSummaryController(SummarizerDbContext context, SummarizationService summarizationService) : ControllerBase
{
    private readonly SummarizerDbContext _context = context;
    private readonly SummarizationService _summarizationService = summarizationService;

    [HttpGet(Name = "GetArticleSummaries")]
    public IEnumerable<ArticleSummary> Get()
    {
        return Enumerable.Range(1, 5).Select(index => new ArticleSummary
        {
            Id = Guid.NewGuid().ToString(),
            Title = $"Article {index}",
            Summary = "This is a summary of the article.",
            Url = $"https://example.com/article/{index}",
            UserId = Guid.Empty.ToString()
        })
        .ToArray();
    }

    [HttpPost(Name = "PostArticleSummary")]
    public async Task<ActionResult> Post([FromBody] string url)
    {
        var summary = await _summarizationService.SummarizeArticle(url);
        var articleSummary = new ArticleSummary
        {
            Title = "Article",
            Summary = summary,
            Url = url,
            UserId = Guid.Empty.ToString()
        };

        // _context.ArticleSummaries.Add(articleSummary);
        // await _context.SaveChangesAsync();

        return Ok(new { articleSummary });
        // return CreatedAtAction(nameof(GetArticleSummary), new { id = articleSummary.Id }, articleSummary);
    }
}
