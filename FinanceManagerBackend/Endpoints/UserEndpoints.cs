using FinanceManagerBackend.Models;
using FinanceManagerBackend.Services.UserService;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace FinanceManagerBackend.Endpoints
{
    public static class UserEndpoints
    {
        public static void MapUserEndpoints(this WebApplication app)
        {
            app.MapGet("/api/user/me", [Authorize] async (IUserService service, HttpContext context) =>
            {
                var userId = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId)) return Results.Unauthorized();

                var user = await service.GetCurrentUserAsync(userId);
                return user is null ? Results.NotFound() : Results.Ok(user);
            });

            app.MapPut("/api/user/me", [Authorize] async (User userData, IUserService service, HttpContext context) =>
            {
                var userId = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId)) return Results.Unauthorized();

                var updatedUser = await service.UpdateUserAsync(userId, userData);
                return updatedUser is null ? Results.NotFound() : Results.Ok(updatedUser);
            });
        }
    }
}
