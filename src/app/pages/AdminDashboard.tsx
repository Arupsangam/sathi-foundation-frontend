import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { 
  Users, LogOut, Award, Trash2, MessageSquare, Heart, 
  LayoutDashboard, Plus, X, Eye, Menu, Phone, Mail, 
  Calendar, ShieldCheck, Wallet, Activity, TrendingUp, ArrowUpRight
} from "lucide-react";

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

  // --- PERSISTENT FETCH ---
  const fetchData = async () => {
    const isLoggedIn = localStorage.getItem("adminLoggedIn");
    if (!isLoggedIn) return navigate("/admin");

    setLoading(true);
    try {
      const [resMem, resSt, resCon, resDon] = await Promise.all([
        fetch("http://10.21.21.59:4000/api/members"),
        fetch("http://10.21.21.59:4000/api/stories"),
        fetch("http://10.21.21.59:4000/api/contact"),
        fetch("http://10.21.21.59:4000/api/donations")
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

    const url = editingStory ? `http://10.21.21.59:4000/api/stories/${editingStory._id}` : "http://10.21.21.59:4000/api/stories/upload";
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

  // ==================== FIXED DELETE FUNCTION ====================
  const deleteAction = async (baseUrl, id, setter, currentState) => {
    if (!confirm("Delete permanently?")) return;

    try {
      const res = await fetch(`${baseUrl}/${id}`, { 
        method: "DELETE" 
      });

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
      {/* SIDEBAR - SAME AS BEFORE */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform md:relative md:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="h-full flex flex-col justify-between p-6">
          <div>
            <div className="flex items-center gap-3 mb-10 px-2">
              <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center text-white shadow-lg"><LayoutDashboard size={20} /></div>
              <h1 className="text-lg font-black text-gray-900">Admin</h1>
            </div>
            <nav className="space-y-1">
              {[
                { id: 'members', label: 'Members', icon: Users },
                { id: 'stories', label: 'Stories', icon: Award },
                { id: 'donations', label: 'Donations', icon: Heart },
                { id: 'contacts', label: 'Inquiries', icon: MessageSquare },
              ].map((link) => (
                <button key={link.id} onClick={() => { setActiveTab(link.id); setIsSidebarOpen(false); }}
                  className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl font-bold text-sm transition-all ${activeTab === link.id ? 'bg-green-50 text-green-700' : 'text-gray-400 hover:bg-gray-50'}`}>
                  <link.icon size={18} /> {link.label}
                </button>
              ))}
            </nav>
          </div>
          <button onClick={logout} className="flex items-center gap-4 px-4 py-4 text-red-500 font-bold text-sm hover:bg-red-50 rounded-2xl transition-all"><LogOut size={18} /> Logout</button>
        </div>
      </aside>

      <main className="flex-1 h-screen overflow-y-auto relative">
        <div className="md:hidden flex items-center justify-between p-4 bg-white border-b sticky top-0 z-40">
           <button onClick={() => setIsSidebarOpen(true)} className="p-2 bg-gray-100 rounded-xl text-gray-600"><Menu size={24}/></button>
           <h2 className="font-black text-gray-900 uppercase text-xs">Dashboard</h2>
        </div>

        <div className="p-6 md:p-10 max-w-7xl mx-auto">
          <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
             <div>
                <div className="flex items-center gap-2 mb-1"><ShieldCheck size={16} className="text-green-600"/><p className="text-[10px] font-black text-green-600 uppercase tracking-widest">Admin Dashboard</p></div>
                <h2 className="text-2xl font-black text-gray-900 capitalize">Managing {activeTab}</h2>
             </div>
             {activeTab === 'stories' && (
                <button onClick={() => { setEditingStory(null); setStoryForm({subject:"", totalMoney:"", description:"", imageFile:null}); setShowUploadForm(true); }} className="bg-gray-900 text-white px-6 py-3.5 rounded-2xl font-black text-xs uppercase flex items-center gap-2 shadow-xl">
                  <Plus size={16} /> New Story
                </button>
             )}
          </div>

          <CalculativePanel members={members} donations={donations} stories={stories} />

          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden min-h-[400px]">
            
            {/* MEMBERS TAB */}
            {activeTab === 'members' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50/50 border-b text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    <tr><th className="px-8 py-5">Name</th><th className="px-8 py-5">Contact Info</th><th className="px-8 py-5 text-right">Action</th></tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-medium">
                    {members.map(m => (
                      <tr key={m._id} className="hover:bg-gray-50/50">
                        <td className="px-8 py-6 text-gray-900 font-black">{m.name}<br/><span className="text-[10px] text-gray-400">{m.address}</span></td>
                        <td className="px-8 py-6 text-sm text-gray-600">{m.phone}<br/><span className="text-[10px] uppercase">{m.age} Years • ID: [Redacted]</span></td>
                        <td className="px-8 py-6 text-right">
                          <button onClick={() => deleteAction('http://10.21.21.59:4000/api/members', m._id, setMembers, members)} className="p-2 text-red-300 hover:text-red-500"><Trash2 size={18}/></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* DONATIONS TAB - FIXED DELETE */}
            {activeTab === 'donations' && (
              <div className="p-6 space-y-3">
                {donations.map(d => (
                  <div key={d._id} className="flex items-center justify-between p-5 bg-gray-50 rounded-[1.5rem] hover:bg-white hover:shadow-md border border-transparent hover:border-green-100 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-green-600 shadow-sm"><Heart size={18} fill="currentColor"/></div>
                      <div><p className="font-black text-gray-900 text-sm">{d.name}</p><p className="text-[10px] text-gray-400 uppercase">{new Date(d.date).toLocaleDateString()} • {d.phone}</p></div>
                    </div>
                    <div className="flex items-center gap-5">
                      <p className="text-xl font-black text-green-600 tracking-tighter">₹{d.amount}</p>
                      <div className="flex gap-2">
                        {d.screenshot && <a href={`http://10.21.21.59:4000${d.screenshot}`} target="_blank" className="p-2.5 bg-white text-blue-500 rounded-xl shadow-sm"><Eye size={16}/></a>}
                        <button 
                          onClick={() => deleteAction('http://10.21.21.59:4000/api/donations', d._id, setDonations, donations)} 
                          className="p-2.5 bg-white text-red-300 hover:text-red-500 rounded-xl shadow-sm"
                        >
                          <Trash2 size={16}/>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* STORIES & CONTACTS TAB - SAME AS BEFORE */}
            {activeTab === 'stories' && (
              <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {stories.map(s => (
                  <div key={s._id} className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm group">
                     <div className="h-40 overflow-hidden relative">
                        <img src={`http://10.21.21.59:4000${s.image}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black text-green-700 tracking-tighter shadow-sm">₹{s.totalMoney}</div>
                     </div>
                     <div className="p-5">
                        <h4 className="font-black text-gray-900 text-sm line-clamp-1 mb-4 uppercase tracking-tight">{s.subject}</h4>
                        <div className="flex gap-2">
                           <button onClick={() => { setEditingStory(s); setStoryForm({subject: s.subject, totalMoney: s.totalMoney.toString(), description: s.description, imageFile: null}); setShowUploadForm(true); }} className="flex-1 bg-gray-50 py-3 rounded-xl font-bold text-xs hover:bg-blue-50 hover:text-blue-600 transition-all">Edit</button>
                           <button onClick={() => deleteAction('http://10.21.21.59:4000/api/stories', s._id, setStories, stories)} className="flex-1 bg-gray-50 py-3 rounded-xl font-bold text-xs hover:bg-red-50 hover:text-red-600 transition-all">Delete</button>
                        </div>
                     </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'contacts' && (
              <div className="p-6 space-y-4">
                {contacts.map(c => (
                  <div key={c._id} className="p-6 bg-gray-50 rounded-[2rem] border border-gray-100 relative group">
                    <button onClick={() => deleteAction('http://10.21.21.59:4000/api/contact', c._id, setContacts, contacts)} className="absolute top-6 right-6 text-gray-300 hover:text-red-500"><Trash2 size={16}/></button>
                    <div className="flex items-center gap-3 mb-3"><div className="p-2 bg-white rounded-lg text-orange-500 shadow-sm"><MessageSquare size={16}/></div><h4 className="font-black text-gray-900 text-sm">{c.name}</h4></div>
                    <div className="flex gap-3 text-[10px] font-bold text-gray-400 uppercase mb-4"><span><Mail size={10} className="inline mr-1"/>{c.email}</span><span><Phone size={10} className="inline mr-1"/>{c.phone}</span></div>
                    <p className="text-sm text-gray-600 leading-relaxed italic">"{c.message}"</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* MODAL - SAME AS BEFORE */}
      <AnimatePresence>
        {showUploadForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
             <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-white rounded-[2.5rem] w-full max-w-lg p-10 relative shadow-2xl overflow-y-auto max-h-[90vh]">
                <button onClick={() => { setShowUploadForm(false); setEditingStory(null); }} className="absolute top-8 right-8 text-gray-300 hover:text-red-500"><X size={24}/></button>
                <h3 className="text-xl font-black mb-6 uppercase tracking-tight">{editingStory ? "Edit Story" : "New Story"}</h3>
                <form onSubmit={handleStoryUpload} className="space-y-4">
                    <input type="text" placeholder="Subject" value={storyForm.subject} onChange={(e) => setStoryForm({...storyForm, subject: e.target.value})} className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 ring-green-500 font-bold" required />
                    <input type="number" placeholder="Amount" value={storyForm.totalMoney} onChange={(e) => setStoryForm({...storyForm, totalMoney: e.target.value})} className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 ring-green-500 font-bold" required />
                    <input type="file" onChange={(e) => e.target.files && setStoryForm({...storyForm, imageFile: e.target.files[0]})} className="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-green-50 file:text-green-700 cursor-pointer" required={!editingStory} />
                    <textarea placeholder="Description" value={storyForm.description} onChange={(e) => setStoryForm({...storyForm, description: e.target.value})} rows={4} className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 ring-green-500 font-medium" required />
                    <button type="submit" disabled={uploading} className="w-full bg-green-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-lg hover:bg-green-700 transition-all">{uploading ? "Wait..." : "Save Now"}</button>
                </form>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;