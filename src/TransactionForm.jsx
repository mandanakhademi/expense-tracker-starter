import { useState } from 'react'
import { CATEGORIES } from './constants'

function TransactionForm({ onAdd }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("food");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!description.trim()) newErrors.description = "Description is required.";
    if (amount === "" || isNaN(amount)) newErrors.amount = "Enter a valid amount.";
    else if (amount <= 0) newErrors.amount = "Amount must be greater than zero.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onAdd({
      id: Date.now(),
      description: description.trim(),
      amount,
      type,
      category,
      date: new Date().toISOString().split('T')[0],
    });

    setDescription("");
    setAmount("");
    setType("expense");
    setCategory("food");
    setErrors({});
  };

  return (
    <div className="add-transaction">
      <h2>Add Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div className="field-wrap">
          <input
            type="text"
            placeholder="Description"
            aria-label="Transaction description"
            className={errors.description ? "input-error" : ""}
            value={description}
            onChange={(e) => { setDescription(e.target.value); setErrors(prev => ({ ...prev, description: undefined })); }}
          />
          {errors.description && <span className="field-error">{errors.description}</span>}
        </div>
        <div className="field-wrap">
          <input
            type="number"
            placeholder="Amount"
            aria-label="Amount"
            min="0.01"
            step="0.01"
            className={errors.amount ? "input-error" : ""}
            value={amount}
            onChange={(e) => {
              const val = e.target.valueAsNumber;
              setAmount(isNaN(val) ? "" : val);
              setErrors(prev => ({ ...prev, amount: undefined }));
            }}
          />
          {errors.amount && <span className="field-error">{errors.amount}</span>}
        </div>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
          ))}
        </select>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default TransactionForm;
