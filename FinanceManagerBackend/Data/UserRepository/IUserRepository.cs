using FinanceManagerBackend.Models;

namespace FinanceManagerBackend.Data.UserRepository
{
    public interface IUserRepository
    {
        Task<User?> GetByIdAsync(string id);
        Task<User?> GetByEmailAsync(string email);
        Task<User> UpdateAsync(User user);
    }
}
