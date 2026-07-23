import React from 'react';
import { useApp } from '../context/AppContext';
import { Creator } from '../types';
import { 
  X, 
  Heart, 
  Trash2, 
  Video, 
  Star, 
  ArrowRight 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface WishlistDrawerProps {
  onOpenProfile: (creator: Creator) => void;
  onOrderNow: (creator: Creator) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({ onOpenProfile, onOrderNow }) => {
  const { isWishlistOpen, setIsWishlistOpen, favorites, creators, toggleFavorite } = useApp();

  if (!isWishlistOpen) return null;

  const favoriteCreators = creators.filter((c) => favorites.includes(c.id));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-sm flex justify-end">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col justify-between"
        >
          {/* Drawer Header */}
          <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                Saved Favorites ({favoriteCreators.length})
              </h3>
            </div>

            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body List */}
          <div className="p-5 overflow-y-auto flex-1 space-y-4">
            {favoriteCreators.length > 0 ? (
              favoriteCreators.map((creator) => (
                <div
                  key={creator.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={creator.profileImage}
                        alt={creator.name}
                        className="w-12 h-12 rounded-2xl object-cover ring-2 ring-purple-500/30"
                      />
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                          {creator.name}
                        </h4>
                        <p className="text-xs text-purple-600 dark:text-purple-400 font-semibold">
                          {creator.languages.join(', ')}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleFavorite(creator.id)}
                      className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                      title="Remove from favorites"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200 dark:border-slate-700">
                    <span className="font-bold text-slate-900 dark:text-white">
                      ₹{(creator.pricing?.basic?.price ?? 1499).toLocaleString()}
                    </span>

                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setIsWishlistOpen(false);
                          onOpenProfile(creator);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border text-slate-700 dark:text-slate-300 font-semibold"
                      >
                        Profile
                      </button>
                      <button
                        onClick={() => {
                          setIsWishlistOpen(false);
                          onOrderNow(creator);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-purple-600 text-white font-semibold flex items-center gap-1 shadow"
                      >
                        <Video className="w-3 h-3" />
                        <span>Order</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-16 text-center space-y-3 text-slate-400">
                <Heart className="w-12 h-12 mx-auto stroke-1" />
                <p className="text-sm font-medium">No saved creators yet.</p>
                <p className="text-xs text-slate-500">
                  Click the heart icon on any creator card to save them for later!
                </p>
              </div>
            )}
          </div>

          {/* Drawer Footer */}
          <div className="p-5 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="w-full py-3 rounded-2xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs"
            >
              Continue Browsing
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
