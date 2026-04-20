import { useState } from 'react'

const categories = ["food", "housing", "utilities", "transport", "entertainment", "salary", "other"];

const categoryColors = {
  food:          '#f5c842',
  housing:       '#5b6cff',
  utilities:     '#00a8ff',
  transport:     '#ff8c42',
  entertainment: '#c060ff',
  salary:        '#00e0a0',
  other:         '#7a83a0',
};

function TransactionList({ transactions, onDelete }) {
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  let filteredTransactions = transactions;
  if (filterType !== "all") {
    filteredTransactions = filteredTransactions.filter(t => t.type === filterType);
  }
  if (filterCategory !== "all") {
    filteredTransactions = filteredTransactions.filter(t => t.category === filterCategory);
  }

  return (
    <div className="transactions">
      <h2>Transactions</h2>
      <div className="filters">
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map(t => (
            <tr key={t.id}>
              <td className="td-date">{t.date}</td>
              <td>{t.description}</td>
              <td>
                <span className="category-badge">
                  <span
                    className="category-dot"
                    style={{ background: categoryColors[t.category] ?? '#7a83a0' }}
                  />
                  {t.category}
                </span>
              </td>
              <td className={`td-amount ${t.type === "income" ? "income-amount" : "expense-amount"}`}>
                {t.type === "income" ? "+" : "-"}${t.amount}
              </td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this transaction?")) {
                      onDelete(t.id);
                    }
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList;
