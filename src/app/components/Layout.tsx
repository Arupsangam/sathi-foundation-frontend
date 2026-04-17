import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';

const Layout = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/donate', label: 'Donate' },
    { path: '/stories', label: 'Stories' },
    { path: '/upcoming', label: 'Upcoming' },
    { path: '/contact', label: 'Contact Us' },   // Changed to /contact
    { path: '/admin', label: 'Admin' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-gradient-to-r from-[#16a34a] to-[#1e3a8a] text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img 
                src="/assets/logo.jpeg" 
                alt="Saathi Logo" 
                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md"
              />
              <div className="hidden sm:block">
                <h1 className="font-bold text-lg">ସାଥି ସାହାର୍ଯ୍ୟ ସାରାକାଳ</h1>
                <p className="text-xs opacity-90">Saathi Sahajya Sarakala</p>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    isActive(link.path)
                      ? 'bg-white text-[#16a34a] font-bold'
                      : 'hover:bg-white/20'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden pb-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg transition-all mb-2 ${
                    isActive(link.path)
                      ? 'bg-white text-[#16a34a] font-bold'
                      : 'hover:bg-white/20'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Page Content */}
      <Outlet />
    </div>
  );
};

export default Layout;
