
import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Zap, TrendingUp, Home } from 'lucide-react';

interface HUDProps {
  currentLevel: number;
  currentXP: number;
  health: number;
  onHome: () => void;
}

const HUD: React.FC<HUDProps> = ({ currentLevel, currentXP, health, onHome }) => {
  return (
    <motion.header 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="w-full px-4 md:px-8 py-2 md:py-3 flex items-center justify-between gap-4 z-50 glass-panel border-b border-slate-800 shrink-0"
    >
      <div className="flex items-center gap-4 md:gap-8">
        <button 
          onClick={onHome}
          className="p-2 md:p-2.5 bg-slate-800/80 rounded-lg hover:bg-cyan-600 transition-all border border-slate-700 shadow-lg group"
        >
          <Home className="w-4 h-4 md:w-5 md:h-5 text-cyan-400 group-hover:text-white" />
        </button>
        
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-[7px] md:text-[9px] font-gaming text-slate-500 uppercase tracking-widest">
            <Activity className="w-2.5 h-2.5 text-red-500" /> HP_SYNC
          </div>
          <div className="w-20 md:w-48 h-1.5 md:h-2 bg-slate-950 rounded-full border border-slate-800 overflow-hidden shadow-inner">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${health}%` }}
              className="h-full bg-gradient-to-r from-red-600 via-orange-500 to-emerald-500 rounded-full"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-10">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="p-1.5 md:p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
            <TrendingUp className="w-3.5 h-3.5 md:w-4 md:h-4 text-cyan-400" />
          </div>
          <div className="flex flex-col">
            <span className="text-[7px] md:text-[8px] font-gaming text-slate-500 uppercase leading-none">LVL</span>
            <span className="text-xs md:text-base font-gaming text-white leading-none mt-0.5">{currentLevel}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <div className="p-1.5 md:p-2 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
            <Zap className="w-3.5 h-3.5 md:w-4 md:h-4 text-yellow-400" />
          </div>
          <div className="flex flex-col">
            <span className="text-[7px] md:text-[8px] font-gaming text-slate-500 uppercase leading-none">XP</span>
            <span className="text-xs md:text-base font-gaming text-white leading-none mt-0.5">
              {currentXP >= 1000 ? `${(currentXP / 1000).toFixed(1)}K` : currentXP}
            </span>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default HUD;
