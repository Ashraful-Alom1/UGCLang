import React, { useEffect, useState, useRef } from 'react';
import { Creator } from '../types';
import { Star, Sparkles, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

interface ScrollDrivenTickerProps {
  creators: Creator[];
  onSelectCreator: (creator: Creator) => void;
  onPlayVideo: (video: any, creatorName: string) => void;
}

export const ScrollDrivenTicker: React.FC<ScrollDrivenTickerProps> = ({
  creators,
  onSelectCreator,
  onPlayVideo
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter & sort creators strictly from highest rating (5.0) to lowest
  const sortedCreators = [...(creators || [])]
    .filter(c => c && c.status === 'active')
    .sort((a, b) => (b.rating || 0) - (a.rating || 0));

  // Auto-scrolling index when stationary
  const [currentIndex, setCurrentIndex] = useState(0);

  // Set up scroll-driven parallax movement
  const { scrollY } = useScroll();
  // Map scroll position to horizontal translation for a highly interactive gliding feel
  const rawTranslation = useTransform(scrollY, [0, 3000], [0, -600]);
  // Smooth out scroll movements with a physics spring
  const smoothScrollOffset = useSpring(rawTranslation, {
    stiffness: 70,
    damping: 20,
    mass: 0.5
  });

  // Automatically cycle through creators card-by-card in a professional, smooth slideshow when stationary
  useEffect(() => {
    if (sortedCreators.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sortedCreators.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [sortedCreators.length]);

  if (sortedCreators.length === 0) return null;

  // Manual arrow navigation
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + sortedCreators.length) % sortedCreators.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % sortedCreators.length);
  };

  // Base translation calculation for stationary auto-slider (card-by-card slide width = 310px)
  const cardWidth = 310;
  const autoTranslate = -(currentIndex * cardWidth);

  return (
    <section className="py-16 bg-slate-950 text-white overflow-hidden relative border-t border-slate-900">
      {/* Premium visual atmospheric background glow */}
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[140px] pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-[140px] pointer-events-none -translate-y-1/2" />

      <div className="max-w-screen-2xl mx-auto px-6 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 relative z-10">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-purple-500/10 text-purple-300 border border-purple-500/20">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Top Rated Quality Flow</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Spotlight UGC Creator Ratings
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
            Creators are strictly sorted from highest rating to lowest rating. Experience smooth card-by-card sliding combined with dynamic, scroll-driven interactive movement.
          </p>
        </div>

        {/* Custom Navigation buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handlePrev}
            className="p-3 rounded-full bg-slate-900/90 border border-slate-800 hover:border-purple-500/40 hover:bg-slate-800 text-slate-300 transition-all shadow-md active:scale-95"
            aria-label="Previous Creator"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="p-3 rounded-full bg-slate-900/90 border border-slate-800 hover:border-purple-500/40 hover:bg-slate-800 text-slate-300 transition-all shadow-md active:scale-95"
            aria-label="Next Creator"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* CONTINUOUS SINGLE ROW SLIDER TRACK */}
      <div className="relative z-10 w-full px-6 max-w-screen-2xl mx-auto overflow-visible">
        <div className="overflow-visible relative">
          <motion.div 
            ref={containerRef}
            className="flex gap-5"
            style={{ 
              x: smoothScrollOffset, // Scroll-driven gliding offset
              translateX: autoTranslate, // Automatic stationary slider translation
              transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)' // Extremely sleek ease-out
            }}
          >
            {sortedCreators.map((creator, idx) => {
              const isCurrent = idx === currentIndex;
              return (
                <div
                  key={`${creator.id}-rating-spotlight-${idx}`}
                  onClick={() => onSelectCreator(creator)}
                  className={`w-[290px] shrink-0 p-5 rounded-2xl border transition-all duration-500 cursor-pointer flex flex-col justify-between h-[185px] bg-slate-900/45 hover:bg-slate-900/90 ${
                    isCurrent 
                      ? 'border-purple-500/80 shadow-lg shadow-purple-500/5 scale-[1.01]' 
                      : 'border-slate-800/80 hover:border-slate-700'
                  }`}
                  id={`spotlight-card-${creator.id}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="relative shrink-0">
                        <img
                          src={creator.profileImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120'}
                          alt={creator.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-purple-500/80 shadow-md"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full text-[9px] font-black bg-purple-600 text-white border border-slate-950 leading-none">
                          #{idx + 1}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-extrabold text-xs text-white truncate flex items-center gap-1">
                          <span>{creator.name}</span>
                          {creator.status === 'active' && (
                            <ShieldCheck className="w-3.5 h-3.5 text-blue-400 shrink-0 fill-blue-500/10" />
                          )}
                        </h4>
                        <p className="text-[10px] text-purple-300 font-bold uppercase tracking-wider mt-0.5">{creator.category}</p>
                      </div>
                    </div>

                    <span className="text-[11px] font-black text-amber-400 flex items-center gap-0.5 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 shrink-0">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {(creator.rating || 5.0).toFixed(1)}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[11px] text-slate-400 line-clamp-2 font-medium leading-relaxed">
                      {creator.tagline || `${creator.category} professional UGC creator`}
                    </p>
                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 pt-2 border-t border-slate-800/60">
                      <span>Starts at <span className="text-white">₹{creator.pricing?.basic?.price || 1499}</span></span>
                      <span className="text-purple-400">{creator.completedVideosCount || 10}+ videos delivered</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Dynamic Slide Indicator Dots */}
      <div className="flex items-center justify-center gap-1.5 mt-8 relative z-10">
        {sortedCreators.map((_, idx) => (
          <button
            key={`dot-${idx}`}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === currentIndex ? 'w-6 bg-purple-500' : 'w-1.5 bg-slate-800 hover:bg-slate-700'
            }`}
            aria-label={`Slide index ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
