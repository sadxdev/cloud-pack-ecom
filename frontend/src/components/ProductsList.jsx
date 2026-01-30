import { motion } from 'framer-motion';
import { Trash, Star } from 'lucide-react';
import { useProductStore } from '../stores/useProductStore';

const ProductsList = () => {
  const { deleteProduct, toggleFeaturedProduct, products } = useProductStore();

  return (
    <motion.div
      className="
        max-w-5xl mx-auto
        bg-[#F5EFE6]
        rounded-2xl
        border border-black/10
        shadow-[0_10px_25px_rgba(0,0,0,0.12)]
        overflow-hidden
      "
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Table */}
      <table className="min-w-full divide-y divide-black/10">
        {/* Header */}
        <thead className="bg-[#E7D6B4]">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-[#1F2937] uppercase tracking-wider">
              Product
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-[#1F2937] uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-[#1F2937] uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-[#1F2937] uppercase tracking-wider">
              Featured
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-[#1F2937] uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>

        {/* Body */}
        <tbody className="divide-y divide-black/5">
          {products?.length === 0 && (
            <tr>
              <td colSpan={5} className="px-6 py-16 text-center text-[#6B7280]">
                No products available
              </td>
            </tr>
          )}

          {products?.map((product) => (
            <tr key={product._id} className="hover:bg-[#E7D6B4]/40 transition-colors">
              {/* Product */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-12 w-12 rounded-xl object-cover border border-black/10"
                  />
                  <span className="text-sm font-medium text-[#1F2937]">{product.name}</span>
                </div>
              </td>

              {/* Price */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1F2937]">
                ₹{product.price.toFixed(2)}
              </td>

              {/* Category */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-[#6B7280]">
                {product.category}
              </td>

              {/* Featured */}
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => toggleFeaturedProduct(product._id)}
                  className={`
                    p-2 rounded-full transition-all
                    ${
                      product.isFeatured
                        ? 'bg-[#E4B95B] text-[#1F2937] shadow-sm'
                        : 'bg-[#E7D6B4] text-[#6B7280]'
                    }
                    hover:bg-[#D8C7A6]
                  `}
                >
                  <Star className="h-5 w-5" />
                </button>
              </td>

              {/* Actions */}
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => deleteProduct(product._id)}
                  className="
                    p-2 rounded-full
                    bg-[#F5EFE6]
                    text-[#6B7280]
                    hover:text-red-600
                    hover:bg-red-50
                    transition
                  "
                >
                  <Trash className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default ProductsList;
