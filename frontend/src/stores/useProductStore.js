import { create } from 'zustand';
import toast from 'react-hot-toast';
import axios from '../lib/axios';

export const useProductStore = create((set) => ({
  products: [],
  isLoading: false,

  /* -------------------- */
  /* CREATE PRODUCT       */
  /* -------------------- */
  createProduct: async (productData) => {
    set({ isLoading: true });
    try {
      const res = await axios.post('/products', productData);
      set((state) => ({
        products: [...state.products, res.data],
      }));
      toast.success('Product created');
    } catch (error) {
      toast.error(error?.response?.data?.error || 'Failed to create product');
    } finally {
      set({ isLoading: false });
    }
  },

  /* -------------------- */
  /* FETCH ALL PRODUCTS   */
  /* -------------------- */
  fetchAllProducts: async () => {
    set({ isLoading: true });
    try {
      const res = await axios.get('/products');

      const products = Array.isArray(res.data) ? res.data : res.data.products || [];

      set({ products });
    } catch (error) {
      toast.error(error?.response?.data?.error || 'Failed to fetch products');
    } finally {
      set({ isLoading: false });
    }
  },

  /* -------------------- */
  /* FETCH BY CATEGORY    */
  /* -------------------- */
  fetchProductsByCategory: async (category) => {
    set({ isLoading: true });
    try {
      const res = await axios.get(`/products/category/${category}`);
      set({ products: res.data.products || [] });
    } catch (error) {
      toast.error(error?.response?.data?.error || 'Failed to fetch products');
    } finally {
      set({ isLoading: false });
    }
  },

  /* -------------------- */
  /* DELETE PRODUCT       */
  /* -------------------- */
  deleteProduct: async (productId) => {
    set({ isLoading: true });
    try {
      await axios.delete(`/products/${productId}`);
      set((state) => ({
        products: state.products.filter((product) => product._id !== productId),
      }));
      toast.success('Product deleted');
    } catch (error) {
      toast.error(error?.response?.data?.error || 'Failed to delete product');
    } finally {
      set({ isLoading: false });
    }
  },

  /* -------------------- */
  /* TOGGLE FEATURED      */
  /* -------------------- */
  toggleFeaturedProduct: async (productId) => {
    set({ isLoading: true });
    try {
      const res = await axios.patch(`/products/${productId}`);
      set((state) => ({
        products: state.products.map((product) =>
          product._id === productId ? { ...product, isFeatured: res.data.isFeatured } : product
        ),
      }));
    } catch (error) {
      toast.error(error?.response?.data?.error || 'Failed to update product');
    } finally {
      set({ isLoading: false });
    }
  },

  /* -------------------- */
  /* FETCH FEATURED       */
  /* -------------------- */
  fetchFeaturedProducts: async () => {
    set({ isLoading: true });
    try {
      const res = await axios.get('/products/featured');
      set({ products: res.data || [] });
    } catch {
      toast.error('Failed to fetch featured products');
    } finally {
      set({ isLoading: false });
    }
  },
}));
