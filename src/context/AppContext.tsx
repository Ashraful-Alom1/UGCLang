import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Creator, 
  LanguageItem, 
  Order, 
  CreatorApplication, 
  BlogPost, 
  IndianLanguage, 
  CreatorCategory, 
  Gender, 
  DemoVideo,
  FooterData
} from '../types';
import { 
  INITIAL_CREATORS, 
  INITIAL_LANGUAGES, 
  INITIAL_ORDERS, 
  INITIAL_APPLICATIONS, 
  INITIAL_BLOGS 
} from '../data/mockData';
import { db, getLocalStore, setLocalStore } from '../lib/firebase';
import { collection, onSnapshot, doc, setDoc, deleteDoc } from 'firebase/firestore';

interface Toast {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}

export type ThemeColor = 'purple' | 'indigo' | 'rose' | 'teal' | 'amber' | 'emerald';

const INITIAL_FOOTER_DATA: FooterData = {
  id: 'footer_settings',
  supportEmail: 'support@ugclage.com',
  supportPhone: '+91 98765 43210',
  instagram: 'https://instagram.com/ugclage',
  twitter: 'https://twitter.com/ugclage',
  facebook: 'https://facebook.com/ugclage',
  linkedin: 'https://linkedin.com/company/ugclage',
  description: "India's premier User Generated Content (UGC) marketplace connecting D2C brands, e-commerce startups, and agencies with verified creators across 12+ regional languages."
};
export type ThemeMode = 'light' | 'dark' | 'dark-green' | 'current';

interface AppContextType {
  // Theme & Role
  darkMode: boolean;
  toggleDarkMode: () => void;
  themeColor: ThemeColor;
  setThemeColor: (color: ThemeColor) => void;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  userRole: 'guest' | 'business' | 'creator' | 'admin';
  setUserRole: (role: 'guest' | 'business' | 'creator' | 'admin') => void;

  // Data
  creators: Creator[];
  languages: LanguageItem[];
  orders: Order[];
  applications: CreatorApplication[];
  blogs: BlogPost[];
  favorites: string[];

  // Filtering & Search
  selectedLanguage: IndianLanguage | 'All';
  setSelectedLanguage: (lang: IndianLanguage | 'All') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: CreatorCategory | 'All';
  setSelectedCategory: (cat: CreatorCategory | 'All') => void;
  selectedGender: Gender | 'All';
  setSelectedGender: (gender: Gender | 'All') => void;
  sortBy: 'newest' | 'rating' | 'price_low' | 'popular';
  setSortBy: (sort: 'newest' | 'rating' | 'price_low' | 'popular') => void;
  maxPrice: number;
  setMaxPrice: (price: number) => void;

  // Actions
  toggleFavorite: (creatorId: string) => void;
  isFavorite: (creatorId: string) => boolean;
  addOrder: (newOrder: Omit<Order, 'id' | 'createdAt' | 'status'>) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  deleteOrder: (orderId: string) => void;
  addApplication: (appData: Omit<CreatorApplication, 'id' | 'submittedAt' | 'status'>) => void;
  updateApplicationStatus: (appId: string, status: 'approved' | 'rejected') => void;
  deleteApplication: (appId: string) => void;
  deleteCreator: (creatorId: string) => void;
  updateCreator: (updatedCreator: Creator) => void;
  toggleLanguageEnabled: (langId: string) => void;
  addLanguage: (name: IndianLanguage, nativeName: string, description: string) => void;
  addReviewToCreator: (creatorId: string, reviewerName: string, company: string, rating: number, comment: string) => void;

  // Blog Management Actions
  addBlogPost: (post: Omit<BlogPost, 'id' | 'publishedAt' | 'slug'>) => void;
  updateBlogPost: (updatedPost: BlogPost) => void;
  deleteBlogPost: (id: string) => void;

