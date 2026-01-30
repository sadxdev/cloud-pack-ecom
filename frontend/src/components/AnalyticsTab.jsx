import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import axios from '../lib/axios';
import { Users, Package, ShoppingCart, DollarSign } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const AnalyticsTab = () => {
  const [analyticsData, setAnalyticsData] = useState({
    users: 0,
    products: 0,
    totalSales: 0,
    totalRevenue: 0,
  });
  const [dailySalesData, setDailySalesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await axios.get('/analytics');
        setAnalyticsData(response.data.analyticsData);
        setDailySalesData(response.data.dailySalesData);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  if (isLoading) {
    return <div className="text-center py-20 text-[#6B7280]">Loading analytics…</div>;
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <AnalyticsCard
          title="Total Users"
          value={analyticsData.users.toLocaleString()}
          icon={Users}
        />
        <AnalyticsCard
          title="Total Products"
          value={analyticsData.products.toLocaleString()}
          icon={Package}
        />
        <AnalyticsCard
          title="Total Sales"
          value={analyticsData.totalSales.toLocaleString()}
          icon={ShoppingCart}
        />
        <AnalyticsCard
          title="Total Revenue"
          value={`₹${analyticsData.totalRevenue.toLocaleString()}`}
          icon={DollarSign}
        />
      </div>

      {/* Chart */}
      <motion.div
        className="
          bg-[#F5EFE6]
          rounded-2xl
          p-6
          border border-black/10
          shadow-[0_10px_25px_rgba(0,0,0,0.12)]
        "
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-lg font-semibold text-[#1F2937] mb-4">Daily Sales & Revenue</h3>

        <ResponsiveContainer width="100%" height={360}>
          <LineChart data={dailySalesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
            <XAxis dataKey="name" stroke="#6B7280" />
            <YAxis yAxisId="left" stroke="#6B7280" />
            <YAxis yAxisId="right" orientation="right" stroke="#6B7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#F5EFE6',
                border: '1px solid rgba(0,0,0,0.1)',
                borderRadius: '8px',
                color: '#1F2937',
              }}
            />
            <Legend />

            <Line
              yAxisId="left"
              type="monotone"
              dataKey="sales"
              stroke="#6F8F72"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Sales"
            />

            <Line
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              stroke="#D8C7A6"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Revenue"
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default AnalyticsTab;

/* ----------------------- */
/* Analytics Card Component */
/* ----------------------- */

const AnalyticsCard = ({ title, value, icon: Icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="
      relative
      bg-[#F5EFE6]
      rounded-2xl
      p-6
      border border-black/10
      shadow-[0_6px_15px_rgba(0,0,0,0.12)]
      overflow-hidden
    "
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-[#6B7280]">{title}</p>
        <h3 className="mt-1 text-3xl font-bold text-[#1F2937]">{value}</h3>
      </div>

      <div className="bg-[#E7D6B4] p-3 rounded-xl">
        <Icon className="h-6 w-6 text-[#1F2937]" />
      </div>
    </div>

    {/* subtle depth highlight */}
    <div className="absolute inset-x-0 bottom-0 h-1 bg-[#D8C7A6]" />
  </motion.div>
);
