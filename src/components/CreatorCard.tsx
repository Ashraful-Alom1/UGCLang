import React from 'react';
import { Creator } from '../types';
import { useApp } from '../context/AppContext';
import { 
  Star, 
  Heart, 
  Play, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  MapPin, 
  Video 
} from 'lucide-react';
import { motion } from 'motion/react';

interface CreatorCardProps {
  creator: Creator;
  onOpenProfile: (creator: Creator) => void;
  onOrderNow: (creator: Creator) => void;
}

export const CreatorCard: React.FC<CreatorCardProps> = ({ 
  creator, 
  onOpenProfile, 
  onOrderNow 
}) => {
  const { toggleFavorite, isFavorite, playVideoModal } = useApp();
  const favorited = isFavorite(creator.id);

  const primaryVideo = creator.demoVideos[0];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 shadow-lg shadow-purple-500/5 hover:shadow-2xl hover:shadow-purple-500/15 transition-all duration-300 flex flex-col overflow-hidden relative"
    >
      {/* Cover Image & Avatar Header */}
      <div className="relative h-36 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img 
          src={creator.coverImage} 
          alt={creator.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20" />

        {/* Favorite Heart Trigger */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(creator.id);
          }}
          className="absolute top-3 right-3 p-2.5 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-md text-slate-700 dark:text-slate-200 hover:scale-110 active:scale-95 transition-all"
          title={favorited ? 'Remove from wishlist' : 'Save creator'}
        >
          <Heart className={`w-4 h-4 ${favorited ? 'text-rose-500 fill-rose-500' : 'text-slate-600 dark:text-slate-300'}`} />
        </button>

        {/* Category Pill */}
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase bg-slate-950/70 text-white backdrop-blur-md border border-white/20">
          {creator.category}
        </span>

        {/* Profile Avatar Overlay */}
        <div className="absolute -bottom-5 left-5 flex items-end gap-3">
          <div className="relative">
            <img 
              src={creator.profileImage} 
              alt={creator.name} 
              className="w-16 h-16 rounded-2xl object-cover ring-4 ring-white dark:ring-slate-900 shadow-md"
            />
            <div className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-blue-500 text-white shadow">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>

      {/* Body Content */}
      <div className="pt-7 p-5 flex-1 flex flex-col justify-between space-y-4">
        
        {/* Creator Name & Languages */}
        <div>
          <div className="flex items-center justify-between gap-2">
            <h3 
              onClick={() => onOpenProfile(creator)}
              className="font-extrabold text-slate-900 dark:text-white text-lg hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer transition-colors truncate"
            >
              {creator.name}
            </h3>
            <div className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-md border border-amber-200 dark:border-amber-800/60 shrink-0">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{creator.rating}</span>
              <span className="text-slate-400 font-normal">({creator.reviewsCount})</span>
            </div>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium line-clamp-1 mt-1">
            {creator.tagline}
          </p>

          <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
              <MapPin className="w-3 h-3 text-purple-500" />
              {creator.city}, {creator.state}
            </span>
            <span>•</span>
            <span>{creator.experienceYears}+ Yrs Exp</span>
          </div>

          {/* Languages Tags */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {creator.languages.map((lang) => (
              <span 
                key={lang}
                className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200/60 dark:border-purple-800/60"
              >
                {lang}
              </span>
            ))}
            <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              {creator.gender}
            </span>
          </div>
        </div>

        {/* Video Reel Preview Banner */}
        {primaryVideo && (
          <div 
            onClick={() => playVideoModal(primaryVideo, creator.name)}
            className="p-2.5 rounded-2xl bg-slate-100/80 dark:bg-slate-800/60 hover:bg-purple-50 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 cursor-pointer transition-colors flex items-center justify-between gap-3 group/vid"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow group-hover/vid:scale-105 transition-transform">
                <Play className="w-4 h-4 fill-white translate-x-0.5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                  Watch Demo Reel
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                  {primaryVideo.title}
                </p>
              </div>
            </div>
            <span className="text-[10px] font-semibold text-purple-600 dark:text-purple-400 shrink-0">
              {primaryVideo.viewsCount}
            </span>
          </div>
        )}

        {/* Pricing & Footer Actions */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                Starting Price
              </span>
              <span className="text-xl font-extrabold text-slate-900 dark:text-white">
                ₹{(creator.pricing?.basic?.price ?? 1499).toLocaleString()}
              </span>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                Delivery
              </span>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1 justify-end">
                <Clock className="w-3 h-3 text-emerald-500" />
                {creator.deliveryTimeDays} Days
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onOpenProfile(creator)}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-colors"
            >
              View Profile
            </button>

            <button
              onClick={() => onOrderNow(creator)}
              className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-bold shadow-md shadow-purple-500/20 transition-all flex items-center justify-center gap-1"
            >
              <Video className="w-3.5 h-3.5" />
              <span>Order Now</span>
            </button>
          </div>
        </div>

      </div>
    </motion.div>
  );
};
