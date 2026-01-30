import { useEffect } from 'react';
import { useProductStore } from '../stores/useProductStore';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';

const CategoryPage = () => {
  const { fetchProductsByCategory, products } = useProductStore();
  const { category } = useParams();

  useEffect(() => {
    fetchProductsByCategory(category);
  }, [fetchProductsByCategory, category]);

  const formattedCategory = category?.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <div className="min-h-screen bg-[#E7D6B4]">
      <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Heading */}
        <motion.h1
          className="text-center text-4xl sm:text-5xl font-extrabold text-[#1F2937] mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {formattedCategory}
        </motion.h1>

        <motion.p
          className="text-center text-lg text-[#6B7280] mb-14 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Discover premium, eco-friendly packaging solutions crafted for restaurants and modern food
          brands.
        </motion.p>

        {/* Products Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {products?.length === 0 && (
            <div className="col-span-full">
              <EmptyCategoryUI />
            </div>
          )}

          {products?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CategoryPage;

/* ------------------------ */
/* EMPTY CATEGORY UI        */
/* ------------------------ */

const EmptyCategoryUI = () => (
  <motion.div
    className="
      bg-[#F5EFE6]
      rounded-2xl
      border border-black/10
      shadow-[0_10px_25px_rgba(0,0,0,0.12)]
      py-20
      text-center
    "
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <h3 className="text-2xl font-bold text-[#1F2937]">No products found</h3>
    <p className="mt-2 text-[#6B7280]">We’re working on adding more eco-friendly products soon.</p>
  </motion.div>
);
