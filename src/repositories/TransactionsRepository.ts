import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {

    let sumIncome = 0;
    let sumOutcome = 0;
    const total = 0;

    if (this.transactions.length > 0) {
      const transactionsIncome = this.transactions.filter(a => a.type === 'income');
      const transactionsOutcome = this.transactions.filter(a => a.type === 'outcome');

      if (transactionsIncome.length > 0) {       
        sumIncome =  transactionsIncome.map(a=>a.value).reduce(function (total, next) { return total + next; });
      }

      if (transactionsOutcome.length > 0) {
        sumOutcome = transactionsOutcome.map(a=>a.value).reduce(function (total, next) { return total + next; });
      }
    }

    return { income: sumIncome, outcome: sumOutcome, total: sumIncome - sumOutcome };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
