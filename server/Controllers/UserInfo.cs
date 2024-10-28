using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace server.Controllers;

[ApiController]
[Route("[controller]")]
[Produces("application/json")]
[Authorize]
public class UserInfoController(ILogger<UserInfoController> logger) : ControllerBase
{
    private readonly ILogger<UserInfoController> _logger = logger;

    [HttpGet(Name = "GetUserInfo")]
    public IActionResult GetUserInfo()
    {
        var username = User.Identity?.Name;
        return Ok(new { username });
    }
}
