using FinanceManagerBackend;
using FinanceManagerBackend.Data;
using FinanceManagerBackend.Data.AuthRepository;
using FinanceManagerBackend.Data.CardRepository;
using FinanceManagerBackend.Data.TransactionRepository;
using FinanceManagerBackend.Data.UserRepository;
using FinanceManagerBackend.Endpoints;
using FinanceManagerBackend.Models;
using FinanceManagerBackend.Services.AuthService;
using FinanceManagerBackend.Services.CardService;
using FinanceManagerBackend.Services.Implementations;
using FinanceManagerBackend.Services.Interfaces;
using FinanceManagerBackend.Services.UserService;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();



builder.Services.AddAuthorization();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = AuthOptions.ISSUER,
            ValidateAudience = true,
            ValidAudience = AuthOptions.AUDIENCE,
            ValidateLifetime = true,
            IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(),
            ValidateIssuerSigningKey = true
        };
    });

builder.Services.AddDbContext<ApplicationContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowVite", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddScoped<ITransactionRepository, TransactionRepository>();
builder.Services.AddScoped<ITransactionService, TransactionService>();
builder.Services.AddScoped<ICardRepository, CardRepository>();
builder.Services.AddScoped<ICardService, CardService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IAuthRepository, AuthRepository>();
builder.Services.AddScoped<IAuthService, AuthService>();

var app = builder.Build();

app.UseCors("AllowVite");

app.UseAuthentication();
app.UseAuthorization();

app.MapAuthEndpoints();
app.MapCardEndpoints();
app.MapTransactionEndpoints();
app.MapUserEndpoints();

app.Run();