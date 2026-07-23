import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Globe2, 
  Search, 
  PlayCircle, 
  ShoppingBag, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';
import { motion } from 'motion/react';

interface HowItWorksProps {
  onSelectLanguageStep: (langName: string) => void;
  onExploreCreatorsStep: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ 
  onSelectLanguageStep, 
  onExploreCreatorsStep 
}) => {
  const { languages } = useApp();

  const steps = [
    {
      stepNum: '01',
      title: 'Choose Your Language',
      description: 'Select from 12+ Indian languages to connect natively with your regional target audience.',
      icon: Globe2,
      badge: 'Step 1'
    },
    {
      stepNum: '02',
      title: 'Browse Verified Creators',
      description: 'Filter creators by language, gender, category, rating, experience, and pricing packages.',
      icon: Search,
      badge: 'Step 2'
    },
    {
      stepNum: '03',
      title: 'Watch Demo Reels',
      description: 'Preview authentic sample UGC reels, test hooks, and evaluate audio clarity before ordering.',
      icon: PlayCircle,
      badge: 'Step 3'
    },
    {
      stepNum: '04',
      title: 'Place Order & Receive',
      description: 'Submit your product requirements, logo, and script. Receive ready-to-use UGC ads in 24-48 hours.',
      icon: ShoppingBag,
      badge: 'Step 4'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-slate-50/60 dark:bg-slate-900/40 relative">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 text-xs font-bold text-indigo-700 dark:text-indigo-300">
            ⚡ Simple 4-Step Process
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How UGCLage.com Works
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base">
            From language selection to final ad delivery in 48 hours—order professional regional UGC videos seamlessly.
          </p>
        </div>

        {/* Step Timeline Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.stepNum}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xl shadow-purple-500/5 relative group hover:-translate-y-1 transition-all space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold shadow-md shadow-purple-500/20 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-black text-slate-200 dark:text-slate-800 font-mono">
                    {step.stepNum}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {idx === 0 && (
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                    <p className="text-[11px] font-semibold text-purple-600 dark:text-purple-400 mb-2">
                      Popular Languages:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {languages.slice(0, 5).map((l) => (
                        <button
                          key={l.id}
                          onClick={() => onSelectLanguageStep(l.name)}
                          className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-purple-50 dark:bg-slate-800 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-slate-700 transition-colors"
                        >
                          {l.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {idx === 1 && (
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                    <button
                      onClick={onExploreCreatorsStep}
                      className="text-xs font-semibold text-purple-600 dark:text-purple-400 flex items-center gap-1 hover:underline"
                    >
                      <span>Explore 500+ Creators</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
