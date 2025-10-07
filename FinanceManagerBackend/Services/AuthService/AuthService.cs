using FinanceManagerBackend.Data;
using FinanceManagerBackend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace FinanceManagerBackend.Services.AuthService
{
    public class AuthService : IAuthService
    {
        private readonly ApplicationContext _db;
        private readonly IPasswordHasher<User> _hasher;

        public AuthService(ApplicationContext db, IPasswordHasher<User> hasher)
        {
            _db = db;
            _hasher = hasher;
        }

        public async Task<(bool Success, string? Token, string? Message)> LoginAsync(string email, string password)
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null)
                return (false, null, "Пользователь не найден");

            var result = _hasher.VerifyHashedPassword(user, user.Password, password);
            if (result == PasswordVerificationResult.Failed)
                return (false, null, "Неверный пароль");

            var claims = new List<Claim> { new Claim(ClaimTypes.NameIdentifier, user.Id) };
            var jwt = new JwtSecurityToken(
                issuer: AuthOptions.ISSUER,
                audience: AuthOptions.AUDIENCE,
                claims: claims,
                expires: DateTime.UtcNow.AddHours(12),
                signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256)
            );

            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
            return (true, encodedJwt, null);
        }

        public async Task<(bool Success, string? Message)> RegisterAsync(User newUser)
        {
            var existing = await _db.Users.FirstOrDefaultAsync(u => u.Email == newUser.Email);
            if (existing != null)
                return (false, "Пользователь уже существует");

            newUser.Id = Guid.NewGuid().ToString();
            newUser.Password = _hasher.HashPassword(newUser, newUser.Password);

            await _db.Users.AddAsync(newUser);
            await _db.SaveChangesAsync();

            return (true, null);
        }
    }
}
