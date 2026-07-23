import React, { useState } from 'react';
import { Star, ChevronDown, MessageSquareQuote, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';

export const TestimonialsFAQ: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const testimonials = [
    {
      quote: "UGCLage.com reduced our Meta Ad Customer Acquisition Cost (CAC) by 42% in just two weeks! Ordering native Hindi and Marathi creator videos was seamless.",
      author: "Karan Malhotra",
      company: "Co-Founder, PureCare D2C Skincare",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
    },
    {
      quote: "We needed 5 Tamil UGC videos for our kitchen app launch in Chennai. Delivered in under 48 hours with incredible audio and lighting quality!",
      author: "Deepika Ramachandran",
      company: "Growth Lead, HomeStyle India",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
    },
    {
      quote: "As a UGC creator, UGCLage gives me verified brand briefs and safe, upfront payments. It’s the best platform for Indian creators to monetize.",
      author: "Ananya Sharma",
      company: "Featured Creator (Delhi)",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"
    }
  ];

  const faqs = [
    {
      q: "What is User Generated Content (UGC) and why do Indian brands need it?",
      a: "UGC refers to authentic, smartphone-recorded video reviews, unboxings, and product test-drives created by real consumers. Native regional UGC outperforms studio commercials because Indian consumers trust peer recommendations in their mother tongue."
    },
    {
      q: "How fast will I receive my UGC video after placing an order?",
      a: "Most creators on UGCLage.com deliver ready-to-run 1080p/4K UGC videos in 24 to 48 hours after receiving your product shipment or script brief."
    },
    {
      q: "What commercial usage rights are included in the pricing packages?",
      a: "All packages include full commercial usage rights for Meta (Facebook & Instagram Ads), YouTube Shorts, Google Ads, and brand website embedding."
    },
    {
      q: "How do creators join UGCLage.com?",
      a: "Creators can apply through our 'Become a Creator' page. Our team reviews profile photo quality, lighting setup, and regional video reels before approving them into the verified marketplace."
    },
    {
      q: "Can I request custom revisions if needed?",
      a: "Yes! Every package includes 1 to 3 free revisions for text subtitles, background music adjustments, or hook variations."
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-slate-950 space-y-24">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Testimonials */}
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/80 border border-amber-200 dark:border-amber-800 text-xs font-bold text-amber-700 dark:text-amber-300">
              <MessageSquareQuote className="w-3.5 h-3.5" />
              <span>Trusted By 250+ Indian Brands</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              What Founders & Marketers Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex text-amber-400 text-xs">
                    {'★'.repeat(t.rating)}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">
                    "{t.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                  <img src={t.avatar} alt={t.author} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-xs">{t.author}</h4>
                    <p className="text-[11px] text-purple-600 dark:text-purple-400 font-medium">{t.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto space-y-8 pt-10 border-t border-slate-200 dark:border-slate-800">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 dark:bg-purple-950/80 text-xs font-bold text-purple-700 dark:text-purple-300">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Frequently Asked Questions</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              Everything You Need to Know
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className="rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full p-4 text-left font-bold text-sm text-slate-900 dark:text-white flex items-center justify-between gap-4"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/60 dark:border-slate-800/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
