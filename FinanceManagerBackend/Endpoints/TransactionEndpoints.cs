using FinanceManagerBackend.Models;
using FinanceManagerBackend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace FinanceManagerBackend.Endpoints
{
    public static class TransactionEndpoints
    {
        public static void MapTransactionEndpoints(this WebApplication app)
        {
            app.MapGet("/api/cards/{cardId}/transactions", [Authorize] async (string cardId, ITransactionService service, HttpContext context) =>
            {
                var userId = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (userId is null) return Results.Unauthorized();

                var transactions = await service.GetTransactionsAsync(userId, cardId);
                return Results.Ok(transactions);
            });

            app.MapGet("/api/cards/{cardId}/transactions/{transactionId}", [Authorize] async (string cardId, string transactionId, ITransactionService service, HttpContext context) =>
            {
                var userId = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (userId is null) return Results.Unauthorized();

                var transaction = await service.GetTransactionAsync(userId, cardId, transactionId);
                return transaction is null ? Results.NotFound() : Results.Ok(transaction);
            });

            app.MapPost("/api/cards/{cardId}/transactions", [Authorize] async (string cardId, Transaction transaction, ITransactionService service, HttpContext context) =>
            {
                var userId = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (userId is null) return Results.Unauthorized();

                var created = await service.CreateTransactionAsync(userId, cardId, transaction);
                return Results.Created($"/api/cards/{cardId}/transactions/{created.Id}", created);
            });

            app.MapPut("/api/cards/{cardId}/transactions/{transactionId}", [Authorize] async (string cardId, string transactionId, Transaction transaction, ITransactionService service, HttpContext context) =>
            {
                var userId = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (userId is null) return Results.Unauthorized();

                var updated = await service.UpdateTransactionAsync(userId, cardId, transactionId, transaction);
                return updated is null ? Results.NotFound() : Results.Ok(updated);
            });

            app.MapDelete("/api/cards/{cardId}/transactions/{transactionId}", [Authorize] async (string cardId, string transactionId, ITransactionService service, HttpContext context) =>
            {
                var userId = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (userId is null) return Results.Unauthorized();

                var deleted = await service.DeleteTransactionAsync(userId, cardId, transactionId);
                return deleted is null ? Results.NotFound() : Results.Ok(deleted);
            });

            app.MapGet("/api/cards/{cardId}/transactions/category/{category}", [Authorize] async (string cardId, string category, ITransactionService service, HttpContext context) =>
            {
                var userId = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (userId is null) return Results.Unauthorized();

                var transactions = await service.GetByCategoryAsync(userId, cardId, category);
                return Results.Ok(transactions);
            });

            app.MapGet("/api/cards/{cardId}/transactions/amount/{type}", [Authorize] async (string cardId, string type, ITransactionService service, HttpContext context) =>
            {
                var userId = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (userId is null) return Results.Unauthorized();

                var transactions = await service.GetByAmountTypeAsync(userId, cardId, type);
                return Results.Ok(transactions);
            });
        }
    }
}
