import { TrendingUp, TrendingDown, Calendar, Edit2, Smile, Frown, Meh, ThumbsUp, AlertCircle, Zap, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';
import { JournalEntry } from './JournalEntry';
import { motion, AnimatePresence } from 'motion/react';

const trades = [
  {
    id: 1,
    symbol: 'AAPL',
    assetType: 'stock',
    type: 'long',
    emotionBefore: 'Confident',
    emotionAfter: 'Calm',
    emotionBeforeColor: 'bg-blue-600',
    emotionAfterColor: 'bg-teal-600',
    entryPrice: 175.50,
    exitPrice: 178.25,
    quantity: 100,
    profit: 275,
    date: '2026-03-26',
    notes: 'Waited for the dip, stayed patient. Good entry.',
  },
  {
    id: 2,
    symbol: 'SPY',
    assetType: 'option',
    optionType: 'call',
    strikePrice: 520,
    expirationDate: '2026-04-18',
    type: 'long',
    emotionBefore: 'Confident',
    emotionAfter: 'Confident',
    emotionBeforeColor: 'bg-blue-600',
    emotionAfterColor: 'bg-blue-600',
    entryPrice: 3.50,
    exitPrice: 5.20,
    quantity: 10,
    profit: 1700,
    date: '2026-03-25',
    notes: 'Market had strong momentum. Good technical setup.',
  },
  {
    id: 3,
    symbol: 'TSLA',
    assetType: 'stock',
    type: 'short',
    emotionBefore: 'Calm',
    emotionAfter: 'Confident',
    emotionBeforeColor: 'bg-teal-600',
    emotionAfterColor: 'bg-blue-600',
    entryPrice: 245.00,
    exitPrice: 242.10,
    quantity: 50,
    profit: 145,
    date: '2026-03-24',
    notes: 'Technical signals were clear. Followed my strategy.',
  },
  {
    id: 4,
    symbol: 'NVDA',
    assetType: 'option',
    optionType: 'put',
    strikePrice: 850,
    expirationDate: '2026-04-01',
    type: 'long',
    emotionBefore: 'Anxious',
    emotionAfter: 'Frustrated',
    emotionBeforeColor: 'bg-yellow-500',
    emotionAfterColor: 'bg-purple-600',
    entryPrice: 12.00,
    exitPrice: 8.50,
    quantity: 5,
    profit: -1750,
    date: '2026-03-23',
    notes: 'Got nervous and held too long. Should have cut losses earlier.',
  },
  {
    id: 5,
    symbol: 'NVDA',
    assetType: 'stock',
    type: 'long',
    emotionBefore: 'Greedy',
    emotionAfter: 'Anxious',
    emotionBeforeColor: 'bg-orange-600',
    emotionAfterColor: 'bg-yellow-500',
    entryPrice: 520.00,
    exitPrice: 515.50,
    quantity: 20,
    profit: -90,
    date: '2026-03-22',
    notes: 'Entered too early out of FOMO. Should have waited.',
  },
  {
    id: 6,
    symbol: 'MSFT',
    assetType: 'stock',
    type: 'long',
    emotionBefore: 'Calm',
    emotionAfter: 'Calm',
    emotionBeforeColor: 'bg-teal-600',
    emotionAfterColor: 'bg-teal-600',
    entryPrice: 385.20,
    exitPrice: 390.50,
    quantity: 75,
    profit: 397.50,
    date: '2026-03-21',
    notes: 'Perfect setup. Patient entry and disciplined exit.',
  },
  {
    id: 7,
    symbol: 'QQQ',
    assetType: 'option',
    optionType: 'call',
    strikePrice: 450,
    expirationDate: '2026-04-25',
    type: 'short',
    emotionBefore: 'Greedy',
    emotionAfter: 'Fearful',
    emotionBeforeColor: 'bg-orange-500',
    emotionAfterColor: 'bg-red-600',
    entryPrice: 4.20,
    exitPrice: 6.80,
    quantity: 15,
    profit: -3900,
    date: '2026-03-20',
    notes: 'Sold premium too aggressively. Market moved against me.',
  },
  {
    id: 8,
    symbol: 'AMZN',
    assetType: 'stock',
    type: 'long',
    emotionBefore: 'Confident',
    emotionAfter: 'Calm',
    emotionBeforeColor: 'bg-blue-600',
    emotionAfterColor: 'bg-teal-600',
    entryPrice: 165.80,
    exitPrice: 167.40,
    quantity: 60,
    profit: 96,
    date: '2026-03-19',
    notes: 'Got a bit too excited, but managed to stay disciplined.',
  },
  {
    id: 9,
    symbol: 'AMD',
    assetType: 'option',
    optionType: 'call',
    strikePrice: 180,
    expirationDate: '2026-04-11',
    type: 'long',
    emotionBefore: 'Calm',
    emotionAfter: 'Calm',
    emotionBeforeColor: 'bg-teal-600',
    emotionAfterColor: 'bg-teal-600',
    entryPrice: 5.50,
    exitPrice: 8.25,
    quantity: 8,
    profit: 2200,
    date: '2026-03-18',
    notes: 'Semiconductor sector looking strong. Great patience.',
  },
  {
    id: 10,
    symbol: 'GOOGL',
    assetType: 'stock',
    type: 'short',
    emotionBefore: 'Fearful',
    emotionAfter: 'Frustrated',
    emotionBeforeColor: 'bg-red-600',
    emotionAfterColor: 'bg-purple-600',
    entryPrice: 142.50,
    exitPrice: 145.20,
    quantity: 80,
    profit: -216,
    date: '2026-03-17',
    notes: 'Panicked and closed position too early. Need to trust the process.',
  },
  {
    id: 11,
    symbol: 'META',
    assetType: 'stock',
    type: 'long',
    emotionBefore: 'Confident',
    emotionAfter: 'Confident',
    emotionBeforeColor: 'bg-blue-600',
    emotionAfterColor: 'bg-blue-600',
    entryPrice: 485.00,
    exitPrice: 492.50,
    quantity: 40,
    profit: 300,
    date: '2026-03-16',
    notes: 'Earnings catalyst played out perfectly.',
  },
  {
    id: 12,
    symbol: 'IWM',
    assetType: 'option',
    optionType: 'put',
    strikePrice: 200,
    expirationDate: '2026-04-04',
    type: 'long',
    emotionBefore: 'Calm',
    emotionAfter: 'Calm',
    emotionBeforeColor: 'bg-teal-600',
    emotionAfterColor: 'bg-teal-600',
    entryPrice: 3.20,
    exitPrice: 3.45,
    quantity: 20,
    profit: 500,
    date: '2026-03-15',
    notes: 'Mechanical trade based on my system. No emotion involved.',
  },
  {
    id: 13,
    symbol: 'NFLX',
    assetType: 'stock',
    type: 'long',
    emotionBefore: 'Greedy',
    emotionAfter: 'Frustrated',
    emotionBeforeColor: 'bg-orange-500',
    emotionAfterColor: 'bg-purple-600',
    entryPrice: 625.00,
    exitPrice: 618.50,
    quantity: 15,
    profit: -97.50,
    date: '2026-03-14',
    notes: 'Too much excitement clouded judgment. Revenge traded.',
  },
  {
    id: 14,
    symbol: 'AAPL',
    assetType: 'option',
    optionType: 'call',
    strikePrice: 180,
    expirationDate: '2026-04-18',
    type: 'long',
    emotionBefore: 'Calm',
    emotionAfter: 'Calm',
    emotionBeforeColor: 'bg-teal-600',
    emotionAfterColor: 'bg-teal-600',
    entryPrice: 2.80,
    exitPrice: 4.50,
    quantity: 12,
    profit: 2040,
    date: '2026-03-13',
    notes: 'Clear setup with product launch catalyst. Stayed calm.',
  },
  {
    id: 15,
    symbol: 'JPM',
    assetType: 'stock',
    type: 'long',
    emotionBefore: 'Confident',
    emotionAfter: 'Confident',
    emotionBeforeColor: 'bg-blue-600',
    emotionAfterColor: 'bg-blue-600',
    entryPrice: 185.50,
    exitPrice: 189.20,
    quantity: 100,
    profit: 370,
    date: '2026-03-12',
    notes: 'Banking sector rotation. High conviction trade.',
  },
  {
    id: 16,
    symbol: 'DIA',
    assetType: 'option',
    optionType: 'put',
    strikePrice: 390,
    expirationDate: '2026-03-28',
    type: 'short',
    emotionBefore: 'Greedy',
    emotionAfter: 'Confident',
    emotionBeforeColor: 'bg-orange-500',
    emotionAfterColor: 'bg-blue-600',
    entryPrice: 2.50,
    exitPrice: 0.85,
    quantity: 25,
    profit: 4125,
    date: '2026-03-11',
    notes: 'Sold puts on a strong market. Worked out but was risky.',
  },
  {
    id: 17,
    symbol: 'BA',
    assetType: 'stock',
    type: 'short',
    emotionBefore: 'Fearful',
    emotionAfter: 'Calm',
    emotionBeforeColor: 'bg-red-600',
    emotionAfterColor: 'bg-teal-600',
    entryPrice: 178.00,
    exitPrice: 175.30,
    quantity: 30,
    profit: 81,
    date: '2026-03-10',
    notes: 'Fear nearly made me exit early, but I stuck to my plan.',
  },
  {
    id: 18,
    symbol: 'COIN',
    assetType: 'stock',
    type: 'long',
    emotionBefore: 'Anxious',
    emotionAfter: 'Frustrated',
    emotionBeforeColor: 'bg-yellow-500',
    emotionAfterColor: 'bg-purple-600',
    entryPrice: 235.50,
    exitPrice: 228.00,
    quantity: 25,
    profit: -187.50,
    date: '2026-03-09',
    notes: 'Anxiety made me exit at the worst time. Lesson learned.',
  },
  {
    id: 19,
    symbol: 'SPY',
    assetType: 'option',
    optionType: 'call',
    strikePrice: 515,
    expirationDate: '2026-04-11',
    type: 'long',
    emotionBefore: 'Calm',
    emotionAfter: 'Calm',
    emotionBeforeColor: 'bg-teal-600',
    emotionAfterColor: 'bg-teal-600',
    entryPrice: 6.50,
    exitPrice: 7.80,
    quantity: 18,
    profit: 2340,
    date: '2026-03-08',
    notes: 'Systematic entry and exit. Emotion-free trading at its best.',
  },
  {
    id: 20,
    symbol: 'XLE',
    assetType: 'stock',
    type: 'long',
    emotionBefore: 'Confident',
    emotionAfter: 'Confident',
    emotionBeforeColor: 'bg-blue-600',
    emotionAfterColor: 'bg-blue-600',
    entryPrice: 88.50,
    exitPrice: 91.20,
    quantity: 150,
    profit: 405,
    date: '2026-03-07',
    notes: 'Energy sector breakout. High confidence in the setup.',
  },
];

// Emotion icon mapping
const emotionIcons: { [key: string]: any } = {
  'Calm': Smile,
  'Confident': ThumbsUp,
  'Anxious': AlertCircle,
  'Fearful': Frown,
  'Greedy': Zap,
  'Frustrated': Meh,
};

export function TradeHistory() {
  const totalProfit = trades.reduce((sum, trade) => sum + trade.profit, 0);
  const winningTrades = trades.filter(t => t.profit > 0).length;
  const losingTrades = trades.filter(t => t.profit < 0).length;
  const winRate = ((winningTrades / trades.length) * 100).toFixed(1);

  const [selectedTrade, setSelectedTrade] = useState<any | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEditClick = (trade: any) => {
    setSelectedTrade(trade);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setSelectedTrade(null);
  };

  const handleSaveEdit = () => {
    // This would normally save to your backend/state management
    console.log('Trade edited:', selectedTrade);
    handleCloseModal();
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header with Image */}
      <div className="relative h-36 sm:h-48 rounded-xl overflow-hidden shadow-sm">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBncm93dGh8ZW58MXx8fHwxNzY5MjAwOTg2fDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Financial Growth"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 to-slate-800/70 flex items-center">
          <div className="px-4 sm:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">Trade History</h2>
            <p className="text-slate-300 text-sm sm:text-base">Review your trading journey</p>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
          <div className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mb-1">Total P/L</div>
          <div className={`text-lg sm:text-2xl font-bold ${totalProfit >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
            {totalProfit >= 0 ? '+' : ''}${totalProfit.toFixed(2)}
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
          <div className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mb-1">Win Rate</div>
          <div className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white">{winRate}%</div>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
          <div className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mb-1">Winning Trades</div>
          <div className="text-lg sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400">{winningTrades}</div>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
          <div className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mb-1">Losing Trades</div>
          <div className="text-lg sm:text-2xl font-bold text-red-600 dark:text-red-400">{losingTrades}</div>
        </div>
      </div>

      {/* Trades List */}
      <div className="space-y-3 sm:space-y-4">
        {trades.map((trade) => (
          <div
            key={trade.id}
            className="bg-white dark:bg-slate-900 rounded-xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex flex-col gap-4">
              {/* Top Row: Symbol & Emotion & Date */}
              <div className="flex items-start justify-between gap-3">
                {/* Left: Symbol & Type */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className={`p-2 sm:p-3 rounded-lg flex-shrink-0 ${trade.type === 'long' ? 'bg-emerald-50 dark:bg-emerald-900/30' : 'bg-red-50 dark:bg-red-900/30'}`}>
                    {trade.type === 'long' ? (
                      <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <TrendingDown className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 dark:text-red-400" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">{trade.symbol}</div>
                    <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 capitalize truncate">
                      {trade.assetType === 'option' 
                        ? `${trade.optionType} ${trade.type === 'long' ? 'Buy' : 'Sell'}`
                        : `${trade.type} Position`
                      }
                    </div>
                    {trade.assetType === 'option' && (
                      <div className="text-xs text-slate-500 dark:text-slate-500 truncate">
                        ${trade.strikePrice} • {new Date(trade.expirationDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Date (mobile) & Emotion */}
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <div className={`${trade.emotionAfterColor} px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg`}>
                    <span className="text-white font-semibold text-xs sm:text-sm">{trade.emotionAfter}</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400 text-xs">
                    <Calendar className="w-3 h-3" />
                    <span className="hidden sm:inline">{new Date(trade.date).toLocaleDateString()}</span>
                    <span className="sm:hidden">{new Date(trade.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Row: Price & Profit */}
              <div className="flex items-center justify-between gap-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="flex-1 min-w-0">
                  <div className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mb-1">
                    {trade.assetType === 'option' ? 'Premium' : 'Entry → Exit'}
                  </div>
                  <div className="text-slate-900 dark:text-white font-semibold text-sm sm:text-base truncate">
                    ${trade.entryPrice} → ${trade.exitPrice}
                  </div>
                  <div className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
                    {trade.quantity} {trade.assetType === 'option' ? 'contracts' : 'shares'}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className={`text-xl sm:text-2xl font-bold ${trade.profit >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                    {trade.profit >= 0 ? '+' : ''}${Math.abs(trade.profit).toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Notes */}
              {trade.notes && (
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mb-1">Notes:</div>
                  <div className="text-slate-700 dark:text-slate-300 text-sm">{trade.notes}</div>
                </div>
              )}

              {/* Emotions & Edit Button Bar */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                {/* Emotion Icons */}
                <div className="flex items-center gap-3 sm:gap-4 flex-1">
                  {/* Before Trade */}
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="text-xs text-slate-500 dark:text-slate-500">💭</span>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-md ${trade.emotionBeforeColor}`}>
                      {(() => {
                        const BeforeIcon = emotionIcons[trade.emotionBefore];
                        return BeforeIcon ? <BeforeIcon className="w-3 h-3 sm:w-4 sm:h-4 text-white" /> : null;
                      })()}
                      <span className="text-xs text-white hidden sm:inline">{trade.emotionBefore}</span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <span className="text-slate-400 dark:text-slate-600 text-xs">→</span>

                  {/* After Trade */}
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="text-xs text-slate-500 dark:text-slate-500">✨</span>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-md ${trade.emotionAfterColor}`}>
                      {(() => {
                        const AfterIcon = emotionIcons[trade.emotionAfter];
                        return AfterIcon ? <AfterIcon className="w-3 h-3 sm:w-4 sm:h-4 text-white" /> : null;
                      })()}
                      <span className="text-xs text-white hidden sm:inline">{trade.emotionAfter}</span>
                    </div>
                  </div>
                </div>

                {/* Edit Button */}
                <button
                  onClick={() => handleEditClick(trade)}
                  className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors flex-shrink-0"
                >
                  <Edit2 className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm font-medium">Edit</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Trade Modal */}
      <AnimatePresence>
        {showEditModal && selectedTrade && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white dark:bg-slate-900 p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between z-10">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Edit Trade</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Update trade details and emotions</p>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Content */}
              <div className="p-4 sm:p-6">
                <JournalEntry 
                  editData={selectedTrade}
                  onClose={handleCloseModal}
                  onSave={handleSaveEdit}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}