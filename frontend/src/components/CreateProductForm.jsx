import { useState } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, Upload, Loader } from 'lucide-react';
import { useProductStore } from '../stores/useProductStore';

const categories = [
  'Reusable Plastics',
  'Paper Products',
  'Kitchen Utilities',
  'Eco Friendly Products',
  'Carry Bags',
  'Bakery Supplies',
];

const CreateProductForm = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
  });

  const { createProduct, loading } = useProductStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(newProduct);
      setNewProduct({
        name: '',
        description: '',
        price: '',
        category: '',
        image: '',
      });
    } catch {
      console.log('error creating a product');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setNewProduct({ ...newProduct, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="
        max-w-xl mx-auto
        bg-[#F5EFE6]
        rounded-2xl
        p-8
        border border-black/10
        shadow-[0_10px_25px_rgba(0,0,0,0.12)]
      "
    >
      {/* Title */}
      <h2 className="text-2xl font-semibold mb-6 text-[#1F2937] text-center">Create New Product</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-[#1F2937] mb-1">Product Name</label>
          <input
            type="text"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            required
            className="
              w-full
              bg-white
              text-[#1F2937]
              placeholder-[#6B7280]
              border border-black/15
              rounded-lg
              px-4 py-2.5
              focus:outline-none
              focus:border-[#D8C7A6]
              focus:ring-2 focus:ring-[#D8C7A6]/40
              transition
            "
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-[#1F2937] mb-1">Description</label>
          <textarea
            rows={3}
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            required
            className="
              w-full
              bg-white
              text-[#1F2937]
              placeholder-[#6B7280]
              border border-black/15
              rounded-lg
              px-4 py-2.5
              focus:outline-none
              focus:border-[#D8C7A6]
              focus:ring-2 focus:ring-[#D8C7A6]/40
              transition
            "
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-[#1F2937] mb-1">Price</label>
          <input
            type="number"
            step="0.01"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            required
            className="
              w-full
              bg-white
              text-[#1F2937]
              border border-black/15
              rounded-lg
              px-4 py-2.5
              focus:outline-none
              focus:border-[#D8C7A6]
              focus:ring-2 focus:ring-[#D8C7A6]/40
              transition
            "
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-[#1F2937] mb-1">Category</label>
          <select
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            required
            className="
              w-full
              bg-white
              text-[#1F2937]
              border border-black/15
              rounded-lg
              px-4 py-2.5
              focus:outline-none
              focus:border-[#D8C7A6]
              focus:ring-2 focus:ring-[#D8C7A6]/40
              transition
            "
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Image Upload */}
        <div className="flex items-center gap-3">
          <input
            type="file"
            id="image"
            className="sr-only"
            accept="image/*"
            onChange={handleImageChange}
          />
          <label
            htmlFor="image"
            className="
              inline-flex items-center gap-2
              cursor-pointer
              bg-[#E7D6B4]
              text-[#1F2937]
              px-4 py-2
              rounded-lg
              border border-black/15
              hover:bg-[#D8C7A6]
              transition
            "
          >
            <Upload className="h-4 w-4" />
            Upload Image
          </label>
          {newProduct.image && <span className="text-sm text-[#6B7280]">Image selected</span>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="
            w-full
            flex items-center justify-center gap-2
            py-3
            rounded-lg
            bg-[#1F2937] text-[#D8C7A6]
            font-medium
            shadow-[0_3px_0_rgba(0,0,0,0.25)]
            hover:bg-black
            hover:-translate-y-[1px]
            active:translate-y-0 active:shadow-none
            transition-all duration-200
            disabled:opacity-50
          "
        >
          {loading ? (
            <>
              <Loader className="h-5 w-5 animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <PlusCircle className="h-5 w-5" />
              Create Product
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default CreateProductForm;
