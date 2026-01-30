import { useState } from 'react';
import { ShoppingCart, UserPlus, LogIn, LogOut, Lock, Search, User, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUserStore } from '../stores/useUserStore';
import { useCartStore } from '../stores/useCartStore';
import SearchModal from '../components/SearchModal';

const Navbar = () => {
  const [accountOpen, setAccountOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { user, logout } = useUserStore();
  const isAdmin = user?.role === 'admin';
  const { cart } = useCartStore();
  const logo = './public/cloudpack-icon.png';

  return (
    <header
      className="
        fixed top-0 left-0 w-full z-40
        bg-[#D8C7A6]/95 backdrop-blur-md
        border-b border-white/40
        shadow-[0_6px_12px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.6)]
        transition-all duration-300
      "
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold italic text-[#1F2937] hover:text-black"
          >
            <img src={logo} alt="Cloud Pack Logo" className="h-8 w-8 object-contain" />
            <span>Cloud Pack</span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-4">
            {/* Home */}
            <NavLink to="/">Home</NavLink>

            {/* Shop */}
            <NavLink to="/shop">Shop</NavLink>

            {/* Search */}
            <button
              type="button"
              aria-label="Search products"
              onClick={() => setSearchOpen(true)}
              className="
    p-2 rounded-lg
    text-[#1F2937]
    hover:text-black
    hover:bg-[#E7D6B4]
    transition
  "
            >
              <Search size={20} />
            </button>

            {/* Cart */}
            {user && (
              <Link
                to="/cart"
                className="relative flex items-center text-[#1F2937] hover:text-black"
              >
                <ShoppingCart size={20} />
                <span className="hidden sm:inline ml-1">Cart</span>

                {cart.length > 0 && (
                  <span
                    className="
                      absolute -top-2 -right-2
                      bg-[#1F2937] text-[#D8C7A6]
                      rounded-full px-2 py-0.5
                      text-xs
                    "
                  >
                    {cart.length}
                  </span>
                )}
              </Link>
            )}

            {/* Admin */}
            {isAdmin && (
              <Link
                to="/secret-dashboard"
                className="
                  bg-[#E4B95B] text-[#1F2937]
                  hover:bg-[#D8A94A]
                  px-3 py-1.5 rounded-lg
                  flex items-center gap-1
                  shadow-[0_2px_0_rgba(0,0,0,0.2)]
                  hover:-translate-y-[1px]
                  transition
                "
              >
                <Lock size={16} />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
            )}

            {/* Account */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setAccountOpen((prev) => !prev)}
                  className="
                    flex items-center gap-2
                    px-3 py-2 rounded-lg
                    text-[#1F2937]
                    hover:bg-[#E7D6B4]
                    transition
                  "
                >
                  <User size={18} />
                  <span className="hidden sm:inline">My Account</span>
                </button>

                {accountOpen && (
                  <div
                    className="
                      absolute right-0 mt-2 w-48
                      bg-[#F5EFE6]
                      rounded-xl
                      border border-black/10
                      shadow-[0_10px_25px_rgba(0,0,0,0.15)]
                      overflow-hidden z-50
                    "
                  >
                    <Link
                      to="/orders"
                      onClick={() => setAccountOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-[#E7D6B4]"
                    >
                      <Package size={16} />
                      Orders
                    </Link>

                    <Link
                      to="/profile"
                      onClick={() => setAccountOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-[#E7D6B4]"
                    >
                      <User size={16} />
                      Profile
                    </Link>

                    <button
                      onClick={() => {
                        logout();
                        setAccountOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-3 text-sm hover:bg-red-50"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                {/* Signup */}
                <Link
                  to="/signup"
                  className="
                    bg-[#1F2937] text-[#D8C7A6]
                    hover:bg-black
                    py-2 px-4 rounded-lg
                    flex items-center
                    shadow-[0_3px_0_rgba(0,0,0,0.25)]
                    hover:-translate-y-[1px]
                    transition
                  "
                >
                  <UserPlus size={18} className="mr-2" />
                  Sign Up
                </Link>

                {/* Login */}
                <Link
                  to="/login"
                  className="
                    bg-[#F5EFE6] text-[#1F2937]
                    hover:bg-[#E7D6B4]
                    py-2 px-4 rounded-lg
                    flex items-center
                    border border-black/15
                    transition
                  "
                >
                  <LogIn size={18} className="mr-2" />
                  Login
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
};

export default Navbar;

/* ---------------- */
/* Reusable NavLink */
/* ---------------- */
const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="
      relative text-[#1F2937]
      hover:text-black
      transition
      after:absolute after:left-0 after:-bottom-1
      after:h-[2px] after:w-0
      after:bg-[#1F2937]
      after:transition-all
      hover:after:w-full
    "
  >
    {children}
  </Link>
);
