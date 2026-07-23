import { Creator, LanguageItem, BlogPost, Order, CreatorApplication } from '../types';

export const INITIAL_LANGUAGES: LanguageItem[] = [
  { id: 'lang-1', name: 'Hindi', nativeName: 'हिन्दी', icon: '🇮🇳', creatorsCount: 148, enabled: true, description: 'Highest reach across North & Central India' },
  { id: 'lang-2', name: 'English', nativeName: 'English (Indian Accent)', icon: '🌐', creatorsCount: 192, enabled: true, description: 'Metro cities & pan-India urban consumer target' },
  { id: 'lang-3', name: 'Bengali', nativeName: 'বাংলা', icon: '🐯', creatorsCount: 64, enabled: true, description: 'West Bengal, Tripura & Eastern D2C market' },
  { id: 'lang-4', name: 'Tamil', nativeName: 'தமிழ்', icon: '🏛️', creatorsCount: 82, enabled: true, description: 'Tamil Nadu & tech-savvy South Indian shoppers' },
  { id: 'lang-5', name: 'Telugu', nativeName: 'తెలుగు', icon: '🎬', creatorsCount: 78, enabled: true, description: 'Telangana & Andhra Pradesh high conversion audience' },
  { id: 'lang-6', name: 'Marathi', nativeName: 'मराठी', icon: '🚩', creatorsCount: 95, enabled: true, description: 'Mumbai, Pune & Western India growth hub' },
  { id: 'lang-7', name: 'Malayalam', nativeName: 'മലയാളം', icon: '🌴', creatorsCount: 52, enabled: true, description: 'Kerala high literacy & impulse-buy brand buyers' },
  { id: 'lang-8', name: 'Kannada', nativeName: 'ಕನ್ನಡ', icon: '🐘', creatorsCount: 68, enabled: true, description: 'Karnataka & Silicon Valley of India consumers' },
  { id: 'lang-9', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', icon: '🌾', creatorsCount: 71, enabled: true, description: 'Punjab, NRI audience & high energy lifestyle ads' },
  { id: 'lang-10', name: 'Gujarati', nativeName: 'ગુજરાતી', icon: '🦁', creatorsCount: 60, enabled: true, description: 'Gujarat business owners & high purchasing power' },
  { id: 'lang-11', name: 'Assamese', nativeName: 'অসমীয়া', icon: '🦏', creatorsCount: 38, enabled: true, description: 'Assam & North-East rapid growing e-commerce region' },
  { id: 'lang-12', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', icon: '🌊', creatorsCount: 34, enabled: true, description: 'Odisha emerging brand affinity markets' }
];

// High quality portrait / vertical video samples (royalty-free webm/mp4 samples)
const SAMPLE_VIDEOS = {
  skincare: 'https://assets.mixkit.co/videos/preview/mixkit-woman-applying-face-cream-42777-large.mp4',
  tech: 'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smartphone-with-green-screen-41558-large.mp4',
  fashion: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-posing-in-a-stylish-outfit-43542-large.mp4',
  food: 'https://assets.mixkit.co/videos/preview/mixkit-person-pouring-syrup-on-pancakes-43283-large.mp4',
  fitness: 'https://assets.mixkit.co/videos/preview/mixkit-athletic-woman-stretching-her-legs-outdoors-42861-large.mp4',
};

export const INITIAL_CREATORS: Creator[] = [
  {
    id: 'creator-1',
    name: 'Ananya Sharma',
    tagline: 'High-Converting Skincare & D2C Beauty Specialist',
    profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
    coverImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=1200',
    languages: ['Hindi', 'English'],
    gender: 'Female',
    category: 'Beauty & Care',
    experienceYears: 4,
    completedVideosCount: 145,
    about: 'Namaste! I am Ananya, a full-time UGC creator based in Delhi. I specialize in unboxing, test-drives, honest review scripts, and problem-solution hooks for skincare, hair care, and wellness brands. My videos have generated over 3.2M views on Instagram Ads and Meta ROAS campaigns.',
    city: 'New Delhi',
    state: 'Delhi',
    email: 'ananya.ugc@example.com',
    phone: '+91 98765 43210',
    instagram: '@ananya_ugclab',
    followersCount: '48.5K',
    pricing: {
      basic: {
        price: 1899,
        durationSec: 30,
        revisions: 1,
        deliveryDays: 2,
        features: ['1 x 30s Vertical UGC Video (1080p)', 'Hook + Problem Solution Script', 'Self-lit Studio Setup', '1 Free Revision']
      },
      standard: {
        price: 3299,
        durationSec: 60,
        revisions: 2,
        deliveryDays: 2,
        features: ['1 x 60s UGC Video or 2 x 30s Clips', '2 Alternate Hook Openers', 'Auto Captions / Hindi Subtitles', 'Commercial Usage Rights (30 days)']
      },
      premium: {
        price: 5999,
        durationSec: 90,
        revisions: 3,
        deliveryDays: 1,
        features: ['3 x 30s High-Converting UGC Ads', 'Raw B-Roll Clips Included', '3 Hook Variations', '4K Quality + Dynamic Subtitles', 'Full Perpetual Ad Usage Rights']
      }
    },
    rating: 4.9,
    reviewsCount: 58,
    deliveryTimeDays: 2,
    gallery: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1512290900673-70020126786e?auto=format&fit=crop&q=80&w=600'
    ],
    demoVideos: [
      {
        id: 'v1',
        title: 'Vitamin C Serum Honest 7-Day Review (Hindi)',
        videoUrl: SAMPLE_VIDEOS.skincare,
        thumbnailUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=400',
        category: 'Beauty & Care',
        viewsCount: '124K'
      },
      {
        id: 'v2',
        title: 'Glow Moisturizer Aesthetic Unboxing Reel',
        videoUrl: SAMPLE_VIDEOS.skincare,
        thumbnailUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=400',
        category: 'Beauty & Care',
        viewsCount: '89K'
      }
    ],
    status: 'active',
    featured: true,
    createdAt: '2025-01-10'
  },
  {
    id: 'creator-2',
    name: 'Rohan Deshmukh',
    tagline: 'Tech, Gadgets & App Demo Specialist in Marathi & Hindi',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
    coverImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1200',
    languages: ['Marathi', 'Hindi', 'English'],
    gender: 'Male',
    category: 'Tech & Gadgets',
    experienceYears: 3,
    completedVideosCount: 92,
    about: 'Hey! I build relatable tech & mobile app demo UGC videos for Indian startups. From fintech apps to smartwatches and wireless earbuds, I talk directly to tier-1 & tier-2 audiences with authentic Marathi and energetic Hindi hooks.',
    city: 'Pune',
    state: 'Maharashtra',
    email: 'rohan.tech.ugc@example.com',
    phone: '+91 98123 45678',
    instagram: '@rohandesh_tech',
    followersCount: '32.1K',
    pricing: {
      basic: {
        price: 1499,
        durationSec: 30,
        revisions: 1,
        deliveryDays: 2,
        features: ['1 x 30s Tech Review Video', 'On-Screen Screen-Recording Sync', '1 Free Revision', '1080p Export']
      },
      standard: {
        price: 2799,
        durationSec: 60,
        revisions: 2,
        deliveryDays: 2,
        features: ['1 x 60s App Walkthrough or Smart Device Unboxing', '2 Script Hook Options', 'Dynamic Sound Effects & Motion Subtitles', 'Commercial Rights']
      },
      premium: {
        price: 4999,
        durationSec: 90,
        revisions: 3,
        deliveryDays: 1,
        features: ['2 x Complete UGC Ad Variations', 'Cinematic Macro B-Roll Shots', 'Raw Video Files Included', 'Fast 24-Hour Express Delivery']
      }
    },
    rating: 4.8,
    reviewsCount: 41,
    deliveryTimeDays: 2,
    gallery: [
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=600'
    ],
    demoVideos: [
      {
        id: 'v3',
        title: 'Smartwatch Feature Test & Battery Reality in Marathi',
        videoUrl: SAMPLE_VIDEOS.tech,
        thumbnailUrl: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=400',
        category: 'Tech & Gadgets',
        viewsCount: '95K'
      }
    ],
    status: 'active',
    featured: true,
    createdAt: '2025-02-01'
  },
  {
    id: 'creator-3',
    name: 'Kavitha Sundaram',
    tagline: 'Tamil & English Lifestyle, Kitchenware & E-Commerce UGC',
    profileImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
    coverImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=1200',
    languages: ['Tamil', 'English'],
    gender: 'Female',
    category: 'E-Commerce & D2C',
    experienceYears: 5,
    completedVideosCount: 180,
    about: 'Vanakkam! I am a professional Tamil UGC creator based in Chennai. I craft high-trust home, kitchen, mother-care, and lifestyle content that converts exceptionally well in Tamil Nadu and South Indian ad campaigns.',
    city: 'Chennai',
    state: 'Tamil Nadu',
    email: 'kavitha.ugc@example.com',
    phone: '+91 94440 12345',
    instagram: '@kavitha_ugc_tamil',
    followersCount: '62.0K',
    pricing: {
      basic: {
        price: 1999,
        durationSec: 30,
        revisions: 1,
        deliveryDays: 2,
        features: ['1 x 30s Tamil UGC Video', 'Natural Home Environment', 'Clear Voiceover & On-Screen Text']
      },
      standard: {
        price: 3499,
        durationSec: 60,
        revisions: 2,
        deliveryDays: 2,
        features: ['1 x 60s Demo & Review', 'Before-After Product Demonstration', '2 Hook Variations', 'Tamil Subtitles']
      },
      premium: {
        price: 6499,
        durationSec: 90,
        revisions: 3,
        deliveryDays: 1,
        features: ['3 x Unique UGC Video Ads', 'Raw B-Roll + Product Closeups', 'Full Usage Rights for Paid Ads']
      }
    },
    rating: 5.0,
    reviewsCount: 72,
    deliveryTimeDays: 2,
    gallery: [
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=600'
    ],
    demoVideos: [
      {
        id: 'v4',
        title: 'Non-Stick Cookware Cooking Demo (Tamil)',
        videoUrl: SAMPLE_VIDEOS.food,
        thumbnailUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=400',
        category: 'E-Commerce & D2C',
        viewsCount: '150K'
      }
    ],
    status: 'active',
    featured: true,
    createdAt: '2025-01-15'
  },
  {
    id: 'creator-4',
    name: 'Pritam Sengupta',
    tagline: 'Bengali & English Fashion & EdTech Reel Creator',
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600',
    coverImage: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&q=80&w=1200',
    languages: ['Bengali', 'English', 'Hindi'],
    gender: 'Male',
    category: 'Fashion & Apparel',
    experienceYears: 3,
    completedVideosCount: 78,
    about: 'Nolish-free, trendy styling & online course review UGC videos in Bengali and English. Based in Kolkata, helping fashion D2C brands drive viral engagement.',
    city: 'Kolkata',
    state: 'West Bengal',
    email: 'pritam.bengali.ugc@example.com',
    phone: '+91 98300 99887',
    instagram: '@pritam_ugc_kol',
    followersCount: '28.4K',
    pricing: {
      basic: {
        price: 1599,
        durationSec: 30,
        revisions: 1,
        deliveryDays: 2,
        features: ['1 x 30s Outfit Try-on or Review', 'Bengali Voiceover', 'HD 1080p Export']
      },
      standard: {
        price: 2899,
        durationSec: 60,
        revisions: 2,
        deliveryDays: 2,
        features: ['1 x 60s Styling Guide Video', 'Transitions & Music Effects', '2 Hook Openers']
      },
      premium: {
        price: 5299,
        durationSec: 90,
        revisions: 3,
        deliveryDays: 1,
        features: ['3 x Fashion UGC Ads', 'Full Raw B-Roll Footage', 'Commercial Paid Ad Rights']
      }
    },
    rating: 4.7,
    reviewsCount: 29,
    deliveryTimeDays: 2,
    gallery: [
      'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&q=80&w=600'
    ],
    demoVideos: [
      {
        id: 'v5',
        title: 'Men Ethnic Kurta Try-on Reel in Bengali',
        videoUrl: SAMPLE_VIDEOS.fashion,
        thumbnailUrl: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&q=80&w=400',
        category: 'Fashion & Apparel',
        viewsCount: '62K'
      }
    ],
    status: 'active',
    featured: false,
    createdAt: '2025-02-10'
  },
  {
    id: 'creator-5',
    name: 'Gurpreet Singh',
    tagline: 'Punjabi High-Energy Fitness & Supplement UGC Creator',
    profileImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600',
    coverImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=1200',
    languages: ['Punjabi', 'Hindi', 'English'],
    gender: 'Male',
    category: 'Health & Fitness',
    experienceYears: 4,
    completedVideosCount: 110,
    about: 'Sat Sri Akal! I create high-energy protein powder, gym gear, and wellness UGC videos in Punjabi and Hindi. Guaranteed strong engagement and high stop-rate hooks.',
    city: 'Chandigarh',
    state: 'Punjab',
    email: 'gurpreet.fit.ugc@example.com',
    phone: '+91 98140 33221',
    instagram: '@gurpreet_fitugc',
    followersCount: '54.2K',
    pricing: {
      basic: {
        price: 1799,
        durationSec: 30,
        revisions: 1,
        deliveryDays: 2,
        features: ['1 x 30s Gym / Protein Taste Test Video', 'Punjabi Dialogue & Hook', '1080p Quality']
      },
      standard: {
        price: 3199,
        durationSec: 60,
        revisions: 2,
        deliveryDays: 2,
        features: ['1 x 60s Workout + Supplement Routine', 'Punjabi & Hindi Subtitles', '2 Hook Variations']
      },
      premium: {
        price: 5799,
        durationSec: 90,
        revisions: 3,
        deliveryDays: 1,
        features: ['3 x High-Conversion Fitness Ads', 'Raw Workout B-roll Included', '24hr Express Delivery option']
      }
    },
    rating: 4.9,
    reviewsCount: 46,
    deliveryTimeDays: 2,
    gallery: [],
    demoVideos: [
      {
        id: 'v6',
        title: 'Whey Isolate Taste & Mixability Test (Punjabi)',
        videoUrl: SAMPLE_VIDEOS.fitness,
        thumbnailUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=400',
        category: 'Health & Fitness',
        viewsCount: '110K'
      }
    ],
    status: 'active',
    featured: true,
    createdAt: '2025-01-22'
  },
  {
    id: 'creator-6',
    name: 'Siddharth Rao',
    tagline: 'Telugu & English Finance, Fintech & EdTech Reviewer',
    profileImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=600',
    coverImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=1200',
    languages: ['Telugu', 'English'],
    gender: 'Male',
    category: 'Finance & Apps',
    experienceYears: 3,
    completedVideosCount: 65,
    about: 'Namaste! Based in Hyderabad, I craft authentic Telugu credit card reviews, stock trading app walkthroughs, and online learning platform UGC videos with crisp clarity.',
    city: 'Hyderabad',
    state: 'Telangana',
    email: 'siddharth.telugu.ugc@example.com',
    phone: '+91 99890 11223',
    instagram: '@siddharth_telugu_ugc',
    followersCount: '39.8K',
    pricing: {
      basic: {
        price: 1699,
        durationSec: 30,
        revisions: 1,
        deliveryDays: 2,
        features: ['1 x 30s Telugu App Review', 'On-screen Graphics & Hook']
      },
      standard: {
        price: 2999,
        durationSec: 60,
        revisions: 2,
        deliveryDays: 2,
        features: ['1 x 60s Comprehensive App Demo', 'Telugu Subtitles + CTA', '2 Hooks']
      },
      premium: {
        price: 5499,
        durationSec: 90,
        revisions: 3,
        deliveryDays: 1,
        features: ['3 x Telugu Performance Ads', 'Raw Video Files + App Screen Capture']
      }
    },
    rating: 4.8,
    reviewsCount: 33,
    deliveryTimeDays: 2,
    gallery: [],
    demoVideos: [
      {
        id: 'v7',
        title: 'Investment App 5-Minute Setup Guide (Telugu)',
        videoUrl: SAMPLE_VIDEOS.tech,
        thumbnailUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=400',
        category: 'Finance & Apps',
        viewsCount: '82K'
      }
    ],
    status: 'active',
    featured: false,
    createdAt: '2025-02-15'
  },
  {
    id: 'creator-7',
    name: 'Diya Patel',
    tagline: 'Gujarati & Hindi D2C Snack, Food & Home Essentials Creator',
    profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600',
    coverImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1200',
    languages: ['Gujarati', 'Hindi', 'English'],
    gender: 'Female',
    category: 'Food & Dining',
    experienceYears: 4,
    completedVideosCount: 132,
    about: 'Kem Cho! I am Diya from Ahmedabad. I specialize in food tasting, organic kitchen products, and traditional D2C brand reviews in Gujarati and Hindi.',
    city: 'Ahmedabad',
    state: 'Gujarat',
    email: 'diya.gujarati.ugc@example.com',
    phone: '+91 98250 44556',
    instagram: '@diyagujarati_ugc',
    followersCount: '41.0K',
    pricing: {
      basic: {
        price: 1599,
        durationSec: 30,
        revisions: 1,
        deliveryDays: 2,
        features: ['1 x 30s Food/Product Review', 'Gujarati Accent & Relatable Hook']
      },
      standard: {
        price: 2899,
        durationSec: 60,
        revisions: 2,
        deliveryDays: 2,
        features: ['1 x 60s Unboxing & Recipe/Tasting Video', 'Gujarati Subtitles']
      },
      premium: {
        price: 5199,
        durationSec: 90,
        revisions: 3,
        deliveryDays: 1,
        features: ['3 x High-Converting Food UGC Clips', 'Close-up B-Rolls']
      }
    },
    rating: 4.9,
    reviewsCount: 50,
    deliveryTimeDays: 2,
    gallery: [],
    demoVideos: [
      {
        id: 'v8',
        title: 'Organic Khakhra & Dip Honest Taste Test (Gujarati)',
        videoUrl: SAMPLE_VIDEOS.food,
        thumbnailUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=400',
        category: 'Food & Dining',
        viewsCount: '78K'
      }
    ],
    status: 'active',
    featured: true,
    createdAt: '2025-01-28'
  },
  {
    id: 'creator-8',
    name: 'Aishwarya Nair',
    tagline: 'Malayalam & English Aesthetic Wellness & Ayurveda UGC',
    profileImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600',
    coverImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1200',
    languages: ['Malayalam', 'English'],
    gender: 'Female',
    category: 'Beauty & Care',
    experienceYears: 3,
    completedVideosCount: 88,
    about: 'Namaskaram! I craft high-trust Malayalam videos for Ayurvedic oils, skincare, and organic hair wellness products. Kerala audiences respond deeply to authentic storytelling.',
    city: 'Kochi',
    state: 'Kerala',
    email: 'aishwarya.kerala.ugc@example.com',
    phone: '+91 94470 66778',
    instagram: '@aishwarya_malayalam_ugc',
    followersCount: '36.5K',
    pricing: {
      basic: {
        price: 1799,
        durationSec: 30,
        revisions: 1,
        deliveryDays: 2,
        features: ['1 x 30s Malayalam Hair Oil/Skincare Video', 'Natural Lighting']
      },
      standard: {
        price: 3199,
        durationSec: 60,
        revisions: 2,
        deliveryDays: 2,
        features: ['1 x 60s Aesthetic Routine Video', 'Malayalam Subtitles']
      },
      premium: {
        price: 5699,
        durationSec: 90,
        revisions: 3,
        deliveryDays: 1,
        features: ['3 x High-Converting Malayalam UGC Ads', 'Raw B-Rolls']
      }
    },
    rating: 4.9,
    reviewsCount: 37,
    deliveryTimeDays: 2,
    gallery: [],
    demoVideos: [
      {
        id: 'v9',
        title: 'Herbal Hair Oil Routine in Malayalam',
        videoUrl: SAMPLE_VIDEOS.skincare,
        thumbnailUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=400',
        category: 'Beauty & Care',
        viewsCount: '92K'
      }
    ],
    status: 'active',
    featured: false,
    createdAt: '2025-02-05'
  },
  {
    id: 'creator-9',
    name: 'Tejas Gowda',
    tagline: 'Kannada & English Smart Gadgets & D2C Product Unboxer',
    profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
    coverImage: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&q=80&w=1200',
    languages: ['Kannada', 'English'],
    gender: 'Male',
    category: 'Tech & Gadgets',
    experienceYears: 3,
    completedVideosCount: 71,
    about: 'Namaskara! Bangalore-based Kannada UGC creator targeting tech enthusiasts, workplace accessories, and urban electronics.',
    city: 'Bengaluru',
    state: 'Karnataka',
    email: 'tejas.kannada.ugc@example.com',
    phone: '+91 98450 77889',
    instagram: '@tejas_kannada_ugc',
    followersCount: '31.2K',
    pricing: {
      basic: {
        price: 1599,
        durationSec: 30,
        revisions: 1,
        deliveryDays: 2,
        features: ['1 x 30s Kannada Unboxing Video', 'Clean Desktop Setup']
      },
      standard: {
        price: 2899,
        durationSec: 60,
        revisions: 2,
        deliveryDays: 2,
        features: ['1 x 60s Tech Test & Review', 'Kannada Subtitles']
      },
      premium: {
        price: 5199,
        durationSec: 90,
        revisions: 3,
        deliveryDays: 1,
        features: ['3 x Kannada Tech Ads', 'Raw Video Included']
      }
    },
    rating: 4.8,
    reviewsCount: 30,
    deliveryTimeDays: 2,
    gallery: [],
    demoVideos: [
      {
        id: 'v10',
        title: 'Ergonomic Chair Setup & Review (Kannada)',
        videoUrl: SAMPLE_VIDEOS.tech,
        thumbnailUrl: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&q=80&w=400',
        category: 'Tech & Gadgets',
        viewsCount: '64K'
      }
    ],
    status: 'active',
    featured: false,
    createdAt: '2025-02-12'
  },
  {
    id: 'creator-10',
    name: 'Bishnu Saikia',
    tagline: 'Assamese & English Local Artisan & D2C Tea/Lifestyle UGC',
    profileImage: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=600',
    coverImage: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&q=80&w=1200',
    languages: ['Assamese', 'English', 'Hindi'],
    gender: 'Male',
    category: 'EdTech & Lifestyle',
    experienceYears: 2,
    completedVideosCount: 45,
    about: 'Nomoskar! I am Bishnu from Guwahati. I help tea, handloom, organic honey, and North-East D2C brands reach Assamese buyers with natural, captivating stories.',
    city: 'Guwahati',
    state: 'Assam',
    email: 'bishnu.assamese.ugc@example.com',
    phone: '+91 97060 11223',
    instagram: '@bishnu_assamese_ugc',
    followersCount: '21.5K',
    pricing: {
      basic: {
        price: 1399,
        durationSec: 30,
        revisions: 1,
        deliveryDays: 2,
        features: ['1 x 30s Assamese Product Reel', 'Natural Outdoor Setting']
      },
      standard: {
        price: 2499,
        durationSec: 60,
        revisions: 2,
        deliveryDays: 2,
        features: ['1 x 60s Storytelling UGC Reel', 'Assamese Subtitles']
      },
      premium: {
        price: 4499,
        durationSec: 90,
        revisions: 3,
        deliveryDays: 1,
        features: ['3 x Assamese UGC Ads', 'Raw B-Roll Included']
      }
    },
    rating: 4.8,
    reviewsCount: 22,
    deliveryTimeDays: 2,
    gallery: [],
    demoVideos: [
      {
        id: 'v11',
        title: 'Assam Specialty Green Tea Brewing & Tasting (Assamese)',
        videoUrl: SAMPLE_VIDEOS.food,
        thumbnailUrl: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&q=80&w=400',
        category: 'EdTech & Lifestyle',
        viewsCount: '48K'
      }
    ],
    status: 'active',
    featured: true,
    createdAt: '2025-02-18'
  },
  {
    id: 'creator-11',
    name: 'Subhashree Mohanty',
    tagline: 'Odia & Hindi Handloom, Jewellery & Home Decor Creator',
    profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
    coverImage: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=1200',
    languages: ['Odia', 'Hindi'],
    gender: 'Female',
    category: 'Fashion & Apparel',
    experienceYears: 3,
    completedVideosCount: 52,
    about: 'Namaskar! I create vibrant Odia content for traditional Sambalpuri sarees, ethnic jewellery, and handcrafted home decor D2C brands.',
    city: 'Bhubaneswar',
    state: 'Odisha',
    email: 'subhashree.odia.ugc@example.com',
    phone: '+91 94370 88990',
    instagram: '@subhashree_odia_ugc',
    followersCount: '25.8K',
    pricing: {
      basic: {
        price: 1399,
        durationSec: 30,
        revisions: 1,
        deliveryDays: 2,
        features: ['1 x 30s Odia Fashion Reel', 'High Quality Lighting']
      },
      standard: {
        price: 2599,
        durationSec: 60,
        revisions: 2,
        deliveryDays: 2,
        features: ['1 x 60s Jewellery Try-on & Review', 'Odia Captions']
      },
      premium: {
        price: 4699,
        durationSec: 90,
        revisions: 3,
        deliveryDays: 1,
        features: ['3 x Odia UGC Campaign Videos']
      }
    },
    rating: 4.8,
    reviewsCount: 19,
    deliveryTimeDays: 2,
    gallery: [],
    demoVideos: [
      {
        id: 'v12',
        title: 'Silver Filigree Jewellery Styling Reel (Odia)',
        videoUrl: SAMPLE_VIDEOS.fashion,
        thumbnailUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=400',
        category: 'Fashion & Apparel',
        viewsCount: '39K'
      }
    ],
    status: 'active',
    featured: false,
    createdAt: '2025-02-20'
  }
];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Why Regional Language UGC Converts 3.4x Better for Indian D2C Brands',
    slug: 'regional-language-ugc-conversion-india',
    excerpt: 'Discover why switching from generic English ads to native Hindi, Tamil, and Marathi UGC videos drops Meta Customer Acquisition Cost (CAC) by up to 45%.',
    coverImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800',
    category: 'UGC Strategy',
    readTime: '4 min read',
    author: 'UGCLage Marketing Insights',
    publishedAt: '2026-03-12',
    content: `When scaling D2C e-commerce in Tier-2 and Tier-3 Indian cities, trust is the single biggest variable deciding purchase conversion. 

Standard polished studio commercials often trigger "ad blindness". In contrast, authentic User Generated Content (UGC) recorded on a smartphone in native regional languages like Hindi, Marathi, Bengali, or Tamil feels like a personal recommendation from a neighbor or friend.

### Key Performance Benchmarks:
1. **Higher Hook Rate**: Native language openers stop scrolling within the first 1.5 seconds.
2. **Lower Meta CAC**: Facebook & Instagram algorithms prioritize native regional engagement, lowering CPMs.
3. **Better Retention**: Viewers watch 60% longer when scripts reflect local cultural nuances and everyday phrases.`
  },
  {
    id: 'blog-2',
    title: 'The Ultimate UGC Script Formula: Hook, Problem, Solution, CTA',
    slug: 'ultimate-ugc-script-formula-d2c',
    excerpt: 'Learn the exact 30-second script structure used by top Indian creators on UGCLage.com to deliver high-converting video ads.',
    coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
    category: 'Creator Playbook',
    readTime: '5 min read',
    author: 'Ananya Sharma (Featured Creator)',
    publishedAt: '2026-03-01',
    content: `Great UGC doesn't happen by accident—it relies on a proven narrative arc. Here is the 4-part framework used by top-performing creators:

**1. The 3-Second Hook**: "Stop wasting money on expensive facial serums until you try this..."
**2. The Problem Statement**: Highlight a relatable pain point (e.g., hyperpigmentation from pollution).
**3. The Solution Demo**: Show texture, unboxing, and real application on face.
**4. High-Trust Call to Action (CTA)**: "Use code UGC20 for 20% off today!"`
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'UGC-8942',
    customerName: 'Rahul Verma',
    whatsappNumber: '+91 98200 12345',
    email: 'rahul@glowskin.in',
    businessName: 'GlowSkin D2C',
    businessDetails: 'E-commerce skincare brand launching a new Vitamin C serum for Indian skin types.',
    videoRequirement: '30-second unboxing + face application reel with Hindi dialogue highlighting natural ingredients.',
    preferredLanguage: 'Hindi',
    creatorId: 'creator-1',
    creatorName: 'Ananya Sharma',
    creatorProfileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    selectedPackage: 'basic',
    amount: 1899,
    status: 'in_progress',
    createdAt: '2026-03-18'
  },
  {
    id: 'UGC-8941',
    customerName: 'Priya Iyer',
    whatsappNumber: '+91 98400 54321',
    email: 'priya@kitchenpro.com',
    businessName: 'KitchenPro India',
    businessDetails: 'Smart kitchen appliance brand.',
    videoRequirement: '60-second cooking demo video showing non-stick kadai in Tamil.',
    preferredLanguage: 'Tamil',
    creatorId: 'creator-3',
    creatorName: 'Kavitha Sundaram',
    creatorProfileImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    selectedPackage: 'standard',
    amount: 3499,
    status: 'completed',
    createdAt: '2026-03-15'
  }
];

export const INITIAL_APPLICATIONS: CreatorApplication[] = [
  {
    id: 'app-101',
    fullName: 'Meera Kulkarni',
    email: 'meera.k@example.com',
    whatsappNumber: '+91 98220 77665',
    profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    demoVideoUrl: SAMPLE_VIDEOS.fashion,
    languages: ['Marathi', 'Hindi'],
    gender: 'Female',
    category: 'Fashion & Apparel',
    instagram: '@meera_style',
    followers: '18.5K',
    experienceYears: 2,
    about: 'Experienced fashion micro-influencer creating Marathi ethnic styling videos.',
    city: 'Pune',
    state: 'Maharashtra',
    status: 'pending',
    submittedAt: '2026-03-20'
  }
];
