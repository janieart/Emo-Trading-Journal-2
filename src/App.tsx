import { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { JournalEntry } from './components/JournalEntry';
import { TradeHistory } from './components/TradeHistory';
import { EmotionalInsights } from './components/EmotionalInsights';
import { BrokerConnect } from './components/BrokerConnect';
import { Subscription } from './components/Subscription';
import { BookOpen, BarChart3, Lightbulb, PlusCircle, FileText, Menu, X, Sun, Moon, Link2, Crown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import brainLogo from 'figma:asset/a12063263cb16013ecd905bba905a7bfa683acda.png';

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'journal' | 'document' | 'insights' | 'broker' | 'subscription'>('dashboard');
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<{plan: string; daysRemaining: number} | null>(null);

  // Suppress recharts duplicate key warnings (internal library issue)
  useEffect(() => {
    const originalError = console.error;
    console.error = (...args) => {
      if (
        typeof args[0] === 'string' && 
        args[0].includes('Encountered two children with the same key')
      ) {
        return;
      }
      originalError.apply(console, args);
    };

    return () => {
      console.error = originalError;
    };
  }, []);

  // Load theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('emotrader-theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Check subscription status
  useEffect(() => {
    const checkSubscription = () => {
      const saved = localStorage.getItem('emotrader-subscription');
      if (saved) {
        const status = JSON.parse(saved);
        const now = new Date();
        const endDate = new Date(status.trialEndDate);
        const diffTime = endDate.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        setSubscriptionStatus({
          plan: status.plan,
          daysRemaining: diffDays
        });
      }
    };

    checkSubscription();
    const interval = setInterval(checkSubscription, 1000 * 60 * 5); // Check every 5 minutes
    
    return () => clearInterval(interval);
  }, [activeTab]); // Re-check when tab changes (in case user upgraded)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('emotrader-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('emotrader-theme', 'light');
    }
  };

  const handleTabChange = (tab: 'dashboard' | 'journal' | 'document' | 'insights' | 'broker' | 'subscription') => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.4
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Header */}
      <header className="bg-slate-900 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              {/* Hamburger Menu Button (Mobile Only) */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-white hover:bg-slate-800 rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-900 dark:bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0 relative shadow-lg border border-slate-700">
                <svg className="w-7 h-7 sm:w-9 sm:h-9" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Smile made of candlestick bars - Trading colors (Red & Green) */}
                  
                  {/* Resting Eyes - Two horizontal lines */}
                  <line x1="14" y1="12" x2="20" y2="12" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round"/>
                  <line x1="28" y1="12" x2="34" y2="12" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round"/>
                  
                  {/* Left side bar 1 - GREEN (bullish) */}
                  <rect x="6.5" y="20" width="5" height="7" fill="#10b981" rx="1"/>
                  
                  {/* Bar 2 - GREEN (bullish) */}
                  <rect x="13.5" y="24" width="5" height="7" fill="#10b981" rx="1"/>
                  
                  {/* Center bar 3 - RED (bearish/dip) */}
                  <rect x="21.5" y="28" width="5" height="8" fill="#ef4444" rx="1"/>
                  
                  {/* Bar 4 - GREEN (recovery) */}
                  <rect x="29.5" y="24" width="5" height="7" fill="#10b981" rx="1"/>
                  
                  {/* Right side bar 5 - GREEN (bullish) */}
                  <rect x="36.5" y="20" width="5" height="7" fill="#10b981" rx="1"/>
                </svg>
              </div>
              <div className="min-w-0">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white truncate">EmoTrader</h1>
                <p className="text-slate-400 text-xs sm:text-sm hidden sm:block">Trade with Emotional Intelligence</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 sm:p-2.5 text-white hover:bg-slate-800 rounded-lg transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              
              <button
                onClick={() => handleTabChange('document')}
                className="flex items-center gap-1 sm:gap-2 bg-teal-600 hover:bg-teal-700 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-lg transition-all shadow-sm text-sm sm:text-base flex-shrink-0"
              >
                <PlusCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden xs:inline">New</span>
                <span className="hidden sm:inline">Trade</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation - Desktop */}
      <nav className="hidden lg:block bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'journal', label: 'Journal', icon: BookOpen },
              { id: 'document', label: 'Document Trade', icon: FileText },
              { id: 'insights', label: 'Insights', icon: Lightbulb },
              { id: 'broker', label: 'Broker Connect', icon: Link2 },
              { id: 'subscription', label: 'Subscription', icon: Crown },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-4 transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'text-slate-900 dark:text-white border-b-2 border-teal-600 bg-slate-50 dark:bg-slate-800'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-lg overflow-hidden"
          >
            <div className="px-4 py-2">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
                { id: 'journal', label: 'Journal', icon: BookOpen },
                { id: 'document', label: 'Document Trade', icon: FileText },
                { id: 'insights', label: 'Insights', icon: Lightbulb },
                { id: 'broker', label: 'Broker Connect', icon: Link2 },
                { id: 'subscription', label: 'Subscription', icon: Crown },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id as any)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all mb-1 ${
                      activeTab === tab.id
                        ? 'text-slate-900 dark:text-white bg-teal-50 dark:bg-teal-900/30 border-l-4 border-teal-600'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="text-base font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content with Page Transitions */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Trial Status Banner */}
        {subscriptionStatus && subscriptionStatus.plan === 'trial' && subscriptionStatus.daysRemaining <= 7 && activeTab !== 'subscription' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-4 flex items-center justify-between gap-4 shadow-lg"
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Crown className="w-6 h-6 text-white flex-shrink-0" />
              <div className="min-w-0">
                <div className="font-bold text-white text-sm sm:text-base">
                  {subscriptionStatus.daysRemaining} {subscriptionStatus.daysRemaining === 1 ? 'day' : 'days'} left in your free trial
                </div>
                <div className="text-orange-100 text-xs sm:text-sm">
                  Upgrade to Pro for just $50/month to keep all your data
                </div>
              </div>
            </div>
            <button
              onClick={() => handleTabChange('subscription')}
              className="bg-white hover:bg-orange-50 text-orange-600 px-4 py-2 rounded-lg font-semibold text-sm transition-all flex-shrink-0"
            >
              Upgrade
            </button>
          </motion.div>
        )}

        {subscriptionStatus && subscriptionStatus.plan === 'expired' && activeTab !== 'subscription' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-4 flex items-center justify-between gap-4 shadow-lg"
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Crown className="w-6 h-6 text-white flex-shrink-0" />
              <div className="min-w-0">
                <div className="font-bold text-white text-sm sm:text-base">
                  Your trial has expired
                </div>
                <div className="text-red-100 text-xs sm:text-sm">
                  Subscribe now to regain access to your trading journal
                </div>
              </div>
            </div>
            <button
              onClick={() => handleTabChange('subscription')}
              className="bg-white hover:bg-red-50 text-red-600 px-4 py-2 rounded-lg font-semibold text-sm transition-all flex-shrink-0"
            >
              Subscribe
            </button>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <Dashboard />
            </motion.div>
          )}
          {activeTab === 'journal' && (
            <motion.div
              key="journal"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <TradeHistory />
            </motion.div>
          )}
          {activeTab === 'document' && (
            <motion.div
              key="document"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <JournalEntry onViewJournal={() => setActiveTab('journal')} />
            </motion.div>
          )}
          {activeTab === 'insights' && (
            <motion.div
              key="insights"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <EmotionalInsights />
            </motion.div>
          )}
          {activeTab === 'broker' && (
            <motion.div
              key="broker"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <BrokerConnect />
            </motion.div>
          )}
          {activeTab === 'subscription' && (
            <motion.div
              key="subscription"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <Subscription />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* New Entry Modal */}
      {showNewEntry && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white dark:bg-slate-900">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">New Trade Entry</h2>
              <button
                onClick={() => setShowNewEntry(false)}
                className="text-slate-400 hover:text-slate-900 dark:hover:text-white text-2xl"
              >
                ×
              </button>
            </div>
            <div className="p-4 sm:p-6">
              <JournalEntry onClose={() => setShowNewEntry(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}