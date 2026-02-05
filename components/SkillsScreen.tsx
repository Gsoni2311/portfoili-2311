
import React from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '../constants.ts';
import { Package, Sparkles } from 'lucide-react';

const SkillsScreen: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-5xl w-full h-full flex flex-col p-4 md:p-8"
    >
      <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8 shrink-0">
        <div className="p-2.5 md:p-3 bg-yellow-500/10 rounded-xl border border-yellow-500/20 shadow-lg">
          <Package className="w-5 h-5 md:w-6 md:h-6 text-yellow-500" />
        </div>
        <div>
          <h2 className="text-lg md:text-2xl font-gaming text-white uppercase tracking-widest">POWER-UP INVENTORY</h2>
          <p className="text-[8px] md:text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-0.5">Tactical arsenal of design tools</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 pb-32 md:pb-24">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {SKILLS.map((skill, idx) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
              whileHover={{ y: -3 }}
              className="glass-panel p-4 md:p-6 rounded-2xl border border-slate-700/30 relative group cursor-pointer overflow-hidden min-h-[160px] md:min-h-[180px] shadow-lg"
            >
              <div className={`absolute -bottom-4 -right-4 w-12 h-12 md:w-16 md:h-16 rounded-full blur-2xl opacity-10 group-hover:opacity-30 transition-opacity bg-cyan-400`} />
              
              <div className="text-3xl md:text-4xl mb-3 md:mb-4 group-hover:scale-110 transition-transform origin-left">
                {skill.icon}
              </div>
              
              <h3 className="text-xs md:text-lg font-gaming text-white mb-0.5 uppercase truncate">{skill.name}</h3>
              <p className="text-[7px] md:text-[9px] text-slate-500 uppercase font-mono mb-3 md:mb-4 line-clamp-1">{skill.description}</p>
              
              <div className="w-full h-1 md:h-1.5 bg-slate-950 rounded-full overflow-hidden shadow-inner border border-slate-900">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
                  className={`h-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.4)]`}
                />
              </div>
              
              <div className="mt-2 flex justify-between items-center">
                <span className="text-[7px] md:text-[9px] font-gaming text-slate-500 uppercase">MASTERY</span>
                <span className="text-[7px] md:text-[9px] font-gaming text-cyan-400">{skill.level}%</span>
              </div>

              <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-[6px] font-gaming text-slate-500 uppercase">
                LVL_MAX
              </div>
            </motion.div>
          ))}

          {/* Empty Slots */}
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={`locked-${i}`} className="glass-panel p-4 rounded-2xl border border-slate-800/40 flex flex-col items-center justify-center grayscale opacity-20 min-h-[160px] border-dashed">
              <div className="text-2xl mb-2 text-slate-700">🔒</div>
              <div className="w-10 h-1 bg-slate-800 rounded-full" />
            </div>
          ))}
        </div>

        <div className="mt-8 md:mt-12 glass-panel p-4 md:p-6 rounded-2xl border border-slate-800/60 flex flex-col sm:flex-row items-center gap-4 md:gap-6 shadow-xl">
          <div className="p-3 bg-cyan-500/10 rounded-full border border-cyan-500/20 shadow-inner">
            <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-cyan-400" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h4 className="text-[10px] md:text-sm font-gaming text-white uppercase mb-1">Synergy Module Active</h4>
            <p className="text-[9px] md:text-xs text-slate-500 leading-relaxed uppercase tracking-wider">Interface design + motion speed boosted by +15%</p>
          </div>
          <button className="w-full sm:w-auto px-6 py-2.5 bg-slate-900 border border-slate-700 rounded-lg font-gaming text-[8px] md:text-[10px] text-slate-400 uppercase hover:text-white transition-all active:scale-95">
            Optimize Buffs
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SkillsScreen;
