import { Navigate, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import CategoryPage from './pages/CategoryPage';
import CartPage from './pages/CartPage';
import PurchaseSuccessPage from './pages/PurchaseSuccessPage';
import PurchaseCancelPage from './pages/PurchaseCancelPage';
import ShopPage from './pages/ShopPage';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';

import { useUserStore } from './stores/useUserStore';
import { useCartStore } from './stores/useCartStore';

function App() {
  const { user, isAuthenticated, checkAuth, checkingAuth } = useUserStore();
  const { getCartItems } = useCartStore();

  // 🔐 Verify session with backend when app loads
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // 🛒 Load cart only after user is confirmed logged in
  useEffect(() => {
    if (!isAuthenticated) return;
    getCartItems();
  }, [getCartItems, isAuthenticated]);

  // ⏳ Prevent UI render until auth check finishes
  if (checkingAuth) return <LoadingSpinner />;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#E7D6B4]">
      {/* Global Background Gradient */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="
            absolute inset-0
            bg-[radial-gradient(
              ellipse_at_top,
              rgba(216,199,166,0.35)_0%,
              rgba(216,199,166,0.18)_45%,
              rgba(0,0,0,0.12)_100%
            )]
          "
        />
      </div>

      <Navbar />

      <main className="pt-20 relative z-10">
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* Auth Routes */}
          <Route path="/signup" element={!isAuthenticated ? <SignUpPage /> : <Navigate to="/" />} />

          <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />} />

          {/* Admin Route */}
          <Route
            path="/secret-dashboard"
            element={
              isAuthenticated && user?.role === 'admin' ? <AdminPage /> : <Navigate to="/login" />
            }
          />

          {/* Public */}
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/shop" element={<ShopPage />} />

          {/* Protected User Routes */}
          <Route path="/cart" element={isAuthenticated ? <CartPage /> : <Navigate to="/login" />} />

          <Route
            path="/purchase-success"
            element={isAuthenticated ? <PurchaseSuccessPage /> : <Navigate to="/login" />}
          />

          <Route
            path="/purchase-cancel"
            element={isAuthenticated ? <PurchaseCancelPage /> : <Navigate to="/login" />}
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      <Footer />
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
