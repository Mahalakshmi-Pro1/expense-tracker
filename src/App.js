import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("Food");

  // Save transactions to localStorage
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  // Add transaction
  const addTransaction = (e) => {
    e.preventDefault();

    if (!description || !amount) {
      alert("Please enter description and amount");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      description,
      amount: Number(amount),
      type,
      category,
    };

    setTransactions([newTransaction, ...transactions]);

    setDescription("");
    setAmount("");
  };

  // Delete transaction
  const deleteTransaction = (id) => {
    setTransactions(
      transactions.filter((transaction) => transaction.id !== id)
    );
  };

  // Calculate income
  const income = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  // Calculate expenses
  const expenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  // Calculate balance
  const balance = income - expenses;

  return (
    <div className="app">
      <div className="container">
        <h1>Expense Tracker</h1>
        <p className="subtitle">Manage your income and expenses</p>

        {/* Summary */}
        <div className="summary">
          <div className="card balance">
            <h3>Balance</h3>
            <p>₹{balance.toFixed(2)}</p>
          </div>

          <div className="card income">
            <h3>Income</h3>
            <p>₹{income.toFixed(2)}</p>
          </div>

          <div className="card expense">
            <h3>Expenses</h3>
            <p>₹{expenses.toFixed(2)}</p>
          </div>
        </div>

        {/* Form */}
        <div className="form-section">
          <h2>Add Transaction</h2>

          <form onSubmit={addTransaction}>
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Shopping">Shopping</option>
              <option value="Bills">Bills</option>
              <option value="Salary">Salary</option>
              <option value="Other">Other</option>
            </select>

            <button type="submit">Add Transaction</button>
          </form>
        </div>

        {/* Transactions */}
        <div className="transactions">
          <h2>Transactions</h2>

          {transactions.length === 0 ? (
            <p className="empty">No transactions yet.</p>
          ) : (
            transactions.map((transaction) => (
              <div
                className={`transaction ${
                  transaction.type === "income"
                    ? "transaction-income"
                    : ""
                }`}
                key={transaction.id}
              >
                <div>
                  <h3>{transaction.description}</h3>
                  <p>{transaction.category}</p>
                </div>

                <div className="transaction-right">
                  <span
                    className={
                      transaction.type === "income"
                        ? "amount positive"
                        : "amount negative"
                    }
                  >
                    {transaction.type === "income" ? "+" : "-"}₹
                    {transaction.amount.toFixed(2)}
                  </span>

                  <button
                    className="delete-btn"
                    onClick={() => deleteTransaction(transaction.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

