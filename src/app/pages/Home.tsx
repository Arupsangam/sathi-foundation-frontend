import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Heart, Sparkles, Droplets, Facebook, Instagram, Calendar, Info, MessageCircle, Phone, HandCoins } from "lucide-react";

const Home = () => {
  const API_URL = "https://sathi-foundation-backend-3.onrender.com";
  const [loadingScreen, setLoadingScreen] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const [memberForm, setMemberForm] = useState({
    name: "", age: "", aadhaar: "", address: "", phone: "", email: ""
  });

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

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setLoadingScreen(false), 2000);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
    }, 5000);
    return () => { clearTimeout(timer); clearInterval(interval); };
  }, []);

  const handleMemberSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/api/members/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(memberForm),
      });
      if (response.ok) {
        alert("✅ Request Sent Successfully!");
        setShowMemberModal(false);
      }
    } catch (e) { alert("Network Error"); }
    finally { setIsSubmitting(false); }
  };

  if (loadingScreen) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-b from-[#16a34a] to-[#1e3a8a]">
        <motion.img
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          src="/assets/logo.jpeg"
          className="w-32 h-32 rounded-full border-4 border-white shadow-2xl"
        />
        <div className="mt-8 text-center text-white">
          <motion.h1 animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} className="text-2xl font-black tracking-widest uppercase">ସାଥି ସାହାର୍ଯ୍ୟ ସାରାକାଳ</motion.h1>
          <p className="text-[10px] font-bold tracking-[0.4em] opacity-80 mt-2 uppercase">Saathi Foundation Trust</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">

      {/* --- HERO SECTION --- */}
      <section className="relative h-[95vh] flex flex-col items-center justify-center bg-gradient-to-b from-[#16a34a] via-[#1e40af] to-[#1e3a8a] text-white px-6">

        {/* UPPER ACTION BUTTONS */}
        <div className="absolute right-6 top-10 flex flex-col gap-4 z-40">
          <motion.a href="tel:7894447829" whileHover={{ scale: 1.1 }} className="w-12 h-12 bg-white/10 backdrop-blur-xl border border-white/30 rounded-2xl flex items-center justify-center text-white shadow-2xl transition-all">
            <Phone size={20} />
          </motion.a>
          <motion.button animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity }} onClick={() => navigate("/donate")} className="w-12 h-12 bg-[#10b981]/20 backdrop-blur-xl border border-[#10b981]/40 rounded-2xl flex items-center justify-center text-[#10b981] shadow-2xl transition-all">
            <HandCoins size={20} />
          </motion.button>
        </div>

        <div className="text-center z-10 w-full max-w-4xl">
          {/* LOGO FLOATING */}
          <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="relative inline-block mb-10">
            <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full animate-pulse"></div>
            <img src="/assets/logo.jpeg" className="w-44 h-44 md:w-60 md:h-60 mx-auto rounded-full border-[10px] border-white/20 shadow-2xl relative z-10" alt="Logo" />
          </motion.div>

          <div className="mb-12">
            <motion.h1 animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="text-4xl md:text-8xl font-black mb-2 tracking-tighter drop-shadow-2xl uppercase">
              ସାଥି ସାହାର୍ଯ୍ୟ ସାରାକାଳ
            </motion.h1>
            <motion.p animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 4, repeat: Infinity }} className="text-sm md:text-xl font-bold uppercase tracking-[0.5em] text-emerald-300 drop-shadow-md">
              Saathi Foundation Trust
            </motion.p>
          </div>

          <div className="flex flex-col gap-4 max-w-md mx-auto">
            <div className="flex gap-4">
              <button onClick={() => navigate("/donate")} className="flex-1 py-4 bg-white text-[#1e40af] rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl hover:scale-105 transition-all">
                Donate Now <Heart size={14} fill="#1e40af" className="inline ml-1" />
              </button>
              <button onClick={() => navigate("/upcoming")} className="flex-1 py-4 bg-[#16a34a] text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl border border-white/20 hover:scale-105 transition-all">
                Upcoming Help <Calendar size={14} className="inline ml-1" />
              </button>
            </div>
            <button onClick={() => setShowMemberModal(true)} className="w-full py-4 bg-emerald-950/40 backdrop-blur-md text-white rounded-2xl font-black uppercase text-[10px] tracking-widest border border-white/10 hover:bg-white/10 hover:scale-105 transition-all">
              Become Member / ସଭ୍ୟ ହୁଅନ୍ତୁ
            </button>
          </div>
        </div>
      </section>

      {/* --- SERVICES GRID --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-black text-center mb-16 uppercase tracking-tighter">ଆମର <span className="text-emerald-600 underline decoration-emerald-100 decoration-8 underline-offset-8">ସାହାର୍ଯ୍ୟ</span></h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {services.map((s, i) => (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} key={i} className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white group bg-white">
              <img src={s.img} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" alt={s.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="text-lg font-black leading-tight mb-1">{s.title}</h3>
                <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">{s.en}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- SLIDER SECTION --- */}
      <section className="py-12 bg-slate-50 text-center">
        <h2 className="text-2xl font-black text-slate-900 tracking-[0.2em] uppercase mb-8">ସାଥି ସାହାର୍ଯ୍ୟର ଏକ ଝଲକ</h2>
        <div className="max-w-5xl mx-auto px-4 relative h-[250px] md:h-[450px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl border-[10px] border-white bg-slate-100">
          <AnimatePresence mode="wait">
            <motion.img key={currentSlide} initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }} src={galleryImages[currentSlide]} className="w-full h-full object-cover" />
          </AnimatePresence>
        </div>
      </section>

      {/* --- PRESIDENT BLOCK --- */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto bg-slate-900/95 backdrop-blur-xl p-10 rounded-[3.5rem] shadow-2xl border border-white/5 flex flex-col md:flex-row items-center gap-12 group">
          <div className="relative flex-shrink-0 group cursor-pointer" onClick={() => setShowVideo(true)}>
            <img src="/assets/img1.jpeg" className="w-40 h-40 object-cover rounded-full border-4 border-white shadow-lg transition-transform group-hover:scale-105" alt="President" />
            <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none group-hover:scale-110 transition-transform"><Play size={44} fill="white" className="text-white drop-shadow-2xl" /></div>
          </div>
          <div className="text-center md:text-left flex-1">
            <h3 className="text-3xl font-black text-white mb-2 italic tracking-tighter uppercase leading-none underline decoration-emerald-500 decoration-4">Sanjay Parida</h3>
            <p className="text-emerald-400 font-bold uppercase text-[9px] tracking-widest mb-8">Founder & President Message</p>
            <button onClick={() => setShowVideo(true)} className="px-10 py-4 bg-emerald-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl hover:bg-white hover:text-slate-950 transition-all">Watch Message</button>
          </div>
        </div>
      </section>

      {/* --- STAY CONNECTED SECTION (BIG ICONS) --- */}
      <section className="py-24 px-6 bg-slate-50 relative overflow-hidden text-center">
        <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-16 uppercase tracking-tight">Stay <span className="text-emerald-600">Connected</span></h2>

        <div className="max-w-5xl mx-auto flex flex-row justify-center gap-4 md:gap-10">
          <motion.a
            whileHover={{ y: -10 }} href="https://facebook.com" target="_blank"
            className="flex-1 max-w-[400px] relative group overflow-hidden bg-white rounded-[3rem] shadow-2xl border border-slate-100 p-8 md:p-14 flex flex-col items-center gap-6"
          >
            <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="relative z-10 w-24 h-24 md:w-32 md:h-32 bg-blue-50 group-hover:bg-white/20 rounded-[2.5rem] flex items-center justify-center">
              <Facebook size={60} className="text-blue-600 group-hover:text-white transition-colors" />
            </motion.div>
            <div className="relative z-10 text-center hidden md:block">
              <h4 className="text-slate-900 group-hover:text-white font-black uppercase text-lg tracking-widest">Facebook</h4>
              <p className="text-slate-400 group-hover:text-blue-100 text-[10px] mt-2 font-bold uppercase tracking-widest">Join our family</p>
            </div>
          </motion.a>

          <motion.a
            whileHover={{ y: -10 }} href="https://instagram.com" target="_blank"
            className="flex-1 max-w-[400px] relative group overflow-hidden bg-white rounded-[3rem] shadow-2xl border border-slate-100 p-8 md:p-14 flex flex-col items-center gap-6"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 3 }} className="relative z-10 w-24 h-24 md:w-32 md:h-32 bg-pink-50 group-hover:bg-white/20 rounded-[2.5rem] flex items-center justify-center">
              <Instagram size={60} className="text-pink-600 group-hover:text-white transition-colors" />
            </motion.div>
            <div className="relative z-10 text-center hidden md:block">
              <h4 className="text-slate-900 group-hover:text-white font-black uppercase text-lg tracking-widest">Instagram</h4>
              <p className="text-slate-400 group-hover:text-pink-100 text-[10px] mt-2 font-bold uppercase tracking-widest">Watch stories</p>
            </div>
          </motion.a>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-950 text-white pt-24 pb-12 px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-20 text-center md:text-left">
          <div className="md:col-span-2">
            <img src="/assets/logo.jpeg" className="w-16 h-16 rounded-2xl mb-6 mx-auto md:mx-0 shadow-2xl border border-white/10" alt="Logo" />
            <h2 className="text-2xl font-black mb-1 uppercase tracking-tighter">Saathi Foundation Trust</h2>
            <p className="text-emerald-500 text-[11px] font-black mb-10 tracking-[0.5em]">ସାଥି ସାହାର୍ଯ୍ୟ ସାରାକାଳ</p>
          </div>
          <div className="flex flex-col gap-6 items-center md:items-start text-slate-400 font-bold uppercase text-[10px] tracking-widest">
            <button onClick={() => navigate("/about")} className="flex items-center gap-3 hover:text-white transition-all"><Info size={18} /> About Us</button>
            <button onClick={() => navigate("/contact")} className="flex items-center gap-3 hover:text-white transition-all"><MessageCircle size={18} /> Contact Us</button>
          </div>
          <div className="flex flex-col justify-center gap-4">
            <button onClick={() => setShowMemberModal(true)} className="w-full py-5 bg-emerald-600 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] shadow-2xl hover:bg-white hover:text-slate-950 transition-all">Join Team</button>
            {/* Small Social Icons at the very bottom right of footer block */}
            <div className="flex gap-4 justify-center md:justify-start">
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-blue-600 transition-all"><Facebook size={16} /></a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-pink-600 transition-all"><Instagram size={16} /></a>
            </div>
          </div>
        </div>
        <div className="pt-10 border-t border-white/5 text-center items-center text-[10px] font-black tracking-[0.4em] uppercase">
          <p className="text-slate-600">Site Developed by <span className="text-white border-b border-emerald-500 pb-0.5 font-bold">ArupSangam</span></p>
        </div>
      </footer>

      {/* MODALS */}
      <AnimatePresence>
        {showVideo && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowVideo(false)} className="fixed inset-0 bg-black/95 backdrop-blur-2xl" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-5xl aspect-video bg-black rounded-[2.5rem] overflow-hidden shadow-2xl z-10">
              <button onClick={() => setShowVideo(false)} className="absolute top-6 right-6 p-3 bg-white/10 rounded-full text-white z-20 hover:bg-red-500 transition-all"><X size={24} /></button>
              <video controls autoPlay className="w-full h-full object-contain"><source src="/assets/president.mp4" type="video/mp4" /></video>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showMemberModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 overflow-y-auto">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowMemberModal(false)} className="fixed inset-0 bg-slate-950/90 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.95, y: 20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-white w-full max-w-md rounded-[3rem] p-10 relative z-10 shadow-2xl border-t-[12px] border-emerald-500">
              <button onClick={() => setShowMemberModal(false)} className="absolute top-8 right-8 text-slate-300 hover:text-emerald-600 transition-all"><X size={28} /></button>
              <h2 className="text-2xl font-black mb-8 text-slate-900 tracking-tight uppercase">Join Movement</h2>
              <form onSubmit={handleMemberSubmit} className="space-y-4">
                <input name="name" onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })} className="w-full px-6 py-4 bg-slate-50 rounded-2xl outline-none text-sm font-bold border border-slate-100" placeholder="Full Name" required />
                <div className="grid grid-cols-2 gap-4">
                  <input name="age" type="number" onChange={(e) => setMemberForm({ ...memberForm, age: e.target.value })} className="w-full px-6 py-4 bg-slate-50 rounded-2xl outline-none text-sm font-bold" placeholder="Age" required />
                  <input name="phone" onChange={(e) => setMemberForm({ ...memberForm, phone: e.target.value })} className="w-full px-6 py-4 bg-slate-50 rounded-2xl outline-none text-sm font-bold" placeholder="Phone" required />
                </div>
                <input name="aadhaar" onChange={(e) => setMemberForm({ ...memberForm, aadhaar: e.target.value })} className="w-full px-6 py-4 bg-slate-50 rounded-2xl outline-none text-sm font-bold" placeholder="Aadhaar" required />
                <input name="email" type="email" onChange={(e) => setMemberForm({ ...memberForm, email: e.target.value })} className="w-full px-6 py-4 bg-slate-50 rounded-2xl outline-none text-sm font-bold" placeholder="Email" required />
                <textarea name="address" onChange={(e) => setMemberForm({ ...memberForm, address: e.target.value })} className="w-full px-6 py-4 bg-slate-50 rounded-2xl outline-none text-sm font-bold border border-slate-100 min-h-[100px]" placeholder="Address" required />
                <button disabled={isSubmitting} type="submit" className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl">Submit</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Home;
