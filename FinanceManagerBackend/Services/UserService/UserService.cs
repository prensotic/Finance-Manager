using FinanceManagerBackend.Data.UserRepository;
using FinanceManagerBackend.Models;

namespace FinanceManagerBackend.Services.UserService
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<User?> GetCurrentUserAsync(string userId)
        {
            if (string.IsNullOrEmpty(userId))
                return null;

            return await _userRepository.GetByIdAsync(userId);
        }

        public async Task<User?> UpdateUserAsync(string userId, User updatedUser)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null) return null;

            user.FirstName = updatedUser.FirstName;
            user.LastName = updatedUser.LastName;
            user.MiddleName = updatedUser.MiddleName;
            user.PhoneNumber = updatedUser.PhoneNumber;
            user.Email = updatedUser.Email;

            return await _userRepository.UpdateAsync(user);
        }
    }
}
