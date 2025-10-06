namespace FinanceManagerBackend.Models
{
    public class Transaction
    {
        public string Id { get; set; } = string.Empty;
        public string CardId { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public decimal Amount { get; set; } 
        public DateTime Date { get; set; }
    }
}
