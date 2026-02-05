
import React from 'react';
import { motion } from 'framer-motion';
import { Award, Star, Clock, UserCheck, ScrollText, Binary } from 'lucide-react';

const ProfileScreen: React.FC = () => {
  const stats = [
    { label: 'UI_ARCHITECTURE', value: 95, color: 'bg-cyan-400' },
    { label: 'UX_REASONING', value: 88, color: 'bg-blue-400' },
    { label: 'MOTION_DYNAMICS', value: 96, color: 'bg-red-400' },
    { label: 'PROTOTYPE_STABILITY', value: 95, color: 'bg-purple-400' },
    { label: 'VISUAL_FIDELITY', value: 90, color: 'bg-indigo-400' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="max-w-6xl w-full h-full overflow-y-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start p-6 md:p-12 custom-scrollbar scroll-smooth pb-40"
    >
      <div className="flex flex-col gap-8 w-full">
        <div className="glass-panel p-8 md:p-12 rounded-[2.5rem] border border-slate-700/50 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-8">
            <Binary className="w-12 h-12 text-cyan-400 opacity-10 animate-pulse" />
          </div>
          
          <div className="flex items-center gap-8 mb-10">
            <div className="w-24 h-24 md:w-36 md:h-36 rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-5xl md:text-7xl shadow-[0_0_30px_rgba(6,182,212,0.3)] border border-white/20 shrink-0 transform rotate-3">
              👨‍💻
            </div>
            <div className="min-w-0">
              <h2 className="text-2xl md:text-5xl font-gaming text-white truncate uppercase tracking-tighter">GAUTAM_SONI</h2>
              <div className="flex items-center gap-3 mt-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                <p className="text-cyan-400 font-gaming text-[10px] md:text-sm tracking-[0.4em] uppercase">SYSTEM_OPERATOR | LVL_03</p>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12 p-6 md:p-8 bg-slate-950/60 rounded-3xl border border-slate-800/80 shadow-inner relative group"
          >
            <div className="flex items-center gap-3 mb-5">
              <ScrollText className="w-4 h-4 text-cyan-400" />
              <span className="text-[10px] md:text-xs font-gaming text-cyan-400 uppercase tracking-[0.3em]">CORE_MANIFESTO / BIO_SYNC</span>
            </div>
            <p className="text-xs md:text-base text-slate-300 leading-relaxed font-sans italic opacity-90 group-hover:opacity-100 transition-opacity">
              I’m Gautam Soni, a high-frequency Creative Video Editor and UI/UX Architect dedicated to synthesizing complex data into immersive digital experiences. With a technical core in B.Tech Electronics, I bridge the gap between abstract engineering and human-centric design, building interfaces that don't just work—they resonate.
            </p>
            <div className="absolute -bottom-2 -right-2 p-2 bg-slate-900 border border-slate-800 rounded-lg">
               <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            </div>
          </motion.div>

          <div className="space-y-6 md:space-y-8">
            {stats.map((stat, idx) => (
              <div key={stat.label} className="space-y-2 md:space-y-3">
                <div className="flex justify-between text-[9px] md:text-xs font-gaming text-slate-500 tracking-[0.3em] uppercase">
                  <span>{stat.label}</span>
                  <span className="text-cyan-400">{stat.value}%</span>
                </div>
                <div className="h-2 md:h-3.5 bg-slate-950 rounded-full border border-slate-800/80 overflow-hidden p-[2px] shadow-inner">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${stat.value}%` }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.1 * idx }}
                    className={`h-full rounded-full ${stat.color} shadow-[0_0_15px_rgba(6,182,212,0.5)]`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="glass-panel p-6 md:p-10 rounded-3xl border border-slate-700/50 flex flex-col items-center text-center shadow-xl group hover:border-emerald-500/50 transition-all">
            <Clock className="w-8 h-8 md:w-12 md:h-12 text-emerald-400 mb-4 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] md:text-xs font-gaming text-slate-500 uppercase tracking-widest">Operation_Time</span>
            <span className="text-xl md:text-3xl font-gaming text-white mt-1">3+ YRS</span>
          </div>
          <div className="glass-panel p-6 md:p-10 rounded-3xl border border-slate-700/50 flex flex-col items-center text-center shadow-xl group hover:border-yellow-500/50 transition-all">
            <Star className="w-8 h-8 md:w-12 md:h-12 text-yellow-400 mb-4 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] md:text-xs font-gaming text-slate-500 uppercase tracking-widest">Deploy_Count</span>
            <span className="text-xl md:text-3xl font-gaming text-white mt-1">12+ PJS</span>
          </div>
        </div>
      </div>

      <div className="glass-panel p-8 md:p-12 rounded-[2.5rem] border border-slate-700/50 h-auto shadow-2xl relative overflow-hidden">
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-yellow-500/5 rounded-full blur-[100px]" />
        
        <h3 className="text-xl md:text-3xl font-gaming text-white mb-8 md:mb-12 flex items-center gap-4 border-b border-slate-800/80 pb-6 uppercase tracking-widest">
          <Award className="w-8 h-8 text-yellow-500 animate-bounce" /> MEDAL_VAULT
        </h3>
        
        <div className="space-y-6">
          {[
            { title: 'VISUAL_WIZARD', desc: 'Synthesized 100+ high-fidelity design modules.' },
            { title: 'RETAINER_PRIME', desc: 'Boosted engagement architecture by 40% across platforms.' },
            { title: 'KINETIC_EXPERT', desc: 'Mastery over high-frequency cinematic editing workflows.' },
            { title: 'AI_SYNTHESIST', desc: 'Leading interface experiments in generative AI integration.' },
            { title: 'SYSTEM_ARCHITECT', desc: 'Engineered comprehensive design systems from zero-state.' },
          ].map((item, i) => (
            <motion.div 
              key={item.title}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + (i * 0.1) }}
              className="p-6 md:p-8 bg-slate-900/60 border border-slate-800/80 rounded-3xl hover:border-cyan-500/40 transition-all group cursor-default"
            >
              <h4 className="text-xs md:text-base font-gaming text-cyan-400 mb-2 group-hover:text-white transition-colors uppercase tracking-widest">{item.title}</h4>
              <p className="text-[10px] md:text-sm text-slate-500 leading-relaxed group-hover:text-slate-300 transition-colors uppercase tracking-wider">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileScreen;
