export type IndianLanguage = 
  | 'Assamese' 
  | 'Hindi' 
  | 'English' 
  | 'Bengali' 
  | 'Tamil' 
  | 'Telugu' 
  | 'Marathi' 
  | 'Malayalam' 
  | 'Kannada' 
  | 'Punjabi' 
  | 'Gujarati' 
  | 'Odia';

export type CreatorCategory = 
  | 'Beauty & Care' 
  | 'Tech & Gadgets' 
  | 'Fashion & Apparel' 
  | 'Health & Fitness' 
  | 'Food & Dining' 
  | 'E-Commerce & D2C' 
  | 'Finance & Apps' 
  | 'EdTech & Lifestyle';

export type Gender = 'Female' | 'Male' | 'Non-Binary';

export interface PricingPackage {
  basic: {
    price: number; // in INR ₹
    durationSec: number;
    revisions: number;
    deliveryDays: number;
    features: string[];
  };
  standard: {
    price: number;
    durationSec: number;
    revisions: number;
    deliveryDays: number;
    features: string[];
  };
  premium: {
    price: number;
    durationSec: number;
    revisions: number;
    deliveryDays: number;
    features: string[];
  };
}

export interface DemoVideo {
  id: string;
  title: string;
  videoUrl: string;
  thumbnailUrl: string;
  category: CreatorCategory;
  viewsCount: string;
}

export interface Review {
  id: string;
  creatorId: string;
  userName: string;
  userCompany: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Creator {
  id: string;
  userId?: string;
  name: string;
  tagline: string;
  profileImage: string;
  coverImage: string;
  languages: IndianLanguage[];
  gender: Gender;
  category: CreatorCategory;
  experienceYears: number;
  completedVideosCount: number;
  about: string;
  city: string;
  state: string;
  email: string;
  phone: string;
  instagram: string;
  twitter?: string;
  facebook?: string;
  linkedin?: string;
  youtube?: string;
  followersCount: string;
  pricing: PricingPackage;
  rating: number;
  reviewsCount: number;
  deliveryTimeDays: number;
  gallery: string[];
  demoVideos: DemoVideo[];
  status: 'active' | 'pending' | 'rejected' | 'suspended';
  featured?: boolean;
  createdAt: string;
}

export interface Order {
  id: string;
  customerName: string;
  whatsappNumber: string;
  email?: string;
  businessName: string;
  businessDetails: string;
  videoRequirement: string;
  preferredLanguage: IndianLanguage;
  creatorId: string;
  creatorName: string;
  creatorProfileImage?: string;
  selectedPackage: 'basic' | 'standard' | 'premium';
  amount: number;
  brandLogoUrl?: string;
  scriptUrl?: string;
  status: 'pending' | 'approved' | 'in_progress' | 'completed' | 'rejected';
  createdAt: string;
}

export interface CreatorApplication {
  id: string;
  fullName: string;
  email: string;
  whatsappNumber: string;
  profileImage: string;
  demoVideoUrl: string;
  languages: IndianLanguage[];
  gender: Gender;
  category: CreatorCategory;
  instagram: string;
  followers: string;
  experienceYears: number;
  about: string;
  city: string;
  state: string;
  coverImage?: string;
  pricing?: PricingPackage;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}

export interface LanguageItem {
  id: string;
  name: IndianLanguage;
  nativeName: string;
  icon: string;
  creatorsCount: number;
  enabled: boolean;
  description: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  category: string;
  readTime: string;
  author: string;
  publishedAt: string;
  content: string;
}

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  role: 'admin' | 'creator' | 'business';
  photoURL?: string;
  phone?: string;
  createdAt: string;
}

export interface FooterData {
  id: string;
  supportEmail: string;
  supportPhone: string;
  instagram: string;
  twitter: string;
  facebook: string;
  linkedin: string;
  description: string;
}

