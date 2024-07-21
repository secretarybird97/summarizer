using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using server.Context;
using server.Services;

var builder = WebApplication.CreateBuilder(args);

var connectionStringKey = "POSTGRES_CONNECTION_STRING";
var connectionString = Environment.GetEnvironmentVariable(connectionStringKey);

if (string.IsNullOrEmpty(connectionString))
{
    throw new InvalidOperationException($"Connection string '{connectionStringKey}' not found.");
}

builder.Services.AddDbContext<SummarizerDbContext>(options => options.UseNpgsql(connectionString));
builder.Services.AddHttpClient();
builder.Services.AddScoped<ArticleSummarizationService>();
// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection();

app.MapGet("/users/{userId}/articles", async (SummarizerDbContext dbContext, int userId) =>
{
    var articles = await dbContext.ArticleSummaries
                                   .Where(article => article.UserId == userId)
                                   .ToListAsync();
    return articles.Count != 0 ? Results.Ok(articles) : Results.NotFound($"No articles found for user with ID {userId}.");
})
.WithName("GetArticlesByUserId")
.WithOpenApi();

app.MapPost("/summarize/article", async (ArticleSummarizationService summarizationService, [FromBody] string url) =>
{
    if (string.IsNullOrWhiteSpace(url))
    {
        return Results.BadRequest("Request body is missing or invalid.");
    }

    var summarizedArticle = await summarizationService.GetSummarizedArticleAsync(url);
    return Results.Ok(summarizedArticle);
})
.WithName("SummarizeArticle")
.WithOpenApi();

app.Run();
