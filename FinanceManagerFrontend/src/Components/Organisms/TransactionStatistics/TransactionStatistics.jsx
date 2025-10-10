import { useEffect, useState } from "react";
import { GetCardsApi } from "../../../Api/Cards/GetCardsApi";
import { GetTransactionsApi } from "../../../Api/Transactions/GetTransactionsApi";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer
} from "recharts";

export function TransactionStatistics() {

  async function GetAllTransactionsByUserCards() {
    const cards = await GetCardsApi();
    if (!cards || cards.length === 0) return [];

    const transactionPromises = cards.map(card => GetTransactionsApi(card.id));

    const transactionsArray = await Promise.all(transactionPromises);

    const allTransactions = transactionsArray
      .filter(arr => arr !== null)
      .flat();

    return allTransactions;
  }

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0", "#FF6384"];

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await GetAllTransactionsByUserCards();
        if (data && data.length > 0) {
          setTransactions(data);
          calculateStats(data);
        }
      } catch (err) {
        console.error("Ошибка при загрузке транзакций", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const calculateStats = (data) => {
    const totalIncome = data
      .filter((t) => t.amount > 0)
      .reduce((acc, t) => acc + t.amount, 0);

    const totalExpense = data
      .filter((t) => t.amount < 0)
      .reduce((acc, t) => acc + t.amount, 0);

    const byCategory = data.reduce((acc, t) => {
      const category = t.category || "Без категории";
      acc[category] = (acc[category] || 0) + t.amount;
      return acc;
    }, {});

    const categoryArray = Object.entries(byCategory).map(([category, total]) => ({
      category,
      total
    }));

    setStats({
      totalIncome,
      totalExpense,
      netBalance: totalIncome + totalExpense,
      byCategory: categoryArray
    });
  };

  if (loading) return <p>Загрузка...</p>;
  if (!stats || transactions.length === 0) return <p>Нет транзакций</p>;

  return (
    <div className="grid grid-cols-2 gap-6 p-4">
      <div className="bg-white rounded-2xl shadow p-4">
        <h2 className="text-xl font-bold mb-2">Общая статистика</h2>
        <p>Доход: <strong>{stats.totalIncome.toFixed(2)}</strong></p>
        <p>Расход: <strong>{stats.totalExpense.toFixed(2)}</strong></p>
        <p>Баланс: <strong>{stats.netBalance.toFixed(2)}</strong></p>
      </div>

      <div className="bg-white rounded-2xl shadow p-4">
        <h2 className="text-xl font-bold mb-2">По категориям</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={stats.byCategory}
              dataKey="total"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {stats.byCategory.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-2xl shadow p-4 col-span-2">
        <h2 className="text-xl font-bold mb-2">Категории — сумма</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stats.byCategory}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
