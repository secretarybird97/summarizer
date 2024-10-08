using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var connectionString = Environment.GetEnvironmentVariable("POSTGRES_CONNECTION_STRING");

if (string.IsNullOrEmpty(connectionString))
{
    throw new InvalidOperationException("POSTGRES_CONNECTION_STRING environment variable not set.");
}

builder.Services.AddDbContext<SummarizerDbContext>(options =>
{
    options.UseNpgsql(connectionString);
});
builder.Services.AddIdentityApiEndpoints<User>()
    .AddEntityFrameworkStores<SummarizerDbContext>();
builder.Services.AddAuthorization();

builder.Services.AddHttpClient<SummarizationService>();
builder.Services.AddScoped<SummarizationService>();
builder.Services.AddControllers();
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

app.MapIdentityApi<User>();

app.UseAuthorization();

app.MapControllers();

app.Run();
