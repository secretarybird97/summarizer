using System.Text.Json.Serialization;

namespace server.Models;

public class DataSchema
{
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    [JsonPropertyName("type")]
    public string? Type { get; set; }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    [JsonPropertyName("id")]
    public int? Id { get; set; }

    [JsonExtensionData]
    public IDictionary<string, object>? Extensions { get; set; }
}
