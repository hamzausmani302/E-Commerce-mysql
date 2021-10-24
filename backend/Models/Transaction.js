class Transaction {
    constructor(
      Transaction_id =null,
      UserID = null,
      Amount = null,
      OrderID = null,
      PaymentMethod = null,
      TransactionAt = null
    ) {
      this.TRANSACTION_ID= Transaction_id;
      this.USERID = parseInt(UserID);
      this.AMOUNT = parseInt(Amount);
      this.ORDER_ID = parseInt(OrderID);
      this.PAYMENT_METHOD = PaymentMethod;
      this.TRANSACTION_AT = TransactionAt;
    }
    
  }

  module.exports = Transaction;