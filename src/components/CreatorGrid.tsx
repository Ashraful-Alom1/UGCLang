import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Creator, IndianLanguage, CreatorCategory, Gender } from '../types';
import { CreatorCard } from './CreatorCard';
import { 
  Search, 
  Filter, 
  X, 
  SlidersHorizontal, 
  RotateCcw, 
  Sparkles,
  ChevronDown
} from 'lucide-react';

interface CreatorGridProps {
  onOpenProfile: (creator: Creator) => void;
  onOrderNow: (creator: Creator) => void;
}

const CATEGORIES: (CreatorCategory | 'All')[] = [
  'All',
  'Beauty & Care',
  'Tech & Gadgets',
  'Fashion & Apparel',
  'Health & Fitness',
  'Food & Dining',
  'E-Commerce & D2C',
  'Finance & Apps',
  'EdTech & Lifestyle'
];

export const CreatorGrid: React.FC<CreatorGridProps> = ({ onOpenProfile, onOrderNow }) => {
  const { 
    creators, 
    languages, 
    selectedLanguage, 
    setSelectedLanguage,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedGender,
    setSelectedGender,
    sortBy,
    setSortBy,
    maxPrice,
    setMaxPrice
  } = useApp();

  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  // Active languages list for filter dropdown
  const enabledLanguages = languages.filter((l) => l.enabled).map((l) => l.name);

  // Filter & Sort Logic
  const filteredCreators = useMemo(() => {
    return creators
      .filter((c) => c.status === 'active')
      .filter((c) => {
        // Search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = c.name.toLowerCase().includes(q);
          const matchTagline = c.tagline.toLowerCase().includes(q);
          const matchLang = c.languages.some((l) => l.toLowerCase().includes(q));
          const matchCategory = c.category.toLowerCase().includes(q);
          const matchCity = c.city.toLowerCase().includes(q);
          if (!matchName && !matchTagline && !matchLang && !matchCategory && !matchCity) {
            return false;
          }
        }

        // Language Filter
        if (selectedLanguage !== 'All') {
          if (!c.languages.includes(selectedLanguage)) return false;
        }

        // Category Filter
        if (selectedCategory !== 'All') {
          if (c.category !== selectedCategory) return false;
        }

        // Gender Filter
        if (selectedGender !== 'All') {
          if (c.gender !== selectedGender) return false;
        }

        // Price Filter
        const basePrice = c.pricing?.basic?.price ?? 1499;
        if (basePrice > maxPrice) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'price_low') {
          const aPrice = a.pricing?.basic?.price ?? 1499;
          const bPrice = b.pricing?.basic?.price ?? 1499;
          return aPrice - bPrice;
        }
        if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        // popular default
        return b.completedVideosCount - a.completedVideosCount;
      });
  }, [creators, searchQuery, selectedLanguage, selectedCategory, selectedGender, maxPrice, sortBy]);

  const resetFilters = () => {
    setSelectedLanguage('All');
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedGender('All');
    setMaxPrice(10000);
    setSortBy('popular');
  };

  const isFiltered = selectedLanguage !== 'All' || selectedCategory !== 'All' || selectedGender !== 'All' || searchQuery !== '' || maxPrice < 10000;

  return (
    <section id="creators" className="py-16 bg-slate-50/50 dark:bg-slate-950 min-h-screen">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/80 text-xs font-bold text-purple-700 dark:text-purple-300 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Explore Verified Marketplace</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              Browse UGC Creators
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Showing {filteredCreators.length} verified creators ready for video production
            </p>
          </div>

          {/* Quick Language Tabs for Desktop */}
          <div className="hidden lg:flex items-center gap-1.5 overflow-x-auto pb-1 max-w-xl">
            <button
              onClick={() => setSelectedLanguage('All')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedLanguage === 'All'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-purple-300'
              }`}
            >
              All Languages ({creators.length})
            </button>
            {enabledLanguages.slice(0, 6).map((langName) => (
              <button
                key={langName}
                onClick={() => setSelectedLanguage(langName as IndianLanguage)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedLanguage === langName
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-purple-300'
                }`}
              >
                {langName}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-md space-y-4">
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
            
            {/* Search Input */}
            <div className="lg:col-span-4 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search creator name, city, tag..."
                className="w-full pl-9 pr-8 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Language Select */}
            <div className="lg:col-span-3">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value as IndianLanguage | 'All')}
                className="w-full py-2.5 px-3 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              >
                <option value="All">All Languages ({languages.length})</option>
                {enabledLanguages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang} Language
                  </option>
                ))}
              </select>
            </div>

            {/* Category Select */}
            <div className="lg:col-span-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as CreatorCategory | 'All')}
                className="w-full py-2.5 px-3 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === 'All' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Select */}
            <div className="lg:col-span-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full py-2.5 px-3 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              >
                <option value="popular">🔥 Most Popular</option>
                <option value="rating">⭐ Highest Rated</option>
                <option value="price_low">₹ Price: Low to High</option>
                <option value="newest">✨ Newest Creators</option>
              </select>
            </div>

          </div>

          {/* Secondary Filters Row (Gender, Price Slider, Reset) */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
            
            {/* Gender Filters */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Gender:</span>
              <div className="flex gap-1">
                {(['All', 'Female', 'Male'] as const).map((g) => (
                  <button
                    key={g}
                    onClick={() => setSelectedGender(g)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                      selectedGender === g
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Slider */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                Max Price: <span className="text-purple-600 dark:text-purple-400 font-extrabold">₹{maxPrice.toLocaleString()}</span>
              </span>
              <input
                type="range"
                min="1000"
                max="10000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-32 accent-purple-600"
              />
            </div>

            {/* Clear Filters */}
            {isFiltered && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

        </div>

        {/* Creator Cards Grid */}
        {filteredCreators.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCreators.map((creator) => (
              <CreatorCard
                key={creator.id}
                creator={creator}
                onOpenProfile={onOpenProfile}
                onOrderNow={onOrderNow}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-purple-50 dark:bg-slate-800 text-purple-600 dark:text-purple-400 flex items-center justify-center mx-auto text-2xl">
              🔍
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              No Creators Found
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Try clearing your language or search filters to view creators across all categories.
            </p>
            <button
              onClick={resetFilters}
              className="px-5 py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs shadow-md shadow-purple-500/20 hover:bg-purple-700"
            >
              Show All Creators
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
