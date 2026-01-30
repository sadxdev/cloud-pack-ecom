import { BarChart, PlusCircle, ShoppingBasket } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import AnalyticsTab from '../components/AnalyticsTab';
import CreateProductForm from '../components/CreateProductForm';
import ProductsList from '../components/ProductsList';
import { useProductStore } from '../stores/useProductStore';

const tabs = [
  { id: 'create', label: 'Create Product', icon: PlusCircle },
  { id: 'products', label: 'Products', icon: ShoppingBasket },
  { id: 'analytics', label: 'Analytics', icon: BarChart },
];

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('create');
  const { fetchAllProducts } = useProductStore();

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  return (
    <div className="min-h-screen bg-[#E7D6B4] relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        {/* Heading */}
        <motion.h1
          className="text-4xl font-extrabold text-[#1F2937] text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Admin Dashboard
        </motion.h1>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2
                px-5 py-2.5
                rounded-lg
                text-sm font-medium
                transition-all duration-200
                ${
                  activeTab === tab.id
                    ? `
                      bg-[#1F2937] text-[#D8C7A6]
                      shadow-[0_3px_0_rgba(0,0,0,0.25)]
                      -translate-y-[1px]
                    `
                    : `
                      bg-[#F5EFE6] text-[#1F2937]
                      border border-black/15
                      hover:bg-[#E7D6B4]
                    `
                }
              `}
            >
              <tab.icon className="h-5 w-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Card */}
        <div
          className="
            bg-[#F5EFE6]
            rounded-2xl
            p-6
            border border-black/10
            shadow-[0_10px_25px_rgba(0,0,0,0.12)]
          "
        >
          {activeTab === 'create' && <CreateProductForm />}
          {activeTab === 'products' && <ProductsList />}
          {activeTab === 'analytics' && <AnalyticsTab />}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
