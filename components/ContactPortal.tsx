
import React from 'react';
import { motion } from 'framer-motion';
import { Send, Zap, Radio, Terminal } from 'lucide-react';

const ContactPortal: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl w-full h-full overflow-y-auto custom-scrollbar p-4 md:p-8 pb-32 md:pb-24"
    >
      <div className="relative mb-8 md:mb-12 flex flex-col items-center shrink-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ scale: [1, 1.3, 1], rotate: 360, opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="w-64 h-64 md:w-96 md:h-96 border-2 border-cyan-500/20 rounded-full border-dashed"
          />
        </div>

        <div className="p-4 md:p-6 bg-cyan-500/10 rounded-full border border-cyan-500/30 relative shadow-2xl">
          <Radio className="w-8 h-8 md:w-12 md:h-12 text-cyan-400 animate-pulse" />
        </div>
        <h2 className="mt-6 md:mt-8 text-xl md:text-3xl font-gaming text-white uppercase tracking-widest text-center">SIGNAL PORTAL</h2>
        <p className="text-[8px] md:text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-1 text-center">Establishing encrypted uplink...</p>
      </div>

      <div className="glass-panel p-5 md:p-10 rounded-2xl md:rounded-3xl border border-slate-700/50 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Terminal className="w-4 h-4 md:w-6 md:h-6 text-cyan-500" />
        </div>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-1.5">
            <label className="text-[8px] md:text-[10px] font-gaming text-slate-500 uppercase tracking-widest ml-1">Origin Identifier</label>
            <input 
              type="text" 
              placeholder="YOUR_HANDLE"
              className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-xs md:text-sm text-white focus:outline-none focus:border-cyan-500 transition-all font-mono shadow-inner"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[8px] md:text-[10px] font-gaming text-slate-500 uppercase tracking-widest ml-1">Frequency Address</label>
            <input 
              type="email" 
              placeholder="YOUR_EMAIL"
              className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-xs md:text-sm text-white focus:outline-none focus:border-cyan-500 transition-all font-mono shadow-inner"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[8px] md:text-[10px] font-gaming text-slate-500 uppercase tracking-widest ml-1">Mission Details</label>
            <textarea 
              rows={4}
              placeholder="MESSAGE_CONTENT..."
              className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-xs md:text-sm text-white focus:outline-none focus:border-cyan-500 transition-all font-mono resize-none shadow-inner"
            />
          </div>

          <button className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 transition-all rounded-xl border border-white/5 flex items-center justify-center gap-3 group relative overflow-hidden shadow-xl active:scale-[0.98]">
            <span className="text-[10px] md:text-sm font-gaming text-white uppercase tracking-widest z-10">INITIATE_UPLINK</span>
            <Send className="w-4 h-4 text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform z-10" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-800/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {['LN', 'GH', 'DR', 'IG'].map(social => (
              <button key={social} className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-[9px] font-gaming text-slate-500 hover:text-cyan-400 hover:border-cyan-500 transition-all">
                {social}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <Zap className="w-3 h-3 text-yellow-500" />
            <span className="text-[8px] md:text-[10px] font-gaming uppercase">LATENCY: LOW</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactPortal;
