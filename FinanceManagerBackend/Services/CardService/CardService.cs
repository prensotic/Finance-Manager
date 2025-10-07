using FinanceManagerBackend.Data.CardRepository;
using FinanceManagerBackend.Models;

namespace FinanceManagerBackend.Services.CardService
{
    public class CardService : ICardService
    {
        private readonly ICardRepository _repo;

        public CardService(ICardRepository repo)
        {
            _repo = repo;
        }

        public async Task<List<Card>> GetUserCardsAsync(string userId)
        {
            return await _repo.GetUserCardsAsync(userId);
        }

        public async Task<Card?> GetCardAsync(string userId, string cardId)
        {
            var card = await _repo.GetCardByIdAsync(cardId);
            return card?.UserId == userId ? card : null;
        }

        public async Task<Card> CreateCardAsync(string userId, Card card)
        {
            card.Id = Guid.NewGuid().ToString();
            card.UserId = userId;
            return await _repo.AddCardAsync(card);
        }

        public async Task<Card> UpdateCardAsync(string userId, string cardId, Card updated)
        {
            var card = await _repo.GetCardByIdAsync(cardId);
            if (card == null || card.UserId != userId)
                throw new UnauthorizedAccessException();

            card.TypeCard = updated.TypeCard;
            card.Number = updated.Number;

            return await _repo.UpdateCardAsync(card);
        }

        public async Task<Card?> DeleteCardAsync(string userId, string cardId)
        {
            var card = await _repo.GetCardByIdAsync(cardId);
            if (card == null || card.UserId != userId) return null;

            await _repo.DeleteCardAsync(card);
            return card;
        }
    }
}
