
import React from 'react';
import { motion } from 'framer-motion';
import { GameState } from '../types.ts';
import { Play, User, Zap, Map as MapIcon, Shield, Send } from 'lucide-react';

interface StartScreenProps {
  onStart: (state: GameState) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const menuItems = [
    { label: 'Start Game', state: GameState.MAP, icon: <Play className="w-4 h-4 md:w-5 md:h-5" />, color: 'text-cyan-400' },
    { label: 'Profile', state: GameState.PROFILE, icon: <User className="w-4 h-4 md:w-5 md:h-5" />, color: 'text-blue-400' },
    { label: 'Power-Ups', state: GameState.SKILLS, icon: <Zap className="w-4 h-4 md:w-5 md:h-5" />, color: 'text-yellow-400' },
    { label: 'Mission Map', state: GameState.MAP, icon: <MapIcon className="w-4 h-4 md:w-5 md:h-5" />, color: 'text-emerald-400' },
    { label: 'Bosses', state: GameState.BOSSES, icon: <Shield className="w-4 h-4 md:w-5 md:h-5" />, color: 'text-red-400' },
    { label: 'Contact', state: GameState.CONTACT, icon: <Send className="w-4 h-4 md:w-5 md:h-5" />, color: 'text-purple-400' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      className="flex flex-col items-center justify-center text-center p-4 md:p-8 max-w-4xl w-full h-full overflow-y-auto custom-scrollbar"
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="mb-8 md:mb-12 shrink-0"
      >
        <h1 className="text-3xl md:text-7xl font-gaming font-black tracking-tighter mb-1 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
          GAUTAM'S
        </h1>
        <h2 className="text-2xl md:text-6xl font-gaming font-black tracking-widest text-cyan-400 neon-text-cyan leading-tight">
          CAREER QUEST
        </h2>
        <div className="h-1 w-24 md:w-48 bg-cyan-500/50 mx-auto mt-4 rounded-full blur-[1px]" />
        <p className="mt-4 text-[10px] md:text-xs text-slate-500 font-mono tracking-widest animate-pulse uppercase">
          Initializing interactive interface...
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl px-2">
        {menuItems.map((item, idx) => (
          <motion.button
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + idx * 0.05 }}
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onStart(item.state)}
            className="flex items-center gap-3 md:gap-4 p-3.5 md:p-4 glass-panel border border-slate-700/50 rounded-xl hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all text-left group shadow-lg"
          >
            <div className={`${item.color} p-2 bg-slate-900 rounded-lg group-hover:shadow-[0_0_10px_rgba(6,182,212,0.3)] transition-all`}>
              {item.icon}
            </div>
            <span className="font-gaming text-[11px] md:text-sm uppercase tracking-widest text-slate-300 group-hover:text-white">
              {item.label}
            </span>
            <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping" />
            </div>
          </motion.button>
        ))}
      </div>

      <div className="mt-12 md:mt-16 flex flex-wrap justify-center items-center gap-3 md:gap-4 text-slate-600 text-[8px] md:text-[10px] font-mono uppercase tracking-[0.2em] shrink-0 opacity-60">
        <span>STABLE_BUILD_2024</span>
        <span className="w-1 h-1 bg-slate-800 rounded-full" />
        <span>TOUCH_INPUT_ENABLED</span>
        <span className="w-1 h-1 bg-slate-800 rounded-full" />
        <span>G. SONI PROTOCAL</span>
      </div>
    </motion.div>
  );
};

export default StartScreen;
