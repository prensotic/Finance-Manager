using FinanceManagerBackend.Models;

namespace FinanceManagerBackend.Services.AuthService
{
    public interface IAuthService
    {
        Task<(bool Success, string? Token, string? Message)> LoginAsync(string email, string password);
        Task<(bool Success, string? Message)> RegisterAsync(User newUser);
    }
}
