using FinanceManagerBackend.Data.CardRepository;
using FinanceManagerBackend.Data.TransactionRepository;
using FinanceManagerBackend.Models;
using FinanceManagerBackend.Services.Interfaces;

namespace FinanceManagerBackend.Services.Implementations
{
    public class TransactionService : ITransactionService
    {
        private readonly ITransactionRepository _transactions;
        private readonly ICardRepository _cards;

        public TransactionService(ITransactionRepository transactions, ICardRepository cards)
        {
            _transactions = transactions;
            _cards = cards;
        }

        public async Task<List<Transaction>> GetTransactionsAsync(string userId, string cardId)
        {
            var card = await _cards.GetCardByIdAsync(cardId);
            if (card == null || card.UserId != userId) throw new UnauthorizedAccessException();
            return await _transactions.GetByCardIdAsync(cardId);
        }

        public async Task<Transaction?> GetTransactionAsync(string userId, string cardId, string transactionId)
        {
            var card = await _cards.GetCardByIdAsync(cardId);
            if (card == null || card.UserId != userId) return null;

            var transaction = await _transactions.GetByIdAsync(transactionId);
            return transaction != null && transaction.CardId == cardId ? transaction : null;
        }

        public async Task<Transaction> CreateTransactionAsync(string userId, string cardId, Transaction transaction)
        {
            var card = await _cards.GetCardByIdAsync(cardId);
            if (card == null || card.UserId != userId) throw new UnauthorizedAccessException();

            transaction.Id = Guid.NewGuid().ToString();
            transaction.CardId = cardId;
            transaction.Date = DateTime.UtcNow;

            card.Balance += transaction.Amount;
            await _cards.UpdateCardAsync(card);

            return await _transactions.AddAsync(transaction);
        }

        public async Task<Transaction?> UpdateTransactionAsync(string userId, string cardId, string transactionId, Transaction data)
        {
            var card = await _cards.GetCardByIdAsync(cardId);
            if (card == null || card.UserId != userId) return null;

            var transaction = await _transactions.GetByIdAsync(transactionId);
            if (transaction == null || transaction.CardId != cardId) return null;

            card.Balance -= transaction.Amount;
            transaction.Amount = data.Amount;
            transaction.Category = data.Category;
            transaction.Date = DateTime.UtcNow;
            card.Balance += transaction.Amount;

            await _cards.UpdateCardAsync(card);
            return await _transactions.UpdateAsync(transaction);
        }

        public async Task<Transaction?> DeleteTransactionAsync(string userId, string cardId, string transactionId)
        {
            var card = await _cards.GetCardByIdAsync(cardId);
            if (card == null || card.UserId != userId) return null;

            var transaction = await _transactions.GetByIdAsync(transactionId);
            if (transaction == null || transaction.CardId != cardId) return null;

            card.Balance -= transaction.Amount;
            await _cards.UpdateCardAsync(card);
            await _transactions.DeleteAsync(transaction);
            return transaction;
        }

        public async Task<List<Transaction>> GetByCategoryAsync(string userId, string cardId, string category)
        {
            var card = await _cards.GetCardByIdAsync(cardId);
            if (card == null || card.UserId != userId) throw new UnauthorizedAccessException();
            return await _transactions.GetByCategoryAsync(cardId, category);
        }

        public async Task<List<Transaction>> GetByAmountTypeAsync(string userId, string cardId, string type)
        {
            var card = await _cards.GetCardByIdAsync(cardId);
            if (card == null || card.UserId != userId) throw new UnauthorizedAccessException();
            return await _transactions.GetByAmountTypeAsync(cardId, type);
        }
    }
}
