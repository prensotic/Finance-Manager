using FinanceManagerBackend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;


namespace FinanceManagerBackend.Modules
{
    public static class AuthModule
    {
        public record LoginRequest(string Email, string Password);

        public static void AuthEndpoints(this WebApplication app)
        {
            app.MapPost("/api/login", async ([FromBody] LoginRequest request, [FromServices] ApplicationContext db, IPasswordHasher<User> hasher) =>
            {
                //    List<User> users = new List<User>
                //{ new User{ Id = Guid.NewGuid().ToString(), FirstName = "Илья", LastName = "Логинов", MiddleName = "Васильевич", PhoneNumber = "89877116595", Email = "ilya@mail.ru", Password = hasher.HashPassword(null!, "12345") } };

                var allUsers = await db.Users.ToListAsync();
                Console.WriteLine($"Total users in DB: {allUsers.Count}");
                foreach (var u in allUsers)
                {
                    Console.WriteLine($"User: {u.Email}, ID: {u.Id}");
                }

                var user = await db.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
                if (user == null)
                    return Results.NotFound("Пользователь не найден");

                if (hasher.VerifyHashedPassword(user, user.Password, request.Password) == PasswordVerificationResult.Failed)
                    return Results.Unauthorized();

                var claims = new List<Claim> { new Claim(ClaimTypes.NameIdentifier, user.Id) };
                var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    claims: claims,
                    expires: DateTime.UtcNow.AddHours(12),
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256)
                );

                var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

                return Results.Json(new
                {
                    access_token = encodedJwt,
                    userId = user.Id
                });
            });

            app.MapPost("/api/register", async ([FromBody] User user, ApplicationContext db, IPasswordHasher<User> hasher) =>
            {
                if (user == null)
                    return Results.BadRequest("Некорректные данные");

                user.Id = Guid.NewGuid().ToString();
                user.Password = hasher.HashPassword(user, user.Password);

                await db.Users.AddAsync(user);
                await db.SaveChangesAsync();

                return Results.Json(new { userId = user.Id, email = user.Email });
            });

        }
    }
}
