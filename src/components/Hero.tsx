import React from 'react';
import { useApp } from '../context/AppContext';
import { motion } from 'motion/react';
import { 
  Play, 
  Sparkles, 
  Star, 
  Video, 
  ShieldCheck, 
  TrendingUp, 
  ArrowRight,
  Globe2,
  Users
} from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  const { creators, setIsBecomeCreatorOpen, playVideoModal, openCreatorProfileModal } = useApp();

  // Featured floating creators
  const topCreators = creators.filter((c) => c.featured).slice(0, 3);

  return (
    <section id="hero" className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-purple-400/20 via-indigo-500/10 to-blue-400/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & Action Buttons */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-8">
            
            {/* Top Pill Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 dark:bg-purple-950/80 border border-purple-200 dark:border-purple-800/60 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="text-xs font-semibold text-purple-900 dark:text-purple-200">
                India's #1 Regional UGC Creator Marketplace
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]"
            >
              Find the Perfect{' '}
              <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 dark:from-purple-400 dark:via-indigo-300 dark:to-blue-400 bg-clip-text text-transparent">
                UGC Creator
              </span>{' '}
              for Your Brand.
            </motion.h1>

            {/* Subheading */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal"
            >
              Browse hundreds of verified UGC creators in your preferred language. Watch demo videos, compare creators, and order professional UGC videos in just a few clicks.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold text-base shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Find Creators</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setIsBecomeCreatorOpen(true)}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 font-semibold text-base border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow transition-all flex items-center justify-center gap-2"
              >
                <Video className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>Become a Creator</span>
              </button>
            </motion.div>

            {/* Key Stat Badges */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-200/80 dark:border-slate-800/80"
            >
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                <div className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-1">
                  <span>500+</span>
                  <Users className="w-4 h-4 text-purple-500" />
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Verified Creators</div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                <div className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-1">
                  <span>12+</span>
                  <Globe2 className="w-4 h-4 text-indigo-500" />
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Indian Languages</div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                <div className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-1">
                  <span>2,500+</span>
                  <TrendingUp className="w-4 h-4 text-blue-500" />
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Videos Delivered</div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                <div className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-1">
                  <span>4.9/5</span>
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Brand Rating</div>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Hero Interactive Cards & Video Reels Preview */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Ambient Back Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 rounded-3xl blur-2xl transform rotate-3 scale-95 -z-10" />

            <div className="w-full max-w-md space-y-4">
              
              {/* Main Featured Showcase Card */}
              {topCreators[0] && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="p-5 rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/90 dark:border-slate-800/90 shadow-2xl shadow-purple-500/10 space-y-4"
                >
                  <div 
                    onClick={() => openCreatorProfileModal(topCreators[0])}
                    className="flex items-center justify-between cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    <div className="flex items-center gap-3">
                      <img 
                        src={topCreators[0].profileImage} 
                        alt={topCreators[0].name}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-500/40" 
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-bold text-slate-900 dark:text-white text-base hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                            {topCreators[0].name}
                          </h3>
                          <ShieldCheck className="w-4 h-4 text-blue-500 fill-blue-500/10" />
                        </div>
                        <p className="text-xs text-purple-600 dark:text-purple-400 font-semibold">
                          {topCreators[0].languages.join(' • ')} Creator
                        </p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 rounded-full border border-emerald-200 dark:border-emerald-800">
                      ₹{topCreators[0].pricing?.basic?.price || 1499}
                    </span>
                  </div>

                  {/* Video Thumbnail Preview */}
                  {topCreators[0].demoVideos[0] && (
                    <div 
                      onClick={() => playVideoModal(topCreators[0].demoVideos[0], topCreators[0].name)}
                      className="relative h-56 rounded-2xl overflow-hidden cursor-pointer group shadow-inner"
                    >
                      <img 
                        src={topCreators[0].demoVideos[0].thumbnailUrl} 
                        alt="Demo Video" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-between p-4">
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold text-white bg-slate-900/80 backdrop-blur-sm">
                            🎬 {topCreators[0].category}
                          </span>
                          <span className="text-[11px] font-medium text-white/90 bg-slate-900/60 px-2 py-0.5 rounded-md">
                            {topCreators[0].demoVideos[0].viewsCount} Views
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <p className="text-xs font-semibold text-white line-clamp-1 pr-2">
                            {topCreators[0].demoVideos[0].title}
                          </p>
                          <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform shrink-0">
                            <Play className="w-4 h-4 fill-white translate-x-0.5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium pt-1">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <strong className="text-slate-800 dark:text-slate-200">{topCreators[0].rating}</strong> ({topCreators[0].reviewsCount} reviews)
                    </span>
                    <span>⚡ Delivered in {topCreators[0].deliveryTimeDays} Days</span>
                  </div>
                </motion.div>
              )}

              {/* Floating Mini Creator Cards */}
              <div className="grid grid-cols-2 gap-3">
                {topCreators.slice(1, 3).map((creator, idx) => (
                  <motion.div
                    key={creator.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
                    onClick={() => openCreatorProfileModal(creator)}
                    className="p-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 shadow-lg cursor-pointer hover:-translate-y-1 transition-all space-y-2 group"
                  >
                    <div className="flex items-center gap-2">
                      <img 
                        src={creator.profileImage} 
                        alt={creator.name}
                        className="w-9 h-9 rounded-full object-cover" 
                      />
                      <div className="overflow-hidden">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {creator.name}
                        </h4>
                        <p className="text-[10px] text-purple-600 dark:text-purple-400 font-semibold truncate">
                          {creator.languages[0]} Creator
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100 dark:border-slate-800">
                      <span className="text-slate-500 dark:text-slate-400 font-medium">Starts</span>
                      <span className="font-bold text-slate-900 dark:text-slate-100">₹{creator.pricing?.basic?.price || 1499}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
