import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { LanguageGrid } from './components/LanguageGrid';
import { CreatorGrid } from './components/CreatorGrid';
import { ScrollDrivenTicker } from './components/ScrollDrivenTicker';
import { BlogSection } from './components/BlogSection';
import { TestimonialsFAQ } from './components/TestimonialsFAQ';
import { Footer } from './components/Footer';

import { CreatorProfileModal } from './components/CreatorProfileModal';
import { OrderModal } from './components/OrderModal';
import { BecomeCreatorModal } from './components/BecomeCreatorModal';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { AdminPanel } from './components/AdminPanel';
import { BlogReaderModal } from './components/BlogReaderModal';
import { ToastContainer } from './components/ToastContainer';

import { Creator, IndianLanguage } from './types';

function MainApp() {
  const { setSelectedLanguage, creators, playVideoModal } = useApp();

  // Navigation View Mode state
  const [viewMode, setViewMode] = useState<'home' | 'languages'>('home');

  // Profile Modal State
  const [selectedCreatorForProfile, setSelectedCreatorForProfile] = useState<Creator | null>(null);

  // Order Modal State
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedCreatorForOrder, setSelectedCreatorForOrder] = useState<Creator | null>(null);
  const [orderPackageType, setOrderPackageType] = useState<'basic' | 'standard' | 'premium'>('basic');

  const handleOpenProfile = (creator: Creator) => {
    setSelectedCreatorForProfile(creator);
  };

  const handleOrderNow = (creator: Creator, pkg: 'basic' | 'standard' | 'premium' = 'basic') => {
    setSelectedCreatorForOrder(creator);
    setOrderPackageType(pkg);
    setIsOrderModalOpen(true);
  };

  const handleSelectLanguageFromGrid = (langName: IndianLanguage) => {
    setSelectedLanguage(langName);
    setViewMode('home');
    setTimeout(() => {
      const creatorSection = document.getElementById('creators');
      creatorSection?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-purple-500 selection:text-white">
      {/* Toast Notifications */}
      <ToastContainer />

      {/* Main Navigation */}
      <Navbar onScrollToSection={(sectionId) => {
        if (sectionId === 'languages') {
          setViewMode('languages');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          setViewMode('home');
          setTimeout(() => {
            const el = document.getElementById(sectionId);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }, 50);
        }
      }} />

      {viewMode === 'home' ? (
        <>
          {/* Hero Section */}
          <Hero onExploreClick={() => {
            const el = document.getElementById('creators');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }} />

          {/* How It Works Timeline */}
          <HowItWorks />

          {/* Marketplace Creator Listing & Filtering Grid */}
          <CreatorGrid
            onOpenProfile={handleOpenProfile}
            onOrderNow={(creator) => handleOrderNow(creator, 'basic')}
          />

          {/* Strategy Blog Section */}
          <BlogSection />

          {/* Social Proof Testimonials & FAQs */}
          <TestimonialsFAQ />
        </>
      ) : (
        <>
          {/* 12 Indian Languages Interactive Grid */}
          <LanguageGrid onSelectLanguage={handleSelectLanguageFromGrid} />

          {/* Scroll-Driven Horizontal Animated Ticker (Most Popular, Highest Rated & Verified Comments) */}
          <ScrollDrivenTicker
            creators={creators}
            onSelectCreator={handleOpenProfile}
            onPlayVideo={(v, name) => playVideoModal(v, name)}
          />
        </>
      )}

      {/* Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <CreatorProfileModal
        creator={selectedCreatorForProfile}
        onClose={() => setSelectedCreatorForProfile(null)}
        onOrderPackage={(creator, pkg) => handleOrderNow(creator, pkg)}
      />

      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        creator={selectedCreatorForOrder}
        packageType={orderPackageType}
      />

      <BecomeCreatorModal />

      <VideoPlayerModal />

      <WishlistDrawer
        onOpenProfile={handleOpenProfile}
        onOrderNow={(creator) => handleOrderNow(creator, 'basic')}
      />

      <AdminPanel />

      <BlogReaderModal />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
