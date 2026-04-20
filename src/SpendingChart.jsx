import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function SpendingChart({ transactions }) {
  const data = Object.values(
    transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        const key = t.category;
        if (!acc[key]) acc[key] = { name: key, value: 0 };
        acc[key].value += parseFloat(t.amount);
        return acc;
      }, {})
  );

  if (data.length === 0) return null;

  const formatTooltip = (value) => [`$${value.toFixed(2)}`, 'Amount'];

  return (
    <div className="chart-container">
      <h2>Spending by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(v) => `$${v}`} />
          <Tooltip formatter={formatTooltip} />
          <Bar dataKey="value" fill="#4ECDC4" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SpendingChart;
