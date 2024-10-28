using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using server.Models;

namespace server.Controllers;

[ApiController]
[Route("[controller]")]
[Produces("application/json")]
public class LogoutController(SignInManager<User> signInManager, ILogger<LogoutController> logger) : ControllerBase
{
    private readonly ILogger<LogoutController> _logger = logger;
    private readonly SignInManager<User> _signInManager = signInManager;

    [HttpPost(Name = "logout")]

    public async Task<ActionResult> Post([FromBody] object empty)
    {
        _logger.LogInformation("Logging out user: {username}", User.Identity?.Name);
        if (empty != null)
        {
            _logger.LogInformation("Logging out user: {username}", User.Identity?.Name);
            await _signInManager.SignOutAsync();
            return Ok();
        }

        return Unauthorized();
    }
}
