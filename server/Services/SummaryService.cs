using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace server.Services;

public class SummaryService(HttpClient httpClient)
{
    private readonly HttpClient _httpClient = httpClient;
    private readonly string _apiUrl = Environment.GetEnvironmentVariable("LLM_API_URL") ?? throw new ArgumentNullException("LLM_API_URL environment variable not set.");

    public async Task<string> GetArticleSummaryAsync(string url)
    {
        // TODO: Implement Redis cache
        return await SummarizeArticleViaFastApi(url);
    }

    public async Task<string> GetTextSummaryAsync(string text)
    {
        // TODO: Implement Redis cache
        return await SummarizeTextViaFastApi(text);
    }

    private async Task<string> SummarizeTextViaFastApi(string text)
    {
        try
        {
            var body = new StringContent(JsonSerializer.Serialize(text), Encoding.UTF8, "application/json");
            var response = await _httpClient.PostAsync($"{_apiUrl}/summarize/text", body);
            response.EnsureSuccessStatusCode();

            var responseObject = JsonSerializer.Deserialize<SummaryResponse>(await response.Content.ReadAsStringAsync());
            return responseObject?.SummaryText ?? string.Empty;
        }
        catch (HttpRequestException ex)
        {
            Console.WriteLine($"Error calling FastAPI: {ex.Message}");
            throw;
        }

    }

    private async Task<string> SummarizeArticleViaFastApi(string url)
    {
        try
        {
            var body = new StringContent(JsonSerializer.Serialize(url), Encoding.UTF8, "application/json");
            var response = await _httpClient.PostAsync($"{_apiUrl}/summarize/article", body);
            response.EnsureSuccessStatusCode();

            var responseObject = JsonSerializer.Deserialize<SummaryResponse>(await response.Content.ReadAsStringAsync());
            return responseObject?.SummaryText ?? string.Empty;
        }
        catch (HttpRequestException ex)
        {
            Console.WriteLine($"Error calling FastAPI: {ex.Message}");
            throw;
        }

    }

    private string GenerateCacheKey(string text)
    {
        return $"summary:{text.GetHashCode()}";
    }

    private class SummaryResponse
    {
        [JsonPropertyName("summary_text")]
        public string SummaryText { get; set; } = string.Empty;
    }
}
