using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.Services;

var builder = WebApplication.CreateBuilder(args);

var postgresConnectionString = Environment.GetEnvironmentVariable("POSTGRES_CONNECTION_STRING");

if (string.IsNullOrEmpty(postgresConnectionString))
{
    throw new InvalidOperationException("POSTGRES_CONNECTION_STRING");
}

builder.Services.AddDbContext<SummarizerDbContext>(options =>
{
    options.UseNpgsql(postgresConnectionString);
});

builder.Services.AddMemoryCache();

builder.Services.AddIdentityApiEndpoints<User>()
    .AddEntityFrameworkStores<SummarizerDbContext>()
    .AddDefaultTokenProviders();

builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.HttpOnly = true;
    options.Cookie.SecurePolicy = CookieSecurePolicy.None;
    options.Cookie.SameSite = SameSiteMode.Lax;
    options.SlidingExpiration = true;
    options.ExpireTimeSpan = TimeSpan.FromDays(30);
});

builder.Services.AddAuthentication();
builder.Services.AddAuthorization();
builder.Services.AddHttpClient<SummaryService>();
builder.Services.AddScoped<SummaryService>();
builder.Services.AddScoped<UserAccessService>();
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// builder.Services.AddCors(options =>
// {
//     options.AddPolicy("AllowAll", builder =>
//     {
//         builder.AllowAnyOrigin() // Replace with your Next.js domain
//             .AllowAnyMethod()
//             .AllowAnyHeader()
//             .AllowCredentials()
//             .SetIsOriginAllowed(_ => true);
//     });
// });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.Use(async (context, next) =>
    {
        Console.WriteLine("\n--- Request Details ---");
        Console.WriteLine($"Path: {context.Request.Path}");
        Console.WriteLine($"Method: {context.Request.Method}");

        Console.WriteLine("\n--- Authentication Details ---");
        Console.WriteLine($"Auth Type: {context.User?.Identity?.AuthenticationType}");
        Console.WriteLine($"Is Authenticated: {context.User?.Identity?.IsAuthenticated}");
        Console.WriteLine($"User Name: {context.User?.Identity?.Name}");

        Console.WriteLine("\n--- Cookies ---");
        foreach (var cookie in context.Request.Cookies)
        {
            Console.WriteLine($"Cookie: {cookie.Key} = {cookie.Value.Substring(0, Math.Min(cookie.Value.Length, 20))}...");
        }

        Console.WriteLine("\n--- Headers ---");
        foreach (var header in context.Request.Headers)
        {
            Console.WriteLine($"Header: {header.Key} = {header.Value}");
        }

        await next();
    });
}
// app.UseCors("AllowAll"); // Ensure CORS is used before authentication

// app.UseHttpsRedirection();

app.MapIdentityApi<User>();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
