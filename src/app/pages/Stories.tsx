import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const stories = [
  {
    img: "/assets/sk1.jpeg",
    odia: "ଗରିବ ପରିବାର ସହ ଆଲୋଚନା",
    en: "Discussing with needy family"
  },
  {
    img: "/assets/sk2.jpeg",
    odia: "ବୃଦ୍ଧା ମହିଳାଙ୍କୁ ସହାୟତା",
    en: "Helping an elderly woman"
  },
  {
    img: "/assets/sk3.jpeg",
    odia: "ଗ୍ରାମରେ ସହାୟତା କାର୍ଯ୍ୟକ୍ରମ",
    en: "Helping a village family"
  },
  {
    img: "/assets/sk4.jpeg",
    odia: "ହସପିଟାଲରେ ରୋଗୀ ସେବା",
    en: "Patient care in hospital"
  },
  {
    img: "/assets/sk5.jpeg",
    odia: "ସମାଜ ସେବକଙ୍କ ସହ ଟିମ",
    en: "Team with community workers"
  },
  {
    img: "/assets/sk6.jpeg",
    odia: "ଗରିବ ପରିବାରଙ୍କୁ ସହାୟତା",
    en: "Supporting poor family"
  },
  {
    img: "/assets/sk7.jpeg",
    odia: "ରକ୍ତଦାନ କାର୍ଯ୍ୟକ୍ରମ",
    en: "Blood Donation Camp"
  },
  {
    img: "/assets/sk8.jpeg",
    odia: "ସମାଜରେ ସହାୟତା ବଣ୍ଟନ",
    en: "Distribution of help in society"
  },
  {
    img: "/assets/sk9.jpeg",
    odia: "ମହିଳା ଓ ଯୁବକଙ୍କୁ ସହାୟତା",
    en: "Helping women and youth"
  },
];

const quotes = [
  {
    odia: "“ସେବା ହିଁ ପରମ ଧର୍ମ”",
    en: "Service is the highest duty."
  },
  {
    odia: "“ଅନ୍ୟର ମୁହଁରେ ହସ ଫୁଟାଇବା ହିଁ ପ୍ରକୃତ ସୁଖ”",
    en: "True happiness lies in bringing a smile to others."
  },
  {
    odia: "“ମାନବ ସେବା ହିଁ ମାଧବ ସେବା”",
    en: "Service to humanity is service to God."
  }
];

const Stories = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h1 
            className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            ୬ ବର୍ଷର ସଫଳତାର କାହାଣୀ
          </motion.h1>
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-6 py-2 bg-green-100 rounded-full"
          >
            <p className="text-xl md:text-2xl text-[#16a34a] font-bold">ଧନ୍ୟବାଦ୍</p>
          </motion.div>
          <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            ଆପଣଙ୍କ <span className="font-bold text-orange-600">୧ ଟଙ୍କା</span> କାହା ଜୀବନ ବଞ୍ଚାଇବାରେ ସହାୟତା ହୁଏ । ଆମେ ସମସ୍ତେ ମିଶି ଏକ ସୁନ୍ଦର ସମାଜ ଗଢିବା ।
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {stories.map((story, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all group"
              whileHover={{ y: -12 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="relative overflow-hidden">
                <ImageWithFallback
                  src={story.img}
                  alt={story.en}
                  className="w-full h-72 md:h-80 object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-xs font-bold px-3 py-1.5 rounded-full text-gray-800 shadow-sm">
                  #{index + 1}
                </div>
              </div>

              <div className="p-7">
                <p className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
                  {story.odia}
                </p>
                <p className="text-sm md:text-base text-gray-500 font-medium">
                  {story.en}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quotes Section - Added below pictures */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6">
          {quotes.map((quote, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="p-8 bg-white border-l-4 border-green-500 rounded-xl shadow-sm hover:shadow-md transition-shadow italic"
            >
              <p className="text-xl font-semibold text-gray-800 mb-2">{quote.odia}</p>
              <p className="text-sm text-gray-500 uppercase tracking-widest">{quote.en}</p>
            </motion.div>
          ))}
        </div>

        {/* Footer Message */}
        <motion.div 
          className="mt-20 text-center py-10 border-t border-gray-200"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
            ଆପଣଙ୍କ ସହାୟତା ହିଁ ଆମର ଶକ୍ତି ❤️
          </p>
          <p className="mt-4 text-gray-500">Together, we make a difference.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Stories;