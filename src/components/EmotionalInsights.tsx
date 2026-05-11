import { Brain, TrendingUp, AlertCircle, CheckCircle, Lightbulb } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const emotionalPatterns = [
  {
    emotion: 'Calm',
    avgProfit: 425,
    trades: 17,
    winRate: 88,
    insight: 'Your best performing emotional state. Trading while calm leads to rational decisions.',
    color: 'bg-teal-600',
    textColor: 'text-teal-600',
    bgLight: 'bg-teal-50',
  },
  {
    emotion: 'Confident',
    avgProfit: 320,
    trades: 15,
    winRate: 80,
    insight: 'Confidence helps you stick to your strategy, but watch for overconfidence.',
    color: 'bg-blue-600',
    textColor: 'text-blue-600',
    bgLight: 'bg-blue-50',
  },
  {
    emotion: 'Anxious',
    avgProfit: -135,
    trades: 11,
    winRate: 27,
    insight: 'Anxiety leads to premature exits and poor entry timing. Consider meditation.',
    color: 'bg-yellow-500',
    textColor: 'text-yellow-600',
    bgLight: 'bg-yellow-50',
  },
  {
    emotion: 'Excited',
    avgProfit: 67,
    trades: 12,
    winRate: 58,
    insight: 'Excitement can lead to impulsive decisions. Channel it into disciplined trading.',
    color: 'bg-emerald-500',
    textColor: 'text-emerald-600',
    bgLight: 'bg-emerald-50',
  },
  {
    emotion: 'Fearful',
    avgProfit: -191,
    trades: 11,
    winRate: 18,
    insight: 'Fear is your worst enemy. Avoid trading when fearful or set strict stop-losses.',
    color: 'bg-red-600',
    textColor: 'text-red-600',
    bgLight: 'bg-red-50',
  },
];

const timeOfDayData = [
  { time: '9-10 AM', profit: 280, emotion: 'Calm' },
  { time: '10-11 AM', profit: 420, emotion: 'Confident' },
  { time: '11-12 PM', profit: -120, emotion: 'Anxious' },
  { time: '1-2 PM', profit: 180, emotion: 'Calm' },
  { time: '2-3 PM', profit: -80, emotion: 'Excited' },
  { time: '3-4 PM', profit: 340, emotion: 'Calm' },
];

const tips = [
  {
    icon: Brain,
    title: 'Mindfulness Before Trading',
    description: 'Spend 5 minutes meditating before your trading session to achieve a calm state.',
    color: 'bg-teal-600',
    bgLight: 'bg-teal-50',
  },
  {
    icon: CheckCircle,
    title: 'Emotion Journal',
    description: 'Continue logging emotions. You\'ve already improved your awareness by 45%!',
    color: 'bg-blue-600',
    bgLight: 'bg-blue-50',
  },
  {
    icon: AlertCircle,
    title: 'Avoid Trading When Fearful',
    description: 'Your data shows 82% loss rate when fearful. Take a break instead.',
    color: 'bg-red-600',
    bgLight: 'bg-red-50',
  },
  {
    icon: TrendingUp,
    title: 'Best Trading Hours',
    description: 'You perform best between 10-11 AM and 3-4 PM. Focus on these times.',
    color: 'bg-emerald-600',
    bgLight: 'bg-emerald-50',
  },
];

export function EmotionalInsights() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header with Image */}
      <div className="relative h-36 sm:h-48 rounded-xl overflow-hidden shadow-sm">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1635071468419-b935ff564793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwY2FsbSUyMGZvY3VzfGVufDF8fHx8MTc2OTI5MDg4MHww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Meditation and Focus"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 to-slate-800/70 flex items-center">
          <div className="px-4 sm:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">Emotional Insights</h2>
            <p className="text-slate-300 text-sm sm:text-base">Understand your emotional patterns to improve performance</p>
          </div>
        </div>
      </div>

      {/* Emotional Patterns */}
      <div className="space-y-3 sm:space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4">Your Emotional Performance Breakdown</h3>
        {emotionalPatterns.map((pattern) => (
          <div
            key={pattern.emotion}
            className="bg-white dark:bg-slate-900 rounded-xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300"
          >
            <div className="flex flex-col gap-4">
              {/* Top: Emotion name and bar */}
              <div className="flex items-center gap-3 sm:gap-4">
                <div className={`${pattern.color} w-2 sm:w-3 h-10 sm:h-12 rounded-full flex-shrink-0`}></div>
                <div className="flex-1 min-w-0">
                  <div className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-1">{pattern.emotion}</div>
                  <div className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">{pattern.insight}</div>
                </div>
              </div>
              
              {/* Bottom: Stats */}
              <div className="flex gap-4 sm:gap-6 justify-around pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="text-center">
                  <div className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mb-1">Avg Profit</div>
                  <div className={`text-base sm:text-xl font-bold ${pattern.avgProfit >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                    {pattern.avgProfit >= 0 ? '+' : ''}${pattern.avgProfit}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mb-1">Trades</div>
                  <div className="text-base sm:text-xl font-bold text-slate-900 dark:text-white">{pattern.trades}</div>
                </div>
                <div className="text-center">
                  <div className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mb-1">Win Rate</div>
                  <div className={`text-base sm:text-xl font-bold ${pattern.winRate >= 60 ? 'text-emerald-600 dark:text-emerald-400' : pattern.winRate >= 40 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'}`}>
                    {pattern.winRate}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Time of Day Analysis */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500" />
          Time of Day Performance
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={timeOfDayData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-700" />
            <XAxis dataKey="time" stroke="#64748b" tick={{ fontSize: 11 }} />
            <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--tooltip-bg, #ffffff)',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
              }}
            />
            <Bar dataKey="profit" fill="#0d9488" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Actionable Tips */}
      <div>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4">Personalized Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {tips.map((tip, index) => {
            const Icon = tip.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-slate-900 rounded-xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className={`${tip.color} p-2 sm:p-3 rounded-lg flex-shrink-0`}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-1 sm:mb-2">{tip.title}</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">{tip.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Success Story */}
      <div className="relative h-48 sm:h-56 lg:h-64 rounded-xl overflow-hidden shadow-sm">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1769107259180-6ab7c60ac0a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWNjZXNzJTIwY2VsZWJyYXRpb258ZW58MXx8fHwxNzY5Mjc3NjkxfDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Success"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/60 to-transparent flex items-end">
          <div className="p-4 sm:p-6 lg:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">Keep Up The Great Work!</h3>
            <p className="text-slate-300 text-sm sm:text-base lg:text-lg">
              Your emotional awareness has improved your trading performance by 34% this month.
              Continue being mindful of your emotions and you'll keep seeing positive results.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}