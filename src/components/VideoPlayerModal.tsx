import React, { useRef, useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { DEFAULT_DEMO_REEL_VIDEOS } from '../utils/imageCompressor';
import { 
  X, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  Video, 
  Sparkles,
  ExternalLink,
  AlertCircle,
  Heart,
  MessageSquare,
  Eye,
  Star,
  MapPin,
  CheckCircle,
  Award,
  ShoppingBag,
  TrendingUp,
  Flame
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const VideoPlayerModal: React.FC = () => {
  const { isVideoModalOpen, setIsVideoModalOpen, activeVideo, openOrderModal, creators } = useApp();

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [liveViews, setLiveViews] = useState(24500);
  const [liveLikes, setLiveLikes] = useState(1820);
  const [liveComments, setLiveComments] = useState(142);
  const [selectedPackage, setSelectedPackage] = useState<'basic' | 'standard' | 'premium'>('basic');

  // Simulate real-time ticking of views, likes, and comments for Instagram reels to make it feel alive!
  useEffect(() => {
    if (!isVideoModalOpen || !activeVideo) return;
    
    const seed = (activeVideo.creatorName.length * 7) + (activeVideo.video.title.length * 3);
    const initialViews = 15000 + (seed * 115) % 85000;
    const initialLikes = Math.floor(initialViews * 0.08);
    const initialComments = Math.floor(initialLikes * 0.05);

    setLiveViews(initialViews);
    setLiveLikes(initialLikes);
    setLiveComments(initialComments);

    const interval = setInterval(() => {
      setLiveViews(prev => prev + Math.floor(Math.random() * 4) + 1);
      if (Math.random() > 0.6) {
        setLiveLikes(prev => prev + 1);
      }
      if (Math.random() > 0.9) {
        setLiveComments(prev => prev + 1);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isVideoModalOpen, activeVideo]);

  useEffect(() => {
    setHasError(false);
    setIsPlaying(true);
    setSelectedPackage('basic'); // Reset selected package on video change
  }, [activeVideo]);

  if (!isVideoModalOpen || !activeVideo) return null;

  const rawUrl = activeVideo.video.videoUrl || DEFAULT_DEMO_REEL_VIDEOS[0];

  // Helper to determine drive preview, youtube embed, instagram embed, or direct video
  const getEmbedInfo = (url: string) => {
    if (!url) return { type: 'video', src: DEFAULT_DEMO_REEL_VIDEOS[0], isInstagram: false };
    
    const cleanUrl = url.trim().split('?')[0];

    // Support Instagram URLs (reels, posts, etc.)
    if (cleanUrl.includes('instagram.com')) {
      const match = cleanUrl.match(/\/(p|reel|reels)\/([a-zA-Z0-9_\-]+)/i);
      if (match && match[2]) {
        return { 
          type: 'iframe', 
          src: `https://www.instagram.com/p/${match[2]}/embed`, 
          isInstagram: true, 
          shortcode: match[2],
          originalUrl: url
        };
      }
      return { 
        type: 'iframe', 
        src: cleanUrl.endsWith('/embed') ? cleanUrl : `${cleanUrl.replace(/\/$/, '')}/embed`, 
        isInstagram: true, 
        originalUrl: url
      };
    }

    if (cleanUrl.includes('drive.google.com')) {
      const match = cleanUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
      if (match && match[1]) {
        return { type: 'iframe', src: `https://drive.google.com/file/d/${match[1]}/preview`, isInstagram: false };
      }
    }
    if (cleanUrl.includes('youtube.com') || cleanUrl.includes('youtu.be')) {
      let videoId = '';
      if (cleanUrl.includes('youtu.be/')) {
        videoId = cleanUrl.split('youtu.be/')[1]?.split('?')[0] || '';
      } else if (cleanUrl.includes('v=')) {
        videoId = cleanUrl.split('v=')[1]?.split('&')[0] || '';
      }
      if (videoId) {
        return { type: 'iframe', src: `https://www.youtube.com/embed/${videoId}?autoplay=1`, isInstagram: false };
      }
    }
    return { type: 'video', src: url, isInstagram: false };
  };

  const embedInfo = getEmbedInfo(rawUrl);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => setHasError(true));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Find target creator object if possible to launch order modal directly
  const targetCreatorObj = creators.find((c) => c.name.toLowerCase() === activeVideo.creatorName.toLowerCase());

  // Package features lists based on selected type or defaults
  const getPackageDetails = () => {
    if (!targetCreatorObj?.pricing) {
      return {
        price: selectedPackage === 'basic' ? 1499 : selectedPackage === 'standard' ? 2799 : 4999,
        duration: selectedPackage === 'basic' ? '30s' : selectedPackage === 'standard' ? '60s' : '90s',
        revisions: selectedPackage === 'basic' ? 1 : selectedPackage === 'standard' ? 2 : 3,
        delivery: selectedPackage === 'basic' ? 2 : selectedPackage === 'standard' ? 2 : 1,
        features: selectedPackage === 'basic' 
          ? ['1 x 30s UGC Video', 'Basic scriptwriting', '1 Revision'] 
          : selectedPackage === 'standard' 
            ? ['1 x 60s UGC Video', 'Full Scripting & Captions', '2 Revisions'] 
            : ['3 x UGC Ad Videos', 'Premium Scripting, Captions & Raw Clips', '3 Revisions']
      };
    }

    const pkg = targetCreatorObj.pricing[selectedPackage];
    return {
      price: pkg?.price || (selectedPackage === 'basic' ? 1499 : selectedPackage === 'standard' ? 2799 : 4999),
      duration: `${pkg?.durationSec || (selectedPackage === 'basic' ? 30 : selectedPackage === 'standard' ? 60 : 90)}s`,
      revisions: pkg?.revisions || (selectedPackage === 'basic' ? 1 : selectedPackage === 'standard' ? 2 : 3),
      delivery: pkg?.deliveryDays || (selectedPackage === 'basic' ? 2 : selectedPackage === 'standard' ? 2 : 1),
      features: pkg?.features || []
    };
  };

  const currentPkgDetails = getPackageDetails();

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 md:p-8">
        
        {/* Backdrop close capture */}
        <div className="absolute inset-0 -z-10" onClick={() => setIsVideoModalOpen(false)} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative w-full max-w-5xl bg-slate-900 text-white rounded-3xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col h-full max-h-[85vh] md:max-h-[80vh] my-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800 shrink-0 z-10">
            <div className="flex-1 min-w-0 pr-4">
              <h3 className="text-sm md:text-base font-extrabold truncate text-white">
                {activeVideo.video.title}
              </h3>
              <p className="text-[11px] text-purple-400 font-semibold flex items-center gap-1 mt-0.5">
                <Sparkles className="w-3 h-3" />
                <span>{activeVideo.creatorName} • {activeVideo.video.category}</span>
              </p>
            </div>

            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors shrink-0"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Video Player & Stats Grid */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden bg-black">
            
            {/* Player Column */}
            <div className="md:col-span-7 bg-black flex flex-col justify-center items-center relative h-full min-h-[280px] md:min-h-0 overflow-hidden p-4">
              {embedInfo.type === 'iframe' ? (
                <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[9/16] bg-slate-950 rounded-3xl overflow-hidden shadow-2xl ring-4 ring-slate-800/50 flex items-center justify-center mx-auto">
                  <iframe
                    src={embedInfo.src}
                    title={activeVideo.video.title}
                    className="w-full h-full border-0"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : hasError ? (
                /* Error Fallback if direct video fails to play */
                <div className="p-8 text-center space-y-4 max-w-sm">
                  <AlertCircle className="w-12 h-12 text-purple-400 mx-auto" />
                  <div>
                    <h4 className="font-bold text-sm text-white">Preview Media Format</h4>
                    <p className="text-xs text-slate-400 mt-1">
                      This video is hosted on an external drive or web format. You can open the raw video reel link directly:
                    </p>
                  </div>
                  <a
                    href={rawUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open Video Reel</span>
                  </a>
                </div>
              ) : (
                /* Standard HTML5 Video Player */
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                  <video
                    ref={videoRef}
                    src={embedInfo.src}
                    poster={activeVideo.video.thumbnailUrl}
                    autoPlay
                    loop
                    playsInline
                    controls
                    onError={() => setHasError(true)}
                    className="w-full h-full max-h-[55vh] object-contain cursor-pointer"
                    onClick={togglePlay}
                  />

                  {/* Bottom Overlay Controls */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-slate-950/80 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10 pointer-events-none">
                    <div className="flex items-center gap-2 pointer-events-auto">
                      <button
                        onClick={togglePlay}
                        className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white"
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={toggleMute}
                        className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white"
                      >
                        {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                    </div>

                    <span className="text-[11px] font-semibold text-white/90">
                      🎬 Verified UGC Demo Reel
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Interactive Stats & Details Sidebar Column */}
            <div className="md:col-span-5 bg-slate-900 flex flex-col h-full overflow-hidden border-t md:border-t-0 md:border-l border-slate-800">
              
              {/* Scrollable Sidebar Body */}
              <div className="flex-1 overflow-y-auto p-5 space-y-5">
                
                {/* Creator Profile Badge Header */}
                <div className="flex items-center gap-3">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden border border-purple-500/30">
                    <img 
                      src={targetCreatorObj?.profileImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100'} 
                      alt={activeVideo.creatorName} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-white flex items-center gap-1">
                      {activeVideo.creatorName}
                      <CheckCircle className="w-3.5 h-3.5 text-purple-400 fill-purple-400/20" />
                    </h4>
                    <div className="flex items-center gap-1 text-[10px] text-slate-400">
                      <MapPin className="w-3 h-3 text-slate-500" />
                      <span>{targetCreatorObj?.city || 'India'}, {targetCreatorObj?.state || 'UGC'}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-800/80 my-2" />

                {/* Conditional Sidebar View: Instagram Stats VS Custom Booking Details */}
                {embedInfo.isInstagram ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-1.5">
                      <span className="flex h-1.5 w-1.5 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                      </span>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                        Real-time Instagram Analytics
                      </span>
                    </div>

                    {/* Stats Display Cards */}
                    <div className="grid grid-cols-1 gap-2.5">
                      
                      {/* View Count card */}
                      <div className="bg-slate-950/40 border border-slate-800 p-3 rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                            <Eye className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Views</p>
                            <h5 className="text-sm font-black text-white mt-0.5 tabular-nums">
                              {liveViews.toLocaleString()}
                            </h5>
                          </div>
                        </div>
                        <span className="text-[9px] bg-purple-500/10 text-purple-400 font-bold px-2 py-0.5 rounded-full border border-purple-500/20">
                          Live Feed
                        </span>
                      </div>

                      {/* Likes card */}
                      <div className="bg-slate-950/40 border border-slate-800 p-3 rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400">
                            <Heart className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Estimated Likes</p>
                            <h5 className="text-sm font-black text-white mt-0.5 tabular-nums">
                              {liveLikes.toLocaleString()}
                            </h5>
                          </div>
                        </div>
                        <span className="text-[9px] bg-rose-500/10 text-rose-400 font-bold px-2 py-0.5 rounded-full border border-rose-500/20">
                          98% Acc.
                        </span>
                      </div>

                      {/* Comments card */}
                      <div className="bg-slate-950/40 border border-slate-800 p-3 rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400">
                            <MessageSquare className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Comments</p>
                            <h5 className="text-sm font-black text-white mt-0.5 tabular-nums">
                              {liveComments.toLocaleString()}
                            </h5>
                          </div>
                        </div>
                        <span className="text-[9px] bg-sky-500/10 text-sky-400 font-bold px-2 py-0.5 rounded-full border border-sky-500/20">
                          Active
                        </span>
                      </div>

                    </div>

                    {/* Pro insights box */}
                    <div className="p-3 bg-gradient-to-r from-purple-950/30 to-indigo-950/30 border border-purple-900/30 rounded-xl space-y-1">
                      <h6 className="text-[10px] font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 text-purple-400" />
                        <span>Performance Insight</span>
                      </h6>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        This reel exhibits an exceptional <strong className="text-purple-400">{( (liveLikes / liveViews) * 100 ).toFixed(1)}% engagement rate</strong>. Highly optimized for discovery, trending audios, and high click-through retention.
                      </p>
                    </div>

                    <a
                      href={rawUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700/60 transition-all shadow-sm mt-4"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                      <span>View original Reel on Instagram</span>
                    </a>
                  </div>
                ) : (
                  /* Standard Video Booking Sidebar View */
                  <div className="space-y-4">
                    
                    {/* Creator Highlights */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-slate-950/30 p-2.5 rounded-xl border border-slate-800 text-center">
                        <div className="text-amber-400 flex justify-center gap-0.5 mb-1">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span className="text-xs font-bold text-white">{targetCreatorObj?.rating || '5.0'}</span>
                        </div>
                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                          Rating ({targetCreatorObj?.reviewsCount || '1'} Review)
                        </span>
                      </div>

                      <div className="bg-slate-950/30 p-2.5 rounded-xl border border-slate-800 text-center flex flex-col justify-center items-center">
                        <div className="text-purple-400 font-extrabold text-xs mb-1 flex items-center gap-1">
                          <Award className="w-3.5 h-3.5" />
                          <span>{targetCreatorObj?.completedVideosCount || '12'}+</span>
                        </div>
                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                          Videos Delivered
                        </span>
                      </div>
                    </div>

                    <div className="border-t border-slate-800/80 my-2" />

                    {/* Booking Packages Selector */}
                    <div className="space-y-2">
                      <h5 className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                        <ShoppingBag className="w-3.5 h-3.5 text-purple-400" />
                        <span>UGC Production Packages</span>
                      </h5>
                      
                      {/* Package tabs */}
                      <div className="grid grid-cols-3 gap-1 bg-slate-950/60 p-1 rounded-xl border border-slate-800">
                        {(['basic', 'standard', 'premium'] as const).map((pkg) => {
                          const price = targetCreatorObj?.pricing?.[pkg]?.price || (pkg === 'basic' ? 1499 : pkg === 'standard' ? 2799 : 4999);
                          return (
                            <button
                              key={pkg}
                              type="button"
                              onClick={() => setSelectedPackage(pkg)}
                              className={`py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${
                                selectedPackage === pkg 
                                  ? 'bg-purple-600 text-white shadow' 
                                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
                              }`}
                            >
                              <div>{pkg}</div>
                              <div className="text-[9px] font-semibold opacity-90">₹{price}</div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Selected Package Details */}
                    <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-extrabold text-white capitalize">{selectedPackage} Production Package</span>
                        <span className="font-black text-purple-400">₹{currentPkgDetails.price}</span>
                      </div>
                      
                      <div className="flex items-center gap-3 text-[10px] text-slate-400 font-bold">
                        <span>🕒 {currentPkgDetails.duration} Video</span>
                        <span>🔄 {currentPkgDetails.revisions} Revisions</span>
                        <span>⚡ {currentPkgDetails.delivery} Days Delivery</span>
                      </div>

                      <div className="border-t border-slate-800/60 my-2" />

                      <ul className="space-y-1.5 text-[10px] text-slate-300">
                        {currentPkgDetails.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <span className="text-purple-400 text-xs">✓</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                )}

              </div>

              {/* Sticky Sidebar Action Footer */}
              <div className="p-4 bg-slate-950 border-t border-slate-800 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setIsVideoModalOpen(false);
                    if (targetCreatorObj) {
                      openOrderModal(targetCreatorObj, selectedPackage);
                    }
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-500/10 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Video className="w-4 h-4 shrink-0" />
                  <span>Order Custom UGC Video (₹{currentPkgDetails.price})</span>
                </button>
              </div>

            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
