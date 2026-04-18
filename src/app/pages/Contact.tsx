import { useState } from "react";
import { motion } from "motion/react";
import { MapPin, Mail, Phone, Send } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("https://sathi-foundation-backend-3.onrender.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert("✅ Thank you! Your message has been sent successfully.");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        alert(data.message || "Failed to send message");
      }
    } catch (error) {
      alert("Cannot connect to backend. Make sure backend is running.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-10 md:py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Contact Us
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto italic">
            "ସହାୟତାର ହାତ ବଢ଼ାନ୍ତୁ, ଜୀବନ ବଞ୍ଚାନ୍ତୁ"
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">

          {/* 1. Contact Form - Now First */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:col-span-3 bg-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-gray-200/50 border border-gray-100"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Send a Message</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="sm:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#16a34a] focus:bg-white transition-all outline-none"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#16a34a] focus:bg-white transition-all outline-none"
                  placeholder="Email"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#16a34a] focus:bg-white transition-all outline-none"
                  placeholder="Phone number"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Your Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  required
                  className="w-full px-6 py-4 bg-gray-50 border-none rounded-3xl focus:ring-2 focus:ring-[#16a34a] focus:bg-white transition-all outline-none resize-none"
                  placeholder="How can we help?"
                />
              </div>

              <div className="sm:col-span-2 pt-2">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={submitting}
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#16a34a] to-[#1e3a8a] text-white py-5 rounded-2xl font-bold text-lg shadow-lg shadow-green-200 transition-all flex items-center justify-center gap-3"
                >
                  {submitting ? "Sending..." : "Send Message"}
                  {!submitting && <Send className="w-5 h-5" />}
                </motion.button>
              </div>
            </form>
          </motion.div>

          {/* 2. Contact Info - Now Second */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:col-span-2 bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl border border-gray-100"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Contact Info</h2>
            
            <div className="space-y-8">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-[#16a34a]" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Address</p>
                  <p className="text-gray-600 mt-1 leading-relaxed">
                    Manikapatana, Aul,<br />
                    Kendrapara, Odisha - 754215
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div className="min-w-0 overflow-hidden">
                  <p className="font-bold text-gray-900">Email</p>
                  <p className="text-gray-600 mt-1 break-all text-sm sm:text-base">
                    sathifoundationodisha@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Call Us</p>
                  <p className="text-gray-600 mt-1 font-medium text-lg">+91 7894447829</p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-green-50/50 rounded-3xl border border-green-100">
               <p className="text-green-800 font-bold text-center">ଆପଣଙ୍କ ସହାୟତା ହିଁ ଆମର ଶକ୍ତି ❤️</p>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Contact;