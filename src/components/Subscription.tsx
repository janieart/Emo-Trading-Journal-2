import { useState, useEffect } from 'react';
import { CreditCard, CheckCircle, Clock, Crown, Shield, Zap, TrendingUp, AlertCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface SubscriptionStatus {
  plan: 'trial' | 'active' | 'expired';
  trialStartDate: string;
  trialEndDate: string;
  subscriptionStartDate?: string;
  daysRemaining: number;
}

export function Subscription() {
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus>(() => {
    // Check localStorage for existing subscription data
    const saved = localStorage.getItem('emotrader-subscription');
    if (saved) {
      return JSON.parse(saved);
    }
    
    // Initialize new trial
    const trialStart = new Date();
    const trialEnd = new Date();
    trialEnd.setDate(trialEnd.getDate() + 14); // 14 day trial
    
    const newStatus: SubscriptionStatus = {
      plan: 'trial',
      trialStartDate: trialStart.toISOString(),
      trialEndDate: trialEnd.toISOString(),
      daysRemaining: 14
    };
    
    localStorage.setItem('emotrader-subscription', JSON.stringify(newStatus));
    return newStatus;
  });

  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // Calculate days remaining
  useEffect(() => {
    const calculateDaysRemaining = () => {
      const now = new Date();
      const endDate = new Date(subscriptionStatus.trialEndDate);
      const diffTime = endDate.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays <= 0 && subscriptionStatus.plan === 'trial') {
        const expired = { ...subscriptionStatus, plan: 'expired' as const, daysRemaining: 0 };
        setSubscriptionStatus(expired);
        localStorage.setItem('emotrader-subscription', JSON.stringify(expired));
      } else if (subscriptionStatus.plan === 'trial' && diffDays !== subscriptionStatus.daysRemaining) {
        const updated = { ...subscriptionStatus, daysRemaining: diffDays };
        setSubscriptionStatus(updated);
        localStorage.setItem('emotrader-subscription', JSON.stringify(updated));
      }
    };

    const interval = setInterval(calculateDaysRemaining, 1000 * 60 * 60); // Check every hour
    
    return () => clearInterval(interval);
  }, [subscriptionStatus.plan, subscriptionStatus.trialEndDate, subscriptionStatus.daysRemaining]);

  const handleUpgrade = () => {
    // Simulate payment processing
    const upgraded: SubscriptionStatus = {
      ...subscriptionStatus,
      plan: 'active',
      subscriptionStartDate: new Date().toISOString(),
    };
    
    setSubscriptionStatus(upgraded);
    localStorage.setItem('emotrader-subscription', JSON.stringify(upgraded));
    setShowUpgradeModal(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Hero Section */}
      <div className="relative h-48 sm:h-56 lg:h-64 rounded-xl overflow-hidden shadow-sm">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWNjZXNzJTIwdHJhZGluZ3xlbnwwfHx8fDE3NjkxODIzMDB8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Subscription"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 to-slate-800/80 flex items-center">
          <div className="px-4 sm:px-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">Your Subscription</h2>
            <p className="text-slate-300 text-sm sm:text-base lg:text-lg">Manage your EmoTrader plan</p>
          </div>
        </div>
      </div>

      {/* Trial Warning Banner - Only show if trial is running out or expired */}
      {subscriptionStatus.plan === 'trial' && subscriptionStatus.daysRemaining <= 5 && (
        <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-4 flex items-start gap-3">
          <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="font-semibold text-orange-900 dark:text-orange-100 mb-1">
              {subscriptionStatus.daysRemaining} days left in your trial
            </div>
            <div className="text-sm text-orange-800 dark:text-orange-200 mb-3">
              Your free trial ends on {formatDate(subscriptionStatus.trialEndDate)}. Upgrade now to continue tracking your emotional trading patterns.
            </div>
            <button
              onClick={() => setShowUpgradeModal(true)}
              className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2"
            >
              <Crown className="w-4 h-4" />
              Upgrade Now
            </button>
          </div>
        </div>
      )}

      {subscriptionStatus.plan === 'expired' && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="font-semibold text-red-900 dark:text-red-100 mb-1">
              Your trial has expired
            </div>
            <div className="text-sm text-red-800 dark:text-red-200 mb-3">
              To continue using EmoTrader and access all your trade data, please upgrade to a paid subscription.
            </div>
            <button
              onClick={() => setShowUpgradeModal(true)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2"
            >
              <Crown className="w-4 h-4" />
              Upgrade to Continue
            </button>
          </div>
        </div>
      )}

      {/* Current Plan Status */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              {subscriptionStatus.plan === 'active' ? (
                <>
                  <Crown className="w-6 h-6 text-yellow-500" />
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Pro Plan</h3>
                </>
              ) : (
                <>
                  <Clock className="w-6 h-6 text-teal-600" />
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Free Trial</h3>
                </>
              )}
            </div>
            {subscriptionStatus.plan === 'trial' && (
              <p className="text-slate-600 dark:text-slate-400">
                Trial started: {formatDate(subscriptionStatus.trialStartDate)}
              </p>
            )}
            {subscriptionStatus.plan === 'active' && subscriptionStatus.subscriptionStartDate && (
              <p className="text-slate-600 dark:text-slate-400">
                Subscribed since: {formatDate(subscriptionStatus.subscriptionStartDate)}
              </p>
            )}
          </div>
          
          {subscriptionStatus.plan === 'trial' && (
            <div className="bg-teal-50 dark:bg-teal-900/30 px-4 py-2 rounded-lg">
              <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">{subscriptionStatus.daysRemaining}</div>
              <div className="text-xs text-teal-700 dark:text-teal-300">days left</div>
            </div>
          )}
          
          {subscriptionStatus.plan === 'active' && (
            <div className="bg-emerald-50 dark:bg-emerald-900/30 px-4 py-2 rounded-lg">
              <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">Active</div>
              <div className="text-xs text-emerald-700 dark:text-emerald-300">$50/month</div>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <CheckCircle className="w-5 h-5 text-teal-600 dark:text-teal-400 flex-shrink-0" />
            <span className="text-slate-700 dark:text-slate-300">Unlimited trade entries</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <CheckCircle className="w-5 h-5 text-teal-600 dark:text-teal-400 flex-shrink-0" />
            <span className="text-slate-700 dark:text-slate-300">Advanced emotional analytics</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <CheckCircle className="w-5 h-5 text-teal-600 dark:text-teal-400 flex-shrink-0" />
            <span className="text-slate-700 dark:text-slate-300">Broker connection & auto-import</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <CheckCircle className="w-5 h-5 text-teal-600 dark:text-teal-400 flex-shrink-0" />
            <span className="text-slate-700 dark:text-slate-300">Personalized insights & recommendations</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <CheckCircle className="w-5 h-5 text-teal-600 dark:text-teal-400 flex-shrink-0" />
            <span className="text-slate-700 dark:text-slate-300">Screenshot attachments</span>
          </div>
        </div>

        {subscriptionStatus.plan !== 'active' && (
          <button
            onClick={() => setShowUpgradeModal(true)}
            className="w-full mt-6 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white px-6 py-4 rounded-lg font-bold text-lg transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <Crown className="w-5 h-5" />
            Upgrade to Pro - $50/month
          </button>
        )}
      </div>

      {/* Features Breakdown */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="bg-teal-50 dark:bg-teal-900/30 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <TrendingUp className="w-6 h-6 text-teal-600 dark:text-teal-400" />
          </div>
          <h4 className="font-bold text-slate-900 dark:text-white mb-2">Track Everything</h4>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Unlimited trade entries with emotions, notes, and screenshots
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h4 className="font-bold text-slate-900 dark:text-white mb-2">Auto-Import</h4>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Connect 12+ brokers for automatic trade synchronization
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="bg-purple-50 dark:bg-purple-900/30 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h4 className="font-bold text-slate-900 dark:text-white mb-2">Your Data</h4>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Secure storage with complete privacy and data ownership
          </p>
        </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-900 rounded-xl max-w-lg w-full shadow-2xl">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full p-2">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Upgrade to Pro</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Get full access to EmoTrader</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowUpgradeModal(false)}
                  className="text-slate-400 hover:text-slate-900 dark:hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Pricing */}
              <div className="bg-gradient-to-br from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-teal-200 dark:border-teal-800">
                <div className="text-center">
                  <div className="text-5xl font-bold text-slate-900 dark:text-white mb-2">
                    $50
                    <span className="text-lg text-slate-600 dark:text-slate-400">/month</span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Billed monthly, cancel anytime</p>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-teal-600 dark:text-teal-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">Unlimited Trades</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Track as many trades as you need</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-teal-600 dark:text-teal-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">Emotional Analytics</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Understand how emotions affect your P/L</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-teal-600 dark:text-teal-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">Broker Integration</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Auto-import from 12+ brokers</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-teal-600 dark:text-teal-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">Personalized Insights</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Get actionable recommendations</div>
                  </div>
                </div>
              </div>

              {/* Demo Notice */}
              <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <CreditCard className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-blue-800 dark:text-blue-200">
                    <strong>Demo Mode:</strong> This is a simulated payment. In production, this would integrate with Stripe, PayPal, or another payment processor.
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowUpgradeModal(false)}
                  className="flex-1 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white px-4 py-3 rounded-lg font-semibold transition-all"
                >
                  Maybe Later
                </button>
                <button
                  onClick={handleUpgrade}
                  className="flex-1 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white px-4 py-3 rounded-lg font-semibold transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  Subscribe Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}