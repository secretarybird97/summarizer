using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace server.Services;

public class SummarizationService(HttpClient httpClient)
{
    private readonly HttpClient _httpClient = httpClient;
    private readonly string _apiUrl = Environment.GetEnvironmentVariable("LLM_API_URL") ?? throw new ArgumentNullException("LLM_API_URL environment variable not set.");

    public async Task<string> SummarizeArticle(string url)
    {
        var body = new StringContent(JsonSerializer.Serialize(url), Encoding.UTF8, "application/json");
        var response = await _httpClient.PostAsync($"{_apiUrl}/summarize/article", body);
        response.EnsureSuccessStatusCode();

        var responseObject = JsonSerializer.Deserialize<SummaryResponse>(await response.Content.ReadAsStringAsync());
        return responseObject?.SummaryText ?? string.Empty;
    }

    public async Task<string> SummarizeText(string text)
    {
        var body = new StringContent(JsonSerializer.Serialize(text), Encoding.UTF8, "application/json");
        var response = await _httpClient.PostAsync($"{_apiUrl}/summarize/text", body);
        response.EnsureSuccessStatusCode();

        var responseObject = JsonSerializer.Deserialize<SummaryResponse>(await response.Content.ReadAsStringAsync());
        return responseObject?.SummaryText ?? string.Empty;
    }

    private class SummaryResponse
    {
        [JsonPropertyName("summary_text")]
        public string SummaryText { get; set; } = string.Empty;
    }
}
