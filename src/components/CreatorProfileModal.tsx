import React, { useState } from 'react';
import { Creator, PricingPackage } from '../types';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Star, 
  Check, 
  Play, 
  MessageCircle, 
  Clock, 
  ShieldCheck, 
  MapPin, 
  Instagram, 
  Twitter,
  Facebook,
  Linkedin,
  Youtube,
  Globe,
  Send,
  Video,
  Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CreatorProfileModalProps {
  creator: Creator | null;
  onClose: () => void;
  onOrderPackage: (creator: Creator, pkg: 'basic' | 'standard' | 'premium') => void;
}

export const CreatorProfileModal: React.FC<CreatorProfileModalProps> = ({
  creator,
  onClose,
  onOrderPackage
}) => {
  const { toggleFavorite, isFavorite, playVideoModal, addReviewToCreator, creators } = useApp();

  const [selectedPkgTab, setSelectedPkgTab] = useState<'basic' | 'standard' | 'premium'>('basic');

  // Review Form
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [revName, setRevName] = useState('');
  const [revCompany, setRevCompany] = useState('');
  const [revRating, setRevRating] = useState(5);
  const [revComment, setRevComment] = useState('');
  const [reviewsList, setReviewsList] = useState<Array<{ name: string; company: string; rating: number; comment: string; date: string }>>([
    {
      name: 'Rahul V.',
      company: 'GlowSkin India',
      rating: 5,
      comment: 'Extremely fast turnaround and high hook retention on our Meta ad campaign. The script delivery felt 100% natural!',
      date: '2 days ago'
    },
    {
      name: 'Priya Sharma',
      company: 'NutriFit D2C',
      rating: 5,
      comment: 'Outstanding video quality! Reduced our Cost Per Acquisition (CPA) by 34% in the first week.',
      date: '1 week ago'
    }
  ]);

  if (!creator) return null;

  const favorited = isFavorite(creator.id);
  const defaultPricing = {
    basic: { price: 1499, durationSec: 30, revisions: 1, deliveryDays: 2, features: ['1 x 30s UGC Video', '1 Revision'] },
    standard: { price: 2799, durationSec: 60, revisions: 2, deliveryDays: 2, features: ['1 x 60s UGC Video', 'Subtitles'] },
    premium: { price: 4999, durationSec: 90, revisions: 3, deliveryDays: 1, features: ['3 x UGC Ad Videos', 'Raw Clips'] }
  };
  const pricingObj = creator.pricing || defaultPricing;
  const pkgDetails = pricingObj[selectedPkgTab] || pricingObj.basic;

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revName || !revComment) return;
    addReviewToCreator(creator.id, revName, revCompany || 'Verified Brand', revRating, revComment);
    setReviewsList((prev) => [
      {
        name: revName,
        company: revCompany || 'Verified Brand',
        rating: revRating,
        comment: revComment,
        date: 'Just now'
      },
      ...prev
    ]);
    setShowReviewForm(false);
    setRevName('');
    setRevCompany('');
    setRevComment('');
  };

  const whatsappMessage = encodeURIComponent(
    `Hello! I saw ${creator.name}'s UGC profile on UGCLage.com and would like to order a video for my brand.`
  );
  const whatsappUrl = `https://wa.me/91${creator.phone.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`;

  // Related creators in same category or language
  const related = creators
    .filter((c) => c.id !== creator.id && (c.category === creator.category || c.languages.some((l) => creator.languages.includes(l))))
    .slice(0, 2);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8 max-h-[90vh] flex flex-col"
        >
          {/* Header Bar */}
          <div className="sticky top-0 z-20 flex items-center justify-between p-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                Creator Profile
              </span>
              <span className="text-xs font-semibold text-slate-500">
                ID: #{creator.id}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleFavorite(creator.id)}
                className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:scale-105"
              >
                <Heart className={`w-4 h-4 ${favorited ? 'text-rose-500 fill-rose-500' : ''}`} />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Scrollable Content Area */}
          <div className="overflow-y-auto flex-1 p-4 sm:p-6 space-y-8">
            
            {/* Cover & Profile Identity Header */}
            <div className="relative rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-800">
              <img 
                src={creator.coverImage} 
                alt="Cover" 
                className="w-full h-44 sm:h-56 object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="flex items-end gap-4">
                  <img 
                    src={creator.profileImage} 
                    alt={creator.name} 
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-4 ring-white dark:ring-slate-900 shadow-xl" 
                  />
                  <div className="text-white space-y-1">
                    <div className="flex items-center gap-2">
                      <h2 className="text-2xl font-extrabold">{creator.name}</h2>
                      <ShieldCheck className="w-5 h-5 text-blue-400 fill-blue-400/20" />
                    </div>
                    <p className="text-xs text-purple-300 font-medium">{creator.tagline}</p>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-slate-300 font-medium pt-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-purple-400" />
                        {creator.city}, {creator.state}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Instagram className="w-3.5 h-3.5 text-pink-400" />
                        {creator.followersCount} Followers
                      </span>
                      
                      {/* Social handles links */}
                      {(creator.instagram || creator.twitter || creator.facebook || creator.linkedin || creator.youtube) && (
                        <>
                          <span>•</span>
                          <div className="flex items-center gap-2">
                            {creator.instagram && (
                              <a
                                href={creator.instagram.startsWith('http') ? creator.instagram : `https://instagram.com/${creator.instagram.replace('@', '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1 rounded-md bg-white/10 hover:bg-white/20 transition-all text-pink-400 hover:text-pink-300"
                                title="Instagram"
                              >
                                <Instagram className="w-3.5 h-3.5" />
                              </a>
                            )}
                            {creator.twitter && (
                              <a
                                href={creator.twitter.startsWith('http') ? creator.twitter : `https://twitter.com/${creator.twitter}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1 rounded-md bg-white/10 hover:bg-white/20 transition-all text-sky-400 hover:text-sky-300"
                                title="Twitter / X"
                              >
                                <Twitter className="w-3.5 h-3.5" />
                              </a>
                            )}
                            {creator.facebook && (
                              <a
                                href={creator.facebook.startsWith('http') ? creator.facebook : `https://facebook.com/${creator.facebook}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1 rounded-md bg-white/10 hover:bg-white/20 transition-all text-blue-400 hover:text-blue-300"
                                title="Facebook"
                              >
                                <Facebook className="w-3.5 h-3.5" />
                              </a>
                            )}
                            {creator.linkedin && (
                              <a
                                href={creator.linkedin.startsWith('http') ? creator.linkedin : `https://linkedin.com/in/${creator.linkedin}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1 rounded-md bg-white/10 hover:bg-white/20 transition-all text-blue-500 hover:text-blue-400"
                                title="LinkedIn"
                              >
                                <Linkedin className="w-3.5 h-3.5" />
                              </a>
                            )}
                            {creator.youtube && (
                              <a
                                href={creator.youtube.startsWith('http') ? creator.youtube : `https://youtube.com/${creator.youtube}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1 rounded-md bg-white/10 hover:bg-white/20 transition-all text-red-500 hover:text-red-400"
                                title="YouTube"
                              >
                                <Youtube className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Rating Badge */}
                <div className="px-4 py-2 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-900 dark:text-white flex items-center gap-2 shadow-lg shrink-0">
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                  <div>
                    <div className="text-sm font-black">{creator.rating} / 5.0</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">{creator.reviewsCount} Brand Reviews</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Grid Layout: Left Bio & Videos, Right Pricing */}
            <div className="grid lg:grid-cols-12 gap-8">
              
              {/* Left Column (Bio + Video Reels + Reviews) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* About Bio */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-3">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    About {creator.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {creator.about}
                  </p>
                  
                  <div className="pt-3 flex flex-wrap gap-2 border-t border-slate-200 dark:border-slate-700">
                    <span className="text-xs font-bold text-slate-400">Languages:</span>
                    {creator.languages.map((l) => (
                      <span key={l} className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300">
                        {l}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Demo Video Reels */}
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center justify-between">
                    <span>Demo UGC Reels ({creator.demoVideos.length})</span>
                    <span className="text-xs text-purple-600 font-semibold">Click to preview</span>
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {creator.demoVideos.map((vid) => (
                      <div
                        key={vid.id}
                        onClick={() => playVideoModal(vid, creator.name)}
                        className="relative rounded-2xl overflow-hidden h-44 bg-slate-900 cursor-pointer group shadow-md"
                      >
                        <img 
                          src={vid.thumbnailUrl} 
                          alt={vid.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent p-3 flex flex-col justify-between">
                          <span className="self-end px-2 py-0.5 rounded bg-black/60 text-[10px] text-white font-medium">
                            {vid.viewsCount} Views
                          </span>
                          
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-bold text-white line-clamp-1 pr-2">
                              {vid.title}
                            </p>
                            <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center shrink-0">
                              <Play className="w-3.5 h-3.5 fill-white translate-x-0.5" />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Verified Brand Reviews */}
                <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      Brand Reviews & Ratings
                    </h3>
                    <button
                      onClick={() => setShowReviewForm(!showReviewForm)}
                      className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline"
                    >
                      {showReviewForm ? 'Cancel Review' : '+ Write a Review'}
                    </button>
                  </div>

                  {/* Review Form */}
                  {showReviewForm && (
                    <form onSubmit={handleReviewSubmit} className="p-4 rounded-2xl bg-purple-50/60 dark:bg-slate-800/80 border border-purple-200 dark:border-purple-800 space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          required
                          placeholder="Your Name / Brand"
                          value={revName}
                          onChange={(e) => setRevName(e.target.value)}
                          className="p-2.5 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                        />
                        <input
                          type="text"
                          placeholder="Company (e.g., D2C Brand)"
                          value={revCompany}
                          onChange={(e) => setRevCompany(e.target.value)}
                          className="p-2.5 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Rating:</span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setRevRating(star)}
                              className="p-1 text-amber-400"
                            >
                              <Star className={`w-4 h-4 ${star <= revRating ? 'fill-amber-400' : 'text-slate-300'}`} />
                            </button>
                          ))}
                        </div>
                      </div>

                      <textarea
                        required
                        rows={2}
                        placeholder="Write your experience working with this creator..."
                        value={revComment}
                        onChange={(e) => setRevComment(e.target.value)}
                        className="w-full p-2.5 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                      />

                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold shadow hover:bg-purple-700"
                      >
                        Submit Verified Review
                      </button>
                    </form>
                  )}

                  <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                    {reviewsList.map((rev, idx) => (
                      <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200">
                            {rev.name} <span className="text-purple-600 font-semibold">({rev.company})</span>
                          </span>
                          <div className="flex text-amber-400 text-xs">
                            {'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}
                          </div>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                          "{rev.comment}"
                        </p>
                        <p className="text-[10px] text-slate-400 text-right">{rev.date}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column (Pricing Packages & Direct Actions) */}
              <div className="lg:col-span-5 space-y-6">
                
                <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                    Pricing Packages
                  </h3>

                  {/* Package Selector Tabs */}
                  <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl text-xs font-bold">
                    {(['basic', 'standard', 'premium'] as const).map((pkgKey) => (
                      <button
                        key={pkgKey}
                        onClick={() => setSelectedPkgTab(pkgKey)}
                        className={`py-2 rounded-xl capitalize transition-all ${
                          selectedPkgTab === pkgKey
                            ? 'bg-purple-600 text-white shadow'
                            : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                        }`}
                      >
                        {pkgKey}
                      </button>
                    ))}
                  </div>

                  {/* Active Package Details */}
                  <div className="space-y-4">
                    <div className="flex items-baseline justify-between">
                      <span className="text-3xl font-black text-slate-900 dark:text-white">
                        ₹{pkgDetails.price.toLocaleString()}
                      </span>
                      <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-purple-500" />
                        {pkgDetails.deliveryDays} Days Delivery
                      </span>
                    </div>

                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      Includes {pkgDetails.durationSec}s Video • {pkgDetails.revisions} Free Revisions
                    </p>

                    <ul className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 font-medium">
                      {pkgDetails.features.map((feat, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Primary CTA Buttons */}
                  <div className="space-y-3 pt-4">
                    <button
                      onClick={() => {
                        onClose();
                        onOrderPackage(creator, selectedPkgTab);
                      }}
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2"
                    >
                      <Video className="w-4 h-4" />
                      <span>Order {selectedPkgTab.toUpperCase()} Package Now</span>
                    </button>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600/20" />
                      <span>Direct WhatsApp Inquiry</span>
                    </a>
                  </div>

                </div>

              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
