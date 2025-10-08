using FinanceManagerBackend.Data;
using FinanceManagerBackend.Data.AuthRepository;
using FinanceManagerBackend.Data.CardRepository;
using FinanceManagerBackend.Data.TransactionRepository;
using FinanceManagerBackend.Data.UserRepository;
using FinanceManagerBackend.Models;
using FinanceManagerBackend.Services.AuthService;
using FinanceManagerBackend.Services.CardService;
using FinanceManagerBackend.Services.Implementations;
using FinanceManagerBackend.Services.Interfaces;
using FinanceManagerBackend.Services.UserService;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace FinanceManagerBackend.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddAppServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<ApplicationContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

            services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();

            services.AddScoped<ITransactionRepository, TransactionRepository>();
            services.AddScoped<ICardRepository, CardRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IAuthRepository, AuthRepository>();

            services.AddScoped<ITransactionService, TransactionService>();
            services.AddScoped<ICardService, CardService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IAuthService, AuthService>();

            return services;
        }

        public static IServiceCollection AddAppCors(this IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("AllowVite", policy =>
                {
                    policy.WithOrigins("http://localhost:5173")
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                });
            });

            return services;
        }
    }
}
