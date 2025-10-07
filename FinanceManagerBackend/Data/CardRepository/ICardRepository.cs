using FinanceManagerBackend.Models;

namespace FinanceManagerBackend.Data.CardRepository
{
    public interface ICardRepository
    {
        Task<List<Card>> GetUserCardsAsync(string userId);
        Task<Card?> GetCardByIdAsync(string cardId);
        Task<Card> AddCardAsync(Card card);
        Task<Card> UpdateCardAsync(Card card);
        Task DeleteCardAsync(Card card);
    }
}
