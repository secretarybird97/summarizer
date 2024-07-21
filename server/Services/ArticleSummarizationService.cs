using System.Text;
using Newtonsoft.Json;

namespace server.Services
{
    public class ArticleSummarizationService(HttpClient httpClient)
    {
        private readonly HttpClient _httpClient = httpClient;
        private readonly string _fastApiBaseUrl = Environment.GetEnvironmentVariable("LLM_API_URL") ?? throw new Exception("FAST_API_BASE_URL environment variable is not set.");

        public async Task<object?> GetSummarizedArticleAsync(string url)
        {
            var content = new StringContent(JsonConvert.SerializeObject(url), Encoding.UTF8, "application/json");
            var response = await _httpClient.PostAsync($"{_fastApiBaseUrl}/summarize/article", content);
            if (response.IsSuccessStatusCode)
            {
                var responseContent = await response.Content.ReadAsStringAsync();
                // Deserialize the JSON response into a strongly typed object
                var responseObject = JsonConvert.DeserializeObject<SummaryResponse>(responseContent);
                // Return the object directly, letting ASP.NET handle the serialization
                return responseObject;
            }
            else
            {
                // Handle the error or return a default message
                return new { error = "Could not summarize the article." };
            }
        }
    }

    internal class SummaryResponse
    {
        public string Summary { get; set; }
    }
};
