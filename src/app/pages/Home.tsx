import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
  const API_URL = import.meta.env.VITE_API_URL; // ✅ IMPORTANT

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

  // ✅ FIXED STORIES FETCH
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

  // ✅ FIXED MEMBER SUBMIT
  const handleMemberSubmit = async (e) => {
    e.preventDefault();
    const aadhaarClean = memberForm.aadhaar.replace(/\s/g, "");
    if (aadhaarClean.length !== 12) return alert("❌ Aadhaar must be 12 digits");

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/api/members/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...memberForm, aadhaar: aadhaarClean }),
      });

      if (response.ok) {
        alert("✅ Application Submitted Successfully!");
        setMemberForm({
          name: "", age: "", aadhaar: "", address: "", phone: "", email: ""
        });
        setShowMemberModal(false);
      }
    } catch (error) {
      alert("❌ Server connection error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* ✅ STORIES UI FIX (IMPORTANT PART) */}
      {stories.map((story) => (
        <div key={story._id}>
          {/* ✅ FIXED IMAGE URL */}
          <ImageWithFallback src={`${API_URL}${story.image}`} />
          <h3>{story.subject}</h3>
        </div>
      ))}
    </div>
  );
};

export default Home;
