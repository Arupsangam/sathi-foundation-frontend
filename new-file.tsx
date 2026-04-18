import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, Info, Phone, Instagram, Facebook, Play, ArrowRight, Sparkle } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { registerMember } from "../api";   // ← Yeh import zaroori hai

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
  const API_URL = import.meta.env.VITE_API_URL || "https://sathi-foundation-backend-3.onrender.com";

  const [loadingScreen, setLoadingScreen] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stories, setStories] = useState([]);

  const navigate = useNavigate();

  const [memberForm, setMemberForm] = useState({
    name: "", age: "", aadhaar: "", address: "", phone: "", email: ""
  });

  // Loading Screen
  useEffect(() => {
    const timer = setTimeout(() => setLoadingScreen(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  // Gallery Slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Fetch Stories
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch(`${API_URL}/api/stories`);
        const data = await response.json();
        if (data.success) setStories(data.stories || []);
      } catch (error) {
        console.error("Failed to fetch stories:", error);
      }
    };
    fetchStories();
  }, [API_URL]);

  const handleMemberInput = (e) => {
    setMemberForm({ ...memberForm, [e.target.name]: e.target.value });
  };

  const handleMemberSubmit = async (e) => {
    e.preventDefault();

    const aadhaarClean = memberForm.aadhaar.replace(/\s/g, "");
    if (aadhaarClean.length !== 12) {
      return alert("❌ Aadhaar must be exactly 12 digits");
    }

    setIsSubmitting(true);

    try {
      const response = await registerMember({
        ...memberForm,
        aadhaar: aadhaarClean
      });

      if (response.success) {
        alert("✅ Membership Application Submitted Successfully!");
        setMemberForm({ name: "", age: "", aadhaar: "", address: "", phone: "", email: "" });
        setShowMemberModal(false);
      } else {
        alert(response.message || "Something went wrong");
      }
    } catch (error) {
      alert(error.message || "Server connection error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingScreen) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#004d40] to-[#01579b]">
        <img src="/assets/logo.jpeg" alt="Logo" className="w-32 h-32 rounded-full border-4 border-white/30 animate-pulse shadow-2xl" />
        <h1 className="mt-6 text-white text-2xl font-bold tracking-widest">SATHI FOUNDATION</h1>
        <p className="text-white/70 italic mt-2">ସାଥୀ : ଅସହାୟଙ୍କ ସାଥୀ</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Hero Section - Tere original jaisa rakha */}
      <header className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-transparent to-[#004d40]/80" />
        <img 
          src={galleryImages[currentSlide]} 
          alt="Sathi" 
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000" 
        />
        <div className="relative z-20 text-center px-4">
          <img src="/assets/logo.jpeg" alt="Logo" className="w-20 h-20 mx-auto rounded-full border-2 border-white mb-4 shadow-lg" />
          <h1 className="text-4xl font-black text-white drop-shadow-md">Sathi Foundation</h1>
          <p className="text-xl text-emerald-100 font-medium mt-2">ସାଥୀ : ଅସହାୟଙ୍କ ସାଥୀ</p>
        </div>
      </header>

      {/* Stories Section (jo tu ne diya tha) */}
      <div className="px-6 py-10">
        {stories.map((story) => (
          <div key={story._id} className="mb-8">
            <ImageWithFallback src={`${API_URL}${story.image}`} />
            <h3 className="text-xl font-bold mt-3">{story.subject}</h3>
          </div>
        ))}
      </div>

      {/* Become a Member Button - Sticky Footer Style */}
      <div className="fixed bottom-6 left-6 right-6 z-50">
        <button 
          onClick={() => setShowMemberModal(true)}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-5 rounded-2xl font-bold text-lg shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <Heart className="w-5 h-5" />
          Become a Member 
          <span className="text-xs opacity-75">ସଭ୍ୟ ବନନ୍ତୁ</span>
        </button>
      </div>

      {/* Member Modal */}
      <AnimatePresence>
        {showMemberModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b bg-[#004d40] text-white flex justify-between items-center">
                <h2 className="text-2xl font-bold">Become a Member</h2>
                <button 
                  onClick={() => setShowMemberModal(false)}
                  className="text-3xl hover:text-red-300"
                >
                  <X size={28} />
                </button>
              </div>

              <form onSubmit={handleMemberSubmit} className="p-6 space-y-5">
                <input 
                  type="text" name="name" placeholder="Full Name" 
                  value={memberForm.name} onChange={handleMemberInput}
                  className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-emerald-500"
                  required 
                />
                <input 
                  type="number" name="age" placeholder="Age" 
                  value={memberForm.age} onChange={handleMemberInput}
                  className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-emerald-500"
                  required 
                />
                <input 
                  type="text" name="aadhaar" placeholder="Aadhaar Number (12 digits)" 
                  value={memberForm.aadhaar} onChange={handleMemberInput}
                  className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-emerald-500"
                  maxLength={12}
                  required 
                />
                <input 
                  type="text" name="address" placeholder="Address" 
                  value={memberForm.address} onChange={handleMemberInput}
                  className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-emerald-500"
                  required 
                />
                <input 
                  type="tel" name="phone" placeholder="Phone Number" 
                  value={memberForm.phone} onChange={handleMemberInput}
                  className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-emerald-500"
                  required 
                />
                <input 
                  type="email" name="email" placeholder="Email (Optional)" 
                  value={memberForm.email} onChange={handleMemberInput}
                  className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-emerald-500"
                />

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white py-4 rounded-2xl font-bold text-lg transition-all"
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;