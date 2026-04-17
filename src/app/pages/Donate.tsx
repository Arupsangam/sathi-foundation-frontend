import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Copy, Check, ShieldCheck, Upload, X, Heart, Sparkles, PartyPopper } from "lucide-react";

const Donate = () => {
  const [showModal, setShowModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const presets = [100, 500, 1000, 2000];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !amount || !phone) {
      alert("Name, Amount and Phone are required");
      return;
    }
    setShowModal(true);
  };

  const copyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const submitDonation = async () => {
    if (!screenshot) {
      alert("Please upload payment screenshot");
      return;
    }

    setSubmitting(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("amount", amount);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("screenshot", screenshot);

    try {
      const res = await fetch("http://10.21.21.59:4000/api/donations", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setIsSuccess(true);
        setShowModal(false);
      }
    } catch (err) {
      alert("Server error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="min-h-screen bg-white flex items-center justify-center p-6 text-center"
      >
        <div className="max-w-md">
          <motion.div 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            transition={{ type: "spring", damping: 12 }}
            className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <PartyPopper className="w-12 h-12 text-green-600" />
          </motion.div>
          <h1 className="text-4xl font-black text-gray-900 mb-4">ଅଶେଷ ଧନ୍ୟବାଦ !</h1>
          <p className="text-xl text-green-700 font-bold mb-8">
            ଆପଣଙ୍କର ଏହି ମହତ ଦାନ ଅସହାୟଙ୍କ ଜୀବନରେ ଖୁସି ଭରିଦେବ ।
          </p>
          <button 
            onClick={() => window.location.href = "/"} 
            className="bg-gray-900 text-white px-10 py-4 rounded-2xl font-bold shadow-xl active:scale-95 transition-all"
          >
            ମୁଖ୍ୟ ପୃଷ୍ଠାକୁ ଫେରିଯାନ୍ତୁ
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20 font-sans">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100"
        >
          {/* Header */}
          <div className="bg-gray-900 p-10 text-center text-white relative">
             <Heart className="text-red-500 fill-red-500 w-12 h-12 mx-auto mb-4" />
             <h1 className="text-3xl md:text-5xl font-black mb-2 tracking-tight">Support Our Mission</h1>
             {/* UPDATED SLOGAN */}
             <p className="text-green-400 font-bold italic text-2xl tracking-wide">
               “ ମାନବ ସେବା ହିଁ ମାଧବ ସେବା ”
             </p>
          </div>

          <div className="p-8 md:p-12">
            <h3 className="text-xl font-black text-gray-800 mb-6 uppercase tracking-widest text-center">Select Amount</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 font-black">
              {presets.map(v => (
                <button 
                  key={v} 
                  type="button"
                  onClick={() => setAmount(v.toString())} 
                  className={`py-5 rounded-2xl text-xl transition-all ${
                    amount === v.toString() 
                    ? 'bg-[#16a34a] text-white shadow-xl scale-105' 
                    : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                  }`}
                >
                  ₹{v}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase ml-2 tracking-tighter">Full Name</label>
                  <input type="text" placeholder="ନାମ ଲେଖନ୍ତୁ" value={name} onChange={e => setName(e.target.value)} className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#16a34a] outline-none font-bold" required />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase ml-2 tracking-tighter">Phone</label>
                  <input type="tel" placeholder="ଫୋନ୍ ନମ୍ବର" value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#16a34a] outline-none font-bold" required />
                </div>
              </div>

              <div className="space-y-2">
                 <label className="text-xs font-black text-gray-400 uppercase ml-2 tracking-tighter">Amount (INR)</label>
                 <input type="number" placeholder="ଦାନ ରାଶି" value={amount} onChange={e => setAmount(e.target.value)} className="w-full px-6 py-5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#16a34a] outline-none font-black text-2xl text-green-700" required />
              </div>

              <div className="space-y-2">
                 <label className="text-xs font-black text-gray-400 uppercase ml-2 tracking-tighter">Address</label>
                 <textarea placeholder="ଆପଣଙ୍କ ଠିକଣା" value={address} onChange={e => setAddress(e.target.value)} rows={2} className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#16a34a] outline-none resize-none font-medium" />
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                className="w-full bg-[#16a34a] text-white py-6 rounded-3xl font-black text-xl shadow-2xl shadow-green-200 transition-all flex items-center justify-center gap-3"
              >
                Proceed to Pay ₹{amount || "0"}
              </motion.button>
            </form>

            <div className="mt-10 flex items-center justify-center gap-6 text-gray-400">
               <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest"><ShieldCheck size={16} /> Secure Payment</div>
               <div className="w-px h-4 bg-gray-200" />
               <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest"><Sparkles size={16} /> Sathi Foundation</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* PAYMENT MODAL */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-white rounded-[3rem] w-full max-w-lg p-8 relative shadow-2xl overflow-y-auto max-h-[90vh]" onClick={e => e.stopPropagation()}>
              <button onClick={() => setShowModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-red-500 transition-colors"><X size={30} /></button>

              <div className="text-center mb-8">
                <h2 className="text-2xl font-black text-gray-900 uppercase">Transfer Money</h2>
                <div className="inline-block mt-4 px-8 py-3 bg-green-50 text-green-700 rounded-full font-black text-3xl">₹{amount}</div>
              </div>

              <div className="bg-gray-50 rounded-[2.5rem] p-6 space-y-4 border border-gray-100 mb-8 font-bold">
                {[
                  { label: "Account No", value: "512703100000005" },
                  { label: "IFSC Code", value: "BKID00005127" },
                  { label: "Bank", value: "Bank of India, Barimunda" }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                    <span className="text-gray-400 text-xs uppercase tracking-tighter">{item.label}</span>
                    <button onClick={() => copyText(item.value, item.label)} className="flex items-center gap-2 font-black text-gray-800 hover:text-green-600 transition-colors">
                      {item.value} {copiedField === item.label ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                    </button>
                  </div>
                ))}
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-black text-gray-400 mb-3 ml-2 uppercase tracking-widest">Upload Payment Screenshot *</label>
                  <label className="flex flex-col items-center justify-center w-full p-8 border-2 border-dashed border-gray-200 rounded-3xl hover:border-green-500 hover:bg-green-50 transition-all cursor-pointer group">
                    <input type="file" accept="image/*" onChange={e => e.target.files && setScreenshot(e.target.files[0])} className="hidden" />
                    {screenshot ? (
                      <div className="flex items-center gap-3 text-green-600 font-bold"><Check /> {screenshot.name}</div>
                    ) : (
                      <div className="text-center font-bold text-gray-400"><Upload className="mx-auto mb-2" /> <span>ସ୍କ୍ରିନସଟ୍ ଅପଲୋଡ୍ କରନ୍ତୁ</span></div>
                    )}
                  </label>
                </div>

                <button onClick={submitDonation} disabled={submitting || !screenshot} className="w-full bg-gray-900 text-white py-6 rounded-2xl font-black text-lg shadow-xl disabled:opacity-50 transition-all active:scale-95">
                  {submitting ? "Processing..." : "Submit Proof"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Donate;