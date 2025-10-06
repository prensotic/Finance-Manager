using FinanceManagerBackend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace FinanceManagerBackend.Modules
{
    public static class CardModule
    {
        public static void CardEndpoints(this WebApplication app)
        {
            app.MapGet("/api/cards", [Authorize] async ([FromServices] ApplicationContext db, HttpContext context) =>
            {
                var currentUserId = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(currentUserId)) return Results.Unauthorized();

                List<Card> cards = await db.Cards.Where(c => c.UserId == currentUserId).ToListAsync();

                if (!cards.Any()) return Results.NotFound();

                return Results.Json(cards);
            });

            app.MapGet("/api/cards/{cardId}", [Authorize] async (string cardId, [FromServices] ApplicationContext db, HttpContext context) =>
            {
                var currentUserId = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(currentUserId)) return Results.Unauthorized();

                var card = await db.Cards.FirstOrDefaultAsync(c => c.Id == cardId);

                if (card == null) return Results.NotFound();
                if (card.UserId != currentUserId) return Results.Forbid();

                return Results.Json(card);
            });

            app.MapPost("/api/cards", [Authorize] async (Card card, [FromServices] ApplicationContext db, HttpContext context) =>
            {
                var currentUserId = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(currentUserId)) return Results.Unauthorized();

                if (card == null) return Results.BadRequest();
                if (card.UserId != currentUserId) return Results.Forbid();

                card.Id = Guid.NewGuid().ToString();
                card.UserId = currentUserId;
                await db.Cards.AddAsync(card);
                await db.SaveChangesAsync();
                return Results.Json(card);
            });

            app.MapPut("/api/cards/{cardId}", [Authorize] async (string cardId, Card cardData, [FromServices] ApplicationContext db, HttpContext context) =>
            {
                var currentUserId = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(currentUserId)) return Results.Unauthorized();

                var card = await db.Cards.FirstOrDefaultAsync(c => c.Id == cardId);

                if (card == null) return Results.NotFound();
                if (card.UserId != currentUserId) return Results.Forbid();

                card.Number = cardData.Number;
                card.TypeCard = cardData.TypeCard;
                await db.SaveChangesAsync();

                return Results.Json(card);
            });

            app.MapDelete("/api/cards/{cardId}", [Authorize] async (string cardId, [FromServices] ApplicationContext db, HttpContext context) =>
            {
                var currentUserId = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(currentUserId)) return Results.Unauthorized();

                Card? card = await db.Cards.FirstOrDefaultAsync(c => c.Id == cardId);

                if (card == null) return Results.NotFound();
                if (card.UserId != currentUserId) return Results.Forbid();

                db.Cards.Remove(card);
                await db.SaveChangesAsync();
                return Results.Json(card);
            });
        }
    }
}
