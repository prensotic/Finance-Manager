using FinanceManagerBackend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace FinanceManagerBackend.Modules
{
    public static class UserModule
    {
        public static void UserEndpoints(this WebApplication app)
        {
            app.MapGet("/api/user/me", [Authorize] async ([FromServices] ApplicationContext db, HttpContext context) =>
            {
                var currentUserId = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(currentUserId)) return Results.Unauthorized();

                User? user = await db.Users.FirstOrDefaultAsync(u => u.Id == currentUserId);
                if (user == null) return Results.NotFound();

                return Results.Json(user);
            });

            app.MapPut("/api/user/me", [Authorize] async (User userData, [FromServices] ApplicationContext db, HttpContext context) =>
            {
                var currentUserId = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                
                Console.WriteLine(currentUserId);

                if (string.IsNullOrEmpty(currentUserId)) return Results.Unauthorized();

                

                User? user = await db.Users.FirstOrDefaultAsync(u => u.Id == currentUserId);

                if (user ==null) return Results.NotFound();

                user.FirstName = userData.FirstName;
                user.LastName = userData.LastName;
                user.MiddleName = userData.MiddleName;

                await db.SaveChangesAsync();
                return Results.Json(user);
            });
        }
    }
}