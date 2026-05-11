import { TrendingUp, TrendingDown, Brain, DollarSign, Target, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { ImageWithFallback } from './figma/ImageWithFallback';

const emotionPerformance = [
  { emotion: 'Confident', wins: 12, losses: 3, profit: 2400 },
  { emotion: 'Calm', wins: 15, losses: 2, profit: 3200 },
  { emotion: 'Anxious', wins: 3, losses: 8, profit: -1500 },
  { emotion: 'Excited', wins: 7, losses: 5, profit: 800 },
  { emotion: 'Fearful', wins: 2, losses: 9, profit: -2100 },
  { emotion: 'Greedy', wins: 4, losses: 7, profit: -900 },
];

const emotionDistribution = [
  { id: 'calm', name: 'Calm', value: 30, color: '#0d9488' },
  { id: 'confident', name: 'Confident', value: 25, color: '#0ea5e9' },
  { id: 'anxious', name: 'Anxious', value: 20, color: '#f59e0b' },
  { id: 'excited', name: 'Excited', value: 15, color: '#10b981' },
  { id: 'fearful', name: 'Fearful', value: 10, color: '#ef4444' },
];

const weeklyPerformance = [
  { day: 'Mon', profit: 450, emotion: 'Calm' },
  { day: 'Tue', profit: -200, emotion: 'Anxious' },
  { day: 'Wed', profit: 680, emotion: 'Confident' },
  { day: 'Thu', profit: 320, emotion: 'Calm' },
  { day: 'Fri', profit: -150, emotion: 'Excited' },
];

export function Dashboard() {
  const totalProfit = 2700;
  const winRate = 68;
  const bestEmotion = 'Calm';
  const worstEmotion = 'Fearful';

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Hero Section with Image */}
      <div className="relative h-48 sm:h-56 lg:h-64 rounded-xl overflow-hidden shadow-sm">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1560221328-12fe60f83ab8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdG9jayUyMHRyYWRpbmclMjBjaGFydHN8ZW58MXx8fHwxNzY5MTgyMzAwfDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Trading Charts"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 to-slate-800/80 flex items-center">
          <div className="px-4 sm:px-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">Your Emotional Trading Journey</h2>
            <p className="text-slate-300 text-sm sm:text-base lg:text-lg">Understanding emotions leads to better trading decisions</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 sm:p-6 shadow-sm border border-slate-200 dark:border-slate-800 transition-colors duration-300">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="bg-emerald-50 dark:bg-emerald-900/30 p-2 sm:p-3 rounded-lg">
              <DollarSign className="w-4 h-4 sm:w-6 sm:h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mb-1">Total Profit</div>
          <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">${totalProfit.toLocaleString()}</div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 sm:p-6 shadow-sm border border-slate-200 dark:border-slate-800 transition-colors duration-300">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="bg-teal-50 dark:bg-teal-900/30 p-2 sm:p-3 rounded-lg">
              <Target className="w-4 h-4 sm:w-6 sm:h-6 text-teal-600 dark:text-teal-400" />
            </div>
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 dark:text-teal-400" />
          </div>
          <div className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mb-1">Win Rate</div>
          <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">{winRate}%</div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 sm:p-6 shadow-sm border border-slate-200 dark:border-slate-800 transition-colors duration-300">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="bg-blue-50 dark:bg-blue-900/30 p-2 sm:p-3 rounded-lg">
              <Brain className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mb-1">Best Emotion</div>
          <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">{bestEmotion}</div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 sm:p-6 shadow-sm border border-slate-200 dark:border-slate-800 transition-colors duration-300">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="bg-red-50 dark:bg-red-900/30 p-2 sm:p-3 rounded-lg">
              <Brain className="w-4 h-4 sm:w-6 sm:h-6 text-red-600 dark:text-red-400" />
            </div>
            <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 dark:text-red-400" />
          </div>
          <div className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mb-1">Worst Emotion</div>
          <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">{worstEmotion}</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Emotion Performance Chart */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4">Performance by Emotion</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={emotionPerformance} id="emotion-performance-chart">
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-700" />
              <XAxis dataKey="emotion" stroke="#64748b" tick={{ fontSize: 12, fill: '#64748b' }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 12, fill: '#64748b' }} />
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

        {/* Emotion Distribution */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4">Emotion Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart id="emotion-distribution-chart">
              <Pie
                data={emotionDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {emotionDistribution.map((entry) => (
                  <Cell key={entry.id} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--tooltip-bg, #ffffff)',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Weekly Performance */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4">Weekly Performance</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={weeklyPerformance} id="weekly-performance-chart">
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-700" />
            <XAxis dataKey="day" stroke="#64748b" tick={{ fontSize: 12, fill: '#64748b' }} />
            <YAxis stroke="#64748b" tick={{ fontSize: 12, fill: '#64748b' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--tooltip-bg, #ffffff)',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
              }}
            />
            <Line
              type="monotone"
              dataKey="profit"
              stroke="#0d9488"
              strokeWidth={3}
              dot={{ fill: '#0d9488', r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}