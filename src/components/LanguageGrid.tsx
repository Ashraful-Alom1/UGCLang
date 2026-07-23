import React from 'react';
import { useApp } from '../context/AppContext';
import { IndianLanguage } from '../types';
import { Users, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface LanguageGridProps {
  onSelectLanguage: (langName: IndianLanguage) => void;
}

export const LanguageGrid: React.FC<LanguageGridProps> = ({ onSelectLanguage }) => {
  const { languages, creators } = useApp();

  const enabledLanguages = languages.filter((l) => l.enabled);

  return (
    <section id="languages" className="py-20 bg-white dark:bg-slate-950">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 dark:bg-purple-950/80 border border-purple-200 dark:border-purple-800 text-xs font-bold text-purple-700 dark:text-purple-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>12+ Indian Languages</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Connect With Buyers in Their Mother Tongue
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
              Select your target audience's regional language to view creators specializing in native accents, cultural cues, and high-converting local hooks.
            </p>
          </div>

          <div className="shrink-0">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800">
              ⚡ Over 80% of Indian D2C Buyers Prefer Regional Video Ads
            </span>
          </div>
        </div>

        {/* Languages Cards Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {enabledLanguages.map((lang, idx) => {
            // Count actual creators matching this language
            const count = creators.filter((c) => c.languages.includes(lang.name)).length;

            return (
              <motion.div
                key={lang.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                onClick={() => onSelectLanguage(lang.name)}
                className="p-5 rounded-3xl bg-slate-50/80 dark:bg-slate-900/60 hover:bg-white dark:hover:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-xl hover:shadow-purple-500/10 cursor-pointer transition-all duration-300 group space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform">
                    {lang.icon}
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold text-purple-700 dark:text-purple-300 bg-purple-100/80 dark:bg-purple-950/80 border border-purple-200/80 dark:border-purple-800/80 flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>{count > 0 ? count : lang.creatorsCount} Creators</span>
                  </span>
                </div>

                <div>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {lang.name}
                    </h3>
                    <span className="text-sm font-semibold text-slate-400 font-serif">
                      ({lang.nativeName})
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1.5 line-clamp-2">
                    {lang.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-xs font-semibold text-purple-600 dark:text-purple-400">
                  <span>Explore {lang.name} Creators</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
