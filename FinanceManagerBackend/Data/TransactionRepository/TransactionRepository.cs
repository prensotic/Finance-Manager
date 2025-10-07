using FinanceManagerBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace FinanceManagerBackend.Data.TransactionRepository
{
    public class TransactionRepository : ITransactionRepository
    {
        private readonly ApplicationContext _db;

        public TransactionRepository(ApplicationContext db)
        {
            _db = db;
        }

        public async Task<List<Transaction>> GetByCardIdAsync(string cardId) =>
            await _db.Transactions.Where(t => t.CardId == cardId).ToListAsync();

        public async Task<Transaction?> GetByIdAsync(string transactionId) =>
            await _db.Transactions.FirstOrDefaultAsync(t => t.Id == transactionId);

        public async Task<List<Transaction>> GetByCategoryAsync(string cardId, string category) =>
            await _db.Transactions.Where(t => t.CardId == cardId && t.Category == category).ToListAsync();

        public async Task<List<Transaction>> GetByAmountTypeAsync(string cardId, string amountType)
        {
            return amountType switch
            {
                "Income" => await _db.Transactions.Where(t => t.CardId == cardId && t.Amount > 0).ToListAsync(),
                "Expenses" => await _db.Transactions.Where(t => t.CardId == cardId && t.Amount < 0).ToListAsync(),
                _ => new List<Transaction>()
            };
        }

        public async Task<Transaction> AddAsync(Transaction transaction)
        {
            await _db.Transactions.AddAsync(transaction);
            await _db.SaveChangesAsync();
            return transaction;
        }

        public async Task<Transaction> UpdateAsync(Transaction transaction)
        {
            _db.Transactions.Update(transaction);
            await _db.SaveChangesAsync();
            return transaction;
        }

        public async Task DeleteAsync(Transaction transaction)
        {
            _db.Transactions.Remove(transaction);
            await _db.SaveChangesAsync();
        }
    }
}
