import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Users, LogOut, Award, Trash2, MessageSquare, Heart,
  LayoutDashboard, Plus, X, Eye, Menu, Phone, Mail,
  Calendar, ShieldCheck, Wallet, Activity, TrendingUp, ArrowUpRight
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const BASE_URL = "https://sathi-foundation-backend-3.onrender.com";

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
          <p className="text-[9px] text-slate-400 mt-2 flex items-center gap-1"><ArrowUpRight size={10} /> {stat.desc}</p>
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
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
    if (confirm("Are you sure you want to logout?")) {
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

    try {
      const res = await fetch(`${BASE_URL}/api/stories/upload`, { method: "POST", body: formData });
      const data = await res.json();
      if (data.success) {
        alert("✅ Story uploaded successfully!");
        setShowUploadForm(false);
        setStoryForm({ subject: "", totalMoney: "", description: "", imageFile: null });
        fetchData();
      } else {
        alert("❌ Upload failed: " + data.message);
      }
    } catch (e) { alert("❌ Upload failed. Please check connection."); }
    setUploading(false);
  };

  const deleteAction = async (endpoint, id, setter, currentState) => {
    if (!confirm("Are you sure you want to delete this permanently?")) return;

    try {
      const res = await fetch(`${BASE_URL}${endpoint}/${id}`, { method: "DELETE" });
      if (res.ok) {
        setter(currentState.filter(item => item._id !== id));
      } else {
        alert("❌ Delete failed. Please check backend.");
      }
    } catch (e) {
      console.error(e);
      alert("❌ Error deleting. Make sure backend is running.");
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#16a34a] border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">Loading Dashboard</p>
      </div>
    </div>
  );

  const tabs = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'members', label: 'Members', icon: Users, count: members.length },
    { id: 'stories', label: 'Stories', icon: Award, count: stories.length },
    { id: 'donations', label: 'Donations', icon: Wallet, count: donations.length },
    { id: 'contact', label: 'Messages', icon: MessageSquare, count: contacts.length }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex overflow-hidden font-sans text-gray-900">
      {/* SIDEBAR */}
      <div className={`${isSidebarOpen ? 'w-72' : 'w-20'} bg-white border-r border-gray-100 flex flex-col transition-all duration-300 relative z-20`}>
        <div className="p-6 flex items-center gap-4 border-b border-gray-50 h-24">
          <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0 text-[#16a34a]">
            <Heart size={20} className="fill-[#16a34a]" />
          </div>
          {isSidebarOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col">
              <span className="font-black text-lg leading-none tracking-tight">Admin Panel</span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sathi Foundation</span>
            </motion.div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all ${activeTab === tab.id ? 'bg-gray-900 text-white shadow-xl' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-bold'}`}
            >
              <tab.icon size={20} className={activeTab === tab.id ? "text-green-400" : ""} />
              {isSidebarOpen && (
                <div className="flex flex-1 items-center justify-between">
                  <span className={activeTab === tab.id ? "font-bold" : "font-semibold"}>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-black ${activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-400'}`}>
                      {tab.count}
                    </span>
                  )}
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-gray-50">
          <button onClick={logout} className="w-full flex items-center justify-center gap-3 py-4 text-red-500 hover:bg-red-50 rounded-2xl font-bold transition-colors">
            <LogOut size={20} />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Header */}
        <header className="h-24 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-8 z-10 sticky top-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 bg-gray-50 hover:bg-gray-100 rounded-xl text-gray-600 transition-colors">
              <Menu size={20} />
            </button>
            <h1 className="text-2xl font-black capitalize">{activeTab}</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-gray-900">Admin User</p>
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">pilusamal@gmail.com</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl shadow-lg border-2 border-white" />
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-8 relative">

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* TAB: OVERVIEW */}
              {activeTab === 'dashboard' && (
                <div>
                  <CalculativePanel members={members} donations={donations} stories={stories} />
                  <div className="bg-white p-12 rounded-[3rem] border border-gray-100 text-center shadow-sm">
                    <Heart className="w-20 h-20 text-green-100 mx-auto mb-6" />
                    <h2 className="text-2xl font-black text-gray-900 mb-2">Welcome Back!</h2>
                    <p className="text-gray-500 font-medium max-w-md mx-auto">Here you can manage your members, view donations, handle contact requests, and upload success stories.</p>
                  </div>
                </div>
              )}

              {/* TAB: MEMBERS */}
              {activeTab === 'members' && (
                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                    <h2 className="font-bold text-lg">Member Registrations</h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-gray-50 text-[10px] uppercase tracking-widest text-gray-400">
                          <th className="p-4 font-black">Name</th>
                          <th className="p-4 font-black">Contact</th>
                          <th className="p-4 font-black">Aadhaar</th>
                          <th className="p-4 font-black">Address</th>
                          <th className="p-4 font-black text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        {members.length === 0 ? (
                          <tr><td colSpan={5} className="p-8 text-center text-gray-400 font-bold">No members found.</td></tr>
                        ) : members.map(m => (
                          <tr key={m._id} className="border-b border-gray-50 hover:bg-gray-50/50">
                            <td className="p-4 font-bold">{m.name} <span className="text-gray-400 font-normal ml-2">({m.age} yrs)</span></td>
                            <td className="p-4">
                              <div className="flex flex-col gap-1">
                                <span className="flex items-center gap-2"><Phone size={14} className="text-gray-400" /> {m.phone}</span>
                                {m.email && <span className="flex items-center gap-2 text-xs text-gray-500"><Mail size={12} /> {m.email}</span>}
                              </div>
                            </td>
                            <td className="p-4 font-mono text-gray-600">{m.aadhaar}</td>
                            <td className="p-4 text-gray-500 max-w-[200px] truncate">{m.address}</td>
                            <td className="p-4 text-right">
                              <button onClick={() => deleteAction("/api/members", m._id, setMembers, members)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                                <Trash2 size={18} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB: DONATIONS */}
              {activeTab === 'donations' && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {donations.length === 0 ? (
                    <div className="col-span-full text-center p-12 text-gray-400 font-bold bg-white rounded-[2rem] border border-gray-100">No donations found.</div>
                  ) : donations.map(d => (
                    <div key={d._id} className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 relative group overflow-hidden">
                      <div className="absolute top-0 right-0 bg-green-50 text-green-700 font-black px-4 py-2 rounded-bl-[2rem] text-lg">
                        ₹{d.amount}
                      </div>
                      <div className="mb-6 mt-4">
                        <h3 className="font-black text-xl">{d.name}</h3>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1 flex items-center gap-1"><Phone size={12} /> {d.phone}</p>
                      </div>
                      <p className="text-sm text-gray-500 mb-6 truncate">{d.address}</p>
                      <div className="flex gap-2">
                        <a href={`${BASE_URL}${d.screenshot}`} target="_blank" rel="noopener noreferrer" className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
                          <Eye size={16} /> Proof
                        </a>
                        <button onClick={() => deleteAction("/api/donations", d._id, setDonations, donations)} className="p-3 bg-red-50 text-red-500 hover:bg-red-100 rounded-xl transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB: STORIES */}
              {activeTab === 'stories' && (
                <div>
                  <div className="flex justify-end mb-6">
                    <button onClick={() => setShowUploadForm(true)} className="bg-[#16a34a] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-green-700 transition-colors shadow-lg">
                      <Plus size={18} /> Upload New Story
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stories.length === 0 ? (
                      <div className="col-span-full text-center p-12 text-gray-400 font-bold bg-white rounded-[2rem] border border-gray-100">No stories found.</div>
                    ) : stories.map(s => (
                      <div key={s._id} className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden group">
                        <div className="h-48 relative overflow-hidden bg-gray-100">
                          <ImageWithFallback src={`${BASE_URL}${s.image}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-900 font-black px-3 py-1 rounded-full text-xs shadow-sm">
                            ₹{s.totalMoney} Needed
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="font-bold text-lg mb-2 line-clamp-1">{s.subject}</h3>
                          <p className="text-sm text-gray-500 line-clamp-2 mb-6">{s.description}</p>
                          <button onClick={() => deleteAction("/api/stories", s._id, setStories, stories)} className="w-full py-3 bg-red-50 text-red-500 hover:bg-red-100 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
                            <Trash2 size={16} /> Delete Story
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: CONTACT */}
              {activeTab === 'contact' && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {contacts.length === 0 ? (
                    <div className="col-span-full text-center p-12 text-gray-400 font-bold bg-white rounded-[2rem] border border-gray-100">No messages found.</div>
                  ) : contacts.map(c => (
                    <div key={c._id} className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 relative">
                      <h3 className="font-black text-lg text-gray-900 mb-1">{c.name}</h3>
                      <div className="text-xs font-bold text-gray-400 flex flex-col gap-1 mb-4">
                        <span className="flex items-center gap-1"><Mail size={12} /> {c.email}</span>
                        <span className="flex items-center gap-1"><Phone size={12} /> {c.phone}</span>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-2xl text-sm text-gray-600 mb-6 italic">
                        "{c.message}"
                      </div>
                      <button onClick={() => deleteAction("/api/contact", c._id, setContacts, contacts)} className="w-full py-3 bg-red-50 text-red-500 hover:bg-red-100 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
                        <Trash2 size={16} /> Delete Message
                      </button>
                    </div>
                  ))}
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* STORY UPLOAD MODAL */}
      <AnimatePresence>
        {showUploadForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-white rounded-[3rem] w-full max-w-lg shadow-2xl overflow-hidden">
              <div className="bg-gray-900 p-6 flex justify-between items-center text-white">
                <h2 className="text-xl font-black">Upload Story</h2>
                <button onClick={() => setShowUploadForm(false)} className="text-gray-400 hover:text-white"><X size={24} /></button>
              </div>
              <form onSubmit={handleStoryUpload} className="p-8 space-y-5">
                <div>
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Subject / Title</label>
                  <input value={storyForm.subject} onChange={e => setStoryForm({ ...storyForm, subject: e.target.value })} required className="w-full mt-1 px-5 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#16a34a] font-bold" />
                </div>
                <div>
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Total Amount Needed (₹)</label>
                  <input type="number" value={storyForm.totalMoney} onChange={e => setStoryForm({ ...storyForm, totalMoney: e.target.value })} required className="w-full mt-1 px-5 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#16a34a] font-bold" />
                </div>
                <div>
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Description</label>
                  <textarea rows={3} value={storyForm.description} onChange={e => setStoryForm({ ...storyForm, description: e.target.value })} required className="w-full mt-1 px-5 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#16a34a] font-bold resize-none" />
                </div>
                <div>
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Upload Image</label>
                  <div className="mt-1 border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center hover:bg-green-50 hover:border-green-300 transition-colors">
                    <input type="file" accept="image/*" onChange={e => setStoryForm({ ...storyForm, imageFile: e.target.files[0] })} required className="w-full text-sm font-bold text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-green-100 file:text-green-700 hover:file:bg-green-200" />
                  </div>
                </div>
                <button type="submit" disabled={uploading} className="w-full py-5 mt-4 bg-[#16a34a] text-white rounded-2xl font-black shadow-xl disabled:opacity-50 active:scale-95 transition-all">
                  {uploading ? "Uploading..." : "Publish Story"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default AdminDashboard;
