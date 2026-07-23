import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Creator, IndianLanguage } from '../types';
import { 
  X, 
  CheckCircle2, 
  Sparkles, 
  Upload, 
  Send, 
  ShoppingBag, 
  Video 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  creator: Creator | null;
  packageType: 'basic' | 'standard' | 'premium';
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  creator,
  packageType
}) => {
  const { addOrder, languages } = useApp();

  const [customerName, setCustomerName] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [email, setEmail] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessDetails, setBusinessDetails] = useState('');
  const [videoRequirement, setVideoRequirement] = useState('');
  const [preferredLanguage, setPreferredLanguage] = useState<IndianLanguage>(
    creator?.languages[0] || 'Hindi'
  );
  const [brandLogoUrl, setBrandLogoUrl] = useState('');
  const [scriptUrl, setScriptUrl] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !creator) return null;

  const defaultPricing = {
    basic: { price: 1499 },
    standard: { price: 2799 },
    premium: { price: 4999 }
  };
  const pkgPrice = (creator.pricing?.[packageType]?.price) ?? (defaultPricing[packageType]?.price || 1499);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !whatsappNumber || !businessName) return;

    addOrder({
      customerName,
      whatsappNumber,
      email,
      businessName,
      businessDetails,
      videoRequirement,
      preferredLanguage,
      creatorId: creator.id,
      creatorName: creator.name,
      creatorProfileImage: creator.profileImage,
      selectedPackage: packageType,
      amount: pkgPrice,
      brandLogoUrl,
      scriptUrl
    });

    setIsSuccess(true);
  };

  const resetAndClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-6 p-6 sm:p-8 space-y-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                  Order UGC Video
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Creator: {creator.name} • {packageType.toUpperCase()} Package (₹{pkgPrice.toLocaleString()})
                </p>
              </div>
            </div>

            <button
              onClick={resetAndClose}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Success Screen */}
          {isSuccess ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Thank You! Order Submitted
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you! Your request has been submitted successfully. Our team will contact you shortly on WhatsApp to confirm script guidelines & product dispatch details.
              </p>
              <div className="pt-4">
                <button
                  onClick={resetAndClose}
                  className="px-6 py-3 rounded-2xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs shadow-md"
                >
                  Done & Close
                </button>
              </div>
            </div>
          ) : (
            /* Order Submission Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anish Kumar"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full p-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
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
                    className="w-full p-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. GlowSkin D2C"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full p-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Preferred Video Language
                  </label>
                  <select
                    value={preferredLanguage}
                    onChange={(e) => setPreferredLanguage(e.target.value as IndianLanguage)}
                    className="w-full p-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold"
                  >
                    {languages.map((l) => (
                      <option key={l.id} value={l.name}>
                        {l.name} ({l.nativeName})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Business / Product Details & Website Link
                </label>
                <input
                  type="text"
                  placeholder="e.g. www.glowskin.in / Organic Vitamin C Face Serum"
                  value={businessDetails}
                  onChange={(e) => setBusinessDetails(e.target.value)}
                  className="w-full p-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Video Requirement & Key Selling Points
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe your desired hook, product usage demonstration, and key features to highlight in the video..."
                  value={videoRequirement}
                  onChange={(e) => setVideoRequirement(e.target.value)}
                  className="w-full p-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Brand Logo URL / Drive Link
                  </label>
                  <input
                    type="url"
                    placeholder="https://drive.google.com/..."
                    value={brandLogoUrl}
                    onChange={(e) => setBrandLogoUrl(e.target.value)}
                    className="w-full p-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Script / Brief Link (Optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://docs.google.com/..."
                    value={scriptUrl}
                    onChange={(e) => setScriptUrl(e.target.value)}
                    className="w-full p-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">
                    Total Order Value
                  </span>
                  <span className="text-2xl font-black text-slate-900 dark:text-white">
                    ₹{pkgPrice.toLocaleString()}
                  </span>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs shadow-lg shadow-purple-500/20 flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Order Request</span>
                </button>
              </div>

            </form>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
