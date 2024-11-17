using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using server.Data;

namespace server.Services;

public class SummaryService(HttpClient httpClient, SummarizerDbContext dbContext, IMemoryCache memoryCache, ILogger<SummaryService> logger)
{
    private readonly HttpClient _httpClient = httpClient;
    private readonly string _apiUrl = Environment.GetEnvironmentVariable("LLM_API_URL") ?? throw new ArgumentNullException("LLM_API_URL environment variable not set.");
    private readonly IMemoryCache _cache = memoryCache;
    private readonly ILogger<SummaryService> _logger = logger;
    private readonly SummarizerDbContext _dbContext = dbContext;

    public async Task<ArticleSummaryResponse> GetArticleSummaryAsync(string url)
    {
        string cacheKey = GenerateCacheKey(url);

        if (_cache.TryGetValue(cacheKey, out ArticleSummaryResponse? cachedSummary) && cachedSummary != null)
        {
            return cachedSummary;
        }

        var existingSummary = await _dbContext.Summaries.SingleOrDefaultAsync(s => s.Url == url);
        if (existingSummary != null)
        {
            var articleSummaryObject = new ArticleSummaryResponse
            {
                ArticleText = existingSummary.Input,
                SummaryText = existingSummary.Output
            };
            _cache.Set(cacheKey, articleSummaryObject, TimeSpan.FromHours(24));
            return articleSummaryObject;
        }

        var summary = await SummarizeArticleViaFastApi(url);

        _cache.Set(cacheKey, summary, TimeSpan.FromHours(24));
        return summary;
    }

    public async Task<TextSummaryResponse> GetTextSummaryAsync(string text)
    {
        string cacheKey = GenerateCacheKey(text);

        if (_cache.TryGetValue(cacheKey, out TextSummaryResponse? cachedSummary) && cachedSummary != null)
        {
            return cachedSummary;
        }

        var existingSummary = await _dbContext.Summaries.SingleOrDefaultAsync(s => s.Input == text);
        if (existingSummary != null)
        {
            var textSummaryObject = new TextSummaryResponse
            {
                SummaryText = existingSummary.Output
            };
            _cache.Set(cacheKey, textSummaryObject, TimeSpan.FromHours(24));
            return textSummaryObject;
        }

        var summary = await SummarizeTextViaFastApi(text);
        _cache.Set(cacheKey, summary, TimeSpan.FromHours(24));
        return summary;
    }

    private async Task<TextSummaryResponse> SummarizeTextViaFastApi(string text)
    {
        try
        {
            var body = new StringContent(JsonSerializer.Serialize(text), Encoding.UTF8, "application/json");
            var response = await _httpClient.PostAsync($"{_apiUrl}/summarize/text", body);
            response.EnsureSuccessStatusCode();

            var responseObject = JsonSerializer.Deserialize<TextSummaryResponse>(await response.Content.ReadAsStringAsync());
            return responseObject ?? throw new InvalidOperationException("Response object is null.");
        }
        catch (HttpRequestException ex)
        {
            _logger.LogError(ex, "Error calling FastAPI.");
            throw;
        }
    }

    private async Task<ArticleSummaryResponse> SummarizeArticleViaFastApi(string url)
    {
        try
        {
            var body = new StringContent(JsonSerializer.Serialize(url), Encoding.UTF8, "application/json");
            var response = await _httpClient.PostAsync($"{_apiUrl}/summarize/article", body);
            response.EnsureSuccessStatusCode();

            var responseObject = JsonSerializer.Deserialize<ArticleSummaryResponse>(await response.Content.ReadAsStringAsync());
            return responseObject ?? throw new InvalidOperationException("Response object is null.");
        }
        catch (HttpRequestException ex)
        {
            _logger.LogError(ex, "Error calling FastAPI.");
            throw;
        }
    }

    private static string GenerateCacheKey(string input)
    {
        return $"summary:{input.GetHashCode()}";
    }

    public class TextSummaryResponse
    {
        [JsonPropertyName("summary_text")]
        public string SummaryText { get; set; } = string.Empty;
    }

    public class ArticleSummaryResponse
    {
        [JsonPropertyName("article_text")]
        public string ArticleText { get; set; } = string.Empty;

        [JsonPropertyName("summary_text")]
        public string SummaryText { get; set; } = string.Empty;

        [JsonPropertyName("title")]
        public string Title { get; set; } = string.Empty;
    }
}
