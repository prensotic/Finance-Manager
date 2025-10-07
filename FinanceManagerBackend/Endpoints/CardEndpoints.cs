using FinanceManagerBackend.Models;
using FinanceManagerBackend.Services.CardService;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace FinanceManagerBackend.Endpoints
{
    public static class CardEndpoints
    {
        public static void MapCardEndpoints(this WebApplication app)
        {
            app.MapGet("/api/cards", [Authorize] async (ICardService service, HttpContext context) =>
            {
                var userId = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId)) return Results.Unauthorized();

                var cards = await service.GetUserCardsAsync(userId);
                return cards.Any() ? Results.Ok(cards) : Results.NotFound();
            });

            app.MapGet("/api/cards/{cardId}", [Authorize] async (string cardId, ICardService service, HttpContext context) =>
            {
                var userId = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId)) return Results.Unauthorized();

                var card = await service.GetCardAsync(userId, cardId);
                return card == null ? Results.NotFound() : Results.Ok(card);
            });

            app.MapPost("/api/cards", [Authorize] async (Card card, ICardService service, HttpContext context) =>
            {
                var userId = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId)) return Results.Unauthorized();

                var newCard = await service.CreateCardAsync(userId, card);
                return Results.Created($"/api/cards/{newCard.Id}", newCard);
            });

            app.MapPut("/api/cards/{cardId}", [Authorize] async (string cardId, Card card, ICardService service, HttpContext context) =>
            {
                var userId = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId)) return Results.Unauthorized();

                var updated = await service.UpdateCardAsync(userId, cardId, card);
                return Results.Ok(updated);
            });

            app.MapDelete("/api/cards/{cardId}", [Authorize] async (string cardId, ICardService service, HttpContext context) =>
            {
                var userId = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId)) return Results.Unauthorized();

                var deleted = await service.DeleteCardAsync(userId, cardId);
                return deleted == null ? Results.NotFound() : Results.Ok(deleted);
            });
        }
    }
}
