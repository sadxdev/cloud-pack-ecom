import { create } from 'zustand';
import axios from '../lib/axios';
import { toast } from 'react-hot-toast';

export const useCartStore = create((set, get) => ({
  cart: [],
  coupon: null,
  total: 0,
  subtotal: 0,
  isCouponApplied: false,

  /* ================= COUPONS ================= */

  getMyCoupon: async () => {
    try {
      const res = await axios.get('/coupons');
      set({ coupon: res.data || null });
    } catch (error) {
      console.error('Error fetching coupon:', error);
    }
  },

  applyCoupon: async (code) => {
    try {
      const res = await axios.post('/coupons/validate', { code });
      set({ coupon: res.data, isCouponApplied: true });
      get().calculateTotals();
      toast.success('Coupon applied successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to apply coupon');
    }
  },

  removeCoupon: () => {
    set({ coupon: null, isCouponApplied: false });
    get().calculateTotals();
    toast.success('Coupon removed');
  },

  /* ================= CART ================= */

  getCartItems: async () => {
    try {
      const res = await axios.get('/cart');
      console.log('Cart API response:', res.data);

      // Handle multiple possible backend shapes
      const items =
        res.data?.items ||
        res.data?.cartItems ||
        res.data?.data ||
        (Array.isArray(res.data) ? res.data : []);

      set({ cart: items });
      get().calculateTotals();
    } catch (error) {
      console.error('Error fetching cart:', error);
      set({ cart: [] });
      toast.error(error.response?.data?.message || 'Failed to fetch cart');
    }
  },

  clearCart: async () => {
    set({ cart: [], coupon: null, total: 0, subtotal: 0 });
  },

  addToCart: async (product) => {
    try {
      await axios.post('/cart', { productId: product._id });
      toast.success('Product added to cart');

      set((state) => {
        const existingItem = state.cart.find((item) => item._id === product._id);

        const updatedCart = existingItem
          ? state.cart.map((item) =>
              item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
            )
          : [...state.cart, { ...product, quantity: 1 }];

        return { cart: updatedCart };
      });

      get().calculateTotals();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add to cart');
    }
  },

  removeFromCart: async (productId) => {
    try {
      await axios.delete('/cart', { data: { productId } });

      set((state) => ({
        cart: state.cart.filter((item) => item._id !== productId),
      }));

      get().calculateTotals();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to remove item');
    }
  },

  updateQuantity: async (productId, quantity) => {
    if (quantity === 0) {
      get().removeFromCart(productId);
      return;
    }

    try {
      await axios.put(`/cart/${productId}`, { quantity });

      set((state) => ({
        cart: state.cart.map((item) => (item._id === productId ? { ...item, quantity } : item)),
      }));

      get().calculateTotals();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update quantity');
    }
  },

  /* ================= TOTALS ================= */

  calculateTotals: () => {
    const { cart, coupon } = get();

    const subtotal = cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

    let total = subtotal;

    if (coupon?.discountPercentage) {
      const discount = subtotal * (coupon.discountPercentage / 100);
      total = subtotal - discount;
    }

    set({ subtotal, total });
  },
}));