  // Modal Views
  viewCreatorProfile: Creator | null;
  setViewCreatorProfile: (creator: Creator | null) => void;
  openCreatorProfileModal: (creator: Creator) => void;
  isOrderModalOpen: boolean;
  setIsOrderModalOpen: (open: boolean) => void;
  orderTargetCreator: Creator | null;
  orderTargetPackage: 'basic' | 'standard' | 'premium';
  openOrderModal: (creator: Creator, pkg?: 'basic' | 'standard' | 'premium') => void;
  
  isBecomeCreatorOpen: boolean;
  setIsBecomeCreatorOpen: (open: boolean) => void;
  
  isVideoModalOpen: boolean;
  setIsVideoModalOpen: (open: boolean) => void;
  activeVideo: { video: DemoVideo; creatorName: string } | null;
  playVideoModal: (video: DemoVideo, creatorName: string) => void;

  isAdminPanelOpen: boolean;
  setIsAdminPanelOpen: (open: boolean) => void;

  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;

  selectedBlog: BlogPost | null;
  setSelectedBlog: (blog: BlogPost | null) => void;

  // Toasts
  toasts: Toast[];
  addToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;

  // Footer Config
  footerData: FooterData;
  updateFooterData: (updated: FooterData) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme
  const [darkMode, setDarkMode] = useState<boolean>(() => getLocalStore('dark_mode', false));
  const [themeColor, setThemeColor] = useState<ThemeColor>(() => getLocalStore('theme_color', 'purple'));
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => getLocalStore('theme_mode', 'current'));
  const [userRole, setUserRole] = useState<'guest' | 'business' | 'creator' | 'admin'>('guest');

  // Core collections
  const [creators, setCreators] = useState<Creator[]>(() => getLocalStore('creators', INITIAL_CREATORS));
  const [languages, setLanguages] = useState<LanguageItem[]>(() => getLocalStore('languages', INITIAL_LANGUAGES));
  const [orders, setOrders] = useState<Order[]>(() => getLocalStore('orders', INITIAL_ORDERS));
  const [applications, setApplications] = useState<CreatorApplication[]>(() => getLocalStore('applications', INITIAL_APPLICATIONS));
  const [blogs, setBlogs] = useState<BlogPost[]>(() => getLocalStore('blogs', INITIAL_BLOGS));
  const [favorites, setFavorites] = useState<string[]>(() => getLocalStore('favorites', ['creator-1', 'creator-3']));
  const [footerData, setFooterData] = useState<FooterData>(() => getLocalStore('footer_data', INITIAL_FOOTER_DATA));

  // Filtering
  const [selectedLanguage, setSelectedLanguage] = useState<IndianLanguage | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<CreatorCategory | 'All'>('All');
  const [selectedGender, setSelectedGender] = useState<Gender | 'All'>('All');
  const [sortBy, setSortBy] = useState<'newest' | 'rating' | 'price_low' | 'popular'>('popular');
  const [maxPrice, setMaxPrice] = useState<number>(10000);

  // Modals
  const [viewCreatorProfile, setViewCreatorProfile] = useState<Creator | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState<boolean>(false);
  const [orderTargetCreator, setOrderTargetCreator] = useState<Creator | null>(null);
  const [orderTargetPackage, setOrderTargetPackage] = useState<'basic' | 'standard' | 'premium'>('basic');
  
  const [isBecomeCreatorOpen, setIsBecomeCreatorOpen] = useState<boolean>(false);
  
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);
  const [activeVideo, setActiveVideo] = useState<{ video: DemoVideo; creatorName: string } | null>(null);

  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toggleDarkMode = () => {
    const nextMode = themeMode === 'light' ? 'current' : 'light';
    setThemeMode(nextMode);
  };

  useEffect(() => {
    setLocalStore('theme_mode', themeMode);
    const root = document.documentElement;
    
    root.classList.remove('theme-light', 'theme-dark', 'theme-dark-green', 'theme-current');
    root.classList.add(`theme-${themeMode}`);
    
    if (themeMode === 'light') {
      root.classList.remove('dark');
      setDarkMode(false);
      setLocalStore('dark_mode', false);
    } else {
      root.classList.add('dark');
      setDarkMode(true);
      setLocalStore('dark_mode', true);
    }
  }, [themeMode]);

  useEffect(() => {
    setLocalStore('theme_color', themeColor);
    
    const root = document.documentElement;
    const colorsMap = {
      purple: {
        light: {
          primary: '#8b5cf6',
          hover: '#7c3aed',
          light: '#f3e8ff',
          border: '#ddd6fe',
          gradientStart: '#8b5cf6',
          gradientEnd: '#6366f1'
        },
        dark: {
          primary: '#a78bfa',
          hover: '#c084fc',
          light: 'rgba(139, 92, 246, 0.25)',
          border: '#7c3aed',
          gradientStart: '#a78bfa',
          gradientEnd: '#818cf8'
        }
      },
      indigo: {
        light: {
          primary: '#4f46e5',
          hover: '#4338ca',
          light: '#e0e7ff',
          border: '#c7d2fe',
          gradientStart: '#4f46e5',
          gradientEnd: '#3b82f6'
        },
        dark: {
          primary: '#818cf8',
          hover: '#a5b4fc',
          light: 'rgba(79, 70, 229, 0.25)',
          border: '#4338ca',
          gradientStart: '#818cf8',
          gradientEnd: '#60a5fa'
        }
      },
      rose: {
        light: {
          primary: '#e11d48',
          hover: '#be123c',
          light: '#ffe4e6',
          border: '#fecdd3',
          gradientStart: '#e11d48',
          gradientEnd: '#db2777'
        },
        dark: {
          primary: '#fb7185',
          hover: '#fda4af',
          light: 'rgba(225, 29, 72, 0.25)',
          border: '#be123c',
          gradientStart: '#fb7185',
          gradientEnd: '#f472b6'
        }
      },
      teal: {
        light: {
          primary: '#0d9488',
          hover: '#0f766e',
          light: '#ccfbf1',
          border: '#99f6e4',
          gradientStart: '#0d9488',
          gradientEnd: '#06b6d4'
        },
        dark: {
          primary: '#2dd4bf',
          hover: '#5eead4',
          light: 'rgba(13, 148, 136, 0.25)',
          border: '#0f766e',
          gradientStart: '#2dd4bf',
          gradientEnd: '#22d3ee'
        }
      },
      amber: {
        light: {
          primary: '#d97706',
          hover: '#b45309',
          light: '#fef3c7',
          border: '#fde68a',
          gradientStart: '#d97706',
          gradientEnd: '#ea580c'
        },
        dark: {
          primary: '#fbbf24',
          hover: '#fcd34d',
          light: 'rgba(217, 119, 6, 0.25)',
          border: '#b45309',
          gradientStart: '#fbbf24',
          gradientEnd: '#f97316'
        }
      },
      emerald: {
        light: {
          primary: '#059669',
          hover: '#047857',
          light: '#d1fae5',
          border: '#a7f3d0',
          gradientStart: '#059669',
          gradientEnd: '#10b981'
        },
        dark: {
          primary: '#34d399',
          hover: '#6ee7b7',
          light: 'rgba(5, 150, 105, 0.25)',
          border: '#047857',
          gradientStart: '#34d399',
          gradientEnd: '#4ade80'
        }
      }
    };

    const activeTheme = colorsMap[themeColor] || colorsMap.purple;
    const active = darkMode ? activeTheme.dark : activeTheme.light;

    root.style.setProperty('--theme-primary', active.primary);
    root.style.setProperty('--theme-hover', active.hover);
    root.style.setProperty('--theme-light', active.light);
    root.style.setProperty('--theme-border', active.border);
    root.style.setProperty('--theme-gradient-start', active.gradientStart);
    root.style.setProperty('--theme-gradient-end', active.gradientEnd);
  }, [themeColor, darkMode]);

  // Sync back to local storage
  useEffect(() => { setLocalStore('creators', creators); }, [creators]);
  useEffect(() => { setLocalStore('languages', languages); }, [languages]);
  useEffect(() => { setLocalStore('orders', orders); }, [orders]);
  useEffect(() => { setLocalStore('applications', applications); }, [applications]);
  useEffect(() => { setLocalStore('blogs', blogs); }, [blogs]);
  useEffect(() => { setLocalStore('favorites', favorites); }, [favorites]);
  useEffect(() => { setLocalStore('footer_data', footerData); }, [footerData]);

  // Real-Time Firestore Synchronization Layer
  useEffect(() => {
    if (!db) return;

    // Listen to Creators Collection
    const unsubCreators = onSnapshot(collection(db, 'creators'), (snapshot) => {
      if (!snapshot.empty) {
        const firestoreCreators: Creator[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data() as Creator;
          if (data && data.id) {
            firestoreCreators.push(data);
          }
        });
        setCreators(firestoreCreators);
      } else {
        // Seed initial creators to Firestore on first launch
        INITIAL_CREATORS.forEach((creator) => {
          setDoc(doc(db, 'creators', creator.id), creator).catch(console.error);
        });
      }
    }, (err) => console.warn('Firestore creators listener note:', err));

    // Listen to Orders Collection
    const unsubOrders = onSnapshot(collection(db, 'orders'), (snapshot) => {
      if (!snapshot.empty) {
        const firestoreOrders: Order[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data() as Order;
          if (data && data.id) {
            firestoreOrders.push(data);
          }
        });
        setOrders(firestoreOrders);
      } else {
        INITIAL_ORDERS.forEach((order) => {
          setDoc(doc(db, 'orders', order.id), order).catch(console.error);
        });
      }
    }, (err) => console.warn('Firestore orders listener note:', err));

    // Listen to Applications Collection
    const unsubApps = onSnapshot(collection(db, 'applications'), (snapshot) => {
      if (!snapshot.empty) {
        const firestoreApps: CreatorApplication[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data() as CreatorApplication;
          if (data && data.id) {
            firestoreApps.push(data);
          }
        });
        // Sort: newest first
        firestoreApps.sort((a, b) => {
          const dateA = a.submittedAt || '';
          const dateB = b.submittedAt || '';
          return dateB.localeCompare(dateA);
        });
        setApplications(firestoreApps);
      } else {
        INITIAL_APPLICATIONS.forEach((appItem) => {
          setDoc(doc(db, 'applications', appItem.id), appItem).catch(console.error);
        });
      }
    }, (err) => console.warn('Firestore applications listener note:', err));

    // Listen to Blogs Collection
    const unsubBlogs = onSnapshot(collection(db, 'blogs'), (snapshot) => {
      if (!snapshot.empty) {
        const firestoreBlogs: BlogPost[] = [];
        snapshot.forEach((docSnap) => {
          firestoreBlogs.push(docSnap.data() as BlogPost);
        });
        setBlogs(firestoreBlogs);
      } else {
        INITIAL_BLOGS.forEach((blogItem) => {
          setDoc(doc(db, 'blogs', blogItem.id), blogItem).catch(console.error);
        });
      }
    }, (err) => console.warn('Firestore blogs listener note:', err));

    // Listen to Settings (Footer Settings) Collection
    const unsubFooter = onSnapshot(doc(db, 'settings', 'footer'), (docSnap) => {
      if (docSnap.exists()) {
        setFooterData(docSnap.data() as FooterData);
      } else {
        setDoc(doc(db, 'settings', 'footer'), INITIAL_FOOTER_DATA).catch(console.error);
      }
    }, (err) => console.warn('Firestore footer settings listener note:', err));

    return () => {
      unsubCreators();
      unsubOrders();
      unsubApps();
      unsubBlogs();
      unsubFooter();
    };
  }, []);

  const addToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 4);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleFavorite = (creatorId: string) => {
    if (favorites.includes(creatorId)) {
      setFavorites(favorites.filter((id) => id !== creatorId));
      addToast('Removed from saved wishlist', 'info');
    } else {
      setFavorites([...favorites, creatorId]);
      addToast('Saved to your favorite creators wishlist!', 'success');
    }
  };

  const isFavorite = (creatorId: string) => favorites.includes(creatorId);

  const openOrderModal = (creator: Creator, pkg: 'basic' | 'standard' | 'premium' = 'basic') => {
    setOrderTargetCreator(creator);
    setOrderTargetPackage(pkg);
    setIsOrderModalOpen(true);
  };

  const playVideoModal = (video: DemoVideo, creatorName: string) => {
    setActiveVideo({ video, creatorName });
    setIsVideoModalOpen(true);
  };

  const addOrder = (newOrderData: Omit<Order, 'id' | 'createdAt' | 'status'>) => {
    const orderId = 'UGC-' + Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      ...newOrderData,
      id: orderId,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setOrders((prev) => [newOrder, ...prev]);
    if (db) setDoc(doc(db, 'orders', newOrder.id), newOrder).catch(console.error);
    addToast(`Order #${orderId} placed successfully! We'll contact you on WhatsApp.`, 'success');
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) => prev.map((o) => {
      if (o.id === orderId) {
        const updated = { ...o, status };
        if (db) setDoc(doc(db, 'orders', orderId), updated).catch(console.error);
        return updated;
      }
      return o;
    }));
    addToast(`Order #${orderId} updated to ${status.toUpperCase()}`, 'info');
  };

  const deleteOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
    if (db) deleteDoc(doc(db, 'orders', orderId)).catch(console.error);
    addToast(`Order #${orderId} deleted from database`, 'info');
  };

  const addApplication = (appData: Omit<CreatorApplication, 'id' | 'submittedAt' | 'status'>) => {
    const appId = 'app-' + Date.now();
    const newApp: CreatorApplication = {
      ...appData,
      id: appId,
      status: 'pending',
      submittedAt: new Date().toISOString().split('T')[0]
    };
    setApplications((prev) => [newApp, ...prev]);
    if (db) setDoc(doc(db, 'applications', newApp.id), newApp).catch(console.error);

    addToast(`🎉 Application submitted successfully! It is now pending admin approval.`, 'success');
  };

  const updateApplicationStatus = (appId: string, status: 'approved' | 'rejected') => {
    setApplications((prev) => {
      const targetApp = prev.find((a) => a.id === appId);
      if (!targetApp) return prev;

      // Update in database first or immediately in list
      const updatedApps = prev.map((a) => {
        if (a.id === appId) {
          const updated = { ...a, status };
          if (db) setDoc(doc(db, 'applications', appId), updated).catch(console.error);
          return updated;
        }
        return a;
      });

      if (status === 'approved') {
        const defaultPricing = {
          basic: { price: Number(targetApp.pricing?.basic?.price) || 1499, durationSec: 30, revisions: 1, deliveryDays: 2, features: ['1 x 30s UGC Video', '1 Revision'] },
          standard: { price: Number(targetApp.pricing?.standard?.price) || 2799, durationSec: 60, revisions: 2, deliveryDays: 2, features: ['1 x 60s UGC Video', 'Subtitles'] },
          premium: { price: Number(targetApp.pricing?.premium?.price) || 4999, durationSec: 90, revisions: 3, deliveryDays: 1, features: ['3 x UGC Ad Videos', 'Raw Clips'] }
        };

        const newCreatorId = 'creator-' + Date.now();
        const newCreator: Creator = {
          id: newCreatorId,
          name: targetApp.fullName,
          tagline: `${targetApp.category} UGC Creator in ${targetApp.languages.join(', ')}`,
          profileImage: targetApp.profileImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
          coverImage: targetApp.coverImage || 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=1000',
          languages: targetApp.languages,
          gender: targetApp.gender,
          category: targetApp.category,
          experienceYears: Number(targetApp.experienceYears) || 1,
          completedVideosCount: 1,
          about: targetApp.about || 'Passionate UGC creator dedicated to making authentic, high-converting content for brands.',
          city: targetApp.city,
          state: targetApp.state,
          email: targetApp.email,
          phone: targetApp.whatsappNumber,
          instagram: targetApp.instagram,
          followersCount: targetApp.followers || '10K',
          pricing: targetApp.pricing || defaultPricing,
          rating: 5.0,
          reviewsCount: 1,
          deliveryTimeDays: targetApp.pricing?.basic?.deliveryDays || 2,
          gallery: targetApp.profileImage ? [targetApp.profileImage] : [],
          demoVideos: [
            {
              id: 'v-' + Date.now(),
              title: `${targetApp.fullName} Sample Reel`,
              videoUrl: targetApp.demoVideoUrl || 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-posing-in-a-stylish-outfit-43542-large.mp4',
              thumbnailUrl: targetApp.profileImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
              category: targetApp.category,
              viewsCount: '1.2K'
            }
          ],
          status: 'active',
          createdAt: new Date().toISOString().split('T')[0]
        };

        setCreators((cPrev) => {
          const existingIdx = cPrev.findIndex((c) => c.email?.toLowerCase() === newCreator.email?.toLowerCase());
          if (existingIdx !== -1) {
            // If creator exists, reactivate them
            const existingCreator = cPrev[existingIdx];
            const updatedCreator = { ...existingCreator, status: 'active' as const };
            if (db) setDoc(doc(db, 'creators', updatedCreator.id), updatedCreator).catch(console.error);
            const nextCreators = [...cPrev];
            nextCreators[existingIdx] = updatedCreator;
            return nextCreators;
          }
          if (db) setDoc(doc(db, 'creators', newCreator.id), newCreator).catch(console.error);
          return [newCreator, ...cPrev];
        });

        addToast(`Approved creator ${targetApp.fullName}! Added to marketplace.`, 'success');
      } else {
        addToast(`Application rejected.`, 'info');
      }

      return updatedApps;
    });
  };

  const deleteApplication = (appId: string) => {
    setApplications((prev) => prev.filter((a) => a.id !== appId));
    if (db) deleteDoc(doc(db, 'applications', appId)).catch(console.error);
    addToast('Application deleted.', 'info');
  };

  const deleteCreator = (creatorId: string) => {
    setCreators((prev) => prev.filter((c) => c.id !== creatorId));
    if (db) deleteDoc(doc(db, 'creators', creatorId)).catch(console.error);
    addToast('Creator removed from marketplace.', 'info');
  };

  const updateCreator = (updatedCreator: Creator) => {
    setCreators((prev) => {
      const next = prev.map((c) => (c.id === updatedCreator.id ? updatedCreator : c));
      setLocalStore('creators', next);
      return next;
    });
    if (db) setDoc(doc(db, 'creators', updatedCreator.id), updatedCreator).catch(console.error);
    if (viewCreatorProfile && viewCreatorProfile.id === updatedCreator.id) {
      setViewCreatorProfile(updatedCreator);
    }
    addToast(`Creator ${updatedCreator.name} profile saved permanently!`, 'success');
  };

  const openCreatorProfileModal = (creator: Creator) => {
    setViewCreatorProfile(creator);
  };

  const toggleLanguageEnabled = (langId: string) => {
    setLanguages((prev) => prev.map((l) => (l.id === langId ? { ...l, enabled: !l.enabled } : l)));
  };

  const addLanguage = (name: IndianLanguage, nativeName: string, description: string) => {
    const newLang: LanguageItem = {
      id: 'lang-' + Date.now(),
      name,
      nativeName,
      icon: '✨',
      creatorsCount: 0,
      enabled: true,
      description
    };
    setLanguages((prev) => [...prev, newLang]);
    addToast(`Added new language: ${name}`, 'success');
  };

  const addReviewToCreator = (creatorId: string, reviewerName: string, company: string, rating: number, comment: string) => {
    setCreators((prev) =>
      prev.map((c) => {
        if (c.id === creatorId) {
          const newReviewsCount = c.reviewsCount + 1;
          const newRating = Number(((c.rating * c.reviewsCount + rating) / newReviewsCount).toFixed(1));
          const updated: Creator = {
            ...c,
            rating: newRating,
            reviewsCount: newReviewsCount
          };
          if (db) setDoc(doc(db, 'creators', creatorId), updated).catch(console.error);
          if (viewCreatorProfile && viewCreatorProfile.id === creatorId) {
            setViewCreatorProfile(updated);
          }
          return updated;
        }
        return c;
      })
    );
    addToast('Thank you for leaving a verified review!', 'success');
  };

  // Blog Post CRUD
  const addBlogPost = (post: Omit<BlogPost, 'id' | 'publishedAt' | 'slug'>) => {
    const id = 'blog-' + Date.now();
    const slug = post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const publishedAt = new Date().toISOString().split('T')[0];
    const newPost: BlogPost = {
      ...post,
      id,
      slug,
      publishedAt
    };

    setBlogs((prev) => {
      const next = [newPost, ...prev];
      setLocalStore('blogs', next);
      return next;
    });

    if (db) setDoc(doc(db, 'blogs', newPost.id), newPost).catch(console.error);
    addToast(`Published new strategy article: "${newPost.title}"`, 'success');
  };

  const updateBlogPost = (updatedPost: BlogPost) => {
    setBlogs((prev) => {
      const next = prev.map((b) => (b.id === updatedPost.id ? updatedPost : b));
      setLocalStore('blogs', next);
      return next;
    });

    if (db) setDoc(doc(db, 'blogs', updatedPost.id), updatedPost).catch(console.error);
    addToast(`Updated strategy article: "${updatedPost.title}"`, 'success');
  };

  const deleteBlogPost = (id: string) => {
    setBlogs((prev) => {
      const next = prev.filter((b) => b.id !== id);
      setLocalStore('blogs', next);
      return next;
    });

    if (db) deleteDoc(doc(db, 'blogs', id)).catch(console.error);
    addToast('Strategy article deleted.', 'info');
  };

  const updateFooterData = (updated: FooterData) => {
    setFooterData(updated);
    setLocalStore('footer_data', updated);
    if (db) setDoc(doc(db, 'settings', 'footer'), updated).catch(console.error);
    addToast('Footer settings saved permanently!', 'success');
  };

  return (
    <AppContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
        themeColor,
        setThemeColor,
        themeMode,
        setThemeMode,
        userRole,
        setUserRole,
        creators,
        languages,
        orders,
        applications,
        blogs,
        favorites,
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
        setMaxPrice,
        toggleFavorite,
        isFavorite,
        addOrder,
        updateOrderStatus,
        deleteOrder,
        addApplication,
        updateApplicationStatus,
        deleteApplication,
        deleteCreator,
        updateCreator,
        toggleLanguageEnabled,
        addLanguage,
        addReviewToCreator,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        viewCreatorProfile,
        setViewCreatorProfile,
        openCreatorProfileModal,
        isOrderModalOpen,
        setIsOrderModalOpen,
        orderTargetCreator,
        orderTargetPackage,
        openOrderModal,
        isBecomeCreatorOpen,
        setIsBecomeCreatorOpen,
        isVideoModalOpen,
        setIsVideoModalOpen,
        activeVideo,
        playVideoModal,
        isAdminPanelOpen,
        setIsAdminPanelOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        selectedBlog,
        setSelectedBlog,
        toasts,
        addToast,
        removeToast,
        footerData,
        updateFooterData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
