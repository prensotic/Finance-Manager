using FinanceManagerBackend.Models;

namespace FinanceManagerBackend.Services.UserService
{
    public interface IUserService
    {
        Task<User?> GetCurrentUserAsync(string userId);
        Task<User?> UpdateUserAsync(string userId, User updatedUser);
    }
}
