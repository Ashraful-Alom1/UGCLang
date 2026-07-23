import React from 'react';
import { useApp } from '../context/AppContext';
import { BlogPost } from '../types';
import { BookOpen, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export const BlogSection: React.FC = () => {
  const { blogs, setSelectedBlog } = useApp();

  return (
    <section id="blog" className="py-20 bg-slate-50/80 dark:bg-slate-900/40">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 dark:bg-purple-950/80 border border-purple-200 dark:border-purple-800 text-xs font-bold text-purple-700 dark:text-purple-300">
            <BookOpen className="w-3.5 h-3.5" />
            <span>UGCLage Growth Playbooks</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Indian UGC Marketing Insights
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            Expert guides, high-converting hook formulas, and regional ad scaling strategies for D2C brands.
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {blogs.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onClick={() => setSelectedBlog(post)}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xl shadow-purple-500/5 hover:shadow-2xl cursor-pointer transition-all space-y-4 group"
            >
              <div className="relative h-48 rounded-2xl overflow-hidden">
                <img 
                  src={post.coverImage} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-950/80 text-white backdrop-blur-md">
                  {post.category}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                  <span>{post.publishedAt}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {post.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-purple-600 dark:text-purple-400">
                <span>Read Full Strategy Guide</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
