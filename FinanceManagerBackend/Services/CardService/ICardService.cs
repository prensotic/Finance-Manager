using FinanceManagerBackend.Models;

namespace FinanceManagerBackend.Services.CardService
{
    public interface ICardService
    {
        Task<List<Card>> GetUserCardsAsync(string userId);
        Task<Card?> GetCardAsync(string userId, string cardId);
        Task<Card> CreateCardAsync(string userId, Card card);
        Task<Card> UpdateCardAsync(string userId, string cardId, Card card);
        Task<Card?> DeleteCardAsync(string userId, string cardId);
    }
}
