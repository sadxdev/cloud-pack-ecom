import { Link } from 'react-router-dom';
import { useCartStore } from '../stores/useCartStore';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';

import CartItem from '../components/CartItem';
import PeopleAlsoBought from '../components/PeopleAlsoBought';
import OrderSummary from '../components/OrderSummary';
import GiftCouponCard from '../components/GiftCouponCard';

const CartPage = () => {
  const { cart } = useCartStore();

  return (
    <div className="min-h-screen bg-[#E7D6B4] py-10 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mt-6 sm:mt-8 md:gap-8 lg:flex lg:items-start">
          {/* LEFT: CART ITEMS */}
          <motion.div
            className="mx-auto w-full lg:max-w-3xl xl:max-w-4xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {cart.length === 0 ? (
              <EmptyCartUI />
            ) : (
              <div className="space-y-6">
                {cart.map((item) => (
                  <CartItem key={item._id} item={item} />
                ))}
              </div>
            )}

            {cart.length > 0 && (
              <div className="mt-12">
                <PeopleAlsoBought />
              </div>
            )}
          </motion.div>

          {/* RIGHT: SUMMARY */}
          {cart.length > 0 && (
            <motion.div
              className="mx-auto mt-8 lg:mt-0 lg:w-full max-w-lg space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <OrderSummary />
              <GiftCouponCard />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;

/* --------------------- */
/* EMPTY CART COMPONENT  */
/* --------------------- */

const EmptyCartUI = () => (
  <motion.div
    className="
      flex flex-col items-center justify-center
      py-20
      bg-[#F5EFE6]
      rounded-2xl
      border border-black/10
      shadow-[0_10px_25px_rgba(0,0,0,0.12)]
      text-center
    "
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="bg-[#E7D6B4] p-6 rounded-full mb-6">
      <ShoppingCart className="h-16 w-16 text-[#1F2937]" />
    </div>

    <h3 className="text-2xl font-bold text-[#1F2937]">Your cart is empty</h3>

    <p className="mt-2 text-[#6B7280] max-w-sm">
      Looks like you haven&apos;t added anything yet. Explore our eco-friendly packaging products.
    </p>

    <Link
      to="/"
      className="
        mt-6
        inline-flex items-center
        bg-[#1F2937] text-[#D8C7A6]
        px-6 py-3
        rounded-lg
        font-medium
        shadow-[0_3px_0_rgba(0,0,0,0.25)]
        hover:bg-black
        hover:-translate-y-[1px]
        active:translate-y-0 active:shadow-none
        transition-all duration-200
      "
    >
      Start Shopping
    </Link>
  </motion.div>
);
