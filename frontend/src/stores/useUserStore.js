import { create } from 'zustand';
import axios from '../lib/axios';
import { toast } from 'react-hot-toast';

export const useUserStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  checkingAuth: true,

  /* ================= SIGNUP ================= */
  signup: async ({ name, email, password, confirmPassword }) => {
    set({ loading: true });

    if (password !== confirmPassword) {
      set({ loading: false });
      return toast.error('Passwords do not match');
    }

    try {
      const res = await axios.post('/auth/signup', { name, email, password });
      set({ user: res.data, isAuthenticated: true, loading: false });
      toast.success('Account created successfully');
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || 'Signup failed');
    }
  },

  /* ================= LOGIN ================= */
  login: async (email, password) => {
    set({ loading: true });

    try {
      const res = await axios.post('/auth/login', { email, password });
      set({ user: res.data, isAuthenticated: true, loading: false });
      toast.success('Logged in successfully');
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || 'Invalid credentials');
    }
  },

  /* ================= LOGOUT ================= */
  logout: async () => {
    try {
      await axios.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error.message);
    } finally {
      set({ user: null, isAuthenticated: false });
    }
  },

  /* ================= CHECK AUTH ================= */
  checkAuth: async () => {
    set({ checkingAuth: true });

    try {
      const res = await axios.get('/auth/profile');
      set({
        user: res.data,
        isAuthenticated: true,
        checkingAuth: false,
      });
    } catch {
      set({
        user: null,
        isAuthenticated: false,
        checkingAuth: false,
      });
    }
  },

  /* ================= REFRESH TOKEN ================= */
  refreshToken: async () => {
    if (get().checkingAuth) return;

    set({ checkingAuth: true });

    try {
      await axios.post('/auth/refresh-token');
      set({ checkingAuth: false });
    } catch (error) {
      set({ user: null, isAuthenticated: false, checkingAuth: false });
      throw error;
    }
  },
}));

/* ======================================================
   AXIOS INTERCEPTOR — AUTO REFRESH ACCESS TOKEN
====================================================== */

let refreshPromise = null;

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        if (refreshPromise) {
          await refreshPromise;
          return axios(originalRequest);
        }

        refreshPromise = useUserStore.getState().refreshToken();
        await refreshPromise;
        refreshPromise = null;

        return axios(originalRequest);
      } catch (refreshError) {
        refreshPromise = null;
        useUserStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
