import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { Heart, Target, Users, ArrowLeft, ShieldCheck } from "lucide-react";

const About = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-[#F8FAFC] min-h-screen font-sans"
    >
      {/* HEADER SECTION */}
      <section className="bg-gradient-to-br from-[#16a34a] to-[#1e3a8a] text-white py-20 px-6 relative overflow-hidden">
        <motion.button 
          whileHover={{ scale: 1.1, x: -5 }}
          onClick={() => navigate("/")}
          className="absolute top-6 left-6 p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 z-20"
        >
          <ArrowLeft size={24} />
        </motion.button>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-6xl font-black mb-4 tracking-tight"
          >
            ଆମ ବିଷୟରେ
          </motion.h1>
          <p className="text-xl opacity-90 font-medium">About Saathi Foundation</p>
        </div>

        {/* Decorative background circle */}
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
      </section>

      {/* OUR STORY */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-black text-gray-900 flex items-center gap-3">
              <Heart className="text-red-500 fill-red-500" /> ଆମର କାହାଣୀ (Our Story)
            </h2>
            <div className="text-gray-600 leading-relaxed space-y-4 text-lg">
              <p className="font-bold text-[#16a34a]">
                "ସେବା ହିଁ ପରମ ଧର୍ମ" - ଏହି ମହତ ଉଦ୍ଦେଶ୍ୟକୁ ନେଇ ଆମର ଯାତ୍ରା ଆରମ୍ଭ ହୋଇଥିଲା।
              </p>
              <p>
                Sathi Foundation Trust is a non-profit organization dedicated to serving the underprivileged. 
                Our journey began with a small group of friends who wanted to make a real difference in 
                healthcare, education, and emergency support.
              </p>
              <p className="bg-blue-50 p-4 rounded-2xl border-l-4 border-blue-500 italic text-blue-900">
                "ମଣିଷ ସେବା ହିଁ ଭଗବାନଙ୍କ ସେବା। ଆମେ ପ୍ରତ୍ୟେକ ଅସହାୟଙ୍କ ପାଖରେ ସାଥି ହୋଇ ଛିଡା ହେବାକୁ ଚାହୁଁ।"
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="relative"
          >
            <div className="rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
              <img src="/assets/img1.jpeg" alt="Service" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl border border-gray-100 hidden md:block">
              <p className="text-[#16a34a] font-black text-2xl">Since 2018</p>
              <p className="text-gray-400 font-bold text-xs">Serving Humanity</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MISSION & VISION CARDS */}
      <section className="bg-slate-50 py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100"
          >
            <div className="w-16 h-16 bg-[#16a34a] text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-green-100">
              <Target size={32} />
            </div>
            <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">ଆମର ଲକ୍ଷ୍ୟ (Mission)</h3>
            <p className="text-gray-500 leading-relaxed font-medium">
              To provide immediate blood assistance, support poor students in their education, 
              and ensure no one stays hungry in our community. We aim to build a stronger, 
              healthier, and more educated society.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100"
          >
            <div className="w-16 h-16 bg-[#1e3a8a] text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-100">
              <Users size={32} />
            </div>
            <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">ଆମର ସଙ୍କଳ୍ପ (Vision)</h3>
            <p className="text-gray-500 leading-relaxed font-medium">
              Our vision is to create a world where humanity comes first. We strive to inspire 
              youth to volunteer and participate in social service, making social welfare 
              a part of everyday life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 px-6 text-center max-w-4xl mx-auto">
        <ShieldCheck size={60} className="mx-auto text-[#16a34a] mb-6" />
        <h2 className="text-3xl font-black mb-10">ଆମେ କାହିଁକି? (Why Sathi Trust?)</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <p className="font-black text-[#1e3a8a] mb-2">100% Transparency</p>
            <p className="text-xs text-gray-500">Every rupee donated goes directly to the needy.</p>
          </div>
          <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <p className="font-black text-[#1e3a8a] mb-2">24/7 Support</p>
            <p className="text-xs text-gray-500">Our volunteers are ready for emergency help anytime.</p>
          </div>
          <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <p className="font-black text-[#1e3a8a] mb-2">Community Driven</p>
            <p className="text-xs text-gray-500">Founded and run by local people who care.</p>
          </div>
        </div>
      </section>

      {/* JOIN CTA */}
      <section className="bg-slate-900 py-20 px-6 text-center">
        <h2 className="text-white text-3xl font-black mb-8">ଆମ ସହିତ ଯୋଡି ହୁଅନ୍ତୁ</h2>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="bg-[#16a34a] text-white px-10 py-4 rounded-full font-black uppercase tracking-widest"
        >
          Join Our Mission
        </motion.button>
      </section>
    </motion.div>
  );
};

export default About;