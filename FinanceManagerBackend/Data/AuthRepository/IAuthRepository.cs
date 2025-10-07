using FinanceManagerBackend.Models;

namespace FinanceManagerBackend.Data.AuthRepository
{
    public interface IAuthRepository
    {
        Task<User?> GetUserByEmailAsync(string email);
        Task AddUserAsync(User user);
        Task SaveChangesAsync();
    }
}
