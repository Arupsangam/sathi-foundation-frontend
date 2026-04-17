import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Lock, Mail, ArrowLeft } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Note: Ensure your backend logic also checks for pilusamal@gmail.com / pilu754215
      const response = await fetch("http://10.21.21.59:4000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("adminLoggedIn", "true");
        localStorage.setItem("adminEmail", email);
        alert("✅ Login Successful! Welcome to Admin Panel");
        navigate("/admin/dashboard");
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      setError("Cannot connect to backend.\nMake sure backend is running on port 4000.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#16a34a] to-[#1e3a8a] flex items-center justify-center px-4 font-sans">
      <motion.div 
        className="bg-white rounded-[3rem] shadow-2xl w-full max-w-md p-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-[#16a34a] to-[#1e3a8a] rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-100">
            <Lock className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Admin Login</h2>
          <p className="text-gray-500 font-medium">Sathi Foundation Trust</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl mb-6 text-sm whitespace-pre-line font-bold"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                placeholder="pilusamal@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-[#16a34a] focus:ring-2 focus:ring-green-100 outline-none transition-all font-semibold"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-[#16a34a] focus:ring-2 focus:ring-green-100 outline-none transition-all font-semibold"
                required
              />
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-slate-200 disabled:opacity-70 transition-all active:scale-95 mt-4"
            whileHover={{ scale: loading ? 1 : 1.02, backgroundColor: '#000' }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
          >
            {loading ? "Authenticating..." : "Login to Dashboard"}
          </motion.button>
        </form>

        <div className="mt-8 text-center border-t border-gray-100 pt-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center justify-center gap-2 mx-auto text-[#16a34a] hover:text-[#15803d] font-black text-xs uppercase tracking-widest transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
        </div>

        <div className="mt-6 text-center text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
          Admin Account:<br />
          <span className="text-slate-300">pilusamal@gmail.com</span>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;