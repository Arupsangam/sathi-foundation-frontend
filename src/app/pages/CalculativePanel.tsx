import { motion } from "motion/react";
import { TrendingUp, Users, Heart, DollarSign, ArrowUpRight, Activity, Wallet } from "lucide-react";

const CalculativePanel = ({ members, donations, stories }) => {
  // Calculations
  const totalMembers = members?.length || 0;
  const totalDonationAmount = donations?.reduce((acc, curr) => acc + Number(curr.amount), 0) || 0;
  const avgDonation = totalMembers > 0 ? (totalDonationAmount / totalMembers).toFixed(2) : 0;
  const successRate = stories?.length > 0 ? "94%" : "0%";

  const stats = [
    {
      label: "Total Collection",
      value: `₹${totalDonationAmount.toLocaleString('en-IN')}`,
      icon: Wallet,
      color: "from-green-500 to-emerald-700",
      trend: "+12.5%",
      desc: "Gross donation impact"
    },
    {
      label: "Active Members",
      value: totalMembers,
      icon: Users,
      color: "from-blue-500 to-indigo-700",
      trend: "+4.2%",
      desc: "Verified volunteers"
    },
    {
      label: "Avg. Support",
      value: `₹${avgDonation}`,
      icon: Activity,
      color: "from-orange-500 to-red-600",
      trend: "+18%",
      desc: "Contribution per head"
    },
    {
      label: "Help Success",
      value: successRate,
      icon: Award,
      color: "from-purple-500 to-pink-700",
      trend: "Steady",
      desc: "Case resolution rate"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          whileHover={{ y: -5 }}
          className="relative bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden group transition-all hover:shadow-xl hover:shadow-slate-200/50"
        >
          {/* Background Decorative Icon */}
          <stat.icon className="absolute -right-4 -bottom-4 w-24 h-24 opacity-[0.03] group-hover:scale-110 transition-transform duration-500" />

          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl bg-gradient-to-br ${stat.color} text-white shadow-lg shadow-inherit/20`}>
                <stat.icon size={20} />
              </div>
              <div className="flex items-center gap-1 text-[10px] font-black text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                <TrendingUp size={10} />
                {stat.trend}
              </div>
            </div>

            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-1">
                {stat.label}
              </p>
              <h3 className="text-2xl font-black text-slate-900 tracking-tighter">
                {stat.value}
              </h3>
              <p className="text-[10px] text-slate-400 font-medium mt-2 flex items-center gap-1">
                <ArrowUpRight size={12} className="text-slate-300" />
                {stat.desc}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
      
      {/* Calculative Summary Card (Wide) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="md:col-span-2 lg:col-span-4 bg-slate-900 rounded-[3rem] p-8 text-white flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-800 shadow-2xl"
      >
        <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full border-4 border-green-500/30 flex items-center justify-center relative">
                <div className="absolute inset-0 rounded-full border-t-4 border-green-500 animate-spin" />
                <span className="font-black text-xl">82%</span>
            </div>
            <div>
                <h4 className="text-lg font-black tracking-tight uppercase">Monthly Goal reached</h4>
                <p className="text-slate-400 text-sm">We are ₹12,000 away from this month's target.</p>
            </div>
        </div>

        <div className="flex gap-4">
            <button className="bg-white text-black px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-green-500 hover:text-white transition-colors">
                Generate Report
            </button>
            <button className="bg-white/10 backdrop-blur-md text-white border border-white/10 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-all">
                Analytics Details
            </button>
        </div>
      </motion.div>
    </div>
  );
};

export default CalculativePanel;