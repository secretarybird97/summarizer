using Microsoft.AspNetCore.Mvc;
using server.Services;
using server.Models;

namespace server.Controllers;

[ApiController]
[Route("[controller]")]
[Produces("application/json")]
public class SummarizeController(SummaryService summaryService, ILogger<SummarizeController> logger) : ControllerBase
{
    private readonly SummaryService _summaryService = summaryService;
    private readonly ILogger<SummarizeController> _logger = logger;

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

        _logger.LogInformation("Summarizing text: {text}", request.Text);

        try
        {
            var summary = await _summaryService.GetTextSummaryAsync(request.Text);
            _logger.LogInformation("Summary: {summary}", summary);
            return Ok(new SuccessDetails
            {
                Data = new DataSchema()
                {
                    Type = "article",
                    Extensions = new Dictionary<string, object>
                    {
                        { "input_text", request.Text },
                        { "summary_text", summary }
                    }
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

        _logger.LogInformation("Summarizing article: {url}", request.Url);

        try
        {
            var summary = await _summaryService.GetArticleSummaryAsync(request.Url);
            _logger.LogInformation("Summary: {summary}", summary);
            return Ok(new SuccessDetails
            {
                Data = new DataSchema()
                {
                    Type = "article",
                    Extensions = new Dictionary<string, object>
                    {
                        { "input_url", request.Url },
                        { "summary_text", summary }
                    }
                }
            });
        }

        catch (Exception ex)
        {
            _logger.LogError(ex, "Error summarizing article: {url}", request.Url);
            return StatusCode(StatusCodes.Status500InternalServerError, new ProblemDetails
            {
                Title = "Error summarizing article.",
                Detail = ex.Message,
                Status = StatusCodes.Status500InternalServerError,
            });
        }
    }
}
