import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { IndianLanguage, CreatorCategory, Gender, PricingPackage } from '../types';
import { compressImageFile, getRandomDemoReelVideo } from '../utils/imageCompressor';
import { 
  X, 
  CheckCircle2, 
  UserPlus, 
  Video, 
  Sparkles, 
  Send,
  Upload,
  Image as ImageIcon,
  DollarSign,
  Package,
  Layers,
  Clock,
  RotateCcw,
  Layout
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const CATEGORIES: CreatorCategory[] = [
  'Beauty & Care',
  'Tech & Gadgets',
  'Fashion & Apparel',
  'Health & Fitness',
  'Food & Dining',
  'E-Commerce & D2C',
  'Finance & Apps',
  'EdTech & Lifestyle'
];

const CATEGORY_COVER_PRESETS: Record<CreatorCategory, string[]> = {
  'Beauty & Care': [
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=1000',
    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=1000',
    'https://images.unsplash.com/photo-1512290900673-7002000021c1?auto=format&fit=crop&q=80&w=1000'
  ],
  'Tech & Gadgets': [
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1000',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1000',
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000'
  ],
  'Fashion & Apparel': [
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1000',
    'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=1000',
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1000'
  ],
  'Health & Fitness': [
    'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=1000',
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1000',
    'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=1000'
  ],
  'Food & Dining': [
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1000',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1000',
    'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&q=80&w=1000'
  ],
  'E-Commerce & D2C': [
    'https://images.unsplash.com/photo-1556742049-0a670f4a4591?auto=format&fit=crop&q=80&w=1000',
    'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=1000',
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1000'
  ],
  'Finance & Apps': [
    'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=1000',
    'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1000',
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1000'
  ],
  'EdTech & Lifestyle': [
    'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&q=80&w=1000',
    'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=1000',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000'
  ]
};

export const BecomeCreatorModal: React.FC = () => {
  const { isBecomeCreatorOpen, setIsBecomeCreatorOpen, addApplication, languages } = useApp();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  
  // Photo state
  const [profileImage, setProfileImage] = useState('');
  const [photoFileName, setPhotoFileName] = useState('');

  // Background Cover Image state
  const [coverImage, setCoverImage] = useState('');
  const [coverFileName, setCoverFileName] = useState('');
  
  // Video state
  const [demoVideoUrl, setDemoVideoUrl] = useState('');
  const [videoFileName, setVideoFileName] = useState('');

  const [selectedLangs, setSelectedLangs] = useState<IndianLanguage[]>(['Hindi']);
  const [gender, setGender] = useState<Gender>('Female');
  const [category, setCategory] = useState<CreatorCategory>('Beauty & Care');
  const [instagram, setInstagram] = useState('');
  const [followers, setFollowers] = useState('10K');
  const [experienceYears, setExperienceYears] = useState(2);
  const [about, setAbout] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  // Pricing Package Setup State
  const [basicPrice, setBasicPrice] = useState(1499);
  const [basicDuration, setBasicDuration] = useState(30);
  const [basicDeliveryDays, setBasicDeliveryDays] = useState(2);
  const [basicRevisions, setBasicRevisions] = useState(1);
  const [basicFeatures, setBasicFeatures] = useState('1 x 30s Vertical UGC Video (1080p), Hook + Problem Solution Script, 1 Revision');

  const [standardPrice, setStandardPrice] = useState(2799);
  const [standardDuration, setStandardDuration] = useState(60);
  const [standardDeliveryDays, setStandardDeliveryDays] = useState(2);
  const [standardRevisions, setStandardRevisions] = useState(2);
  const [standardFeatures, setStandardFeatures] = useState('1 x 60s UGC Video or 2 x 30s Clips, Subtitles / Auto Captions, 2 Hook Variations');

  const [premiumPrice, setPremiumPrice] = useState(4999);
  const [premiumDuration, setPremiumDuration] = useState(90);
  const [premiumDeliveryDays, setPremiumDeliveryDays] = useState(1);
  const [premiumRevisions, setPremiumRevisions] = useState(3);
  const [premiumFeatures, setPremiumFeatures] = useState('3 x UGC Ad Videos, Raw B-Roll Footage, 3 Hook Variations, Full Ad Usage Rights');

  const [activePackageTab, setActivePackageTab] = useState<'basic' | 'standard' | 'premium'>('basic');
  const [isSuccess, setIsSuccess] = useState(false);

  // CRITICAL FIX: Reset form whenever the modal opens to guarantee a completely clean form!
  useEffect(() => {
    if (isBecomeCreatorOpen) {
      resetForm();
    }
  }, [isBecomeCreatorOpen]);

  const resetForm = () => {
    setFullName('');
    setEmail('');
    setWhatsappNumber('');
    setProfileImage('');
    setPhotoFileName('');
    setCoverImage('');
    setCoverFileName('');
    setDemoVideoUrl('');
    setVideoFileName('');
    setSelectedLangs(['Hindi']);
    setGender('Female');
    setCategory('Beauty & Care');
    setInstagram('');
    setFollowers('10K');
    setExperienceYears(2);
    setAbout('');
    setCity('');
    setState('');
    setBasicPrice(1499);
    setBasicDuration(30);
    setBasicDeliveryDays(2);
    setBasicRevisions(1);
    setBasicFeatures('1 x 30s Vertical UGC Video (1080p), Hook + Problem Solution Script, 1 Revision');
    setStandardPrice(2799);
    setStandardDuration(60);
    setStandardDeliveryDays(2);
    setStandardRevisions(2);
    setStandardFeatures('1 x 60s UGC Video or 2 x 30s Clips, Subtitles / Auto Captions, 2 Hook Variations');
    setPremiumPrice(4999);
    setPremiumDuration(90);
    setPremiumDeliveryDays(1);
    setPremiumRevisions(3);
    setPremiumFeatures('3 x UGC Ad Videos, Raw B-Roll Footage, 3 Hook Variations, Full Ad Usage Rights');
    setActivePackageTab('basic');
    setIsSuccess(false);
  };

  if (!isBecomeCreatorOpen) return null;

  // File Upload Handlers for Device Photos, Covers & Videos
  const handlePhotoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFileName(file.name);
      compressImageFile(file, 600, 600, 0.85).then((compressed) => {
        setProfileImage(compressed);
      });
    }
  };

  const handleCoverFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverFileName(file.name);
      compressImageFile(file, 1000, 500, 0.85).then((compressed) => {
        setCoverImage(compressed);
      });
    }
  };

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setDemoVideoUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleLanguage = (lang: IndianLanguage) => {
    if (selectedLangs.includes(lang)) {
      if (selectedLangs.length > 1) {
        setSelectedLangs(selectedLangs.filter((l) => l !== lang));
      }
    } else {
      setSelectedLangs([...selectedLangs, lang]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !whatsappNumber || !email) return;

    const customPricing: PricingPackage = {
      basic: {
        price: Number(basicPrice) || 1499,
        durationSec: Number(basicDuration) || 30,
        deliveryDays: Number(basicDeliveryDays) || 2,
        revisions: Number(basicRevisions) || 1,
        features: basicFeatures.split(',').map((s) => s.trim()).filter(Boolean)
      },
      standard: {
        price: Number(standardPrice) || 2799,
        durationSec: Number(standardDuration) || 60,
        deliveryDays: Number(standardDeliveryDays) || 2,
        revisions: Number(standardRevisions) || 2,
        features: standardFeatures.split(',').map((s) => s.trim()).filter(Boolean)
      },
      premium: {
        price: Number(premiumPrice) || 4999,
        durationSec: Number(premiumDuration) || 90,
        deliveryDays: Number(premiumDeliveryDays) || 1,
        revisions: Number(premiumRevisions) || 3,
        features: premiumFeatures.split(',').map((s) => s.trim()).filter(Boolean)
      }
    };

    // Fallback category cover image if not explicitly selected/uploaded
    const finalCover = coverImage || CATEGORY_COVER_PRESETS[category]?.[0] || 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=1000';

    addApplication({
      fullName,
      email,
      whatsappNumber,
      profileImage: profileImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      coverImage: finalCover,
      demoVideoUrl: demoVideoUrl || 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-posing-in-a-stylish-outfit-43542-large.mp4',
      languages: selectedLangs,
      gender,
      category,
      instagram: instagram || '@creator_handle',
      followers: followers || '10K',
      experienceYears,
      about,
      city: city || 'Mumbai',
      state: state || 'Maharashtra',
      pricing: customPricing
    });

    setIsSuccess(true);
  };

  const resetAndClose = () => {
    resetForm();
    setIsBecomeCreatorOpen(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-6 p-6 sm:p-8 space-y-6 max-h-[90vh] flex flex-col"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 shrink-0">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-300">
                <UserPlus className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>Join UGCLage Creator Network</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 uppercase">
                    Verification Open
                  </span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Fill in your details, upload photo/video, and set custom pricing packages
                </p>
              </div>
            </div>

            <button
              onClick={resetAndClose}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Body */}
          <div className="overflow-y-auto flex-1 space-y-6 pr-1">
            {isSuccess ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  Application & Pricing Packages Saved!
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you for applying! Our team will review your profile, sample video reel, and packages. Once approved, your profile will automatically go live on the marketplace!
                </p>
                <div className="pt-4">
                  <button
                    onClick={resetAndClose}
                    className="px-8 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-lg shadow-purple-500/20"
                  >
                    Done & Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Basic Personal Details */}
                <div className="space-y-3">
                  <h4 className="text-xs font-extrabold text-purple-600 dark:text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                    <UserPlus className="w-4 h-4" />
                    <span>1. Personal & Contact Information</span>
                  </h4>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Meera Kulkarni"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full p-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={whatsappNumber}
                        onChange={(e) => setWhatsappNumber(e.target.value)}
                        className="w-full p-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="meera@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Instagram Handle & Followers
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="@handle"
                          value={instagram}
                          onChange={(e) => setInstagram(e.target.value)}
                          className="w-full p-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                        />
                        <input
                          type="text"
                          placeholder="e.g. 25K"
                          value={followers}
                          onChange={(e) => setFollowers(e.target.value)}
                          className="w-full p-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Profile Photo, Background Cover Image & Sample UGC Video Direct File Uploads */}
                <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <h4 className="text-xs font-extrabold text-purple-600 dark:text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Upload className="w-4 h-4" />
                    <span>2. Profile Photo, Background Image & Sample UGC Reel Upload</span>
                  </h4>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Profile Photo Upload */}
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                      <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                        Profile Photo (From Device)
                      </label>
                      
                      <div className="flex items-center gap-3">
                        {profileImage ? (
                          <img
                            src={profileImage}
                            alt="Profile Preview"
                            className="w-14 h-14 rounded-full object-cover ring-2 ring-purple-500 shadow"
                          />
                        ) : (
                          <div className="w-14 h-14 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-400">
                            <ImageIcon className="w-6 h-6" />
                          </div>
                        )}

                        <div className="flex-1 space-y-1">
                          <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-all shadow-sm">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Select Photo</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handlePhotoFileChange}
                              className="hidden"
                            />
                          </label>
                          {photoFileName && (
                            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold truncate">
                              ✓ {photoFileName}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="pt-2">
                        <span className="text-[10px] text-slate-400 block mb-1">Or paste photo URL:</span>
                        <input
                          type="url"
                          placeholder="https://images.unsplash.com/..."
                          value={profileImage}
                          onChange={(e) => setProfileImage(e.target.value)}
                          className="w-full p-2 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                        />
                      </div>
                    </div>

                    {/* Background Cover Image Upload & Category Presets */}
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                      <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                        Background Banner Image
                      </label>

                      <div className="space-y-2">
                        <div className="h-16 rounded-xl overflow-hidden relative bg-slate-200 dark:bg-slate-700 border border-slate-300 dark:border-slate-600">
                          {coverImage ? (
                            <img src={coverImage} alt="Cover Preview" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs text-slate-400 font-medium">
                              No Cover Selected
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between gap-2">
                          <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-all shadow-sm">
                            <Layout className="w-3.5 h-3.5" />
                            <span>Upload Cover</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleCoverFileChange}
                              className="hidden"
                            />
                          </label>
                          {coverFileName && (
                            <span className="text-[10px] text-emerald-600 font-semibold truncate max-w-[100px]">
                              ✓ {coverFileName}
                            </span>
                          )}
                        </div>

                        {/* Category Related Cover Thumbnails */}
                        <div className="pt-1">
                          <span className="text-[10px] font-bold text-slate-500 block mb-1">
                            Pick {category} Category Covers:
                          </span>
                          <div className="flex items-center gap-1.5">
                            {CATEGORY_COVER_PRESETS[category]?.map((url, i) => (
                              <button
                                key={i}
                                type="button"
                                onClick={() => {
                                  setCoverImage(url);
                                  setCoverFileName(`Preset Cover ${i + 1}`);
                                }}
                                className={`w-10 h-7 rounded-lg overflow-hidden border-2 transition-all ${
                                  coverImage === url ? 'border-purple-600 scale-105' : 'border-slate-300 opacity-70 hover:opacity-100'
                                }`}
                              >
                                <img src={url} alt="preset" className="w-full h-full object-cover" />
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Sample UGC Video Reel Upload */}
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                      <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                        Sample Reel (Choose Video File)
                      </label>

                      <div className="space-y-2">
                        <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-all shadow-sm">
                          <Video className="w-3.5 h-3.5" />
                          <span>Select Video</span>
                          <input
                            type="file"
                            accept="video/*"
                            onChange={handleVideoFileChange}
                            className="hidden"
                          />
                        </label>
                        
                        {videoFileName && (
                          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold truncate">
                            ✓ Uploaded: {videoFileName}
                          </p>
                        )}

                        {demoVideoUrl && (
                          <div className="mt-2 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 max-h-24 bg-black">
                            <video
                              controls
                              src={demoVideoUrl}
                              className="w-full max-h-20 object-contain"
                            />
                          </div>
                        )}
                      </div>

                      <div className="pt-2">
                        <span className="text-[10px] text-slate-400 block mb-1">Or paste video link:</span>
                        <input
                          type="url"
                          placeholder="https://drive.google.com/..."
                          value={demoVideoUrl}
                          onChange={(e) => setDemoVideoUrl(e.target.value)}
                          className="w-full p-2 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Languages & Category */}
                <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <h4 className="text-xs font-extrabold text-purple-600 dark:text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    <span>3. Category & Regional Languages</span>
                  </h4>

                  {/* Languages Multi-select Checklist */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Select Spoken Languages (Fluent Dialogue)
                    </label>
                    <div className="flex flex-wrap gap-1.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 max-h-28 overflow-y-auto">
                      {languages.map((l) => {
                        const active = selectedLangs.includes(l.name);
                        return (
                          <button
                            key={l.id}
                            type="button"
                            onClick={() => toggleLanguage(l.name)}
                            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                              active
                                ? 'bg-purple-600 text-white shadow-sm'
                                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-purple-300'
                            }`}
                          >
                            {l.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Primary Content Category
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value as CreatorCategory)}
                        className="w-full p-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold"
                      >
                        {CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Gender
                      </label>
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value as Gender)}
                        className="w-full p-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold"
                      >
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                        <option value="Non-Binary">Non-Binary</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        City & State
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="City (e.g. Pune)"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full p-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                        />
                        <input
                          type="text"
                          placeholder="State"
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          className="w-full p-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Years of UGC Experience
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={15}
                        value={experienceYears}
                        onChange={(e) => setExperienceYears(Number(e.target.value))}
                        className="w-full p-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Short Creator Bio / About Yourself
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Tell brands about your camera setup, studio lighting, voice style, and past work..."
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                      className="w-full p-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* PRICING PACKAGE SETUP SECTION */}
                <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-extrabold text-purple-600 dark:text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Package className="w-4 h-4" />
                      <span>4. Configure Your Service Pricing Packages</span>
                    </h4>

                    <span className="text-[11px] font-semibold text-slate-500">
                      Set pricing for Basic, Standard & Premium tiers
                    </span>
                  </div>

                  {/* Tabs Selector for Basic / Standard / Premium */}
                  <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80">
                    <button
                      type="button"
                      onClick={() => setActivePackageTab('basic')}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-extrabold transition-all ${
                        activePackageTab === 'basic'
                          ? 'bg-purple-600 text-white shadow'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-white/50'
                      }`}
                    >
                      ⚡ Basic Tier (₹{basicPrice})
                    </button>

                    <button
                      type="button"
                      onClick={() => setActivePackageTab('standard')}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-extrabold transition-all ${
                        activePackageTab === 'standard'
                          ? 'bg-purple-600 text-white shadow'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-white/50'
                      }`}
                    >
                      🔥 Standard Tier (₹{standardPrice})
                    </button>

                    <button
                      type="button"
                      onClick={() => setActivePackageTab('premium')}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-extrabold transition-all ${
                        activePackageTab === 'premium'
                          ? 'bg-purple-600 text-white shadow'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-white/50'
                      }`}
                    >
                      ⭐ Premium Tier (₹{premiumPrice})
                    </button>
                  </div>

                  {/* Active Package Editor Panel */}
                  {activePackageTab === 'basic' && (
                    <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 space-y-4">
                      <div className="grid sm:grid-cols-4 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                            Basic Price (INR ₹)
                          </label>
                          <input
                            type="number"
                            min={500}
                            max={50000}
                            value={basicPrice}
                            onChange={(e) => setBasicPrice(Number(e.target.value))}
                            className="w-full p-2.5 text-xs font-bold rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                            Duration (Sec)
                          </label>
                          <input
                            type="number"
                            min={15}
                            max={180}
                            value={basicDuration}
                            onChange={(e) => setBasicDuration(Number(e.target.value))}
                            className="w-full p-2.5 text-xs font-bold rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                            Delivery Days
                          </label>
                          <input
                            type="number"
                            min={1}
                            max={10}
                            value={basicDeliveryDays}
                            onChange={(e) => setBasicDeliveryDays(Number(e.target.value))}
                            className="w-full p-2.5 text-xs font-bold rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                            Free Revisions
                          </label>
                          <input
                            type="number"
                            min={0}
                            max={5}
                            value={basicRevisions}
                            onChange={(e) => setBasicRevisions(Number(e.target.value))}
                            className="w-full p-2.5 text-xs font-bold rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                          Basic Package Features (Comma separated)
                        </label>
                        <input
                          type="text"
                          value={basicFeatures}
                          onChange={(e) => setBasicFeatures(e.target.value)}
                          className="w-full p-2.5 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                        />
                      </div>
                    </div>
                  )}

                  {activePackageTab === 'standard' && (
                    <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800 space-y-4">
                      <div className="grid sm:grid-cols-4 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                            Standard Price (INR ₹)
                          </label>
                          <input
                            type="number"
                            min={500}
                            max={50000}
                            value={standardPrice}
                            onChange={(e) => setStandardPrice(Number(e.target.value))}
                            className="w-full p-2.5 text-xs font-bold rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                            Duration (Sec)
                          </label>
                          <input
                            type="number"
                            min={15}
                            max={180}
                            value={standardDuration}
                            onChange={(e) => setStandardDuration(Number(e.target.value))}
                            className="w-full p-2.5 text-xs font-bold rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                            Delivery Days
                          </label>
                          <input
                            type="number"
                            min={1}
                            max={10}
                            value={standardDeliveryDays}
                            onChange={(e) => setStandardDeliveryDays(Number(e.target.value))}
                            className="w-full p-2.5 text-xs font-bold rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                            Free Revisions
                          </label>
                          <input
                            type="number"
                            min={0}
                            max={5}
                            value={standardRevisions}
                            onChange={(e) => setStandardRevisions(Number(e.target.value))}
                            className="w-full p-2.5 text-xs font-bold rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                          Standard Package Features (Comma separated)
                        </label>
                        <input
                          type="text"
                          value={standardFeatures}
                          onChange={(e) => setStandardFeatures(e.target.value)}
                          className="w-full p-2.5 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                        />
                      </div>
                    </div>
                  )}

                  {activePackageTab === 'premium' && (
                    <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 space-y-4">
                      <div className="grid sm:grid-cols-4 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                            Premium Price (INR ₹)
                          </label>
                          <input
                            type="number"
                            min={500}
                            max={100000}
                            value={premiumPrice}
                            onChange={(e) => setPremiumPrice(Number(e.target.value))}
                            className="w-full p-2.5 text-xs font-bold rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                            Duration (Sec)
                          </label>
                          <input
                            type="number"
                            min={15}
                            max={300}
                            value={premiumDuration}
                            onChange={(e) => setPremiumDuration(Number(e.target.value))}
                            className="w-full p-2.5 text-xs font-bold rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                            Delivery Days
                          </label>
                          <input
                            type="number"
                            min={1}
                            max={10}
                            value={premiumDeliveryDays}
                            onChange={(e) => setPremiumDeliveryDays(Number(e.target.value))}
                            className="w-full p-2.5 text-xs font-bold rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                            Free Revisions
                          </label>
                          <input
                            type="number"
                            min={0}
                            max={10}
                            value={premiumRevisions}
                            onChange={(e) => setPremiumRevisions(Number(e.target.value))}
                            className="w-full p-2.5 text-xs font-bold rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                          Premium Package Features (Comma separated)
                        </label>
                        <input
                          type="text"
                          value={premiumFeatures}
                          onChange={(e) => setPremiumFeatures(e.target.value)}
                          className="w-full p-2.5 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                        />
                      </div>
                    </div>
                  )}

                </div>

                {/* Submit Action Bar */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={resetAndClose}
                    className="px-5 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold text-xs shadow-lg shadow-purple-500/25 flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Creator Application</span>
                  </button>
                </div>

              </form>
            )}
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
