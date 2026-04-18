import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Calendar, Heart, Quote, TrendingUp, CheckCircle } from "lucide-react";

interface Story {
  _id: string;
  subject: string;
  totalMoney: number;
  description: string;
  image: string;
  date: string;
}

const Upcoming = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // FIX: Force scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const response = await fetch("https://sathi-foundation-backend-3.onrender.com/api/stories");
      const data = await response.json();
      if (data.success) {
        setStories(data.stories || []);
      }
    } catch (error) {
      console.error("Failed to fetch stories:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f6f7fb] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#16a34a] border-t-transparent rounded-full animate-spin"></div>
          <p className="font-bold text-gray-500">ଅପେକ୍ଷା କରନ୍ତୁ...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f7fb]">
      {/* HEADER SECTION */}
      <div className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-6xl font-black mb-4 text-gray-900">
              📢 ଆଗାମୀ ସହାୟତା ଏବଂ <span className="text-[#16a34a]">ସଫଳ କାହାଣୀ</span>
            </h1>
            <p className="text-lg text-gray-600 font-medium italic">ଆପଣଙ୍କର ଛୋଟ ସହଯୋଗ କାହା ପାଇଁ ଆଶାର କିରଣ</p>
          </motion.div>
        </div>
      </div>

      {/* ODIA VISION SECTION */}
      <section className="py-20 bg-gray-950 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#16a34a]/10 blur-[100px] rounded-full"></div>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6">
                ଆମର ଲକ୍ଷ୍ୟ <br />
                <span className="text-[#16a34a]">ଅସହାୟଙ୍କ ମୁହଁରେ ହସ</span>
              </h2>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="text-[#16a34a] w-5 h-5" />
                  <p className="font-medium">ସ୍ୱଚ୍ଛତା ଏବଂ ବିଶ୍ୱାସନୀୟତା ଆମର ପରିଚୟ</p>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="text-[#16a34a] w-5 h-5" />
                  <p className="font-medium">ସିଧାସଳଖ ଆବଶ୍ୟକୀୟ ପରିବାରକୁ ସହାୟତା</p>
                </div>
              </div>
              <div className="flex gap-10 text-white">
                <div>
                  <p className="text-[#16a34a] text-4xl font-black">୧୦୦%</p>
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">ସୁରକ୍ଷିତ ଦାନ</p>
                </div>
                <div>
                  <p className="text-[#16a34a] text-4xl font-black">୬+ ବର୍ଷ</p>
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">ନିରନ୍ତର ସେବା</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="bg-white/5 p-8 md:p-12 rounded-[2.5rem] border border-white/10 backdrop-blur-sm shadow-2xl"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Quote className="text-[#16a34a] w-12 h-12 mb-6 opacity-40" />
              <p className="text-2xl md:text-3xl font-bold text-white italic leading-relaxed mb-8">
                “ମାନବ ସେବା ହିଁ ପ୍ରକୃତ ମାଧବ ସେବା । ଆପଣଙ୍କର ଗୋଟିଏ ଟଙ୍କା କାହାର ଜୀବନ ବଞ୍ଚାଇ ପାରିବ |”
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-1.5 bg-[#16a34a] rounded-full"></div>
                <p className="text-gray-400 font-black uppercase text-sm tracking-widest">ସାଥି ଫାଉଣ୍ଡେସନ ଟିମ୍</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STORIES GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {stories.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[3rem] p-12 shadow-sm border border-gray-100">
            <TrendingUp className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <p className="text-xl font-bold text-gray-400">କୌଣସି ତଥ୍ୟ ମିଳିଲା ନାହିଁ</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {stories.map((story, index) => (
              <motion.div
                key={story._id}
                className="bg-white rounded-[2.5rem] overflow-hidden shadow-md transition-all group border border-gray-50 cursor-default"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ 
                    y: -12, 
                    boxShadow: "0 20px 40px rgba(22, 163, 74, 0.25)" 
                }}
              >
                <div className="relative h-64 overflow-hidden">
                  <ImageWithFallback
                    src={`https://sathi-foundation-backend-3.onrender.com${story.image}`}
                    alt={story.subject}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md text-[#16a34a] px-5 py-1.5 rounded-full text-sm font-black shadow-lg">
                    ₹{story.totalMoney.toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex items-center gap-2 text-[10px] font-black text-[#16a34a] mb-3 tracking-widest uppercase">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(story.date).toLocaleDateString('en-IN')}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 text-gray-900 line-clamp-2 leading-tight group-hover:text-[#16a34a] transition-colors">
                    {story.subject}
                  </h3>
                  
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-8">
                    {story.description}
                  </p>

                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation(); // FIX: Prevents accidental triggers
                      navigate("/donate");
                    }}
                    className="w-full bg-gray-900 hover:bg-[#16a34a] text-white py-4 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 group/btn"
                    whileTap={{ scale: 0.95 }}
                  >
                    <Heart className="w-4 h-4" /> 
                    ବର୍ତ୍ତମାନ ସାହାଯ୍ୟ କରନ୍ତୁ
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <div className="pb-16 text-center">
        <p className="text-gray-400 font-bold tracking-widest uppercase text-xs">ଆପଣଙ୍କର ସହାୟତା ଆମର ଶକ୍ତି ❤️</p>
      </div>
    </div>
  );
};

export default Upcoming;