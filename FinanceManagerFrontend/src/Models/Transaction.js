export class Transaction{
  constructor(id, cardId, category, amount, date){
    this.Id = id;
    this.CardId = cardId;
    this.Category = category;
    this.Amount = amount;
    this.Date = date;
  }
}