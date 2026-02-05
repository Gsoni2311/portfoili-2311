
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BOSSES } from '../constants.ts';
import { Swords, ShieldAlert, Zap, Heart, TrendingUp, Trophy, User, Sparkles, Building2, Radio, Cpu, BookOpen } from 'lucide-react';
import { audioEngine } from '../utils/AudioEngine.ts';
import { Boss } from '../types.ts';

type BattleState = 'LIST' | 'NAME' | 'QUIZ' | 'RESULT';

const MASTER_QUIZ_POOL = [
  { q: "What does UX stand for?", a: "User Experience", options: ["User Exchange", "User Experience", "User Expansion"] },
  { q: "Which tool is for vector UI?", a: "Figma", options: ["Photoshop", "Figma", "Excel"] },
  { q: "A 'Wireframe' is for?", a: "Structure", options: ["Color Palette", "Structure", "Polish"] },
  { q: "What is 'White Space'?", a: "Negative space", options: ["Negative space", "Unused layer", "Blank page"] },
  { q: "What is 'Affordance'?", a: "Clues to usage", options: ["Visual beauty", "Clues to usage", "Project cost"] },
  { q: "CTA usually is a?", a: "Button/Link", options: ["Button/Link", "Footer text", "Popup ads"] },
  { q: "Format for web icons?", a: "SVG", options: ["JPG", "PNG", "SVG"] },
];

