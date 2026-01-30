import { useEffect, useMemo, useState } from 'react';
import { X, Search } from 'lucide-react';
import { useProductStore } from '../stores/useProductStore';
import ProductCard from './ProductCard';

const SearchModal = ({ open, onClose }) => {
  const { products } = useProductStore();
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const results = useMemo(() => {
    if (!query) return [];
    return products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));
  }, [query, products]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/40 backdrop-blur-sm">
      <div className="mt-24 w-full max-w-4xl bg-[#F5EFE6] rounded-2xl shadow-2xl p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <Search className="text-[#6B7280]" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products…"
            className="
              flex-1
              bg-white
              border border-black/15
              rounded-lg
              px-4 py-2
              focus:outline-none
              focus:ring-2 focus:ring-[#D8C7A6]/50
            "
          />
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* Results */}
        {query && results.length === 0 && (
          <p className="text-center text-[#6B7280] py-12">No products found</p>
        )}

        {results.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[60vh] overflow-y-auto">
            {results.map((product) => (
              <ProductCard key={product._id} product={product} onClick={onClose} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;
