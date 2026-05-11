import { useState, useEffect } from 'react';
import { Smile, Frown, Meh, ThumbsUp, AlertCircle, TrendingUp, TrendingDown, Zap, CheckCircle, X, BookOpen, PlusCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface JournalEntryProps {
  onClose?: () => void;
  onSave?: () => void;
  onViewJournal?: () => void;
  editData?: any; // For editing existing trades
}

export function JournalEntry({ onClose, onSave, onViewJournal, editData }: JournalEntryProps) {
  const [selectedEmotionBefore, setSelectedEmotionBefore] = useState(editData?.emotionBefore?.toLowerCase() || '');
  const [selectedEmotionAfter, setSelectedEmotionAfter] = useState(editData?.emotionAfter?.toLowerCase() || '');
  const [tradeType, setTradeType] = useState<'long' | 'short'>(editData?.type || 'long');
  const [assetType, setAssetType] = useState<'stock' | 'option'>(editData?.assetType || 'stock');
  const [optionType, setOptionType] = useState<'call' | 'put'>(editData?.optionType || 'call');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [savedTradeData, setSavedTradeData] = useState<any>(null);
  const [formData, setFormData] = useState({
    symbol: editData?.symbol || '',
    entryPrice: editData?.entryPrice?.toString() || '',
    exitPrice: editData?.exitPrice?.toString() || '',
    quantity: editData?.quantity?.toString() || '',
    strikePrice: editData?.strikePrice?.toString() || '',
    expirationDate: editData?.expirationDate || '',
    notes: editData?.notes || '',
  });

  const emotions = [
    { id: 'calm', label: 'Calm', icon: Smile, color: 'bg-teal-600', borderColor: 'border-teal-600' },
    { id: 'confident', label: 'Confident', icon: ThumbsUp, color: 'bg-blue-600', borderColor: 'border-blue-600' },
    { id: 'anxious', label: 'Anxious', icon: AlertCircle, color: 'bg-yellow-600', borderColor: 'border-yellow-600' },
    { id: 'fearful', label: 'Fearful', icon: Frown, color: 'bg-red-600', borderColor: 'border-red-600' },
    { id: 'greedy', label: 'Greedy', icon: Zap, color: 'bg-orange-600', borderColor: 'border-orange-600' },
    { id: 'frustrated', label: 'Frustrated', icon: Meh, color: 'bg-purple-600', borderColor: 'border-purple-600' },
  ];

  // Auto-dismiss confirmation after 5 seconds
  useEffect(() => {
    if (showConfirmation) {
      const timer = setTimeout(() => {
        setShowConfirmation(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showConfirmation]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const tradeData = { 
      ...formData, 
      emotionBefore: selectedEmotionBefore,
      emotionAfter: selectedEmotionAfter,
      tradeType, 
      assetType, 
      optionType,
      profit: profit
    };
    
    console.log('Trade submitted:', tradeData);
    setSavedTradeData(tradeData);
    setShowConfirmation(true);
    
    // Reset form
    setFormData({
      symbol: '',
      entryPrice: '',
      exitPrice: '',
      quantity: '',
      strikePrice: '',
      expirationDate: '',
      notes: '',
    });
    setSelectedEmotionBefore('');
    setSelectedEmotionAfter('');
    setTradeType('long');
    setAssetType('stock');
    
    if (onSave) onSave();
  };

  const handleViewJournal = () => {
    setShowConfirmation(false);
    if (onViewJournal) onViewJournal();
  };

  const handleAddAnother = () => {
    setShowConfirmation(false);
  };

  // Calculate profit based on asset type
  const profit = formData.entryPrice && formData.exitPrice && formData.quantity
    ? assetType === 'stock'
      ? (parseFloat(formData.exitPrice) - parseFloat(formData.entryPrice)) *
        parseFloat(formData.quantity) *
        (tradeType === 'short' ? -1 : 1)
      : (parseFloat(formData.exitPrice) - parseFloat(formData.entryPrice)) *
        parseFloat(formData.quantity) *
        100 * // Options multiplier (100 shares per contract)
        (tradeType === 'short' ? -1 : 1)
    : 0;

  const selectedEmotionData = emotions.find(e => e.id === selectedEmotionAfter);

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      {/* Feelings BEFORE Trade */}
      <div>
        <label className="block text-slate-900 dark:text-white mb-2 sm:mb-3 font-semibold text-sm sm:text-base">
          💭 How did you feel BEFORE the trade?
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
          {emotions.map((emotion) => {
            const Icon = emotion.icon;
            return (
              <button
                key={emotion.id}
                type="button"
                onClick={() => setSelectedEmotionBefore(emotion.id)}
                className={`p-2 sm:p-3 rounded-lg border-2 transition-all ${
                  selectedEmotionBefore === emotion.id
                    ? `${emotion.color} ${emotion.borderColor} shadow-md scale-105`
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                <Icon className={`w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1 ${selectedEmotionBefore === emotion.id ? 'text-white' : 'text-slate-600 dark:text-slate-400'}`} />
                <div className={`text-xs ${selectedEmotionBefore === emotion.id ? 'text-white font-semibold' : 'text-slate-700 dark:text-slate-300'}`}>{emotion.label}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Feelings AFTER Trade */}
      <div>
        <label className="block text-slate-900 dark:text-white mb-2 sm:mb-3 font-semibold text-sm sm:text-base">
          ✨ How did you feel AFTER the trade?
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
          {emotions.map((emotion) => {
            const Icon = emotion.icon;
            return (
              <button
                key={emotion.id}
                type="button"
                onClick={() => setSelectedEmotionAfter(emotion.id)}
                className={`p-2 sm:p-3 rounded-lg border-2 transition-all ${
                  selectedEmotionAfter === emotion.id
                    ? `${emotion.color} ${emotion.borderColor} shadow-md scale-105`
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                <Icon className={`w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1 ${selectedEmotionAfter === emotion.id ? 'text-white' : 'text-slate-600 dark:text-slate-400'}`} />
                <div className={`text-xs ${selectedEmotionAfter === emotion.id ? 'text-white font-semibold' : 'text-slate-700 dark:text-slate-300'}`}>{emotion.label}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Asset Type Selection */}
      <div>
        <label className="block text-slate-900 dark:text-white mb-2 sm:mb-3 font-semibold text-sm sm:text-base">Asset Type</label>
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setAssetType('stock')}
            className={`p-3 sm:p-4 rounded-lg border-2 transition-all flex items-center justify-center gap-2 ${
              assetType === 'stock'
                ? 'bg-slate-700 dark:bg-slate-600 border-slate-700 dark:border-slate-600 shadow-md'
                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            <span className={`font-semibold text-sm sm:text-base ${assetType === 'stock' ? 'text-white' : 'text-slate-700 dark:text-slate-300'}`}>Stock/ETF</span>
          </button>
          <button
            type="button"
            onClick={() => setAssetType('option')}
            className={`p-3 sm:p-4 rounded-lg border-2 transition-all flex items-center justify-center gap-2 ${
              assetType === 'option'
                ? 'bg-slate-700 dark:bg-slate-600 border-slate-700 dark:border-slate-600 shadow-md'
                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            <span className={`font-semibold text-sm sm:text-base ${assetType === 'option' ? 'text-white' : 'text-slate-700 dark:text-slate-300'}`}>Option</span>
          </button>
        </div>
      </div>

      {/* Options Type (only shown for options) */}
      {assetType === 'option' && (
        <div>
          <label className="block text-slate-900 dark:text-white mb-2 sm:mb-3 font-semibold text-sm sm:text-base">Option Type</label>
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setOptionType('call')}
              className={`p-3 sm:p-4 rounded-lg border-2 transition-all flex items-center justify-center gap-2 ${
                optionType === 'call'
                  ? 'bg-emerald-600 border-emerald-600 shadow-md'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <TrendingUp className={`w-4 h-4 sm:w-5 sm:h-5 ${optionType === 'call' ? 'text-white' : 'text-slate-600 dark:text-slate-400'}`} />
              <span className={`font-semibold text-sm sm:text-base ${optionType === 'call' ? 'text-white' : 'text-slate-700 dark:text-slate-300'}`}>Call</span>
            </button>
            <button
              type="button"
              onClick={() => setOptionType('put')}
              className={`p-3 sm:p-4 rounded-lg border-2 transition-all flex items-center justify-center gap-2 ${
                optionType === 'put'
                  ? 'bg-red-600 border-red-600 shadow-md'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <TrendingDown className={`w-4 h-4 sm:w-5 sm:h-5 ${optionType === 'put' ? 'text-white' : 'text-slate-600 dark:text-slate-400'}`} />
              <span className={`font-semibold text-sm sm:text-base ${optionType === 'put' ? 'text-white' : 'text-slate-700 dark:text-slate-300'}`}>Put</span>
            </button>
          </div>
        </div>
      )}

      {/* Trade Type */}
      <div>
        <label className="block text-slate-900 dark:text-white mb-2 sm:mb-3 font-semibold text-sm sm:text-base">Position Type</label>
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setTradeType('long')}
            className={`p-3 sm:p-4 rounded-lg border-2 transition-all flex items-center justify-center gap-2 ${
              tradeType === 'long'
                ? 'bg-emerald-600 border-emerald-600 shadow-md'
                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            <TrendingUp className={`w-4 h-4 sm:w-5 sm:h-5 ${tradeType === 'long' ? 'text-white' : 'text-slate-600 dark:text-slate-400'}`} />
            <span className={`font-semibold text-sm sm:text-base ${tradeType === 'long' ? 'text-white' : 'text-slate-700 dark:text-slate-300'}`}>Long{assetType === 'option' ? ' (Buy)' : ''}</span>
          </button>
          <button
            type="button"
            onClick={() => setTradeType('short')}
            className={`p-3 sm:p-4 rounded-lg border-2 transition-all flex items-center justify-center gap-2 ${
              tradeType === 'short'
                ? 'bg-red-600 border-red-600 shadow-md'
                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            <TrendingDown className={`w-4 h-4 sm:w-5 sm:h-5 ${tradeType === 'short' ? 'text-white' : 'text-slate-600 dark:text-slate-400'}`} />
            <span className={`font-semibold text-sm sm:text-base ${tradeType === 'short' ? 'text-white' : 'text-slate-700 dark:text-slate-300'}`}>Short{assetType === 'option' ? ' (Sell)' : ''}</span>
          </button>
        </div>
      </div>

      {/* Trade Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div>
          <label className="block text-slate-700 dark:text-slate-300 mb-2 text-xs sm:text-sm font-medium">Symbol</label>
          <input
            type="text"
            placeholder="e.g., AAPL"
            value={formData.symbol}
            onChange={(e) => setFormData({ ...formData, symbol: e.target.value.toUpperCase() })}
            className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-300"
            required
          />
        </div>
        <div>
          <label className="block text-slate-700 dark:text-slate-300 mb-2 text-xs sm:text-sm font-medium">
            {assetType === 'option' ? 'Contracts' : 'Quantity'}
          </label>
          <input
            type="number"
            placeholder={assetType === 'option' ? '10' : '100'}
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-300"
            required
          />
        </div>
        
        {/* Options-specific fields */}
        {assetType === 'option' && (
          <>
            <div>
              <label className="block text-slate-700 dark:text-slate-300 mb-2 text-xs sm:text-sm font-medium">Strike Price</label>
              <input
                type="number"
                step="0.01"
                placeholder="150.00"
                value={formData.strikePrice}
                onChange={(e) => setFormData({ ...formData, strikePrice: e.target.value })}
                className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-300"
                required
              />
            </div>
            <div>
              <label className="block text-slate-700 dark:text-slate-300 mb-2 text-xs sm:text-sm font-medium">Expiration Date</label>
              <input
                type="date"
                value={formData.expirationDate}
                onChange={(e) => setFormData({ ...formData, expirationDate: e.target.value })}
                className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-300"
                required
              />
            </div>
          </>
        )}
        
        <div>
          <label className="block text-slate-700 dark:text-slate-300 mb-2 text-xs sm:text-sm font-medium">
            {assetType === 'option' ? 'Entry Premium' : 'Entry Price'}
          </label>
          <input
            type="number"
            step="0.01"
            placeholder={assetType === 'option' ? '2.50' : '150.50'}
            value={formData.entryPrice}
            onChange={(e) => setFormData({ ...formData, entryPrice: e.target.value })}
            className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-300"
            required
          />
        </div>
        <div>
          <label className="block text-slate-700 dark:text-slate-300 mb-2 text-xs sm:text-sm font-medium">
            {assetType === 'option' ? 'Exit Premium' : 'Exit Price'}
          </label>
          <input
            type="number"
            step="0.01"
            placeholder={assetType === 'option' ? '3.75' : '155.75'}
            value={formData.exitPrice}
            onChange={(e) => setFormData({ ...formData, exitPrice: e.target.value })}
            className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-300"
            required
          />
        </div>
      </div>

      {/* Profit/Loss Display */}
      {profit !== 0 && (
        <div className={`p-4 rounded-lg ${profit > 0 ? 'bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800' : 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800'}`}>
          <div className="text-center">
            <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-1">Profit/Loss</div>
            <div className={`text-2xl sm:text-3xl font-bold ${profit > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
              {profit > 0 ? '+' : ''}${profit.toFixed(2)}
            </div>
            {assetType === 'option' && (
              <div className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                {formData.quantity} contract{parseFloat(formData.quantity) !== 1 ? 's' : ''} × 100 shares
              </div>
            )}
          </div>
        </div>
      )}

      {/* Notes */}
      <div>
        <label className="block text-slate-700 dark:text-slate-300 mb-2 text-xs sm:text-sm font-medium">Notes & Reflections</label>
        <textarea
          placeholder="What were you thinking? What could you have done better?"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          rows={4}
          className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none transition-colors duration-300"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!selectedEmotionAfter}
        className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed text-white py-3 sm:py-4 rounded-lg font-semibold transition-all shadow-sm text-sm sm:text-base"
      >
        Save Trade Entry
      </button>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmation && savedTradeData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setShowConfirmation(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden"
            >
              {/* Success Header */}
              <div className="bg-gradient-to-r from-teal-500 to-emerald-500 p-6 sm:p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
                >
                  <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-teal-600" />
                </motion.div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">Trade Saved!</h3>
                <p className="text-teal-50 text-sm sm:text-base">Your trade has been successfully logged</p>
              </div>

              {/* Trade Summary */}
              <div className="p-6 sm:p-8">
                <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 sm:p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">{savedTradeData.symbol}</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400 capitalize">
                        {savedTradeData.assetType === 'option' 
                          ? `${savedTradeData.optionType} ${savedTradeData.tradeType === 'long' ? 'Buy' : 'Sell'}`
                          : `${savedTradeData.tradeType} Position`
                        }
                      </div>
                    </div>
                    <div className={`text-right ${savedTradeData.profit >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                      <div className="text-xs sm:text-sm font-medium mb-1">P/L</div>
                      <div className="text-2xl sm:text-3xl font-bold">
                        {savedTradeData.profit >= 0 ? '+' : ''}${savedTradeData.profit.toFixed(2)}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-slate-600 dark:text-slate-400 mb-1">Quantity</div>
                      <div className="font-semibold text-slate-900 dark:text-white">
                        {savedTradeData.quantity} {savedTradeData.assetType === 'option' ? 'contracts' : 'shares'}
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-600 dark:text-slate-400 mb-1">Emotion</div>
                      <div className="font-semibold text-slate-900 dark:text-white capitalize">{selectedEmotionData?.label}</div>
                    </div>
                    <div>
                      <div className="text-slate-600 dark:text-slate-400 mb-1">Entry</div>
                      <div className="font-semibold text-slate-900 dark:text-white">${savedTradeData.entryPrice}</div>
                    </div>
                    <div>
                      <div className="text-slate-600 dark:text-slate-400 mb-1">Exit</div>
                      <div className="font-semibold text-slate-900 dark:text-white">${savedTradeData.exitPrice}</div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={handleAddAnother}
                    className="flex-1 flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 sm:py-4 rounded-xl font-semibold transition-all shadow-sm"
                  >
                    <PlusCircle className="w-5 h-5" />
                    Add Another Trade
                  </button>
                  {onViewJournal && (
                    <button
                      type="button"
                      onClick={handleViewJournal}
                      className="flex-1 flex items-center justify-center gap-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white px-6 py-3 sm:py-4 rounded-xl font-semibold transition-all"
                    >
                      <BookOpen className="w-5 h-5" />
                      View Journal
                    </button>
                  )}
                </div>

                {/* Auto-dismiss indicator */}
                <div className="mt-4 text-center">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    This message will close automatically in 5 seconds
                  </p>
                  <motion.div 
                    className="h-1 bg-teal-600 rounded-full mt-2"
                    initial={{ width: "100%" }}
                    animate={{ width: "0%" }}
                    transition={{ duration: 5, ease: "linear" }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}