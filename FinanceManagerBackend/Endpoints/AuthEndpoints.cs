using FinanceManagerBackend.Models;
using FinanceManagerBackend.Services.AuthService;
using Microsoft.AspNetCore.Mvc;

namespace FinanceManagerBackend.Endpoints
{
    public static class AuthEndpoints
    {
        public record LoginRequest(string Email, string Password);

        public static void MapAuthEndpoints(this WebApplication app)
        {
            app.MapPost("/api/login", async ([FromBody] LoginRequest request, IAuthService authService) =>
            {
                var result = await authService.LoginAsync(request.Email, request.Password);

                if (!result.Success)
                    return Results.BadRequest(result.Message);

                return Results.Json(new
                {
                    access_token = result.Token,
                    message = "Вход выполнен успешно"
                });
            });

            app.MapPost("/api/register", async ([FromBody] User user, IAuthService authService) =>
            {
                var result = await authService.RegisterAsync(user);

                if (!result.Success)
                    return Results.BadRequest(result.Message);

                return Results.Json(new { message = "Регистрация прошла успешно", email = user.Email });
            });
        }
    }
}
