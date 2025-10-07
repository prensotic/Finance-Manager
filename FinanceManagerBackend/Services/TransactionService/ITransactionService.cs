using FinanceManagerBackend.Models;

namespace FinanceManagerBackend.Services.Interfaces
{
    public interface ITransactionService
    {
        Task<List<Transaction>> GetTransactionsAsync(string userId, string cardId);
        Task<Transaction?> GetTransactionAsync(string userId, string cardId, string transactionId);
        Task<Transaction> CreateTransactionAsync(string userId, string cardId, Transaction transaction);
        Task<Transaction?> UpdateTransactionAsync(string userId, string cardId, string transactionId, Transaction data);
        Task<Transaction?> DeleteTransactionAsync(string userId, string cardId, string transactionId);
        Task<List<Transaction>> GetByCategoryAsync(string userId, string cardId, string category);
        Task<List<Transaction>> GetByAmountTypeAsync(string userId, string cardId, string type);
    }
}
