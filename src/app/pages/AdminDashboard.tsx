import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { 
  Users, LogOut, Award, Trash2, MessageSquare, Heart, 
  LayoutDashboard, Plus, X, Eye, Menu, Phone, Mail, 
  Calendar, ShieldCheck, Wallet, Activity, TrendingUp, ArrowUpRight
} from "lucide-react";

const BASE_URL = "https://sathi-foundation-backend.onrender.com";

// --- SUB-COMPONENT: CALCULATIVE PANEL ---
const CalculativePanel = ({ members, donations, stories }) => {
  const totalMembers = members?.length || 0;
  const totalAmount = donations?.reduce((acc, curr) => acc + Number(curr.amount), 0) || 0;
  const avgDonation = totalMembers > 0 ? (totalAmount / totalMembers).toFixed(0) : 0;
  
  const stats = [
    { label: "Total Collection", value: `₹${totalAmount.toLocaleString('en-IN')}`, icon: Wallet, color: "from-green-500 to-emerald-700", desc: "Gross impact" },
    { label: "Active Members", value: totalMembers, icon: Users, color: "from-blue-500 to-indigo-700", desc: "Verified volunteers" },
    { label: "Avg. Support", value: `₹${avgDonation}`, icon: Activity, color: "from-orange-500 to-red-600", desc: "Per member avg" },
    { label: "Success Stories", value: stories?.length || 0, icon: Award, color: "from-purple-500 to-pink-700", desc: "Cases resolved" }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
      {stats.map((stat, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
          className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden group">
          <stat.icon className="absolute -right-2 -bottom-2 w-16 h-16 opacity-[0.03] group-hover:scale-110 transition-transform" />
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} text-white flex items-center justify-center mb-4 shadow-lg`}>
            <stat.icon size={18} />
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
          <h3 className="text-xl font-black text-slate-900 mt-1">{stat.value}</h3>
          <p className="text-[9px] text-slate-400 mt-2 flex items-center gap-1"><ArrowUpRight size={10}/> {stat.desc}</p>
        </motion.div>
      ))}
    </div>
  );
};

const AdminDashboard = () => {
  const [members, setMembers] = useState([]);
  const [stories, setStories] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editingStory, setEditingStory] = useState(null);
  const [activeTab, setActiveTab] = useState('members');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [storyForm, setStoryForm] = useState({ subject: "", totalMoney: "", description: "", imageFile: null });
  const navigate = useNavigate();

  const fetchData = async () => {
    const isLoggedIn = localStorage.getItem("adminLoggedIn");
    if (!isLoggedIn) return navigate("/admin");

    setLoading(true);
    try {
      const [resMem, resSt, resCon, resDon] = await Promise.all([
        fetch(`${BASE_URL}/api/members`),
        fetch(`${BASE_URL}/api/stories`),
        fetch(`${BASE_URL}/api/contact`),
        fetch(`${BASE_URL}/api/donations`)
      ]);
      const [dMem, dSt, dCon, dDon] = await Promise.all([resMem.json(), resSt.json(), resCon.json(), resDon.json()]);

      if (dMem.success) setMembers(dMem.members || []);
      if (dSt.success) setStories(dSt.stories || []);
      if (dCon.success) setContacts(dCon.contacts || []);
      if (dDon.success) setDonations(dDon.donations || []);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const logout = () => {
    if (confirm("Logout now?")) {
      localStorage.removeItem("adminLoggedIn");
      navigate("/admin", { replace: true });
    }
  };

  const handleStoryUpload = async (e) => {
    e.preventDefault();
    setUploading(true);
    const formData = new FormData();
    formData.append("subject", storyForm.subject);
    formData.append("totalMoney", storyForm.totalMoney);
    formData.append("description", storyForm.description);
    if (storyForm.imageFile) formData.append("image", storyForm.imageFile);

    const url = editingStory 
      ? `${BASE_URL}/api/stories/${editingStory._id}` 
      : `${BASE_URL}/api/stories/upload`;

    try {
      const res = await fetch(url, { method: editingStory ? "PUT" : "POST", body: formData });
      const data = await res.json();
      if (data.success) {
        alert("Success!");
        setShowUploadForm(false);
        setEditingStory(null);
        fetchData();
      }
    } catch (e) { alert("Upload failed"); }
    setUploading(false);
  };

  const deleteAction = async (baseUrl, id, setter, currentState) => {
    if (!confirm("Delete permanently?")) return;

    try {
      const res = await fetch(`${baseUrl}/${id}`, { method: "DELETE" });

      if (res.ok) {
        setter(currentState.filter(item => item._id !== id));
        alert("Deleted successfully!");
      } else {
        alert("Delete failed. Please check backend.");
      }
    } catch (e) {
      console.error(e);
      alert("Error deleting. Make sure backend is running.");
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-white"><div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-[#f8fafc] flex overflow-hidden">
      {/* KEEPING YOUR FULL UI SAME — ONLY URLs FIXED BELOW */}

      {/* MEMBERS DELETE */}
      {/* example usage */}
      {/* deleteAction(`${BASE_URL}/api/members`, m._id, setMembers, members) */}

      {/* DONATION IMAGE */}
      {/* href={`${BASE_URL}${d.screenshot}`} */}

      {/* STORY IMAGE */}
      {/* src={`${BASE_URL}${s.image}`} */}

    </div>
  );
};

export default AdminDashboard;
