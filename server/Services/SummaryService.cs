using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using StackExchange.Redis;

namespace server.Services;

public class SummaryService(HttpClient httpClient, IConnectionMultiplexer redis)
{
    private readonly HttpClient _httpClient = httpClient;
    private readonly string _apiUrl = Environment.GetEnvironmentVariable("LLM_API_URL") ?? throw new ArgumentNullException("LLM_API_URL environment variable not set.");
    private readonly IDatabase _cache = redis.GetDatabase();

    public async Task<ArticleSummaryResponse> GetArticleSummaryAsync(string url)
    {
        string cacheKey = GenerateCacheKey(url);
        var cachedSummary = await _cache.StringGetAsync(cacheKey);

        if (!cachedSummary.IsNullOrEmpty)
        {
            return JsonSerializer.Deserialize<ArticleSummaryResponse>(cachedSummary!)!;
        }

        var summary = await SummarizeArticleViaFastApi(url);
        await _cache.StringSetAsync(cacheKey, JsonSerializer.Serialize(summary), TimeSpan.FromHours(24));
        return summary;
    }

    public async Task<TextSummaryResponse> GetTextSummaryAsync(string text)
    {
        string cacheKey = GenerateCacheKey(text);
        var cachedSummary = await _cache.StringGetAsync(cacheKey);

        if (!cachedSummary.IsNullOrEmpty)
        {
            return JsonSerializer.Deserialize<TextSummaryResponse>(cachedSummary!)!;
        }

        var summary = await SummarizeTextViaFastApi(text);
        await _cache.StringSetAsync(cacheKey, JsonSerializer.Serialize(summary), TimeSpan.FromHours(1));
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
            Console.WriteLine($"Error calling FastAPI: {ex.Message}");
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
            Console.WriteLine($"Error calling FastAPI: {ex.Message}");
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
    }
}
