import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Clock, Calendar, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const BlogReaderModal: React.FC = () => {
  const { selectedBlog, setSelectedBlog } = useApp();

  if (!selectedBlog) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8 max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="p-4 bg-white/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-700">
              {selectedBlog.category}
            </span>

            <button
              onClick={() => setSelectedBlog(null)}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="overflow-y-auto flex-1 p-6 space-y-6">
            <div className="space-y-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-snug">
                {selectedBlog.title}
              </h1>

              <div className="flex items-center gap-4 text-xs text-slate-500 font-medium pt-1">
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-purple-500" />
                  {selectedBlog.author}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {selectedBlog.publishedAt}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {selectedBlog.readTime}
                </span>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden h-64 bg-slate-100">
              <img src={selectedBlog.coverImage} alt={selectedBlog.title} className="w-full h-full object-cover" />
            </div>

            <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-line space-y-4">
              {selectedBlog.content}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
