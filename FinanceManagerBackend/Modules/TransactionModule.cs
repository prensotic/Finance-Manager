using FinanceManagerBackend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace FinanceManagerBackend.Modules
{
    public static class TransactionModule
    {
        public static void TransactionEndpoints(this WebApplication app)
        {
            app.MapGet("/api/cards/{cardId}/transactions", [Authorize] async (string cardId, [FromServices] ApplicationContext db, HttpContext context) =>
            {
                var currentUserId = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(currentUserId)) return Results.Unauthorized();

                var card = await db.Cards.FirstOrDefaultAsync(c => c.Id == cardId);

                if (card == null) return Results.NotFound();
                if (card.UserId != currentUserId) return Results.Forbid();

                var transactions = await db.Transactions.Where(t => t.CardId == cardId).ToListAsync();

                return Results.Json(transactions);
            });

            app.MapGet("/api/cards/{cardId}/transactions/{transactionId}", [Authorize] async (string cardId, string transactionId, [FromServices] ApplicationContext db, HttpContext context) =>
            {
                var currentUserId = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(currentUserId)) return Results.Unauthorized();

                var card = await db.Cards.FirstOrDefaultAsync(c => c.Id == cardId);

                if (card == null) return Results.NotFound();
                if (card.UserId != currentUserId) return Results.Forbid();

                Transaction? transaction = await db.Transactions.FirstOrDefaultAsync(t => t.Id == transactionId);

                if (transaction == null) return Results.NotFound();

                return Results.Json(transaction);
            });

            app.MapPost("/api/cards/{cardId}/transactions", [Authorize] async (string cardId, Transaction transaction, [FromServices] ApplicationContext db, HttpContext context) =>
            {
                var currentUserId = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(currentUserId)) return Results.Unauthorized();

                var card = await db.Cards.FirstOrDefaultAsync(c => c.Id == cardId);

                if (card == null) return Results.NotFound();
                if (card.UserId != currentUserId) return Results.Forbid();

                transaction.Id = Guid.NewGuid().ToString();
                transaction.CardId = cardId;

                card.Balance += transaction.Amount;

                await db.Transactions.AddAsync(transaction);
                await db.SaveChangesAsync();
                return Results.Json(transaction);
            });

            app.MapPut("/api/cards/{cardId}/transactions/{transactionId}", [Authorize] async (string cardId, string transactionId, [FromServices] ApplicationContext db, HttpContext context, Transaction transactionData) =>
            {
                var currentUserId = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(currentUserId)) return Results.Unauthorized();

                var card = await db.Cards.FirstOrDefaultAsync(c => c.Id == cardId);

                if (card == null) return Results.NotFound();
                if (card.UserId != currentUserId) return Results.Forbid();

                Transaction? transaction = await db.Transactions.FirstOrDefaultAsync(t => t.Id == transactionId);

                if (transaction == null) return Results.NotFound();
                if (transaction.CardId != cardId) return Results.Forbid();

                transaction.Date = DateTime.Now;
                transaction.Category = transactionData.Category;

                card.Balance -= transaction.Amount;
                transaction.Amount = transactionData.Amount;
                card.Balance += transaction.Amount;

                await db.SaveChangesAsync();
                return Results.Json(transaction);
            });

            app.MapDelete("/api/cards/{cardId}/transactions/{transactionId}", [Authorize] async (string cardId, string transactionId, [FromServices] ApplicationContext db, HttpContext context) =>
            {
                var currentUserId = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(currentUserId)) return Results.Unauthorized();

                var card = await db.Cards.FirstOrDefaultAsync(c => c.Id == cardId);

                if (card == null) return Results.NotFound();
                if (card.UserId != currentUserId) return Results.Forbid();

                Transaction? transaction = await db.Transactions.FirstOrDefaultAsync(t => t.Id == transactionId);

                if (transaction == null) return Results.NotFound();
                if (transaction.CardId != cardId) return Results.Forbid();

                card.Balance -= transaction.Amount;
                db.Transactions.Remove(transaction);
                await db.SaveChangesAsync();
                return Results.Json(transaction);
            });

            app.MapGet("/api/cards/{cardId}/transactions/category/{categoryTransaction}", [Authorize] async (string cardId, string categoryTransaction, [FromServices] ApplicationContext db, HttpContext context) =>
            {
                var currentUserId = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(currentUserId)) return Results.Unauthorized();

                var card = await db.Cards.FirstOrDefaultAsync(c => c.Id == cardId);

                if (card == null) return Results.NotFound();
                if (card.UserId != currentUserId) return Results.Forbid();

                List<Transaction> transactions = await db.Transactions.Where(t => t.CardId == cardId && t.Category == categoryTransaction).ToListAsync();

                return Results.Json(transactions);
            });

            app.MapGet("/api/cards/{cardId}/transactions/amount/{amountType}", [Authorize] async (string cardId, string amountType, [FromServices] ApplicationContext db, HttpContext context) =>
            {
                var currentUserId = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(currentUserId)) return Results.Unauthorized();

                var card = await db.Cards.FirstOrDefaultAsync(c => c.Id == cardId);

                if (card == null) return Results.NotFound();
                if (card.UserId != currentUserId) return Results.Forbid();

                if (amountType == "Income")
                {
                    List<Transaction> transactions = await db.Transactions.Where(t => t.CardId == cardId && t.Amount > 0).ToListAsync();
                    return Results.Json(transactions);
                }
                else if (amountType == "Expenses")
                {
                    List<Transaction> transactions = await db.Transactions.Where(t => t.CardId == cardId && t.Amount < 0).ToListAsync();
                    return Results.Json(transactions);
                }
                else
                {
                    return Results.BadRequest();
                }
            });
        }
    }
}
