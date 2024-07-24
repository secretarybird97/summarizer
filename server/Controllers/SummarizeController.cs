using Microsoft.AspNetCore.Mvc;
using server.Services;
using server.Models;

namespace server.Controllers;

[ApiController]
[Route("[controller]")]
[Produces("application/json")]
public class SummarizeController(SummarizationService summarizationService, ILogger<SummarizeController> logger) : ControllerBase
{
    private readonly SummarizationService _summarizationService = summarizationService;
    private readonly ILogger<SummarizeController> _logger = logger;

    [HttpPost("text", Name = "SummarizeText")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<SuccessDetails>> SummarizeText([FromBody] string text)
    {
        _logger.LogInformation("Summarizing text: {text}", text);
        if (string.IsNullOrWhiteSpace(text))
        {
            _logger.LogWarning("Text is required.");
            return BadRequest(new ProblemDetails
            {
                Title = "Text is required.",
                Status = StatusCodes.Status400BadRequest
            });
        }
        try
        {
            var summary = await _summarizationService.SummarizeText(text);
            _logger.LogInformation("Summary: {summary}", summary);
            return Ok(new SuccessDetails
            {
                Data = new DataSchema()
                {
                    Type = "article",
                    Extensions = new Dictionary<string, object>
                    {
                        { "input_text", text },
                        { "summary_text", summary }
                    }
                }
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error summarizing text: {text}", text);
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
    public async Task<ActionResult<SuccessDetails>> SummarizeArticle([FromBody] string url)
    {
        _logger.LogInformation("Summarizing article: {url}", url);
        if (string.IsNullOrWhiteSpace(url))
        {
            _logger.LogWarning("URL is required.");
            return BadRequest(new ProblemDetails
            {
                Title = "URL is required.",
                Status = StatusCodes.Status400BadRequest
            });
        }
        try
        {
            var summary = await _summarizationService.SummarizeArticle(url);
            _logger.LogInformation("Summary: {summary}", summary);
            return Ok(new SuccessDetails
            {
                Data = new DataSchema()
                {
                    Type = "article",
                    Extensions = new Dictionary<string, object>
                    {
                        { "input_url", url },
                        { "summary_text", summary }
                    }
                }
            });
        }

        catch (Exception ex)
        {
            _logger.LogError(ex, "Error summarizing article: {url}", url);
            return StatusCode(StatusCodes.Status500InternalServerError, new ProblemDetails
            {
                Title = "Error summarizing article.",
                Detail = ex.Message,
                Status = StatusCodes.Status500InternalServerError,
            });
        }
    }
}
