
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../constants.ts';
import { X, Target, Zap, Search, Globe, ScrollText, Play, Cpu, Film, ChevronLeft, ChevronRight, PenTool, Layout, Layers, MousePointer2, Briefcase, Eye } from 'lucide-react';
import { Project } from '../types.ts';
import { audioEngine } from '../utils/AudioEngine.ts';

const TypewriterText: React.FC<{ text: string }> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    setDisplayedText('');
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 10);
    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayedText}</span>;
};

const ProjectBriefing: React.FC<{ project: Project, onClose: () => void }> = ({ project, onClose }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md"
    >
      <div className="glass-panel w-full max-w-4xl max-h-[85vh] overflow-hidden rounded-[2rem] border border-cyan-500/30 flex flex-col md:flex-row shadow-2xl">
        <div className="w-full md:w-5/12 h-40 md:h-auto relative overflow-hidden shrink-0">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8">
            <h4 className="text-lg md:text-2xl font-gaming text-white uppercase leading-tight neon-text-cyan">{project.title}</h4>
          </div>
        </div>
        
        <div className="flex-1 p-5 md:p-10 overflow-y-auto custom-scrollbar bg-slate-900/40">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
              <span className="text-[9px] font-gaming text-cyan-400 uppercase tracking-widest">ENCRYPTED_UPLINK</span>
            </div>
            <button onClick={onClose} className="p-2 bg-slate-800 rounded-full hover:bg-red-600 transition-all">
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-cyan-400 text-[8px] md:text-[9px] font-gaming uppercase">
                  <Target className="w-3.5 h-3.5" /> Directive
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed"><TypewriterText text={project.fullStory.objective} /></p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-orange-400 text-[8px] md:text-[9px] font-gaming uppercase">
                  <Search className="w-3.5 h-3.5" /> Challenge
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed"><TypewriterText text={project.fullStory.problem} /></p>
              </div>
            </div>

            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 border-l-4 border-l-cyan-500">
               <div className="text-cyan-400 text-[8px] font-gaming uppercase mb-2 flex items-center gap-2">
                 <Zap className="w-3.5 h-3.5" /> Strategy
               </div>
               <p className="text-xs text-slate-100 italic">"<TypewriterText text={project.fullStory.strategy} />"</p>
            </div>

            <div className="space-y-2">
              <div className="text-emerald-400 text-[8px] font-gaming uppercase flex items-center gap-2">
                <Layout className="w-3.5 h-3.5" /> Outcome
              </div>
              <p className="text-[11px] text-slate-300"><TypewriterText text={project.fullStory.result} /></p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const BlueprintGallery: React.FC<{ projects: Project[], onClose: () => void, zone: string }> = ({ projects, onClose, zone }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const isUX = zone === 'UI/UX Design';
  
  const theme = {
    color: isUX ? 'text-cyan-400' : 'text-purple-400',
    border: isUX ? 'border-cyan-500/30' : 'border-purple-500/30',
    bg: isUX ? 'bg-cyan-500/10' : 'bg-purple-500/10',
    icon: isUX ? <Layout className="w-5 h-5" /> : <PenTool className="w-5 h-5" />,
    label: isUX ? 'DESIGN LAB' : 'CREATIVE STUDIO',
    subLabel: isUX ? 'Active Blueprints' : 'Visual Identity Vault'
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-slate-950 flex flex-col"
    >
      <div className="px-4 md:px-10 py-4 flex items-center justify-between border-b border-slate-800 bg-slate-950 z-20 shrink-0">
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 ${theme.bg} border ${theme.border} rounded-xl flex items-center justify-center ${theme.color}`}>
            {theme.icon}
          </div>
          <div>
            <h3 className={`text-lg md:text-2xl font-gaming text-white uppercase tracking-widest`}>{theme.label}</h3>
            <p className="text-[8px] md:text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-1">{theme.subLabel}</p>
          </div>
        </div>
        <button onClick={onClose} className="p-3 bg-red-600/20 hover:bg-red-600 rounded-full transition-all">
          <X className="w-5 h-5 text-white" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto pb-40">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`glass-panel flex flex-col rounded-2xl overflow-hidden border border-slate-800 group hover:${theme.border} transition-all duration-300 bg-slate-900/40`}
            >
              <div className="relative aspect-video overflow-hidden">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 left-3 right-3">
                  <h4 className="text-sm md:text-base font-gaming text-white uppercase tracking-tight group-hover:text-cyan-400 transition-colors">{project.title}</h4>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col space-y-4">
                <p className="text-[10px] md:text-xs text-slate-400 leading-relaxed line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {(isUX ? ['Figma', 'UX Architecture'] : ['Photoshop', 'Branding']).map((tag) => (
                    <div key={tag} className="px-2 py-0.5 bg-slate-950 border border-slate-800 rounded text-[7px] font-gaming text-slate-500 uppercase">
                      {tag}
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => setSelectedProject(project)}
                  className={`mt-auto w-full py-2.5 bg-slate-950 hover:${isUX ? 'bg-cyan-600/20' : 'bg-purple-600/20'} border border-slate-800 text-[8px] font-gaming uppercase tracking-widest transition-all flex items-center justify-center gap-2`}
                >
                  Deep Scan <Eye className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <AnimatePresence>
        {selectedProject && <ProjectBriefing project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </AnimatePresence>
    </motion.div>
  );
};

const VideoGallery: React.FC<{ projects: Project[], onClose: () => void, title: string }> = ({ projects, onClose, title }) => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  // For Normal Reel and Neural Synth, show the video files directly
  const isNormalReel = title === 'Normal Reel';
  const isNeuralSynth = title === 'AI Neural Lab';

  if (isNormalReel) {
    const videos = [
      {
        id: 'local-01',
        title: 'Normal Edit 01',
        src: '/videos/normal-edit-01.mp4',
        type: 'local',
        thumbnail: '/videos/normal-edit-01.mp4'
      },
      {
        id: 'instagram-01',
        title: 'Creator Reel 01',
        url: 'https://www.instagram.com/reel/DKPNAwnCOVH/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==',
        type: 'instagram',
        thumbnail: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"%3E%3Cdefs%3E%3ClinearGradient id="insta3" x1="0%25" y1="100%25" x2="100%25" y2="0%25"%3E%3Cstop offset="0%25" style="stop-color:%23feda75"%3E%3C/stop%3E%3Cstop offset="5%25" style="stop-color:%23fa7e1e"%3E%3C/stop%3E%3Cstop offset="45%25" style="stop-color:%23d92e7f"%3E%3C/stop%3E%3Cstop offset="60%25" style="stop-color:%239b36b7"%3E%3C/stop%3E%3Cstop offset="90%25" style="stop-color:%23515bd4"%3E%3C/stop%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill="url(%23insta3)" width="400" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="80" font-weight="bold" fill="white"%3E📷%3C/text%3E%3C/svg%3E'
      },
      {
        id: 'instagram-02',
        title: 'Creator Reel 04',
        url: 'https://www.instagram.com/reel/DMt_fV3RX4Z/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
        type: 'instagram',
        thumbnail: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"%3E%3Cdefs%3E%3ClinearGradient id="insta4" x1="0%25" y1="100%25" x2="100%25" y2="0%25"%3E%3Cstop offset="0%25" style="stop-color:%23feda75"%3E%3C/stop%3E%3Cstop offset="5%25" style="stop-color:%23fa7e1e"%3E%3C/stop%3E%3Cstop offset="45%25" style="stop-color:%23d92e7f"%3E%3C/stop%3E%3Cstop offset="60%25" style="stop-color:%239b36b7"%3E%3C/stop%3E%3Cstop offset="90%25" style="stop-color:%23515bd4"%3E%3C/stop%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill="url(%23insta4)" width="400" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="80" font-weight="bold" fill="white"%3E📷%3C/text%3E%3C/svg%3E'
      }
    ];

    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] bg-slate-950 flex flex-col"
      >
        <div className="px-4 md:px-10 py-4 flex items-center justify-between border-b border-slate-800 bg-slate-950 z-20 shrink-0">
          <div>
            <h3 className="text-lg md:text-2xl font-gaming text-white uppercase tracking-widest neon-text-cyan">{title}</h3>
            <p className="text-[8px] md:text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-1">Uplink Interface</p>
          </div>
          <button onClick={onClose} className="p-3 bg-red-600/20 hover:bg-red-600 rounded-full transition-all">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-7xl mx-auto pb-40">
            {videos.map((video, idx) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.04 }}
                onClick={() => {
                  if (video.type === 'instagram') {
                    window.open(video.url, '_blank');
                  } else {
                    setSelectedVideo(video.src);
                  }
                }}
                className="relative aspect-square rounded-xl overflow-hidden border border-slate-800 bg-slate-900 group cursor-pointer"
              >
                <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center relative overflow-hidden">
                  {video.type === 'local' ? (
                    <video
                      src={video.thumbnail}
                      className="w-full h-full object-contain grayscale-[0.4] group-hover:grayscale-0 transition-all duration-500"
                      onMouseEnter={(e) => {
                        (e.target as HTMLVideoElement).play();
                      }}
                      onMouseLeave={(e) => {
                        (e.target as HTMLVideoElement).pause();
                        (e.target as HTMLVideoElement).currentTime = 0;
                      }}
                    />
                  ) : (
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-contain grayscale-[0.4] group-hover:grayscale-0 transition-all duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"%3E%3Crect fill="%23374151" width="400" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="24" fill="%239CA3AF"%3EInstagram%3C/text%3E%3C/svg%3E';
                      }}
                    />
                  )}
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                >
                  <div className="w-12 h-12 bg-cyan-500/80 rounded-full flex items-center justify-center text-white backdrop-blur-sm">
                    {video.type === 'instagram' ? (
                      <span className="text-xl">📸</span>
                    ) : (
                      <Play className="w-6 h-6 fill-current translate-x-0.5" />
                    )}
                  </div>
                </motion.div>

                <div className="absolute bottom-3 left-3 right-3 pointer-events-none">
                  <p className="text-[9px] md:text-xs font-gaming text-white uppercase leading-tight">{video.title}</p>
                </div>

                <div className="absolute inset-0 border border-cyan-400/0 group-hover:border-cyan-400/30 rounded-2xl transition-all duration-300 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {selectedVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedVideo(null)}
              className="fixed inset-0 z-[300] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full h-full max-w-5xl max-h-[90vh] rounded-3xl overflow-hidden border border-cyan-400/30 shadow-[0_0_60px_rgba(6,182,212,0.3)]"
              >
                <div className="w-full h-full bg-black flex items-center justify-center">
                  <video
                    src={selectedVideo}
                    autoPlay
                    controls
                    className="w-full h-full object-contain"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedVideo(null)}
                  className="absolute top-4 right-4 z-10 w-14 h-14 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg border border-white/20 hover:shadow-[0_0_30px_rgba(239,68,68,0.5)] transition-shadow"
                >
                  <X className="w-7 h-7 text-white" />
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  // For Neural Synth, show neural edit videos
  if (isNeuralSynth) {
    const videos = [
      {
        id: 'neural-01',
        title: 'CGI USING AI',
        src: '/videos/neural-edit-01.mp4',
        type: 'local',
        thumbnail: '/videos/neural-edit-01.mp4'
      },
      {
        id: 'instagram-03',
        title: 'Creator Reel 02',
        url: 'https://www.instagram.com/reel/DC-5aUxSTqT/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
        type: 'instagram',
        thumbnail: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"%3E%3Cdefs%3E%3ClinearGradient id="insta5" x1="0%25" y1="100%25" x2="100%25" y2="0%25"%3E%3Cstop offset="0%25" style="stop-color:%23feda75"%3E%3C/stop%3E%3Cstop offset="5%25" style="stop-color:%23fa7e1e"%3E%3C/stop%3E%3Cstop offset="45%25" style="stop-color:%23d92e7f"%3E%3C/stop%3E%3Cstop offset="60%25" style="stop-color:%239b36b7"%3E%3C/stop%3E%3Cstop offset="90%25" style="stop-color:%23515bd4"%3E%3C/stop%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill="url(%23insta5)" width="400" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="80" font-weight="bold" fill="white"%3E📷%3C/text%3E%3C/svg%3E'
      },
      {
        id: 'instagram-04',
        title: 'Creator Reel 03',
        url: 'https://www.instagram.com/reel/DL9P2H-vHPT/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
        type: 'instagram',
        thumbnail: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"%3E%3Cdefs%3E%3ClinearGradient id="insta6" x1="0%25" y1="100%25" x2="100%25" y2="0%25"%3E%3Cstop offset="0%25" style="stop-color:%23feda75"%3E%3C/stop%3E%3Cstop offset="5%25" style="stop-color:%23fa7e1e"%3E%3C/stop%3E%3Cstop offset="45%25" style="stop-color:%23d92e7f"%3E%3C/stop%3E%3Cstop offset="60%25" style="stop-color:%239b36b7"%3E%3C/stop%3E%3Cstop offset="90%25" style="stop-color:%23515bd4"%3E%3C/stop%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill="url(%23insta6)" width="400" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="80" font-weight="bold" fill="white"%3E📷%3C/text%3E%3C/svg%3E'
      }
    ];

    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] bg-slate-950 flex flex-col"
      >
        <div className="px-4 md:px-10 py-4 flex items-center justify-between border-b border-slate-800 bg-slate-950 z-20 shrink-0">
          <div>
            <h3 className="text-lg md:text-2xl font-gaming text-white uppercase tracking-widest neon-text-purple">{title}</h3>
            <p className="text-[8px] md:text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-1">Uplink Interface</p>
          </div>
          <button onClick={onClose} className="p-3 bg-red-600/20 hover:bg-red-600 rounded-full transition-all">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-7xl mx-auto pb-40">
            {videos.map((video, idx) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.04 }}
                onClick={() => {
                  if (video.type === 'instagram') {
                    window.open(video.url, '_blank');
                  } else {
                    setSelectedVideo(video.src);
                  }
                }}
                className="relative aspect-square rounded-xl overflow-hidden border border-slate-800 bg-slate-900 group cursor-pointer"
              >
                <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center relative overflow-hidden">
                  {video.type === 'local' ? (
                    <video
                      src={video.thumbnail}
                      className="w-full h-full object-contain grayscale-[0.4] group-hover:grayscale-0 transition-all duration-500"
                      onMouseEnter={(e) => {
                        (e.target as HTMLVideoElement).play();
                      }}
                      onMouseLeave={(e) => {
                        (e.target as HTMLVideoElement).pause();
                        (e.target as HTMLVideoElement).currentTime = 0;
                      }}
                    />
                  ) : (
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-contain grayscale-[0.4] group-hover:grayscale-0 transition-all duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"%3E%3Crect fill="%23374151" width="400" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="24" fill="%239CA3AF"%3EInstagram%3C/text%3E%3C/svg%3E';
                      }}
                    />
                  )}
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                >
                  <div className="w-12 h-12 bg-purple-500/80 rounded-full flex items-center justify-center text-white backdrop-blur-sm">
                    {video.type === 'instagram' ? (
                      <span className="text-xl">📸</span>
                    ) : (
                      <Play className="w-6 h-6 fill-current translate-x-0.5" />
                    )}
                  </div>
                </motion.div>

                <div className="absolute bottom-3 left-3 right-3 pointer-events-none">
                  <p className="text-[9px] md:text-xs font-gaming text-white uppercase leading-tight">{video.title}</p>
                </div>

                <div className="absolute inset-0 border border-purple-400/0 group-hover:border-purple-400/30 rounded-2xl transition-all duration-300 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {selectedVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedVideo(null)}
              className="fixed inset-0 z-[300] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full h-full max-w-5xl max-h-[90vh] rounded-3xl overflow-hidden border border-purple-400/30 shadow-[0_0_60px_rgba(168,85,247,0.3)]"
              >
                <div className="w-full h-full bg-black flex items-center justify-center">
                  <video
                    src={selectedVideo}
                    autoPlay
                    controls
                    className="w-full h-full object-contain"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedVideo(null)}
                  className="absolute top-4 right-4 z-10 w-14 h-14 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg border border-white/20 hover:shadow-[0_0_30px_rgba(239,68,68,0.5)] transition-shadow"
                >
                  <X className="w-7 h-7 text-white" />
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  // For AI videos, show the projects grid
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-slate-950 flex flex-col"
    >
      <div className="px-4 md:px-10 py-4 flex items-center justify-between border-b border-slate-800 bg-slate-950 z-20 shrink-0">
        <div>
          <h3 className="text-lg md:text-2xl font-gaming text-white uppercase tracking-widest neon-text-cyan">{title}</h3>
          <p className="text-[8px] md:text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-1">Uplink Interface</p>
        </div>
        <button onClick={onClose} className="p-3 bg-red-600/20 hover:bg-red-600 rounded-full transition-all">
          <X className="w-5 h-5 text-white" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-7xl mx-auto pb-40">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.04 }}
              onClick={() => {
                if (project.url) {
                  window.open(project.url, '_blank');
                }
              }}
              className="relative aspect-square rounded-xl overflow-hidden border border-slate-800 group cursor-pointer bg-slate-900"
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-contain grayscale-[0.4] group-hover:grayscale-0 transition-all duration-500" 
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.src = 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                <div className="w-12 h-12 bg-cyan-500/80 rounded-full flex items-center justify-center text-white backdrop-blur-sm">
                  {project.url ? <span className="text-xl">📸</span> : <Play className="w-6 h-6 fill-current translate-x-0.5" />}
                </div>
              </div>
              <div className="absolute bottom-3 left-3 right-3 pointer-events-none">
                <h4 className="text-[9px] md:text-xs font-gaming text-white uppercase leading-tight">{project.title}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const WorldMap: React.FC = () => {
  const [activeZone, setActiveZone] = useState<Project['zone'] | null>(null);
  const [videoSubCategory, setVideoSubCategory] = useState<'Normal' | 'AI' | null>(null);
  const [currentSectorIdx, setCurrentSectorIdx] = useState(0);
  
  const sectorScrollRef = useRef<HTMLDivElement>(null);

  const zones = [
    { name: 'Graphic Design', color: 'from-purple-500 to-pink-600', icon: '🎨', desc: 'Visual Identity' },
    { name: 'UI/UX Design', color: 'from-cyan-500 to-blue-600', icon: '📱', desc: 'Interfaces' },
    { name: 'Video Production', color: 'from-red-500 to-orange-600', icon: '🎬', desc: 'Motion Lab' },
  ] as const;

  const filteredProjects = useMemo(() => PROJECTS.filter(p => p.zone === activeZone), [activeZone]);

  const handleSectorScroll = () => {
    if (!sectorScrollRef.current) return;
    const container = sectorScrollRef.current;
    const scrollLeft = container.scrollLeft;
    const width = container.offsetWidth;
    const newIdx = Math.round(scrollLeft / width);
    if (newIdx !== currentSectorIdx) setCurrentSectorIdx(newIdx);
  };

  const scrollToSector = (idx: number) => {
    if (sectorScrollRef.current) {
      const width = sectorScrollRef.current.offsetWidth;
      sectorScrollRef.current.scrollTo({ left: idx * width, behavior: 'smooth' });
      audioEngine.playBlip();
    }
  };

  const handleEnterZone = (zone: Project['zone']) => {
    audioEngine.playMissionStart();
    setActiveZone(zone);
    setVideoSubCategory(null);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative w-full h-full flex flex-col items-center justify-center p-4 overflow-hidden"
    >
      <div className="mb-6 md:mb-10 text-center shrink-0 z-20">
        <h2 className="text-xl md:text-3xl font-gaming text-white uppercase tracking-[0.2em] flex items-center justify-center gap-3">
          <Globe className="w-6 h-6 text-cyan-400" /> SECTOR_SELECTION
        </h2>
        <p className="text-[8px] md:text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-2">Mission Uplink Active</p>
      </div>

      <div className="relative w-full max-w-5xl h-[300px] md:h-[400px] flex items-center justify-center group">
        <button onClick={() => scrollToSector(currentSectorIdx - 1)} disabled={currentSectorIdx === 0} className="absolute left-0 z-30 p-3 bg-slate-900 border border-slate-700 rounded-full text-cyan-400 opacity-0 group-hover:opacity-100 transition-all disabled:opacity-0 hidden md:block">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button onClick={() => scrollToSector(currentSectorIdx + 1)} disabled={currentSectorIdx === zones.length - 1} className="absolute right-0 z-30 p-3 bg-slate-900 border border-slate-700 rounded-full text-cyan-400 opacity-0 group-hover:opacity-100 transition-all disabled:opacity-0 hidden md:block">
          <ChevronRight className="w-6 h-6" />
        </button>

        <div ref={sectorScrollRef} onScroll={handleSectorScroll} className="w-full h-full flex overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth">
          {zones.map((zone) => (
            <div key={zone.name} className="w-full min-w-full h-full snap-center flex items-center justify-center px-4 md:px-12">
              <motion.div 
                whileHover={{ scale: 1.02 }} 
                onClick={() => handleEnterZone(zone.name as Project['zone'])} 
                className="relative glass-panel w-full max-w-md h-[250px] md:h-[350px] rounded-3xl border border-white/10 overflow-hidden flex flex-col items-center justify-center cursor-pointer shadow-xl transition-all"
              >
                <div className="text-6xl md:text-8xl mb-6 filter drop-shadow-lg">{zone.icon}</div>
                <div className="text-center px-6">
                  <h3 className="text-lg md:text-2xl font-gaming text-white uppercase tracking-widest neon-text-cyan">{zone.name}</h3>
                  <p className="text-[8px] md:text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-2">{zone.desc}</p>
                </div>
                <div className="absolute bottom-4 text-[8px] font-gaming text-cyan-400 uppercase tracking-widest animate-pulse">Engage</div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex gap-3 shrink-0">
         {zones.map((_, i) => (
           <div key={i} onClick={() => scrollToSector(i)} className={`h-1.5 rounded-full cursor-pointer transition-all duration-300 ${i === currentSectorIdx ? 'w-10 bg-cyan-400' : 'w-2 bg-slate-800'}`} />
         ))}
      </div>

      <AnimatePresence>
        {activeZone && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/98 backdrop-blur-xl">
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} className="relative w-full h-full flex flex-col">
              
              {(activeZone === 'UI/UX Design' || activeZone === 'Graphic Design') ? (
                <BlueprintGallery projects={filteredProjects} zone={activeZone} onClose={() => setActiveZone(null)} />
              ) : activeZone === 'Video Production' ? (
                <div className="flex-1 flex flex-col px-6 py-10 overflow-y-auto custom-scrollbar">
                  <div className="flex justify-between items-center mb-10 max-w-6xl mx-auto w-full">
                    <div>
                      <h3 className="text-[10px] font-gaming text-cyan-400 uppercase tracking-widest mb-1">Production Hub</h3>
                      <h2 className="text-xl md:text-3xl font-gaming text-white uppercase">Select Protocol</h2>
                    </div>
                    <button onClick={() => setActiveZone(null)} className="p-3 bg-red-600/20 hover:bg-red-600 rounded-full transition-all">
                      <X className="w-5 h-5 text-white" />
                    </button>
                  </div>

                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto w-full pb-32">
                    <motion.button onClick={() => setVideoSubCategory('Normal')} className="glass-panel min-h-[200px] rounded-3xl border border-slate-700/50 flex flex-col items-center justify-center gap-6 group hover:border-cyan-500/50 transition-all overflow-hidden relative">
                      <Film className="w-12 h-12 text-cyan-400 group-hover:scale-110 transition-transform" />
                      <div className="text-center px-4">
                        <h4 className="text-lg md:text-2xl font-gaming text-white uppercase tracking-widest group-hover:text-cyan-400">Normal Reel</h4>
                        <p className="text-[8px] md:text-[10px] font-mono text-slate-500 uppercase mt-2">Cinematic Narrative</p>
                      </div>
                    </motion.button>
                    <motion.button onClick={() => setVideoSubCategory('AI')} className="glass-panel min-h-[200px] rounded-3xl border border-slate-700/50 flex flex-col items-center justify-center gap-6 group hover:border-purple-500/50 transition-all overflow-hidden relative">
                      <Cpu className="w-12 h-12 text-purple-400 group-hover:scale-110 transition-transform" />
                      <div className="text-center px-4">
                        <h4 className="text-lg md:text-2xl font-gaming text-white uppercase tracking-widest group-hover:text-purple-400">Neural Synth</h4>
                        <p className="text-[8px] md:text-[10px] font-mono text-slate-500 uppercase mt-2">AI-Augmented Visuals</p>
                      </div>
                    </motion.button>
                  </div>

                  <AnimatePresence>
                    {videoSubCategory && <VideoGallery projects={filteredProjects.filter(p => p.subCategory === videoSubCategory)} title={videoSubCategory === 'Normal' ? 'Normal Reel' : 'AI Neural Lab'} onClose={() => setVideoSubCategory(null)} />}
                  </AnimatePresence>
                </div>
              ) : null}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default WorldMap;
