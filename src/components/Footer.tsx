import React from 'react';
import { useApp } from '../context/AppContext';
import { IndianLanguage } from '../types';
import { Sparkles, Heart, ShieldCheck, Instagram, Youtube, Linkedin, Twitter, Mail, Phone, Facebook } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setSelectedLanguage, setIsBecomeCreatorOpen, setIsAdminPanelOpen, footerData } = useApp();

  const sampleLangs: IndianLanguage[] = ['Assamese', 'Hindi', 'Bengali', 'Tamil', 'Telugu', 'Marathi', 'Gujarati', 'Malayalam'];

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      
      {/* Top CTA Banner */}
      <div className="bg-gradient-to-r from-purple-900/80 via-indigo-900/80 to-purple-900/80 border-b border-purple-800/40 py-12">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold backdrop-blur-md border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-purple-300" />
            <span>Ready to scale your regional ROAS?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Find High-Converting Regional UGC Creators Today
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="#creators"
              className="px-6 py-3 rounded-2xl bg-white text-slate-900 font-extrabold text-xs shadow-xl hover:bg-slate-100"
            >
              Browse Verified Creators
            </a>
            <button
              onClick={() => setIsBecomeCreatorOpen(true)}
              className="px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs shadow-xl"
            >
              Become a Creator
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links Grid */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-2 md:grid-cols-5 gap-8">
        
        {/* Brand Info */}
        <div className="col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white font-black text-sm">
              UG
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white">
              UGCLage<span className="text-purple-400">.com</span>
            </span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
            {footerData?.description || "India's premier User Generated Content (UGC) marketplace connecting D2C brands, e-commerce startups, and agencies with verified creators across 12+ regional languages."}
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            {footerData?.instagram && (
              <a
                href={footerData.instagram}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-900 hover:bg-purple-900/30 text-slate-400 hover:text-purple-400 border border-slate-800 transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            )}
            {footerData?.twitter && (
              <a
                href={footerData.twitter}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-900 hover:bg-sky-900/30 text-slate-400 hover:text-sky-400 border border-slate-800 transition-colors"
                title="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            )}
            {footerData?.facebook && (
              <a
                href={footerData.facebook}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-900 hover:bg-blue-900/30 text-slate-400 hover:text-blue-400 border border-slate-800 transition-colors"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            )}
            {footerData?.linkedin && (
              <a
                href={footerData.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-900 hover:bg-indigo-900/30 text-slate-400 hover:text-indigo-400 border border-slate-800 transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
          </div>

          <div className="flex items-center gap-3 pt-2">
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[10px] text-slate-300 font-medium flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              100% Verified Profiles
            </span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[10px] text-slate-300 font-medium">
              ⚡ 48H Delivery
            </span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h4 className="font-bold text-white text-xs uppercase tracking-wider">Explore Platform</h4>
          <ul className="space-y-2">
            <li><a href="#creators" className="hover:text-purple-400 transition-colors">Find Creators</a></li>
            <li><a href="#languages" className="hover:text-purple-400 transition-colors">12 Indian Languages</a></li>
            <li><a href="#how-it-works" className="hover:text-purple-400 transition-colors">How It Works</a></li>
            <li><a href="#blog" className="hover:text-purple-400 transition-colors">Strategy Blog</a></li>
            <li>
              <button onClick={() => setIsBecomeCreatorOpen(true)} className="hover:text-purple-400 text-left">
                Creator Registration
              </button>
            </li>
          </ul>
        </div>

        {/* Languages Quick Links */}
        <div className="space-y-3">
          <h4 className="font-bold text-white text-xs uppercase tracking-wider">Regional Languages</h4>
          <ul className="space-y-2">
            {sampleLangs.map((lang) => (
              <li key={lang}>
                <button
                  onClick={() => {
                    setSelectedLanguage(lang);
                    const el = document.getElementById('creators');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-purple-400 transition-colors text-left"
                >
                  {lang} UGC Creators
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Support & Admin */}
        <div className="space-y-3">
          <h4 className="font-bold text-white text-xs uppercase tracking-wider">Support & Console</h4>
          <ul className="space-y-2">
            <li className="flex items-center gap-1.5 truncate">
              <Mail className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span>{footerData?.supportEmail || 'support@ugclage.com'}</span>
            </li>
            <li className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{footerData?.supportPhone || '+91 98765 43210'}</span>
            </li>
            <li><a href="#faqs" className="hover:text-purple-400">Client FAQs</a></li>
            <li className="pt-2">
              <button
                onClick={() => setIsAdminPanelOpen(true)}
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-purple-300 font-bold text-[11px] flex items-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin Login</span>
              </button>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-slate-900 py-6">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <p>© {new Date().getFullYear()} UGCLage.com. All rights reserved. Built with ❤️ for India's Creator Economy.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-300">Terms of Service</a>
          </div>
        </div>
      </div>

    </footer>
  );
};
