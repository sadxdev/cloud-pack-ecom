import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, Mail, Lock, User, ArrowRight, Loader } from 'lucide-react';
import { motion } from 'framer-motion';
import { useUserStore } from '../stores/useUserStore';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { signup, loading } = useUserStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
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
          Create your account
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
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-[#1F2937]">Full name</label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-[#6B7280]" />
                </div>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
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

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[#1F2937]">Email address</label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-[#6B7280]" />
                </div>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
              <label className="block text-sm font-medium text-[#1F2937]">Password</label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-[#6B7280]" />
                </div>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-[#1F2937]">Confirm password</label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-[#6B7280]" />
                </div>
                <input
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
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

            {/* Submit */}
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
                  Creating account...
                </>
              ) : (
                <>
                  <UserPlus className="h-5 w-5" />
                  Sign up
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-8 text-center text-sm text-[#6B7280]">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-[#1F2937] hover:underline underline-offset-4"
            >
              Login here <ArrowRight className="inline h-4 w-4" />
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUpPage;
