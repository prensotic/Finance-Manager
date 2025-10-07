using FinanceManagerBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace FinanceManagerBackend.Data.CardRepository
{
    public class CardRepository : ICardRepository
    {
        private readonly ApplicationContext _db;

        public CardRepository(ApplicationContext db)
        {
            _db = db;
        }

        public async Task<List<Card>> GetUserCardsAsync(string userId) =>
            await _db.Cards.Where(c => c.UserId == userId).ToListAsync();

        public async Task<Card?> GetCardByIdAsync(string cardId) =>
            await _db.Cards.FirstOrDefaultAsync(c => c.Id == cardId);

        public async Task<Card> AddCardAsync(Card card)
        {
            await _db.Cards.AddAsync(card);
            await _db.SaveChangesAsync();
            return card;
        }

        public async Task<Card> UpdateCardAsync(Card card)
        {
            _db.Cards.Update(card);
            await _db.SaveChangesAsync();
            return card;
        }

        public async Task DeleteCardAsync(Card card)
        {
            _db.Cards.Remove(card);
            await _db.SaveChangesAsync();
        }
    }
}
