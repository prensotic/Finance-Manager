using FinanceManagerBackend.Models;

namespace FinanceManagerBackend.Data.TransactionRepository
{
    public interface ITransactionRepository
    {
        Task<List<Transaction>> GetByCardIdAsync(string cardId);
        Task<Transaction?> GetByIdAsync(string transactionId);
        Task<List<Transaction>> GetByCategoryAsync(string cardId, string category);
        Task<List<Transaction>> GetByAmountTypeAsync(string cardId, string amountType);
        Task<Transaction> AddAsync(Transaction transaction);
        Task<Transaction> UpdateAsync(Transaction transaction);
        Task DeleteAsync(Transaction transaction);
    }
}