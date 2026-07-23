import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Video, 
  Heart, 
  Sun, 
  Moon, 
  ShieldCheck, 
  Menu, 
  X, 
  UserPlus, 
  Search,
  Sparkles,
  Palette,
  Check
} from 'lucide-react';

interface NavbarProps {
  onScrollToSection?: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onScrollToSection }) => {
  const { 
    darkMode, 
    toggleDarkMode, 
    themeColor,
    setThemeColor,
    themeMode,
    setThemeMode,
    favorites, 
    setIsWishlistOpen, 
    setIsAdminPanelOpen, 
    setIsBecomeCreatorOpen,
    searchQuery,
    setSearchQuery
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [colorPopoverOpen, setColorPopoverOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    if (onScrollToSection) {
      onScrollToSection(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('hero')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-500 p-0.5 shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Video className="w-5 h-5 text-purple-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-purple-950 to-indigo-900 dark:from-white dark:via-purple-200 dark:to-indigo-300 bg-clip-text text-transparent">
                UGCLage<span className="text-purple-600 dark:text-purple-400">.com</span>
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold tracking-wider text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/40 rounded-full border border-purple-200 dark:border-purple-800/60 uppercase">
                India
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-none mt-0.5 hidden xs:block">
              India's UGC Creator Marketplace
            </p>
          </div>
        </div>

        {/* Desktop Quick Search Input */}
        <div className="hidden lg:flex items-center relative max-w-xs w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Hindi, Tamil, Beauty creators..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
          />
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <button 
            onClick={() => handleNavClick('creators')} 
            className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            Find Creators
          </button>
          <button 
            onClick={() => handleNavClick('languages')} 
            className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            Languages
          </button>
          <button 
            onClick={() => handleNavClick('how-it-works')} 
            className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            How It Works
          </button>
          <button 
            onClick={() => handleNavClick('blog')} 
            className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            Blog
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Become a Creator Button */}
          <button
            onClick={() => setIsBecomeCreatorOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-100 dark:hover:bg-purple-900/60 border border-purple-200/80 dark:border-purple-800/80 rounded-full transition-all"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Become a Creator</span>
          </button>

          {/* Wishlist Button */}
          <button
            onClick={() => setIsWishlistOpen(true)}
            className="relative p-2.5 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
            title="Saved Favorites"
          >
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500/20" />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                {favorites.length}
              </span>
            )}
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2.5 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* Theme Color Selector Popover */}
          <div className="relative">
            <button
              onClick={() => setColorPopoverOpen(!colorPopoverOpen)}
              className="p-2.5 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors flex items-center justify-center relative group"
              title="Customize App Theme & Colors"
            >
              <Palette className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-purple-600 border-2 border-white dark:border-slate-950 shadow-sm" />
            </button>
            {colorPopoverOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setColorPopoverOpen(false)} 
                />
                <div className="absolute right-0 mt-2.5 w-64 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-4.5 z-50 animate-in fade-in slide-in-from-top-2 duration-200 space-y-4">
                  
                  {/* 1. Page Background Theme */}
                  <div>
                    <h4 className="text-[11px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2.5">
                      1. Page Background Theme
                    </h4>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        { id: 'light', bg: 'bg-slate-100', text: 'text-slate-800', border: 'border-slate-200', name: 'Light Theme' },
                        { id: 'dark', bg: 'bg-slate-950', text: 'text-white', border: 'border-slate-800', name: 'Dark Theme' },
                        { id: 'dark-green', bg: 'bg-emerald-950', text: 'text-emerald-100', border: 'border-emerald-900', name: 'Dark Green' },
                        { id: 'current', bg: 'bg-purple-950', text: 'text-purple-100', border: 'border-purple-900', name: 'Current Color' }
                      ].map((t) => (
                        <button
                          key={t.id}
                          onClick={() => {
                            setThemeMode(t.id as any);
                          }}
                          className={`flex items-center gap-1.5 px-2.5 py-2 rounded-xl border text-left transition-all w-full ${
                            themeMode === t.id 
                              ? 'border-purple-500 bg-purple-50/50 dark:bg-purple-950/20 shadow-sm ring-1 ring-purple-500/20' 
                              : 'border-slate-100 dark:border-slate-800/40 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                          }`}
                        >
                          <span className={`w-3.5 h-3.5 rounded-full ${t.bg} border ${t.border} flex items-center justify-center`} />
                          <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 truncate">
                            {t.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-slate-100 dark:border-slate-800/60 my-1" />

                  {/* 2. Theme Accent Color */}
                  <div>
                    <h4 className="text-[11px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2.5">
                      2. Accent Accent Color
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'purple', bg: 'bg-purple-600', name: 'Purple' },
                        { id: 'indigo', bg: 'bg-indigo-600', name: 'Indigo' },
                        { id: 'rose', bg: 'bg-rose-600', name: 'Rose' },
                        { id: 'teal', bg: 'bg-teal-600', name: 'Teal' },
                        { id: 'amber', bg: 'bg-amber-600', name: 'Amber' },
                        { id: 'emerald', bg: 'bg-emerald-600', name: 'Emerald' }
                      ].map((c) => (
                        <button
                          key={c.id}
                          onClick={() => {
                            setThemeColor(c.id as any);
                          }}
                          className={`flex flex-col items-center gap-1 p-2 rounded-xl border transition-all ${
                            themeColor === c.id 
                              ? 'border-purple-500 bg-purple-50/50 dark:bg-purple-950/20 shadow-sm ring-1 ring-purple-500/20' 
                              : 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/50'
                          }`}
                          title={c.name}
                        >
                          <span className={`w-5.5 h-5.5 rounded-full ${c.bg} flex items-center justify-center text-white shadow-sm`}>
                            {themeColor === c.id && <Check className="w-3 h-3 stroke-[3]" />}
                          </span>
                          <span className="text-[9px] font-bold text-slate-700 dark:text-slate-300">
                            {c.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              </>
            )}
          </div>

          {/* Admin Panel Button */}
          <button
            onClick={() => setIsAdminPanelOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-white shadow-sm transition-all"
            title="Admin & Marketplace Manager"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400 dark:text-purple-600" />
            <span className="hidden sm:inline">Admin Panel</span>
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-6 bg-white/95 dark:bg-slate-950/95 border-b border-slate-200 dark:border-slate-800 space-y-3">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by language, creator..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200"
            />
          </div>

          <div className="flex flex-col gap-2 pt-2 text-sm font-medium">
            <button
              onClick={() => handleNavClick('creators')}
              className="text-left py-2 px-3 rounded-lg hover:bg-purple-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-200"
            >
              🔍 Find Creators
            </button>
            <button
              onClick={() => handleNavClick('languages')}
              className="text-left py-2 px-3 rounded-lg hover:bg-purple-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-200"
            >
              🌐 Indian Languages Directory
            </button>
            <button
              onClick={() => handleNavClick('how-it-works')}
              className="text-left py-2 px-3 rounded-lg hover:bg-purple-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-200"
            >
              ⚡ How It Works
            </button>
            <button
              onClick={() => handleNavClick('blog')}
              className="text-left py-2 px-3 rounded-lg hover:bg-purple-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-200"
            >
              📚 UGC Marketing Blog
            </button>
            <button
              onClick={() => {
                setIsBecomeCreatorOpen(true);
                setMobileMenuOpen(false);
              }}
              className="text-left py-2.5 px-3 rounded-xl bg-purple-600 text-white font-semibold flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Become a UGC Creator</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