const BossCard: React.FC<{ boss: Boss, onBattle: () => void }> = ({ boss, onBattle }) => {
  const getBossTheme = () => {
    if (boss.id === 'logam-hq') return { color: 'cyan', icon: <Radio className="w-full h-full text-cyan-500" /> };
    if (boss.id === 'b1') return { color: 'purple', icon: <Cpu className="w-full h-full text-purple-500" /> };
    return { color: 'emerald', icon: <BookOpen className="w-full h-full text-emerald-500" /> };
  };

  const theme = getBossTheme();
  const themeClasses = {
    cyan: { border: 'border-cyan-500/40', text: 'text-cyan-400', bg: 'bg-cyan-600/20', hover: 'hover:bg-cyan-600', glow: 'neon-text-cyan', shadow: 'shadow-cyan-500/50' },
    purple: { border: 'border-purple-500/40', text: 'text-purple-400', bg: 'bg-purple-600/20', hover: 'hover:bg-purple-600', glow: 'text-purple-400', shadow: 'shadow-purple-500/50' },
    emerald: { border: 'border-emerald-500/40', text: 'text-emerald-400', bg: 'bg-emerald-600/20', hover: 'hover:bg-emerald-600', glow: 'text-emerald-400', shadow: 'shadow-emerald-500/50' }
  }[theme.color as 'cyan' | 'purple' | 'emerald'];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className={`glass-panel p-6 md:p-10 rounded-3xl border ${themeClasses.border} relative overflow-hidden flex flex-col lg:flex-row gap-8 group shadow-3xl bg-slate-900/40 mb-10`}
    >
      <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity w-32 h-32 md:w-48 md:h-48">
        {theme.icon}
      </div>

      <div className="flex flex-col items-center shrink-0">
        <div className={`w-24 h-24 md:w-40 md:h-40 rounded-full bg-slate-950 border-4 border-${theme.color}-900 flex items-center justify-center text-5xl md:text-7xl shadow-2xl group-hover:scale-105 transition-transform duration-500`}>
          {boss.avatar}
        </div>
        <div className="mt-6 flex flex-col items-center w-full">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-3 h-3 text-yellow-400 fill-current" />
            <span className="text-[8px] md:text-[10px] font-gaming text-slate-500 uppercase tracking-widest">Operational Capacity</span>
          </div>
          <div className="w-full h-2.5 bg-slate-950 rounded-full border border-slate-800 p-0.5 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${boss.hp}%` }}
              className={`h-full bg-gradient-to-r from-${theme.color}-600 to-indigo-500 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.5)]`}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-6 text-center lg:text-left">
        <div>
          <h3 className="text-2xl md:text-4xl font-gaming text-white uppercase leading-none tracking-tighter mb-2">{boss.name}</h3>
          <p className={`text-[10px] md:text-xs font-gaming ${themeClasses.text} uppercase tracking-[0.4em] mb-4`}>{boss.title}</p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {Object.entries(boss.stats).map(([key, val]) => (
            <div key={key} className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800 flex flex-col items-center shadow-xl">
              <span className="text-[7px] md:text-[9px] font-gaming text-slate-500 uppercase mb-1">{key}</span>
              <span className="text-sm md:text-xl font-gaming text-white">{val}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center lg:justify-start gap-2">
          {boss.achievements.map((ach) => (
            <span key={ach} className="px-3 py-1 bg-slate-900/80 border border-slate-700 rounded-lg text-[8px] md:text-[10px] font-gaming text-slate-300">
              #{ach.toUpperCase().replace(/\s/g, '_')}
            </span>
          ))}
        </div>
        
        <button onClick={onBattle} className={`w-full py-4 ${themeClasses.bg} border ${themeClasses.border.replace('40', '50')} rounded-2xl ${themeClasses.text} hover:text-white font-gaming text-[10px] md:text-xs uppercase tracking-[0.3em] transition-all active:scale-95 shadow-2xl ${themeClasses.hover}`}>
          Initiate Sector Protocol
        </button>
      </div>
    </motion.div>
  );
};

const BossBattles: React.FC = () => {
  const [battleState, setBattleState] = useState<BattleState>('LIST');
  const [playerName, setPlayerName] = useState('');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [score, setScore] = useState(0);
  
  const quizQuestions = useMemo(() => {
    return [...MASTER_QUIZ_POOL]
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);
  }, [battleState === 'NAME']);

  const startBattle = () => {
    audioEngine.playMissionStart();
    setBattleState('NAME');
  };

  const handleAnswer = (option: string) => {
    if (option === quizQuestions[currentQuestionIdx].a) {
      setScore(s => s + 1);
      audioEngine.playSelect();
    } else {
      audioEngine.playBlip();
    }

    if (currentQuestionIdx < quizQuestions.length - 1) {
      setCurrentQuestionIdx(q => q + 1);
    } else {
      setBattleState('RESULT');
    }
  };

  const resetBattle = () => {
    setBattleState('LIST');
    setPlayerName('');
    setCurrentQuestionIdx(0);
    setScore(0);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl w-full h-full p-3 md:p-8 overflow-y-auto custom-scrollbar flex flex-col items-center pb-32 md:pb-24"
    >
      <AnimatePresence mode="wait">
        {battleState === 'LIST' && (
          <motion.div key="list" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="w-full">
            <div className="flex flex-col items-center mb-10 text-center">
              <Building2 className="w-8 h-8 md:w-12 md:h-12 text-cyan-500 mb-3 animate-pulse" />
              <h2 className="text-xl md:text-3xl font-gaming text-white uppercase tracking-widest">MISSION SECTORS</h2>
              <p className="text-[8px] md:text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-1">Engage Career HQ Protocols</p>
            </div>

            <div className="space-y-4">
              {BOSSES.map((boss) => (
                <BossCard key={boss.id} boss={boss} onBattle={startBattle} />
              ))}
            </div>
          </motion.div>
        )}

        {battleState === 'NAME' && (
          <motion.div key="name" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-panel p-6 md:p-12 rounded-2xl md:rounded-3xl border border-cyan-500/30 max-w-sm w-full flex flex-col items-center gap-6 shadow-2xl">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-cyan-500/10 rounded-full border border-cyan-500/30 flex items-center justify-center">
              <User className="w-6 h-6 md:w-8 md:h-8 text-cyan-400" />
            </div>
            <div className="text-center">
              <h3 className="text-base md:text-xl font-gaming text-white uppercase tracking-widest">AUTHENTICATION</h3>
              <p className="text-[8px] md:text-[10px] font-mono text-slate-500 mt-1 uppercase">Enter player credentials</p>
            </div>
            <input 
              type="text" value={playerName} onChange={(e) => setPlayerName(e.target.value)} placeholder="ENTER_NAME"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-all text-center font-gaming text-base tracking-widest shadow-inner"
              autoFocus onKeyDown={(e) => e.key === 'Enter' && playerName && setBattleState('QUIZ')}
            />
            <button disabled={!playerName} onClick={() => setBattleState('QUIZ')} className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-30 rounded-xl font-gaming text-xs text-white uppercase tracking-widest transition-all shadow-lg active:scale-95">
              Confirm Intel
            </button>
          </motion.div>
        )}

        {battleState === 'QUIZ' && (
          <motion.div key="quiz" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-panel p-5 md:p-10 rounded-2xl md:rounded-3xl border border-cyan-500/20 max-w-md w-full shadow-2xl">
            <div className="flex justify-between items-center mb-6 border-b border-slate-800/50 pb-3">
              <span className="text-[8px] md:text-[10px] font-gaming text-cyan-400 uppercase">STEP {currentQuestionIdx + 1}/{quizQuestions.length}</span>
              <div className="flex items-center gap-1.5">
                <span className="text-[8px] md:text-[10px] font-gaming text-slate-500 uppercase truncate max-w-[80px]">{playerName}</span>
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              </div>
            </div>
            <h3 className="text-sm md:text-xl font-gaming text-white mb-6 leading-relaxed uppercase tracking-tight">
              {quizQuestions[currentQuestionIdx].q}
            </h3>
            <div className="grid grid-cols-1 gap-2.5">
              {quizQuestions[currentQuestionIdx].options.map((opt) => (
                <button
                  key={opt} onClick={() => handleAnswer(opt)}
                  className="w-full p-4 bg-slate-950/80 hover:bg-cyan-900 border border-slate-800 hover:border-cyan-500 rounded-xl transition-all text-left font-gaming text-[10px] md:text-xs text-slate-400 hover:text-white flex items-center justify-between group active:scale-[0.98]"
                >
                  <span className="truncate pr-2">{opt}</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-800 group-hover:bg-cyan-400 shrink-0" />
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {battleState === 'RESULT' && (
          <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-panel p-6 md:p-12 rounded-2xl md:rounded-3xl border border-emerald-500/30 max-w-xl w-full text-center shadow-2xl">
            <Trophy className="w-12 h-12 md:w-20 md:h-20 text-yellow-500 mx-auto mb-4 animate-bounce" />
            <h3 className="text-xl md:text-3xl font-gaming text-white uppercase mb-2 tracking-tighter">DATA SYNC COMPLETE</h3>
            <div className="text-sm md:text-xl font-gaming text-emerald-400 mb-6 bg-emerald-500/10 inline-block px-4 py-1.5 rounded-full border border-emerald-500/20">
              SUCCESS RATE: {Math.round((score/quizQuestions.length)*100)}%
            </div>
            
            <div className="text-xs md:text-base text-slate-400 leading-relaxed mb-8 italic px-2">
              {score === quizQuestions.length ? (
                <p>"Absolute precision. Your understanding of the design protocol is unparalleled. Proceed to higher difficulty."</p>
              ) : (
                <p>"Functional validation confirmed, {playerName}. Some minor data errors detected. Review documentation for optimal performance."</p>
              )}
            </div>

            <button onClick={resetBattle} className="px-8 md:px-12 py-3 md:py-4 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500 rounded-xl font-gaming text-[9px] md:text-xs text-white uppercase tracking-widest transition-all active:scale-95 shadow-xl">
              RETURN_TO_HQ
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default BossBattles;
