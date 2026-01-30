import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useProductStore } from '../stores/useProductStore';
import ProductCard from '../components/ProductCard';

const categories = [
  'Reusable Plastics',
  'Paper Products',
  'Kitchen Utilities',
  'Eco Friendly Products',
  'Carry Bags',
  'Bakery Supplies',
];

const ShopPage = () => {
  const { fetchAllProducts, products, isLoading } = useProductStore();

  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  /* ---------------------- */
  /* FILTERED PRODUCTS LOGIC */
  /* ---------------------- */
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = !selectedCategory || product.category === selectedCategory;

      const matchesMin = !minPrice || Number(product.price) >= Number(minPrice);

      const matchesMax = !maxPrice || Number(product.price) <= Number(maxPrice);

      return matchesCategory && matchesMin && matchesMax;
    });
  }, [products, selectedCategory, minPrice, maxPrice]);

  return (
    <div className="min-h-screen bg-[#E7D6B4] py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <motion.h1
          className="text-4xl sm:text-5xl font-extrabold text-[#1F2937] mb-4 text-center"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Shop All Products
        </motion.h1>

        <p className="text-center text-lg text-[#6B7280] mb-10 max-w-2xl mx-auto">
          Browse and filter eco-friendly, food-grade packaging products.
        </p>

        {/* FILTER BAR */}
        <div
          className="
            bg-[#F5EFE6]
            rounded-2xl
            border border-black/10
            p-4
            mb-12
            flex flex-wrap gap-4
            items-center
            justify-between
          "
        >
          {/* Category */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="
              bg-white
              border border-black/15
              rounded-lg
              px-4 py-2
              text-[#1F2937]
              focus:outline-none
              focus:ring-2 focus:ring-[#D8C7A6]/50
            "
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Price */}
          <div className="flex gap-2 items-center">
            <input
              type="number"
              placeholder="Min ₹"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="
                w-28
                bg-white
                border border-black/15
                rounded-lg
                px-3 py-2
                focus:outline-none
                focus:ring-2 focus:ring-[#D8C7A6]/50
              "
            />
            <input
              type="number"
              placeholder="Max ₹"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="
                w-28
                bg-white
                border border-black/15
                rounded-lg
                px-3 py-2
                focus:outline-none
                focus:ring-2 focus:ring-[#D8C7A6]/50
              "
            />
          </div>

          {/* Clear */}
          <button
            onClick={() => {
              setSelectedCategory('');
              setMinPrice('');
              setMaxPrice('');
            }}
            className="
              text-sm
              text-[#1F2937]
              hover:underline
              underline-offset-4
            "
          >
            Clear filters
          </button>
        </div>

        {/* LOADING */}
        {isLoading && <div className="text-center text-[#6B7280] py-20">Loading products…</div>}

        {/* EMPTY */}
        {!isLoading && filteredProducts.length === 0 && (
          <div
            className="
              bg-[#F5EFE6]
              rounded-2xl
              border border-black/10
              py-20
              text-center
            "
          >
            <h3 className="text-2xl font-bold text-[#1F2937]">No products match your filters</h3>
            <p className="mt-2 text-[#6B7280]">Try adjusting category or price range.</p>
          </div>
        )}

        {/* PRODUCTS */}
        {!isLoading && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
