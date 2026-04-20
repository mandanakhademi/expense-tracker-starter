import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const BAR_COLORS = ['#5b6cff', '#00e0a0', '#f5c842', '#ff4f70', '#c060ff', '#ff8c42', '#00a8ff'];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: '#1b1f2c',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 8,
      padding: '10px 14px',
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 13,
      color: '#e8eaf2',
    }}>
      <div style={{ color: '#7a83a0', fontSize: 11, marginBottom: 4, textTransform: 'capitalize' }}>{label}</div>
      <div style={{ color: '#f5c842', fontWeight: 600 }}>${payload[0].value.toFixed(2)}</div>
    </div>
  );
};

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

  return (
    <div className="chart-container">
      <h2>Spending by Category</h2>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 4, right: 16, left: 10, bottom: 4 }} barSize={32}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fill: '#50566e', fontSize: 12, fontFamily: "'Outfit', sans-serif" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(v) => `$${v}`}
            tick={{ fill: '#50566e', fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
          <Bar dataKey="value" radius={[5, 5, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={BAR_COLORS[index % BAR_COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SpendingChart;
