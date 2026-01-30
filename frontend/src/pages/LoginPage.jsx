import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LogIn, Mail, Lock, ArrowRight, Loader } from 'lucide-react';
import { useUserStore } from '../stores/useUserStore';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, loading } = useUserStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-[#E7D6B4] py-12 sm:px-6 lg:px-8">
      {/* Heading */}
      <motion.div
        className="sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="mt-6 text-center text-3xl font-extrabold text-[#1F2937]">
          Login to your account
        </h2>
      </motion.div>

      {/* Form Card */}
      <motion.div
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div
          className="
            bg-[#F5EFE6]
            py-8 px-4
            sm:rounded-2xl sm:px-10
            border border-black/10
            shadow-[0_10px_25px_rgba(0,0,0,0.12)]
          "
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#1F2937]">
                Email address
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-[#6B7280]" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="
                    block w-full pl-10 px-4 py-2.5
                    bg-white
                    text-[#1F2937]
                    placeholder-[#6B7280]
                    border border-black/15
                    rounded-lg
                    focus:outline-none
                    focus:border-[#D8C7A6]
                    focus:ring-2 focus:ring-[#D8C7A6]/40
                    transition-all duration-200
                    sm:text-sm
                  "
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#1F2937]">
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-[#6B7280]" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="
                    block w-full pl-10 px-4 py-2.5
                    bg-white
                    text-[#1F2937]
                    placeholder-[#6B7280]
                    border border-black/15
                    rounded-lg
                    focus:outline-none
                    focus:border-[#D8C7A6]
                    focus:ring-2 focus:ring-[#D8C7A6]/40
                    transition-all duration-200
                    sm:text-sm
                  "
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full flex items-center justify-center gap-2
                py-3 px-4
                rounded-lg
                text-sm font-medium
                bg-[#1F2937] text-[#D8C7A6]
                hover:bg-black
                shadow-[0_3px_0_rgba(0,0,0,0.25)]
                hover:-translate-y-[1px]
                active:translate-y-0 active:shadow-none
                transition-all duration-200
                disabled:opacity-50
              "
            >
              {loading ? (
                <>
                  <Loader className="h-5 w-5 animate-spin" />
                  Logging in...
                </>
              ) : (
                <>
                  <LogIn className="h-5 w-5" />
                  Login
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-8 text-center text-sm text-[#6B7280]">
            Not a member?{' '}
            <Link
              to="/signup"
              className="font-medium text-[#1F2937] hover:underline underline-offset-4"
            >
              Sign up now <ArrowRight className="inline h-4 w-4" />
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
