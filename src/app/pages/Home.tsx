import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Heart, X, Info, Phone, Instagram, Facebook, Play, ArrowRight, Sparkle } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const services = [
  { img: "/assets/blood.jpg", title: "ରକ୍ତ ଦାନ", en: "Blood Donation" },
  { img: "/assets/education.jpg", title: "ଶିକ୍ଷା ସହାୟତା", en: "Education Support" },
  { img: "/assets/food.jpg", title: "ଖାଦ୍ୟ ସେବା", en: "Food Distribution" },
  { img: "/assets/help.jpg", title: "ଜରୁରୀ ସହାୟତା", en: "Emergency Help" },
  { img: "/assets/prize.jpg", title: "ସମ୍ମାନ", en: "Our Recognition" },
  { img: "/assets/sad.jpg", title: "ଅସହାୟଙ୍କ ସାଥୀ", en: "Supporting the Needy" },
];

const galleryImages = [
  "/assets/img8.jpeg", "/assets/img5.jpeg", "/assets/img1.jpeg",
  "/assets/img6.jpeg", "/assets/img7.jpeg", "/assets/blood.jpg"
];

const Home = () => {
  const [loadingScreen, setLoadingScreen] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [showPresidentVideo, setShowPresidentVideo] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stories, setStories] = useState([]);

  const navigate = useNavigate();

  const [memberForm, setMemberForm] = useState({
    name: "", age: "", aadhaar: "", address: "", phone: "", email: ""
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoadingScreen(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch("http://10.21.21.59:4000/api/stories");
        const data = await response.json();
        if (data.success) setStories(data.stories || []);
      } catch (error) {
        console.error("Failed to fetch stories:", error);
      }
    };
    fetchStories();
  }, []);

  const handleMemberInput = (e) => {
    setMemberForm({ ...memberForm, [e.target.name]: e.target.value });
  };

  const handleMemberSubmit = async (e) => {
    e.preventDefault();
    const aadhaarClean = memberForm.aadhaar.replace(/\s/g, "");
    if (aadhaarClean.length !== 12) return alert("❌ Aadhaar must be 12 digits");
    setIsSubmitting(true);
    try {
      const response = await fetch("http://10.21.21.59:4000/api/members/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...memberForm, aadhaar: aadhaarClean }),
      });
      if (response.ok) {
        alert("✅ Application Submitted Successfully!");
        setMemberForm({ name: "", age: "", aadhaar: "", address: "", phone: "", email: "" });
        setShowMemberModal(false);
      }
    } catch (error) {
      alert("❌ Server connection error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F8FAFC] font-sans selection:bg-green-100 selection:text-green-900 overflow-x-hidden">
      
      <AnimatePresence>
        {loadingScreen && (
          <motion.div 
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-white"
            exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
          >
            <div className="relative flex flex-col items-center">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-gradient-to-tr from-[#16a34a] to-[#1e3a8a] opacity-20 blur-[1px]"
                  style={{ width: Math.random() * 15 + 5, height: Math.random() * 15 + 5 }}
                  animate={{
                    y: [0, -100 - Math.random() * 50],
                    x: [0, (Math.random() - 0.5) * 60],
                    opacity: [0, 0.4, 0],
                    scale: [0.5, 1.2, 0.8]
                  }}
                  transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
                />
              ))}

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1 }}
                className="relative z-10"
              >
                <div className="p-1 rounded-full bg-gradient-to-tr from-[#16a34a] to-[#1e3a8a]">
                   <img src="/assets/logo.jpeg" alt="Logo" className="w-28 h-28 rounded-full border-4 border-white shadow-2xl" />
                </div>
                <motion.div 
                   animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                   transition={{ duration: 3, repeat: Infinity }}
                   className="absolute inset-0 bg-green-400 rounded-full blur-2xl -z-10"
                />
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-8 text-center"
              >
                <h2 className="text-[#1e3a8a] text-xs font-black tracking-[0.4em] uppercase">Saathi Foundation Trust</h2>
                <div className="flex gap-1 justify-center mt-3">
                   <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1 h-1 bg-green-500 rounded-full" />
                   <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1 h-1 bg-green-500 rounded-full" />
                   <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1 h-1 bg-green-500 rounded-full" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: loadingScreen ? 0 : 1 }} transition={{ duration: 0.8 }}>
        
        {/* HERO SECTION */}
        <section className="relative bg-gradient-to-br from-[#16a34a] via-[#15803d] to-[#1e3a8a] text-white px-4 py-28 text-center overflow-hidden">
          <div className="max-w-4xl mx-auto relative z-10">
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
              <img src="/assets/logo.jpeg" className="w-28 h-28 mx-auto mb-8 rounded-full border-4 border-white/20 shadow-2xl" alt="Saathi Logo" />
            </motion.div>
            <motion.h1 
              initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              className="text-4xl md:text-7xl font-black mb-6 tracking-tight leading-tight"
            >
              ସାଥି ସାହାର୍ଯ୍ୟ ସାରାକାଳ
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-2xl font-bold mb-12 tracking-wide text-green-100"
            >
              “ ମାନବ ସେବା ହିଁ ମାଧବ ସେବା ”
            </motion.p>
            
            <div className="flex flex-wrap gap-4 justify-center items-center">
              <motion.button 
                whileHover={{ y: -5, scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/donate")} 
                className="bg-white text-[#1e3a8a] px-10 py-4 rounded-full font-black text-xs uppercase tracking-widest shadow-xl transition-all"
              >
                Donate Now ❤️
              </motion.button>
              
              <motion.button 
                whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.2)" }} whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/upcoming")} 
                className="bg-white/10 backdrop-blur-xl border border-white/30 px-10 py-4 rounded-full font-black text-xs uppercase tracking-widest flex items-center gap-2 transition-all"
              >
                Upcoming <span className="bg-white text-[#16a34a] px-2 py-0.5 rounded-md text-[10px] font-black">{stories.length}</span>
              </motion.button>

              <motion.button 
                whileHover={{ y: -5, scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => setShowMemberModal(true)} 
                className="bg-[#15803d] border border-white/20 px-10 py-4 rounded-full font-black text-xs uppercase tracking-widest shadow-xl transition-all"
              >
                Become a Member
              </motion.button>
            </div>
          </div>
        </section>

        {/* WORK GRID */}
        <section className="px-6 py-24 max-w-7xl mx-auto">
          <div className="flex flex-col items-center mb-16 text-center">
              <div className="flex items-center gap-2 text-green-600 mb-2">
                 <Sparkle size={18} fill="currentColor"/>
                 <span className="font-black text-xs uppercase tracking-[0.3em]">Our Impact</span>
              </div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">Our Work</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {services.map((item, i) => (
              <motion.div 
                key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.1)" }}
                className="bg-white p-3 rounded-[2.5rem] shadow-sm border border-slate-50 group cursor-pointer transition-all duration-300"
              >
                <div className="rounded-[2rem] overflow-hidden h-36 mb-4">
                  <ImageWithFallback src={item.img} className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700" />
                </div>
                <div className="pb-3 text-center px-2">
                  <h4 className="font-black text-sm text-slate-800 mb-1 leading-tight group-hover:text-green-600 transition-colors">{item.title}</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{item.en}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* GALLERY SLIDER */}
        <section className="px-4 py-10 bg-white">
          <motion.div whileHover={{ scale: 1.01 }} className="max-w-6xl mx-auto rounded-[3.5rem] overflow-hidden shadow-2xl border-[12px] border-slate-50 relative group transition-all duration-500">
            <motion.div className="flex" animate={{ x: `-${currentSlide * 100}%` }} transition={{ duration: 1.2, ease: [0.6, 0.01, -0.05, 0.9] }}>
              {galleryImages.map((imgSrc, i) => (
                <div key={i} className="min-w-full h-[350px] md:h-[600px] relative">
                  <ImageWithFallback src={imgSrc} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                </div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* STORIES */}
        <section className="px-6 py-28 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 font-black text-4xl text-slate-900 tracking-tight uppercase">Active ସାହାଯ୍ୟ Cases</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {stories.slice(0, 3).map((story, i) => (
                <motion.div 
                  key={story._id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }} whileHover={{ y: -15, boxShadow: "0 40px 60px -20px rgba(0,0,0,0.15)" }}
                  className="bg-white rounded-[3rem] p-6 shadow-sm border border-slate-100 text-center flex flex-col h-full transition-all duration-300"
                >
                  <div className="w-full h-56 rounded-[2.5rem] overflow-hidden mb-8 shadow-inner">
                    <ImageWithFallback src={`http://10.21.21.59:4000${story.image}`} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
                  </div>
                  <h3 className="font-black text-xl mb-4 text-slate-800 leading-snug px-2">{story.subject}</h3>
                  <p className="text-slate-500 text-sm mb-10 line-clamp-3 px-4 leading-relaxed font-medium italic">"{story.description}"</p>
                  <div className="mt-auto">
                    <motion.button 
                      whileHover={{ scale: 1.05, backgroundColor: "#16a34a" }} whileTap={{ scale: 0.95 }}
                      onClick={() => navigate("/donate")} 
                      className="w-full bg-slate-900 text-white py-5 px-8 rounded-3xl font-black text-[11px] flex justify-between items-center tracking-widest transition-all group"
                    >
                      <span className="flex items-center gap-2">SUPPORT NOW <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform"/></span>
                      <span className="bg-white/10 px-4 py-2 rounded-xl border border-white/10 group-hover:bg-white group-hover:text-green-600 transition-all">₹{story.totalMoney}</span>
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PRESIDENT & SOCIALS */}
        <section className="bg-slate-900 py-32 px-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
             <div className="absolute top-0 left-0 w-96 h-96 bg-green-500 rounded-full blur-[120px]" />
             <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-[120px]" />
          </div>
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 relative z-10">
            <motion.div 
              whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }} 
              className="bg-white/5 backdrop-blur-2xl p-12 rounded-[3.5rem] border border-white/10 flex flex-col items-center text-center justify-center shadow-2xl transition-all"
            >
              <h2 className="text-3xl font-black text-white mb-2 tracking-tight">PRESIDENT'S MESSAGE</h2>
              <p className="text-green-400 font-black mb-10 text-sm tracking-widest opacity-80 uppercase">Sanjaya Parida</p>
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(22,163,74,0.4)" }} whileTap={{ scale: 0.95 }}
                onClick={() => setShowPresidentVideo(true)} 
                className="w-full bg-white text-slate-900 py-6 rounded-3xl font-black flex items-center justify-center gap-4 transition-all"
              >
                <Play fill="currentColor" size={24} /> WATCH VIDEO
              </motion.button>
            </motion.div>

            <div className="grid grid-cols-2 gap-6">
              <motion.a 
                whileHover={{ y: -10, backgroundColor: "rgba(255,255,255,0.12)", scale: 1.05 }} 
                href="https://instagram.com/saathi_foundation_trust" target="_blank" 
                className="bg-white/5 p-10 rounded-[3rem] border border-white/10 flex flex-col items-center justify-center gap-5 transition-all group"
              >
                <Instagram className="text-pink-500 group-hover:scale-125 transition-transform duration-500" size={48} />
                <span className="text-xs font-black tracking-[0.2em] text-white/70 group-hover:text-white transition-colors uppercase">Instagram</span>
              </motion.a>
              <motion.a 
                whileHover={{ y: -10, backgroundColor: "rgba(255,255,255,0.12)", scale: 1.05 }} 
                href="https://facebook.com/share/1BH168VJon/" target="_blank" 
                className="bg-white/5 p-10 rounded-[3rem] border border-white/10 flex flex-col items-center justify-center gap-5 transition-all group"
              >
                <Facebook className="text-blue-500 group-hover:scale-125 transition-transform duration-500" size={48} />
                <span className="text-xs font-black tracking-[0.2em] text-white/70 group-hover:text-white transition-colors uppercase">Facebook</span>
              </motion.a>
            </div>
          </div>
        </section>

        {/* BOTTOM NAV */}
        <section className="py-20 bg-white">
          <div className="max-w-md mx-auto flex gap-6 px-6">
            <motion.button 
              whileHover={{ scale: 1.1, backgroundColor: "#f1f5f9", flex: 1.5 }}
              onClick={() => navigate("/about")} 
              className="flex-1 bg-slate-50 border border-slate-200 py-6 rounded-[2rem] flex items-center justify-center gap-3 text-slate-800 font-black text-xs uppercase tracking-[0.2em] shadow-sm transition-all duration-300"
            >
              <Info size={18} /> About
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.1, backgroundColor: "#f0fdf4", flex: 1.5 }}
              onClick={() => navigate("/contact")} 
              className="flex-1 bg-slate-50 border border-slate-200 py-6 rounded-[2rem] flex items-center justify-center gap-3 text-green-700 font-black text-xs uppercase tracking-[0.2em] shadow-sm transition-all duration-300"
            >
              <Phone size={18} /> Contact
            </motion.button>
          </div>
        </section>

        <motion.div 
          animate={{ scale: [1, 1.15, 1], boxShadow: ["0 0 0px rgba(22,163,74,0)", "0 0 30px rgba(22,163,74,0.4)", "0 0 0px rgba(22,163,74,0)"] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          whileHover={{ scale: 1.3, rotate: 10 }} whileTap={{ scale: 0.9 }}
          className="fixed bottom-10 right-10 bg-[#16a34a] text-white p-6 rounded-[2.2rem] cursor-pointer z-50 shadow-2xl transition-all" 
          onClick={() => navigate("/donate")}
        >
          <Heart fill="white" size={32} />
        </motion.div>
      </motion.div>

      {/* MEMBER MODAL */}
      <AnimatePresence>
        {showMemberModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/95 backdrop-blur-md z-[200] flex items-center justify-center p-6" onClick={() => setShowMemberModal(false)}>
            <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} className="bg-white rounded-[3.5rem] w-full max-w-md p-10 relative overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">Join Our Mission</h2>
                <motion.button whileHover={{ rotate: 90, backgroundColor: "#fee2e2", color: "#ef4444" }} onClick={() => setShowMemberModal(false)} className="p-3 bg-slate-100 rounded-full transition-all"><X size={24} /></motion.button>
              </div>
              <form onSubmit={handleMemberSubmit} className="space-y-4">
                <input name="name" value={memberForm.name} onChange={handleMemberInput} placeholder="Full Name *" required className="w-full px-7 py-5 bg-slate-50 border-none rounded-2xl outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-green-500 transition-all font-medium" />
                <div className="grid grid-cols-2 gap-4">
                  <input name="age" type="number" value={memberForm.age} onChange={handleMemberInput} placeholder="Age *" required className="w-full px-7 py-5 bg-slate-50 border-none rounded-2xl outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-green-500 transition-all font-medium" />
                  <input name="aadhaar" value={memberForm.aadhaar} onChange={handleMemberInput} maxLength={12} placeholder="Aadhaar Number *" required className="w-full px-7 py-5 bg-slate-50 border-none rounded-2xl outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-green-500 transition-all font-medium" />
                </div>
                <textarea name="address" value={memberForm.address} onChange={handleMemberInput} placeholder="Full Address *" required rows={3} className="w-full px-7 py-5 bg-slate-50 border-none rounded-2xl outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-green-500 transition-all font-medium resize-none" />
                <div className="grid grid-cols-2 gap-4">
                  <input name="phone" value={memberForm.phone} onChange={handleMemberInput} placeholder="Phone *" required className="w-full px-7 py-5 bg-slate-50 border-none rounded-2xl outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-green-500 transition-all font-medium" />
                  <input name="email" type="email" value={memberForm.email} onChange={handleMemberInput} placeholder="Email" className="w-full px-7 py-5 bg-slate-50 border-none rounded-2xl outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-green-500 transition-all font-medium" />
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02, letterSpacing: "0.1em", backgroundColor: "#1e3a8a" }}
                  whileTap={{ scale: 0.98 }}
                  type="submit" disabled={isSubmitting} 
                  className="w-full bg-gradient-to-r from-[#16a34a] to-[#1e3a8a] text-white py-6 rounded-3xl font-black uppercase tracking-widest mt-6 shadow-xl active:scale-95 transition-all"
                >
                  {isSubmitting ? "PROCESSING..." : "Submit Application"}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PRESIDENT VIDEO */}
      <AnimatePresence>
        {showPresidentVideo && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-950/98 z-[300] flex items-center justify-center p-4" onClick={() => setShowPresidentVideo(false)}>
            <div className="w-full max-w-5xl relative" onClick={e => e.stopPropagation()}>
              <motion.button whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }} onClick={() => setShowPresidentVideo(false)} className="absolute -top-14 right-0 text-white font-black flex items-center gap-3 bg-white/10 px-6 py-2 rounded-full transition-all">CLOSE <X size={20} /></motion.button>
              <div className="bg-black rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(22,163,74,0.3)] border border-white/10">
                <video controls autoPlay className="w-full aspect-video"><source src="/assets/president.mp4" type="video/mp4" /></video>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DEVELOPED BY */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="py-12 bg-white text-center border-t border-slate-100">
        <p className="text-[10px] text-slate-400 tracking-[0.3em] font-black uppercase hover:text-[#1e3a8a] transition-colors cursor-default">
          developed by ArupSangam
        </p>
      </motion.div>

    </div>
  );
};

export default Home;
