using System.Text.Json.Serialization;

namespace server.Models;

public class SuccessDetails
{
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    [JsonPropertyName("data")]
    public DataSchema? Data { get; set; }
}
