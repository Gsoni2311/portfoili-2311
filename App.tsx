
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GameState } from './types.ts';
import StartScreen from './components/StartScreen.tsx';
import ProfileScreen from './components/ProfileScreen.tsx';
import SkillsScreen from './components/SkillsScreen.tsx';
import WorldMap from './components/WorldMap.tsx';
import BossBattles from './components/BossBattles.tsx';
import ContactPortal from './components/ContactPortal.tsx';
import HUD from './components/HUD.tsx';
import { audioEngine } from './utils/AudioEngine.ts';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.START);
  const [xp, setXp] = useState(2400);
  const [level, setLevel] = useState(3);
  const [health, setHealth] = useState(100);
  const [achievement, setAchievement] = useState<string | null>(null);

  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [particles, setParticles] = useState<{ x: number, y: number, size: number, depth: number }[]>([]);

  useEffect(() => {
    const count = window.innerWidth < 768 ? 30 : 80;
    const p = Array.from({ length: count }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      depth: Math.random() * 0.12 + 0.02
    }));
    setParticles(p);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      const nx = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const ny = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      setParallaxOffset({ x: nx, y: ny });

      const target = e.target as HTMLElement;
      const clickable = target.closest('button, a, .clickable');
      if (clickable && !isHovering) {
        setIsHovering(true);
        audioEngine.playBlip();
      } else if (!clickable && isHovering) {
        setIsHovering(false);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isHovering]);

  const handleNavigate = (state: GameState) => {
    audioEngine.playSelect();
    setGameState(state);
    setXp(prev => {
      const newXp = prev + 50;
      if (newXp % 500 === 0) triggerAchievement("LEVEL UP!");
      return newXp;
    });
  };

  const triggerAchievement = (text: string) => {
    setAchievement(text);
    setTimeout(() => setAchievement(null), 3000);
  };

  return (
    <div className="relative w-screen min-h-screen overflow-x-hidden bg-slate-950 flex flex-col">
      <div className="absolute inset-0 pointer-events-none overflow-hidden bg-[#020617] z-0">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            animate={{
              x: parallaxOffset.x * p.depth * 300,
              y: parallaxOffset.y * p.depth * 300,
            }}
            transition={{ type: 'spring', damping: 60, stiffness: 30 }}
            className="absolute rounded-full bg-cyan-400/20"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size * (p.depth * 15),
              height: p.size * (p.depth * 15),
              opacity: p.depth * 4,
              filter: `blur(${p.depth * 2}px)`,
            }}
          />
        ))}
      </div>

      <div className={`custom-cursor ${isHovering ? 'hovering' : ''}`} style={{ left: mousePos.x, top: mousePos.y }} />

      <AnimatePresence>
        {achievement && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className="fixed top-20 right-4 md:right-8 z-[100] glass-panel px-5 py-3 border-cyan-500/50 rounded-xl flex items-center gap-4 shadow-xl"
          >
            <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center text-white text-xl">🏆</div>
            <div>
              <p className="text-[8px] font-gaming text-cyan-400 leading-none tracking-widest uppercase">Protocol Updated</p>
              <p className="text-xs font-gaming text-white uppercase mt-1">{achievement}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 w-full h-full flex flex-col overflow-hidden">
        {gameState !== GameState.START && (
          <HUD currentLevel={level} currentXP={xp} health={health} onHome={() => handleNavigate(GameState.START)} />
        )}

        <main className="flex-1 w-full overflow-y-auto">
          <div className="w-full min-h-full max-w-7xl mx-auto flex flex-col items-center px-4">
            <AnimatePresence mode="wait">
              {gameState === GameState.START && <StartScreen key="start" onStart={handleNavigate} />}
              {gameState === GameState.PROFILE && <ProfileScreen key="profile" />}
              {gameState === GameState.SKILLS && <SkillsScreen key="skills" />}
              {gameState === GameState.MAP && <WorldMap key="map" />}
              {gameState === GameState.BOSSES && <BossBattles key="bosses" />}
              {gameState === GameState.CONTACT && <ContactPortal key="contact" />}
            </AnimatePresence>
          </div>
        </main>

        {gameState !== GameState.START && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="w-full min-h-[4rem] md:min-h-[5rem] glass-panel border-t pb-6 md:pb-0 flex justify-around items-center"
          >
            {[
              { state: GameState.PROFILE, label: 'Profile', icon: '👤' },
              { state: GameState.SKILLS, label: 'Skills', icon: '⚡' },
              { state: GameState.MAP, label: 'Map', icon: '🗺️' },
              { state: GameState.BOSSES, label: 'Bosses', icon: '👑' },
              { state: GameState.CONTACT, label: 'Portal', icon: '🚪' },
            ].map((item) => (
              <button
                key={item.state}
                onClick={() => handleNavigate(item.state)}
                className={`flex flex-col items-center justify-center gap-1 transition-all px-3 md:px-8 h-12 md:h-14 rounded-xl relative group ${gameState === item.state ? 'text-cyan-400' : 'text-slate-500 hover:text-slate-300'
                  }`}
              >
                {gameState === item.state && (
                  <motion.div layoutId="nav-active" className="absolute inset-0 bg-cyan-500/10 border border-cyan-500/30 rounded-xl" />
                )}
                <span className="text-xl md:text-2xl z-10">{item.icon}</span>
                <span className="text-[7px] md:text-[9px] font-gaming uppercase tracking-widest z-10">
                  {item.label}
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default App;
