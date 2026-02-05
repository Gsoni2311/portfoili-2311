import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  src: string;
}

const VideosGallery: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const videos: Video[] = [
    {
      id: 'normal-01',
      title: 'Normal Edit 01',
      thumbnail: '/videos/normal-edit-01.mp4',
      src: '/videos/normal-edit-01.mp4',
    },
  ];

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeVideo();
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="max-w-6xl w-full h-full overflow-y-auto p-6 md:p-12 custom-scrollbar scroll-smooth pb-40"
      >
        <div className="mb-12">
          <h2 className="text-2xl md:text-5xl font-gaming text-white mb-4 uppercase tracking-tighter">
            📹 VIDEO_GALLERY
          </h2>
          <div className="w-2 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
        </div>

        {/* Normal Videos Section */}
        <div className="mb-16">
          <h3 className="text-xl md:text-2xl font-gaming text-cyan-400 mb-8 uppercase tracking-wider flex items-center gap-3">
            <span className="w-2 h-2 bg-cyan-400 rounded-full" />
            NORMAL_EDITS
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {videos.map((video) => (
              <motion.div
                key={video.id}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleVideoClick(video)}
                className="group cursor-pointer relative h-64 md:h-72 rounded-2xl overflow-hidden"
              >
                {/* Video Thumbnail */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center overflow-hidden">
                  <video
                    src={video.thumbnail}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onMouseEnter={(e) => {
                      (e.target as HTMLVideoElement).play();
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLVideoElement).pause();
                      (e.target as HTMLVideoElement).currentTime = 0;
                    }}
                  />
                </div>

                {/* Glass Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Play Button */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1.1, opacity: 1 }}
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.5)] border border-white/30 backdrop-blur-sm">
                    <Play className="w-8 h-8 md:w-10 md:h-10 text-white fill-white ml-1" />
                  </div>
                </motion.div>

                {/* Title */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <p className="text-white font-gaming text-sm md:text-base uppercase tracking-wider">
                    {video.title}
                  </p>
                </div>

                {/* Border Effect */}
                <div className="absolute inset-0 border border-cyan-400/0 group-hover:border-cyan-400/30 rounded-2xl transition-all duration-300 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Video Modal Player */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackdropClick}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full h-full max-w-5xl max-h-[90vh] rounded-3xl overflow-hidden border border-cyan-400/30 shadow-[0_0_60px_rgba(6,182,212,0.3)]"
            >
              {/* Video Container */}
              <div className="w-full h-full bg-black flex items-center justify-center">
                <video
                  src={selectedVideo.src}
                  autoPlay
                  controls
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                onClick={closeVideo}
                className="absolute top-4 right-4 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg border border-white/20 hover:shadow-[0_0_30px_rgba(239,68,68,0.5)] transition-shadow"
              >
                <X className="w-6 h-6 md:w-7 md:h-7 text-white" />
              </motion.button>

              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/50 to-transparent">
                <p className="text-white font-gaming text-lg md:text-2xl uppercase tracking-wider">
                  {selectedVideo.title}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VideosGallery;
