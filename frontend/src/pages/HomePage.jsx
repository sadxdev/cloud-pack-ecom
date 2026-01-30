import { useEffect } from 'react';
import CategoryItem from '../components/CategoryItem';
import FeaturedProducts from '../components/FeaturedProducts';
import HeroSection from '../components/HeroSection';
import { useProductStore } from '../stores/useProductStore';

const categories = [
  { href: '/paper-products', name: 'Paper Products', imageUrl: '/paper-products.jpg' },
  { href: '/reusable-plastics', name: 'Reusable Plastics', imageUrl: '/reusable-plastics.jpg' },
  { href: '/kitchen-utilities', name: 'Kitchen Utilities', imageUrl: '/kitchen-utlities.jpg' },
  {
    href: '/eco-friendly-products',
    name: 'Eco Friendly Products',
    imageUrl: '/eco-friendly-products.jpg',
  },
  { href: '/carry-bags', name: 'Carry Bags', imageUrl: '/carry-bags.jpg' },
  { href: '/bakery-supplies', name: 'Bakery Supplies', imageUrl: '/bakery-supplies.jpg' },
];

const HomePage = () => {
  const { fetchFeaturedProducts, products, isLoading } = useProductStore();

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  return (
    <div className="bg-[#E7D6B4] min-h-screen">
      {/* HERO SECTION */}
      <HeroSection />

      {/* CONTENT SECTION */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Heading */}
        <h1 className="text-center text-4xl sm:text-5xl font-extrabold text-[#1F2937] mb-4">
          Explore What We Offer
        </h1>

        <p className="text-center text-lg text-[#6B7280] mb-14 max-w-2xl mx-auto">
          Sustainably crafted, food-grade packaging designed for modern restaurants and cloud
          kitchens.
        </p>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryItem key={category.name} category={category} />
          ))}
        </div>

        {/* Featured Products */}
        {!isLoading && products.length > 0 && (
          <div className="mt-24">
            <FeaturedProducts featuredProducts={products} />
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
