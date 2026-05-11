import { useState } from 'react';
import { TrendingUp, CheckCircle, AlertCircle, ExternalLink, Key, Link as LinkIcon, Download, Trash2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const supportedBrokers = [
  {
    id: 'alpaca',
    name: 'Alpaca',
    logo: '🦙',
    description: 'Commission-free trading API',
    category: 'stocks',
    requiresApiKey: true,
    fields: [
      { name: 'apiKey', label: 'API Key', type: 'text', placeholder: 'PK...' },
      { name: 'apiSecret', label: 'API Secret', type: 'password', placeholder: 'Your API Secret' },
    ],
  },
  {
    id: 'tdameritrade',
    name: 'TD Ameritrade',
    logo: '📊',
    description: 'Stocks, options & futures',
    category: 'multi',
    requiresApiKey: true,
    fields: [
      { name: 'apiKey', label: 'API Key', type: 'text', placeholder: 'Your API Key' },
      { name: 'refreshToken', label: 'Refresh Token', type: 'password', placeholder: 'Your Refresh Token' },
    ],
  },
  {
    id: 'interactivebrokers',
    name: 'Interactive Brokers',
    logo: '🏦',
    description: 'Professional multi-asset trading',
    category: 'multi',
    requiresApiKey: true,
    fields: [
      { name: 'username', label: 'Username', type: 'text', placeholder: 'Your IB Username' },
      { name: 'apiToken', label: 'API Token', type: 'password', placeholder: 'Your API Token' },
    ],
  },
  {
    id: 'ninjatrader',
    name: 'NinjaTrader',
    logo: '🥷',
    description: 'Advanced futures trading',
    category: 'futures',
    requiresApiKey: true,
    fields: [
      { name: 'username', label: 'Username', type: 'text', placeholder: 'Your NinjaTrader Username' },
      { name: 'apiKey', label: 'API Key', type: 'password', placeholder: 'Your API Key' },
    ],
  },
  {
    id: 'tradestation',
    name: 'TradeStation',
    logo: '🚂',
    description: 'Futures & equities platform',
    category: 'multi',
    requiresApiKey: true,
    fields: [
      { name: 'apiKey', label: 'API Key', type: 'text', placeholder: 'Your API Key' },
      { name: 'apiSecret', label: 'API Secret', type: 'password', placeholder: 'Your API Secret' },
    ],
  },
  {
    id: 'tradovate',
    name: 'Tradovate',
    logo: '📈',
    description: 'Cloud-based futures trading',
    category: 'futures',
    requiresApiKey: true,
    fields: [
      { name: 'username', label: 'Username', type: 'text', placeholder: 'Your Tradovate Username' },
      { name: 'password', label: 'Password', type: 'password', placeholder: 'Your password' },
    ],
  },
  {
    id: 'ampfutures',
    name: 'AMP Futures',
    logo: '⚡',
    description: 'Low-cost futures broker',
    category: 'futures',
    requiresApiKey: true,
    fields: [
      { name: 'accountNumber', label: 'Account Number', type: 'text', placeholder: 'Your Account Number' },
      { name: 'apiToken', label: 'API Token', type: 'password', placeholder: 'Your API Token' },
    ],
  },
  {
    id: 'optimusfutures',
    name: 'Optimus Futures',
    logo: '🎯',
    description: 'Full-service futures broker',
    category: 'futures',
    requiresApiKey: true,
    fields: [
      { name: 'accountId', label: 'Account ID', type: 'text', placeholder: 'Your Account ID' },
      { name: 'apiKey', label: 'API Key', type: 'password', placeholder: 'Your API Key' },
    ],
  },
  {
    id: 'topsteptrader',
    name: 'TopstepTrader',
    logo: '🏆',
    description: 'Futures funding program',
    category: 'futures',
    requiresApiKey: true,
    fields: [
      { name: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
      { name: 'apiKey', label: 'API Key', type: 'password', placeholder: 'Your API Key' },
    ],
  },
  {
    id: 'robinhood',
    name: 'Robinhood',
    logo: '🏹',
    description: 'Mobile-first trading',
    category: 'stocks',
    requiresApiKey: true,
    fields: [
      { name: 'username', label: 'Username', type: 'text', placeholder: 'Your username' },
      { name: 'password', label: 'Password', type: 'password', placeholder: 'Your password' },
    ],
  },
  {
    id: 'webull',
    name: 'Webull',
    logo: '🐂',
    description: 'Commission-free trading',
    category: 'stocks',
    requiresApiKey: true,
    fields: [
      { name: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
      { name: 'password', label: 'Password', type: 'password', placeholder: 'Your password' },
    ],
  },
  {
    id: 'etrade',
    name: 'E*TRADE',
    logo: '💼',
    description: 'Online investing platform',
    category: 'stocks',
    requiresApiKey: true,
    fields: [
      { name: 'consumerKey', label: 'Consumer Key', type: 'text', placeholder: 'Your Consumer Key' },
      { name: 'consumerSecret', label: 'Consumer Secret', type: 'password', placeholder: 'Your Consumer Secret' },
    ],
  },
];

interface ConnectedBroker {
  id: string;
  name: string;
  logo: string;
  connectedAt: string;
  lastSync: string;
  tradesImported: number;
}

export function BrokerConnect() {
  const [selectedBroker, setSelectedBroker] = useState<string | null>(null);
  const [connectedBrokers, setConnectedBrokers] = useState<ConnectedBroker[]>([]);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [importing, setImporting] = useState(false);
  const [filterCategory, setFilterCategory] = useState<'all' | 'stocks' | 'futures' | 'multi'>('all');

  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    
    const broker = supportedBrokers.find(b => b.id === selectedBroker);
    if (!broker) return;

    // Simulate connection (in real app, this would call backend API)
    const newConnection: ConnectedBroker = {
      id: broker.id,
      name: broker.name,
      logo: broker.logo,
      connectedAt: new Date().toISOString(),
      lastSync: new Date().toISOString(),
      tradesImported: 0,
    };

    setConnectedBrokers([...connectedBrokers, newConnection]);
    setShowSuccess(true);
    setSelectedBroker(null);
    setFormData({});

    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleDisconnect = (brokerId: string) => {
    setConnectedBrokers(connectedBrokers.filter(b => b.id !== brokerId));
  };

  const handleImportTrades = async (brokerId: string) => {
    setImporting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Update trades imported count
    setConnectedBrokers(connectedBrokers.map(b => 
      b.id === brokerId 
        ? { ...b, lastSync: new Date().toISOString(), tradesImported: b.tradesImported + Math.floor(Math.random() * 10) + 5 }
        : b
    ));
    
    setImporting(false);
  };

  const selectedBrokerData = supportedBrokers.find(b => b.id === selectedBroker);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Hero Section */}
      <div className="relative h-48 sm:h-56 lg:h-64 rounded-xl overflow-hidden shadow-sm">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaW5nJTIwY29ubmVjdGlvbnxlbnwwfHx8fDE3NjkxODIzMDB8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Trading Connection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 to-slate-800/80 flex items-center">
          <div className="px-4 sm:px-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">Connect Your Broker</h2>
            <p className="text-slate-300 text-sm sm:text-base lg:text-lg">Automatically sync your trades or enter them manually</p>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4 flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
          <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
          <div className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">
            Broker connected successfully! Your trades will now sync automatically.
          </div>
        </div>
      )}

      {/* How It Works Info Section */}
      <div className="bg-gradient-to-br from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20 border border-teal-200 dark:border-teal-800 rounded-xl p-6 sm:p-8">
        <div className="flex items-start gap-4 mb-4">
          <div className="bg-teal-600 rounded-full p-3 flex-shrink-0">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">How Broker Connection Works</h3>
            <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base">
              Streamline your emotional trading analysis with automatic trade imports
            </p>
          </div>
        </div>
        
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {/* With Broker Connection */}
          <div className="bg-white dark:bg-slate-900 rounded-lg p-4 sm:p-5 shadow-sm border border-teal-200 dark:border-teal-800">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              <h4 className="font-bold text-slate-900 dark:text-white">With Broker Connected</h4>
            </div>
            <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-teal-600 dark:text-teal-400 mt-0.5">✓</span>
                <span><strong>Trades auto-import</strong> from your broker</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-600 dark:text-teal-400 mt-0.5">✓</span>
                <span>All trade details <strong>pre-filled</strong> (symbol, entry, exit, P/L)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-600 dark:text-teal-400 mt-0.5">✓</span>
                <span>You only add: <strong>emotion, notes, screenshots</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-600 dark:text-teal-400 mt-0.5">✓</span>
                <span><strong>Save time</strong> and focus on emotional insights</span>
              </li>
            </ul>
          </div>

          {/* Without Broker Connection */}
          <div className="bg-white dark:bg-slate-900 rounded-lg p-4 sm:p-5 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-3">
              <Key className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              <h4 className="font-bold text-slate-900 dark:text-white">Manual Entry (No Broker)</h4>
            </div>
            <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-slate-400 mt-0.5">•</span>
                <span>Enter all trade details <strong>manually</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-slate-400 mt-0.5">•</span>
                <span>Type in symbol, entry/exit prices, quantity</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-slate-400 mt-0.5">•</span>
                <span>Add emotion, notes, and screenshots</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-0.5">ℹ</span>
                <span><strong>Works great</strong> if you prefer full control</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-3">
          <p className="text-xs sm:text-sm text-blue-900 dark:text-blue-100">
            <strong>💡 Pro Tip:</strong> Use broker connection for convenience, or enter trades manually if you prefer more privacy or trade with unsupported brokers. Both methods work perfectly!
          </p>
        </div>
      </div>

      {/* Connected Brokers */}
      {connectedBrokers.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Connected Accounts</h3>
          {connectedBrokers.map((broker) => (
            <div
              key={broker.id}
              className="bg-white dark:bg-slate-900 rounded-xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-1">
                  <div className="text-4xl">{broker.logo}</div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white text-lg">{broker.name}</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      Last synced: {new Date(broker.lastSync).toLocaleString()}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      Trades imported: <span className="font-semibold text-teal-600 dark:text-teal-400">{broker.tradesImported}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleImportTrades(broker.id)}
                    disabled={importing}
                    className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white px-4 py-2 rounded-lg transition-all text-sm"
                  >
                    <Download className="w-4 h-4" />
                    {importing ? 'Importing...' : 'Import'}
                  </button>
                  <button
                    onClick={() => handleDisconnect(broker.id)}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all text-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                    Disconnect
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Warning Banner */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" />
        <div className="text-sm">
          <div className="font-semibold text-yellow-900 dark:text-yellow-100 mb-1">Demo Mode</div>
          <div className="text-yellow-800 dark:text-yellow-200">
            This is a demo implementation. In a production app, broker credentials would be stored securely on a backend server and never exposed to the frontend. Consider implementing a proper backend with OAuth for real broker integrations.
          </div>
        </div>
      </div>

      {/* Available Brokers */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Available Brokers</h3>
          
          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                filterCategory === 'all'
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              All ({supportedBrokers.length})
            </button>
            <button
              onClick={() => setFilterCategory('stocks')}
              className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                filterCategory === 'stocks'
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              📈 Stocks ({supportedBrokers.filter(b => b.category === 'stocks').length})
            </button>
            <button
              onClick={() => setFilterCategory('futures')}
              className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                filterCategory === 'futures'
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              🔮 Futures ({supportedBrokers.filter(b => b.category === 'futures').length})
            </button>
            <button
              onClick={() => setFilterCategory('multi')}
              className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                filterCategory === 'multi'
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              ⚡ Multi-Asset ({supportedBrokers.filter(b => b.category === 'multi').length})
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {supportedBrokers
            .filter(broker => !connectedBrokers.find(cb => cb.id === broker.id))
            .filter(broker => filterCategory === 'all' || broker.category === filterCategory)
            .map((broker) => (
              <button
                key={broker.id}
                onClick={() => setSelectedBroker(broker.id)}
                className="bg-white dark:bg-slate-900 rounded-xl p-4 sm:p-6 border-2 border-slate-200 dark:border-slate-800 hover:border-teal-600 dark:hover:border-teal-500 shadow-sm transition-all text-left"
              >
                <div className="flex items-start gap-3">
                  <div className="text-3xl sm:text-4xl">{broker.logo}</div>
                  <div className="flex-1">
                    <div className="font-bold text-slate-900 dark:text-white mb-1">{broker.name}</div>
                    <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">{broker.description}</div>
                    <div className="mt-2 flex items-center gap-1 text-teal-600 dark:text-teal-400 text-sm font-semibold">
                      <LinkIcon className="w-3 h-3" />
                      Connect
                    </div>
                  </div>
                </div>
              </button>
            ))}
        </div>
      </div>

      {/* Connection Modal */}
      {selectedBroker && selectedBrokerData && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-900 rounded-xl max-w-md w-full shadow-2xl">
            <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{selectedBrokerData.logo}</div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Connect {selectedBrokerData.name}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{selectedBrokerData.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedBroker(null)}
                  className="text-slate-400 hover:text-slate-900 dark:hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            <form onSubmit={handleConnect} className="p-4 sm:p-6 space-y-4">
              {selectedBrokerData.fields.map((field) => (
                <div key={field.name}>
                  <label className="block text-slate-700 dark:text-slate-300 mb-2 text-sm font-medium">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={formData[field.name] || ''}
                    onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                    className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-300"
                    required
                  />
                </div>
              ))}

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <Key className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-blue-800 dark:text-blue-200">
                    Your credentials are stored locally in this demo. For production use, implement a secure backend to handle broker authentication.
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedBroker(null)}
                  className="flex-1 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white px-4 py-3 rounded-lg font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-teal-600 hover:bg-teal-700 text-white px-4 py-3 rounded-lg font-semibold transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <LinkIcon className="w-4 h-4" />
                  Connect
                </button>
              </div>

              <a
                href="#"
                className="text-center text-sm text-teal-600 dark:text-teal-400 hover:underline flex items-center justify-center gap-1"
              >
                Need API credentials? Visit {selectedBrokerData.name}
                <ExternalLink className="w-3 h-3" />
              </a>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}