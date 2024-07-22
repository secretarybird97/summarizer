using System.Text;
using Newtonsoft.Json;

namespace server.Services;

public class ArticleSummarizationService(HttpClient httpClient)
{
    private readonly HttpClient _httpClient = httpClient;
    private readonly string _apiUrl = Environment.GetEnvironmentVariable("LLM_API_URL") ?? throw new ArgumentNullException("LLM_API_URL environment variable not set.");

    public async Task<string> SummarizeArticle(string url)
    {
        var body = new StringContent(JsonConvert.SerializeObject(url), Encoding.UTF8, "application/json");
        var response = await _httpClient.PostAsync($"{_apiUrl}/summarize/article", body);
        response.EnsureSuccessStatusCode();

        var responseObject = JsonConvert.DeserializeObject<SummmaryResponse>(await response.Content.ReadAsStringAsync());
        return responseObject?.Summary ?? string.Empty;
    }

    internal class SummmaryResponse
    {
        [JsonProperty("summary_text")]
        public string Summary { get; set; } = string.Empty;
    }
}
