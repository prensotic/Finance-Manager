using FinanceManagerBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace FinanceManagerBackend.Data.AuthRepository
{
    public class AuthRepository : IAuthRepository
    {
        private readonly ApplicationContext _db;

        public AuthRepository(ApplicationContext db)
        {
            _db = db;
        }

        public async Task<User?> GetUserByEmailAsync(string email)
        {
            return await _db.Users.FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task AddUserAsync(User user)
        {
            await _db.Users.AddAsync(user);
        }

        public async Task SaveChangesAsync()
        {
            await _db.SaveChangesAsync();
        }
    }
}
