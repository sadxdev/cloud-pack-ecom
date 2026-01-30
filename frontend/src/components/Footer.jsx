import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#D8C7A6] border-t border-black/10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold italic text-[#1F2937]">Cloud Pack</h3>
            <p className="mt-4 text-[#6B7280] max-w-sm">
              Sustainable, food-grade packaging solutions crafted for restaurants, cloud kitchens,
              and modern food brands.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-sm font-semibold text-[#1F2937] uppercase mb-4">Shop</h4>
            <ul className="space-y-3 text-[#1F2937]">
              <li>
                <Link to="/paper-products" className="hover:underline">
                  Paper Products
                </Link>
              </li>
              <li>
                <Link to="/reusable-plastics" className="hover:underline">
                  Reusable Plastics
                </Link>
              </li>
              <li>
                <Link to="/eco-friendly-products" className="hover:underline">
                  Eco-Friendly Products
                </Link>
              </li>
              <li>
                <Link to="/bakery-supplies" className="hover:underline">
                  Bakery Supplies
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-[#1F2937] uppercase mb-4">Company</h4>
            <ul className="space-y-3 text-[#1F2937]">
              <li>
                <Link to="/about" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:underline">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:underline">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-[#1F2937] uppercase mb-4">Contact</h4>
            <ul className="space-y-4 text-[#1F2937]">
              <li className="flex items-center gap-2">
                <Phone size={16} /> +91 9XXXXXXXXX
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} /> support@cloudpack.in
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-1" />
                <span>
                  Chennai, Tamil Nadu <br />
                  India
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-black/10" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[#6B7280]">
            © {new Date().getFullYear()} Cloud Pack. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm text-[#1F2937]">
            <Link to="/privacy-policy" className="hover:underline">
              Privacy
            </Link>
            <Link to="/terms" className="hover:underline">
              Terms
            </Link>
            <Link to="/refund-policy" className="hover:underline">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
